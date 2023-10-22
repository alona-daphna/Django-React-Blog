from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    lastEdited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
