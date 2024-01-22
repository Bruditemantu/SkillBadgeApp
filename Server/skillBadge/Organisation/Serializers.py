from rest_framework import serializers
from .models import *
from Authencation.models import CustomUser


class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges
        fields = ['name','description','criteria','image_url','date_created','expiration_durations']

class BadgeAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignment
        fields = ['badge_id','recipient']        

class GetBadgesSerializer(serializers.ModelSerializer):
    assigned_to = BadgeAssignmentSerializer(many=True)
    class Meta:
        model = Badges
        fields = ['id','org_id','name','description','criteria','image_url','date_created','expiration_durations','assigned_to']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  CustomUser
        feilds = ['id']         

 
