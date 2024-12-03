from django.db import models
from django.utils import timezone

# MODELOS
class Marca(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField(blank=True)

class Categoria(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField()
    
class Produto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, on_delete=models.SET_NULL, null=True)
    imagem = models.ImageField(upload_to='produtos/')