# AI-Powered Real-Time Sign Language-to-Text and Speech Converter

## Overview
This project is an AI-powered real-time sign language recognition system that converts sign language gestures into text and speech. It uses **Django** for the backend, **MediaPipe** for hand tracking, and a **deep learning model** to classify gestures into characters.

## Features
- **Real-time hand tracking** using MediaPipe.
- **Deep learning-based gesture classification** using a pre-trained CNN model.
- **Text and speech conversion** using Text-to-Speech (TTS).
- **Web interface** built with Django for easy interaction.
- **Error correction** using TextBlob for improved accuracy.

## Technologies Used
- **Python** (Django, OpenCV, NumPy, Mediapipe, Keras, TextBlob, Pyttsx3)
- **Deep Learning** (CNN model for sign recognition)
- **Computer Vision** (OpenCV for image processing)
- **Speech Processing** (Text-to-Speech conversion)
- **Django Framework** (Backend server and API handling)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sign-language-ai.git
cd sign-language-ai
```

### 2. Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Download Pre-Trained Model
Place the `cnn8grps_rad1_model.h5` file in the project directory.

### 5. Run the Django Server
```bash
python manage.py runserver
```
Access the app at `http://127.0.0.1:8000/`

## API Endpoints

### Detect Sign Language Gesture
**Endpoint:** `POST /detect_sign/`
- **Input:** Base64-encoded image of a hand gesture
- **Response:**
```json
{
  "character": "A",
  "suggestions": "A"
}
```

### Convert Text to Speech
**Endpoint:** `POST /speak_text/`
- **Input:** JSON with `text` field
- **Response:**
```json
{
  "status": "success"
}
```

## Project Structure
```
📂 sign-language-ai
├── 📂 static              # Static files (CSS, JS, Images)
├── 📂 templates           # HTML templates
├── 📂 media               # Uploaded images
├── 📂 myapp                # Django app (views, models, urls)
│   ├── views.py          # Core backend logic
│   ├── urls.py           # API endpoints
├── cnn8grps_rad1_model.h5 # Trained CNN model
├── manage.py              # Django entry point
├── requirements.txt       # Dependencies
├── README.md              # Project Documentation
```

## Future Enhancements
- Expand the gesture set to recognize full sign language words.
- Improve accuracy with a larger and more diverse dataset.
- Build a mobile-friendly UI.
- Integrate with real-time video streaming.


Feel free to contribute and improve the project! 🚀

