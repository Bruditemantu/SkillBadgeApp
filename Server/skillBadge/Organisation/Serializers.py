from rest_framework import serializers
from .models import *
from Authencation.models import CustomUser

class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges
        fields = ['id','name','description','criteria','image_url','date_created','expiration_durations']    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  CustomUser
        fields = ['id','name']  
        
class Issuer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            
            'organisation',
            'organisation_domain',
            'organisation_size',
            'badges_and_types',
            
        ]
        
class BadgeAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignment
        fields = ['id','badge_id','recipient']          

class GetBadgesSerializer(serializers.ModelSerializer): 
    assigned_users = UserSerializer(many=True)
    class Meta:
        model = Badges
        fields = ['id','org_id','name','description','criteria','image_url','date_created','expiration_durations','assigned_users']
    
class Issuer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            
            'organisation',
            'organisation_domain',
            'organisation_size',
            'badges_and_types',
            
        ]