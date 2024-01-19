from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path('badge-assign/', BadgeAssignmentAPIView.as_view(), name='badge-assignment'),  # DRF Signup endpoint
    path('crud/', BadgeDetailsAPIView.as_view(), name='badge-crud'),    # DRF Logi
    path('crud/', Issuer_details.as_view(), name='Apply_user'), 
]