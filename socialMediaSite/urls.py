"""socialMediaSite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_view
from django.urls import path, include
from accounts.views import UserCreateView, LoginView
from posts.views import (
    PostCreateView,
    PostDeleteView,
    PostEditView,
    PostListView,
    GetUsersPostsView,
    CommentCreateView,
    GetPostsCommentsView,
    LikeView
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("register/", UserCreateView.as_view(), name="sign-up"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", auth_view.LogoutView.as_view(), name="logout"), 
    path("createPost/", PostCreateView.as_view(), name="create-post"),
    path("deletePost/<int:pk>", PostDeleteView.as_view(), name="delete-post"),
    path("editPost/<int:pk>", PostEditView.as_view(), name="edit-post"),
    path("getPosts/<str:username>", GetUsersPostsView.as_view(), name="get-posts-from-user"),
    path("allPosts/", PostListView.as_view(), name="all-posts"),
    path("createComment/", CommentCreateView.as_view(), name="create-comment"),
    path("getComments/", GetPostsCommentsView.as_view(), name="get-comments-of-a-post"),
    path("like/", LikeView.as_view(), name="like")
]
