import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from .models import Article
from django import forms


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'description']

class ArticleType(DjangoObjectType):
    class Meta:
        model = Article
        fields = '__all__'

# Define an input object type for the dynamic fields
class UpdateArticleInput(graphene.InputObjectType):
    id = graphene.ID(required=True)
    title = graphene.String()
    description = graphene.String()
    content = graphene.String()


class CreateArticleInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    description = graphene.String(required=True)
    content = graphene.String()


class CreateArticle(graphene.Mutation):
    class Arguments:
        input = CreateArticleInput(required=True)
    
    article = graphene.Field(ArticleType)

    def mutate(root, info, input):
        try :
            article = Article()

            for k, v in input.items():
                setattr(article, k, v)
        
            article.save()
            return CreateArticle(article=article)
        except Exception as e:
            raise GraphQLError(f'Failed to create article: {str(e)}')
    

class UpdateArticle(graphene.Mutation):
    class Arguments:
        input = UpdateArticleInput(required=True)

    article = graphene.Field(ArticleType)

    def mutate(root, info, input):
        form = ArticleForm(input)

        if form.is_valid():
            try:
                article = Article.objects.get(pk=input.id)   

                for k, v in input.items():
                    setattr(article, k, v)

                article.save() 
                return UpdateArticle(article=article)
            except Article.DoesNotExist:
                raise GraphQLError("Article not found")
            except Exception as e:
                raise GraphQLError(f'Failed to update article: {str(e)}')
        else:
            raise GraphQLError("Validation failed: " +str(form.errors))
    

class DeleteArticle(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
         
    article = graphene.Field(ArticleType)

    def mutate(root, info, id):
        try:
            article = Article.objects.get(pk=id)
            article.delete()
            return DeleteArticle(article=article)
        except Article.DoesNotExist:
            raise GraphQLError("Article not found")
        except Exception as e:
            raise GraphQLError(f'Failed to delete article: {str(e)}')

    
class Query(graphene.ObjectType):
    all_articles = graphene.List(ArticleType)
    article_by_id = graphene.Field(ArticleType, id=graphene.Int(required=True)) 

    def resolve_all_articles(root, info):
        return Article.objects.all()
    
    def resolve_article_by_id(root, info, id):
        try:
            return Article.objects.get(pk=id)
        except Article.DoesNotExist:
             raise GraphQLError("Article not found")


class Mutations(graphene.ObjectType):
    createArticle = CreateArticle.Field()
    updateArticle = UpdateArticle.Field()
    deleteArticle = DeleteArticle.Field()

schema = graphene.Schema(query=Query, mutation=Mutations)