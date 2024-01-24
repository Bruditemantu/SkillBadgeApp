# badge_assignment/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Badge_Assignment, Badges
from .Serializers import *
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from Authencation.models import CustomUser
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from Authencation.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated


# class BadgeAssignmentAPIView(APIView):
#     def post(self, request):

#             badge_assigned = Badge_Assignment.objects.filter(
#                 badge_id=request.data.get("badge_id"), recipient_id=request.data.get("recipient")
#             )
#             if badge_assigned:
#                 return Response(
#                     {"msg": "Badge is already assigned to the user"},
#                     status=status.HTTP_409_CONFLICT,
#                 )
#             serializer = BadgeAssignmentSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({"data":serializer.data}, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BadgeAssignmentAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            badge_assigned = Badge_Assignment.objects.filter(
                badge_id=request.data.get("badge_id"), recipient_id=request.data.get("recipient")
            )
            if badge_assigned:
                return Response(
                    {"msg": "Badge is already assigned to the user"},
                    status=status.HTTP_409_CONFLICT,
                )

            serializer = BadgeAssignmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# class BadgeDetailsAPIView(APIView):
#     # create a badge
#     def post(self, request):
#         data = request.data
#         serial = BadgesSerializer(data=data)
#         if serial.is_valid():
#             serial.save()
#             return Response({"data": serial.data})
#         return Response({"data": "invalid data"})

#     # fetch badge data with the users it is assigned to
#     def get(self, request):
#         badge_id = request.query_params.get("badge_id")
#         if badge_id:
#             valid_badge = Badges.objects.get(pk=badge_id)
#             if valid_badge:
                
#                 Badgeserializer = GetBadgesSerializer(valid_badge)
#                 return Response(
#                     {
#                         "data": Badgeserializer.data,
            
#                     },
#                     status=status.HTTP_200_OK,
#                 )
#             return Response(
#                 {"msg": "Not a vaild badge"}, status=status.HTTP_404_NOT_FOUND
#             )
#         all_badges = Badges.objects.all()
#         if all_badges:
#             serializer = GetBadgesSerializer(all_badges, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response({"msg": "No badges created yet"}, status=status.HTTP_200_OK)

#     # delete a badge
#     def delete(self, request):
#         badge_id = request.query_params.get("badge_id")
#         if badge_id:
#             badge_to_delete = Badges.objects.get(pk=badge_id)
#             badge_to_delete.delete()
#             return Response({"msg": "Badge Deleted"}, status=status.HTTP_200_OK)

#     # update a badge
#     def put(self, request):
#         data = request.data
#         serial = BadgesSerializer(data=data)
#         if serial.is_valid():
#             serial.save()
#             return Response({"data": serial.data})
#         return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

class BadgeDetailsAPIView(APIView):
    # create a badge
    
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            data = request.data
            serial = BadgesSerializer(data=data)
            if serial.is_valid():
                serial.save()
                return Response({"data": serial.data}, status=status.HTTP_201_CREATED)
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # fetch badge data with the users it is assigned to
    def get(self, request):
        try:
            badge_id = request.query_params.get("badge_id")
            if badge_id:
                valid_badge = Badges.objects.get(pk=badge_id)
                if valid_badge:
                    Badgeserializer = GetBadgesSerializer(valid_badge)
                    return Response(
                        {"data": Badgeserializer.data},
                        status=status.HTTP_200_OK,
                    )
                return Response(
                    {"msg": "Not a valid badge"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            all_badges = Badges.objects.all()
            serializer = GetBadgesSerializer(all_badges, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Badges.DoesNotExist:
            return Response(
                {"msg": "Not a valid badge"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # delete a badge
    def delete(self, request):
        try:
            badge_id = request.query_params.get("badge_id")
            if badge_id:
                badge_to_delete = Badges.objects.get(pk=badge_id)
                badge_to_delete.delete()
                return Response({"msg": "Badge Deleted"}, status=status.HTTP_200_OK)

        except Badges.DoesNotExist:
            return Response(
                {"msg": "Not a valid badge"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # update a badge
    def put(self, request):
        try:
            data = request.data
            badge_id = data.get("id")
            existing_badge = Badges.objects.get(pk=badge_id)
            serial = BadgesSerializer(existing_badge, data=data)
            
            if serial.is_valid():
                serial.save()
                return Response({"data": serial.data}, status=status.HTTP_200_OK)
            return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

        except Badges.DoesNotExist:
            return Response(
                {"msg": "Not a valid badge"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
# class fetchUserDetailsAPIView(APIView):
#     def get(self,request):
#         recipient_id = request.query_params.get("recipient_id")
#         if recipient_id:
#             assigned_badges = Badge_Assignments.objects.get(pk=recipient_id)
#             serializer = BadgeAssignmentSerializer(assigned_badges, many=True)
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         assigned_users = Badge_Assignments.


        
class EditIssuerDetails(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        try:
            
            if id:
                issuer = get_object_or_404(CustomUser, id=id)
                serializer = Issuer_Serializer(instance=issuer)
                return Response({"data": serializer.data})

            else:
                return Response(request, self.issuer_detail, {'form': None, 'issuer': None})

        except CustomUser.DoesNotExist:
            return Response(
                {"msg": "Issuer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request, id=None):
        try:
            issuer = get_object_or_404(CustomUser, id=id)
            if not issuer.is_org:
                return Response(
                    {
                        "status": False,
                        "status_code": 404,
                        "message": "Organization not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = Issuer_Serializer(instance=issuer, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "data": serializer.data,
                        "status": True,
                        "status_code": 201,
                        "message": "Successfully Register",
                    }
                )
            else:
                return Response(
                    {
                        "status": False,
                        "status_code": 400,
                        "message": "Cannot Register",
                        "error": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except CustomUser.DoesNotExist:
            return Response(
                {"msg": "Issuer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
       


class DeleteIssuerDetails(APIView):
    def patch(self, request, id=None):
        try:
            issuer = get_object_or_404(CustomUser, id=id)
            serializer = Issuer_Serializer(instance=issuer, data=request.data, partial=True)

            for field in serializer.fields:
                if field in request.data:
                    request.data[field] = None

            if serializer.is_valid():
                serializer.save()
                return Response({
                    "data": serializer.data,
                    "status": True,
                    "status_code": 200,
                    "message": "Successfully updated",
                })
            else:
                return Response({
                    "status": False,
                    "status_code": 400,
                    "message": "Cannot update",
                    "error": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)

        except CustomUser.DoesNotExist:
            return Response(
                {"msg": "Issuer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
