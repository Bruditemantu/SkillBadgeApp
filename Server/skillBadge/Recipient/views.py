from Recipient.Serializers import GetBadgesSerializer

from Organisation.models import Badge_Assignment
from Organisation.models import Badges
from Organisation.Serializers import BadgesSerializer
from Organisation.Serializers import BadgeAssignmentSerializer

from Recipient.Serializers import UserwithBadgeSerializer

from Authencation.models import CustomUser
from Authencation.serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

class GetBadgesView(APIView):
    def get( self, request):
        try:
            badge =Badge_Assignment.objects.all()
            if badge:
                serial = GetBadgesSerializer(badge,many=True)
                return Response( {"data":serial.data})
            else:
                return Response({'error':'badge is not assigned'})
        except:
            serial = GetBadgesSerializer
            return Response( {"error":str(serial.error)})
        

class GetbyidDetail(APIView):
    def get( self, request, user_id):
        try:
            badge = Badge_Assignment.objects.filter(recipient = user_id)
            serial =  BadgeAssignmentSerializer(badge,many=True)
            
            return Response({"data":serial.data})
        except:
            return Response({"error":"error in giving the data"})
            
            
        
class UserDetail(APIView):
    def get( self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            serial = UserSerializer( user)
            return Response({"data":serial.data})
        except:
            return Response({"error":"userdoesn't exist"})
        
    def put( self, request,user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            if user:
                serial = UserSerializer(instance=user, data=request.data)
                if serial.is_valid():
                    serial.save()
                    return Response({"data": serial.data})
                else:
                    return Response({"error": "serializer is not valid", "details": serial.errors})
            return Response({"UserNotFound": "user is not found"})
        except CustomUser.DoesNotExist:
            return Response({"UserNotFound": "user is not found"})
    
                
                
        
        
        
        

           
   