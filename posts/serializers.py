from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Post
        fields = ["id", "owner", "content", "timestamp"]


class PostCreateSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField();

    class Meta:
        model = Post
        fields = ["owner", "content", "timestamp"]