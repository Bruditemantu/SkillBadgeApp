from rest_framework import serializers
from .models import *

class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges
        fields = '__all__'
        
class BadgeAssignmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignments
        fields = '__all__'
