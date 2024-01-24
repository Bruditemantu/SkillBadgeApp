from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path('badge-assign/', BadgeAssignmentAPIView.as_view(), name='badge-assignment'),  # DRF Signup endpoint
    path('crud/', BadgeDetailsAPIView.as_view(), name='badge-crud'),   
    path('apply_for_issuer/<int:id>/', OrganisationDetails.as_view(), name='Apply_user'),
    

]