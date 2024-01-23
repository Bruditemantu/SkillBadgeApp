# badge_assignment/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Badge_Assignment, Badges
from .Serializers import *


class BadgeAssignmentAPIView(APIView):
    def post(self, request):
        # user = request.user

        # if user.is_authenticated:
        #     # if the user is not an org then we deny access
        #     if user.get("is_org") == False:
        #         return Response(
        #             {"msg": "Access Denied"}, status=status.HTTP_403_FORBIDDEN
        #         )

        # checking if the particular badge is already assigned to the user by the org
        badge_assigned = Badge_Assignment.objects.filter(
            badge_id=request.data.get("badge_id"),
            recipient_id=request.data.get("recipient"),
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

    # return Response(
    #     {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
    # )


class BadgeDetailsAPIView(APIView):
    # create a badge
    def post(self, request):
        badge_data = request.data
        serial = BadgesSerializer(data=badge_data)
        if serial.is_valid():
            serial.save()
            return Response(
                {"status": "Badge Created!", "data": serial.data},
                status=status.HTTP_201_CREATED,
            )
        return Response({"msg": serial.errors}, status=status.HTTP_400_BAD_REQUEST)

    # fetch badge data with the users it is assigned to
    def get(self, request):
        badge_id = request.query_params.get("badge_id")
        if badge_id:
            valid_badge = Badges.objects.get(pk=badge_id)
            if valid_badge:
                Badgeserializer = GetBadgesSerializer(valid_badge)
                return Response(
                    {
                        "msg": "Badge Found, Retrival Success",
                        "data": Badgeserializer.data,
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
            valid_badge = Badges.objects.get(pk=badge_id)
            if valid_badge:
                badge_to_delete = Badges.objects.get(pk=badge_id)
                badge_to_delete.delete()
                return Response({"msg": "Badge Deleted"}, status=status.HTTP_200_OK)
            return Response(
                {"msg": "Not a vaild badge"}, status=status.HTTP_404_NOT_FOUND
            )

    # update a badge
    def put(self, request):
        badge_id = request.query_params.get("badge_id")
        if badge_id:
            valid_badge = Badges.objects.get(pk=badge_id)
            if valid_badge:
                updatedSerializer = BadgesSerializer(valid_badge, data=request.data)
                if updatedSerializer.is_valid():
                    updatedSerializer.save()
                    return Response(
                        {
                            "status": "Badge Updated Successfully",
                            "data": updatedSerializer.data,
                        },
                        status=status.HTTP_200_OK,
                    )
                return Response(
                    {"err": updatedSerializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        # data = request.data
        # serial = BadgesSerializer(data=data)
        # if serial.is_valid():
        #     serial.save()
        #     return Response({"data": serial.data})
        # return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
