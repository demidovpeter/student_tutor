from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # ...
    # path("graphql", PrivateGraphQLView.as_view(graphiql=True)),
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
