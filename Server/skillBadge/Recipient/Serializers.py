from rest_framework import serializers
from .models import *

class RecipientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipients
        fields = '__all__'
        