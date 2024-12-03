from rest_framework import routers
from posts.api import viewsets

#Routas
router = routers.DefaultRouter()

router.register('marcas', viewsets.MarcaViewSet)
router.register('categorias', viewsets.CategoriaViewSet)
router.register('produtos', viewsets.ProdutoViewSet)