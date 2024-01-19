from rest_framework import serializers
from .models import CustomUser
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

# class LoginSerializer(UserSerializer):
#     token = serializers.SerializerMethodField()

#     class Meta:
#         model = CustomUser
#         fields = "__all__"

#     def get_token(self):
#         token, created = Token.objects.get_or_create(user=instance)
#         return token.key
