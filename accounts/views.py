import jwt
from django.shortcuts import render
from django.contrib.auth import get_user_model, login, user_logged_in
from rest_framework import permissions, status, exceptions
from rest_framework.authentication import SessionAuthentication, BaseAuthentication, get_authorization_header
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializers import UserCreateSerializer
from socialMediaSite.settings import SECRET_KEY

# Create your views here.
User = get_user_model()


class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserCreateSerializer


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()

    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'Error': "Email does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        if user is not None and user.check_password(password):
            # login(request, user)
            payload = {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
            data = {
                "token": jwt.encode(payload, SECRET_KEY, algorithm="HS256").decode("utf-8"),
                "id": user.id
            }
            # print(">> ", user.is_authenticated)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"Error:": "Incorrect email/password"}, status=status.HTTP_403_FORBIDDEN)
