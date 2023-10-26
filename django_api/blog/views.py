from django.http import JsonResponse
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
import jwt
import os
from dotenv import load_dotenv

@api_view(['GET'])
def articles(request):
    all_articles = Article.objects.all()
    serializer = ArticleSerializer(all_articles, many=True)
    return JsonResponse({'articles': serializer.data})


@api_view(['GET'])
def article_detail(request, id):
    print('GET')
    try:
        article = Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ArticleSerializer(article)
    return JsonResponse(serializer.data)
    
    
@api_view(['POST'])
def generate_token(request):
    data = json.loads(request.body.decode('utf-8'))
    secret = data.get('secret')

    if secret == os.getenv('ADMIN_SECRET'):
        token = jwt.encode({}, os.getenv('JWT_SECRET'), algorithm='HS256')

        return JsonResponse({'token': token})
    else:
        return JsonResponse({'error': 'Invalid secret'}, status=401)
