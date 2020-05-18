from django.db import models


# Create your models here.
class User(models.Model):
    userID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    profileImage = models.FileField(upload_to="profileImages/", blank=True, null=True)

    def __str__(self):
        return self.username
