from rest_framework import serializers
from .models import CustomUser
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
    
    
    
class LoginSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    team = serializers.SerialzerMethodField()
    class Meta:
        model = CustomUser
        fields = "__all__"
    def get_token(CustomUser):
        token, created = Token.objects.get_or_create(user=CustomUser)
        return token.keykey
    
        

    
    
    
