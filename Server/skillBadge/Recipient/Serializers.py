from rest_framework import serializers
from .models import *
from Organisation.models import Badge_Assignment
from Organisation.models import Badges
from Authencation.models import CustomUser
from Organisation.Serializers import BadgesSerializer


class RecipientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipients
        fields = '__all__'

class GetBadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge_Assignment
        fields= '__all__'
        


class UserwithBadgeSerializer(serializers.ModelSerializer):
    assigned_users = BadgesSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'name', 'email', 'assigned_users']