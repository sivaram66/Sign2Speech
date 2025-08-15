from django.urls import path
from . import views

urlpatterns = [
    # Route for the main page
    path('', views.index, name='index'),
    # Route for processing video frames
    path('process-frame/', views.process_frame, name='process_frame'),
    path('translate/', views.translate, name='translate'),

]
