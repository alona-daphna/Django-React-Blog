from django.urls import path
from . import views
from graphene_django.views import GraphQLView

urlpatterns = [
    path('', views.articles),
    path('<int:id>/', views.article_detail),
    path('graphql', GraphQLView.as_view(graphiql=True))
]