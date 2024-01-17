from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from Organisation.Serializers import *
from Organisation.models import *

# Create your views here.
class BadgeAPIView(APIView):
      def post(self, request): 
          data=request.data
          serial=BadgesSerializer(data=data)
       
          if serial.is_valid():
              serial.save()
              return Response({"data":serial.data})
          else:
              return Response({"data":"invalid data"})
          
      def get(self,request):
        issuer_id = request.query_params.get('issuer_id')
        data = Badges.objects.filter(issuer_id=issuer_id)
        serial =BadgesSerializer(data,many=True)
        return Response({"data":serial.data})
    
      def delete(self,request):
          data=Badges.objects.all()
          data.delete()
          return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
          
    
      def put(self,request):
          data=request.data
          serial = BadgesSerializer(data=data)
          if serial.is_valid():
              serial.save()
              return Response({"data":serial.data})
          return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
