from django.contrib import admin
from posts import models

admin.site.register(models.Marca)
admin.site.register(models.Categoria)
admin.site.register(models.Produto)