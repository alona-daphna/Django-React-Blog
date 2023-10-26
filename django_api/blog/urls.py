from django.urls import path
from . import views
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.articles),
    path('<int:id>/', views.article_detail),
    path('admin-login/', views.generate_token),
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True)))
]