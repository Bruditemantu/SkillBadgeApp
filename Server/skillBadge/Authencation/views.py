# views.py

from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from django.shortcuts import render
from .models import CustomUser
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from oauthlib.common import generate_token

class HomePage(APIView):
    def get(self, request):
        return Response({'message': 'Welcome to the homepage!'})

# class SignupPage(APIView):
#     def get(self, request):
#         return render(request, 'signup.html')
    

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             uname = serializer.validated_data['username']
#             email = serializer.validated_data['email']
#             pass1 = serializer.validated_data['password1']
#             pass2 = serializer.validated_data['password2']

#             try:
#                 if pass1 != pass2:
#                     raise ValueError("Your password and confirm password are not the same!!")

#                 if User.objects.filter(username=uname).exists():
#                     raise ValueError("Username is already taken. Choose a different username.")

#                 if User.objects.filter(email=email).exists():
#                     raise ValueError("Email already exists. Please login.")

#                 my_user = User.objects.create_user(uname, email, pass1)
#                 my_user.is_active = False
#                 my_user.save()
#                 #send_verification_email(request, my_user)

#                 return Response({'message': 'Signup successful'}, status=status.HTTP_201_CREATED)

#             except ValueError as e:
#                 return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#         return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

class SignupPage(APIView):
    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get("email")
            exists = CustomUser.objects.filter(email=email).exists()
            if exists:
                return Response(
                    {
                        "status": False,
                        "status_code": 400,
                        "message": "User with this email already exists.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer = UserSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    {
                        "status": False,
                        "status_code": 400,
                        "message": "Invalid Credentials",
                        "error": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            # serializer= serializer.create(request.data)
            return Response(
                {
                    "status": True,
                    "status_code": 201,
                    "message": "Successfully Register.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as err:
            return Response(
                {
                    "status": False,
                    "status_code": 500,
                    "message": "Something went wrong",
                    "error": err,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

# class LoginPage(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         try:
#             user = authenticate(request, username=username, password=password)
            
#             if user:
#                 login(request, user)
#                 return Response({
#                     'success': True,
#                     'message': 'Login successful',
#                     'user_id': user.id,
#                     'username': user.username
#                 })
#             else:
#                 return Response({'success': False, 'message': 'Login failed. Please check your username and password.'})

#         except ValueError as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
 
#         return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
@method_decorator(csrf_exempt, name="dispatch")
class LoginPage(APIView):
    def post(self, request, *args, **kwargs):
        try:
            username = request.data.get('username')
            password = request.data.get("password")
            if not username or not password:
                return Response(
                    {
                        "status": False,
                        "status_code": 400,
                        "message": "Username and password are required fields.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            print(username, password)
            print(authenticate(request))
            user = authenticate(request, username=username, password=password)
            serializer = LoginSerializer(user)
            
            print(user)
            if user is not None:
                serializer = LoginSerializer(user)
                login(request, user)
                # _, token = AuthToken.objects.create(user)
                # token, created = Token.objects.get_or_create(user=request.user)
                # token = str(token)
                login
                return Response(
                    {
                   'success': True,
                   'message': 'Login successful',
                    'user_id': user.id,
                    'username': user.username,
                    "token": token
                })
            else:
                return Response(
                    {
                        "status": False,
                        "status_code": 401,
                        "message": "Invalid credentials.",
                    },
                   status=status.HTTP_401_UNAUTHORIZED,
                )
        except Exception as err:
            return Response(
                {
                    "status": False,
                    "status_code": 500,
                    "message": "Something went wrong",
                    "error": err,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
class LogoutPage(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})
# Create your views here.