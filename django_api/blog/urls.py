from django.urls import path
from . import views

urlpatterns = [
    path('', views.articles),
    path('<int:id>/', views.article_detail)
]