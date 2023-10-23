import graphene
from graphene_django import DjangoObjectType
from .models import Article

class ArticleType(DjangoObjectType):
    class Meta:
        model = Article
        fields = '__all__'


class CreateArticle(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
    
    article = graphene.Field(ArticleType)

    def mutate(root, info, title, content):
        # define the article object and save to db
        article = Article(title=title, content=content)
        article.save()
        return CreateArticle(article=article)
    

class UpdateArticle(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        content = graphene.String()

    article = graphene.Field(ArticleType)

    def mutate(root, info, id, **kwargs):
        article = Article.objects.get(pk=id)

        for k, v in kwargs.items():
            setattr(article, k, v)

        article.save() 
        return UpdateArticle(article=article)
    

class DeleteArticle(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
         
    article = graphene.Field(ArticleType)

    def mutate(root, info, id):
        article = Article.objects.get(pk=id)
        article.delete()
        return DeleteArticle(article=article)

    
class Query(graphene.ObjectType):
    all_articles = graphene.List(ArticleType)
    article_by_id = graphene.Field(ArticleType, id=graphene.Int(required=True)) 

    def resolve_all_articles(root, info):
        return Article.objects.all()
    
    def resolve_article_by_id(root, info, id):
        try:
            return Article.objects.get(pk=id)
        except Article.DoesNotExist:
            return None


class Mutations(graphene.ObjectType):
    createArticle = CreateArticle.Field()
    updateArticle = UpdateArticle.Field()
    deleteArticle = DeleteArticle.Field()

schema = graphene.Schema(query=Query, mutation=Mutations)