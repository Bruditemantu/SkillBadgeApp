from django.contrib import admin
from django.urls import path, include
from Recipient.views import GetBadgesView, UserDetail, GetbyidDetail


    
urlpatterns = [
    path('getbadge/',GetBadgesView.as_view()),
    path('getid/<int:user_id>/',GetbyidDetail.as_view()),
    path('user_detail/<int:user_id>/' ,UserDetail.as_view())
]
    
