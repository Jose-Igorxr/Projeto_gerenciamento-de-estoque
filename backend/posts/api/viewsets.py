from rest_framework import viewsets, permissions
from posts import models
from rest_framework.filters import SearchFilter
from rest_framework.filters import OrderingFilter
from posts.api import serializers

#ViewSets
class MarcaViewSet(viewsets.ModelViewSet):
  queryset = models.Marca.objects.all()
  serializer_class = serializers.MarcaSerializer
  permission_classes = [permissions.IsAuthenticated]

class CategoriaViewSet(viewsets.ModelViewSet):
  queryset = models.Categoria.objects.all()
  serializer_class = serializers.CategoriaSerializer
  permission_classes = [permissions.IsAuthenticated]

class ProdutoViewSet(viewsets.ModelViewSet):
  queryset = models.Produto.objects.all()
  serializer_class = serializers.ProdutoSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = [SearchFilter, OrderingFilter]
  search_fields = ['nome']
  ordering_fields = ['nome', 'preco']