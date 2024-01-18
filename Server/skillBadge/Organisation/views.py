# badge_assignment/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Badge_Assignments, Badges
from .Serializers import BadgeAssignmentSerializer, BadgesSerializer


class BadgeAssignmentAPIView(APIView):
    def post(self, request):
        user = request.user

        if user.is_authenticated:
            # if the user is not an org then we deny access
            if user.get("is_org") == False:
                return Response(
                    {"msg": "Access Denied"}, status=status.HTTP_403_FORBIDDEN
                )

            # checking if the particular badge is already assigned to the user by the org
            badge_assigned = Badge_Assignments.objects.filter(
                badge_id=user.get("id"), recipient_id=request.data.get("recipient_id")
            )
            if badge_assigned:
                return Response(
                    {"msg": "Badge is already assigned to the user"},
                    status=status.HTTP_409_CONFLICT,
                )

            serializer = BadgeAssignmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )


class BadgeDetailsAPIView(APIView):
    # create a badge
    def post(self, request):
        data = request.data
        serial = BadgesSerializer(data=data)
        if serial.is_valid():
            serial.save()
            return Response({"data": serial.data})
        return Response({"data": "invalid data"})

    # fetch badge data with the users it is assigned to
    def get(self, request):
        badge_id = request.query_params.get("badge_id")
        if badge_id:
            valid_badge = Badges.objects.get(pk=badge_id)
            if valid_badge:
                # assigned_users = Badge_Assignments.objects.get()
                # if assigned_users:
                #     Assignedserializer = BadgeAssignmentSerializer(
                #         assigned_users, many=True
                #     )
                Badgeserializer = BadgesSerializer(valid_badge)
                return Response(
                    {
                        "Badge": Badgeserializer.data,
                        # "Assigned_Users": assigned_users
                        # if Assignedserializer.data
                        # else "None",
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"msg": "Not a vaild badge"}, status=status.HTTP_404_NOT_FOUND
            )
        all_badges = Badges.objects.all()
        if all_badges:
            serializer = BadgesSerializer(all_badges, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"msg": "No badges created yet"}, status=status.HTTP_200_OK)

    # delete a badge
    def delete(self, request):
        badge_id = request.query_params.get("badge_id")
        if badge_id:
            badge_to_delete = Badges.objects.get(pk=badge_id)
            badge_to_delete.delete()
            return Response({"msg": "Badge Deleted"}, status=status.HTTP_200_OK)

    # update a badge
    def put(self, request):
        data = request.data
        serial = BadgesSerializer(data=data)
        if serial.is_valid():
            serial.save()
            return Response({"data": serial.data})
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)


# class fetchUserDetailsAPIView(APIView):
#     def get(self,request):
#         recipient_id = request.query_params.get("recipient_id")
#         if recipient_id:
#             assigned_badges = Badge_Assignments.objects.get(pk=recipient_id)
#             serializer = BadgeAssignmentSerializer(assigned_badges, many=True)
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         assigned_users = Badge_Assignments.
