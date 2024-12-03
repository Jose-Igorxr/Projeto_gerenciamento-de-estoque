# from django.http.request import HttpRequest as HttpRequest
# from django.http.response import HttpResponse
# from django.views.generic import CreateView, DetailView, UpdateView, DeleteView, ListView
# from django.contrib.auth.mixins import LoginRequiredMixin
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.views import LoginView, LogoutView

# from django.urls import reverse_lazy
# from django.shortcuts import redirect

# from .models import Post

# class PostCreateView(CreateView):
#   model = Post
#   fields = ['title', 'content', 'image']
#   template_name = 'posts/post_create.html'
#   success_url = '/posts/'


# class PostDetailView(DetailView):
#   model = Post
#   template_name = 'posts/post_detail.html'


# class PostUpdateView(UpdateView):
#   model = Post
#   fields = ['title', 'content', 'image']
#   template_name = 'posts/post_update.html'
#   success_url = '/posts/'


# class PostDeleteView(DeleteView):
#   model = Post
#   template_name = 'posts/post_delete.html'
#   success_url = reverse_lazy('post_list')


# class PostListView(LoginRequiredMixin, ListView):
#   login_url = 'login'
#   model = Post
#   template_name = 'posts/post_list.html'
#   context_object_name = 'posts'

#   def dispatch(self, request, *args, **kwargs) -> HttpResponse:
#     if self.request.user and not self.request.user.groups.filter(name='editor'):
#             return redirect('login')
#     return super().dispatch(request, *args, **kwargs)


# class CustomLoginView(LoginView):
#   template_name = 'auth/login.html'


# class CustomLogoutView(LogoutView):
#   next_page = '/posts/'


# class CustomRegisterView(CreateView):
#   form_class = UserCreationForm
#   template_name = 'auth/register.html'
#   success_url = reverse_lazy('login')
