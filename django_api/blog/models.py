from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    # thumbnail
    description = models.CharField(max_length=400)
    createdAt = models.DateTimeField(auto_now_add=True)
    lastEdited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
