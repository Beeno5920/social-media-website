from .models import Post, Comment, Like
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Post
        fields = ["id", "owner", "content", "numOfLikes", "numOfComments", "timestamp"]


class PostCreateSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField();

    class Meta:
        model = Post
        fields = ["owner", "content", "timestamp"]


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ["owner", "content", "timestamp"]


class CommentCreateSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ["id", "owner", "content", "timestamp"]


class LikeSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Like
        fields = ["owner", "timestamp"]
