from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


# Create your models here.
class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to="images/", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    numOfLikes = models.IntegerField(blank=True, default=0)
    numOfComments = models.IntegerField(blank=True, default=0)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ["-timestamp", "-pk"]


class Like(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to="images/", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ["-timestamp"]


def save_comment(sender, instance, created, **kwargs):
    if created:
        comment = instance
        post = comment.post
        post.comment_count = post.comments.count()
        post.save(force_update=True)


models.signals.post_save.connect(save_comment, sender=Comment)
