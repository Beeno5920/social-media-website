from django.shortcuts import render
from django.shortcuts import get_list_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView
)
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer


# Create your views here.
class PostCreateView(CreateAPIView):
    serializer_class = PostCreateSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDeleteView(DestroyAPIView):
    lookup_field = "pk"
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostEditView(RetrieveUpdateAPIView):
    class IsOwner(BasePermission):
        message = 'You must be the owner of the post to perform this action'

        def has_object_permission(self, request, view, obj):
            return obj.owner == request.user

    lookup_field = 'pk'
    queryset = Post.objects.all()
    permission_classes = [IsOwner]
    serializer_class = PostCreateSerializer


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetailView(RetrieveAPIView):
    lookup_field = 'pk'
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class GetUsersPostsView(APIView):
    def get(self, request, username):
        posts = get_list_or_404(Post, owner__username=username)
        posts_data = PostSerializer(posts, many=True)

        return Response(posts_data.data, status=status.HTTP_200_OK)
