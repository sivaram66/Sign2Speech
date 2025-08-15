import base64
import json
import numpy as np
import cv2
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from keras.models import load_model
from cvzone.HandTrackingModule import HandDetector
import enchant
from django.shortcuts import render

# Load model and hand detector
model = load_model('cnn8grps_rad1_model.h5')
hd = HandDetector(maxHands=1)

# Load dictionary
try:
    ddd = enchant.Dict("en-US")
except enchant.errors.DictNotFoundError:
    ddd = None


@csrf_exempt
@require_POST
def process_frame(request):
    try:
        data = json.loads(request.body)
        image_data = data['image'].split(',')[1]
        image = base64.b64decode(image_data)
        np_image = np.frombuffer(image, np.uint8)
        frame = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

        recognized_text = " "
        str_accumulated = ""
        prev_char = " "

        # Detect hands
        hands = hd.findHands(frame, draw=False, flipType=True)
        if hands and hands[0]:
            x, y, w, h = hands[0][0]['bbox']
            image = frame[y:y + h, x:x + w]
            image = cv2.resize(image, (400, 400)).reshape(
                1, 400, 400, 3) / 255.0

            prob = model.predict(image)[0]
            recognized_text = chr(np.argmax(prob) + 65)

            if recognized_text != " " and prev_char != " ":
                str_accumulated += recognized_text.upper()

        return JsonResponse({'recognized_text': recognized_text, 'accumulated_string': str_accumulated})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


def index(request):
    return render(request, 'index.html')


def translate(request):
    return render(request, 'translate.html')
