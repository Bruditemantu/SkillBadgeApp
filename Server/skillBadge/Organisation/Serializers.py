from rest_framework import serializers
from .models import *

class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges
        fields = '__all__'
        
class SkillBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillBadges
        fields = '__all__'   
        
class ProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileEdit
        fields = ['Email','Password','Name','Strength']             

class IssuersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issuers
        fields = '__all__'


class RecipientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipients
        fields = '__all__'

class BadgeAssignmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignments
        fields = '__all__'
