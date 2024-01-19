from rest_framework import serializers
from .models import *
from Authencation.models import CustomUser

class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges
        fields = '__all__'
        
class RecipientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipients
        fields = '__all__'

class BadgeAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignments
        fields = '__all__'
        
        
class Issuer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        
