from api import views
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('categories/', views.CategoryListAPIView.as_view()),
    path('categories/<int:category_id>', views.CategoryDetailAPIView.as_view()),
    path('categories/<int:category_id>/products', views.product_by_category),
    path('products/', views.product_list),
    path('login/', obtain_jwt_token),
    path('cart/<int:user_id>', views.cart),
    path('add-to-cart/<int:product_id>/', views.add_to_carts),
    path('user_id/', views.get_user_id),
    path('remove-from-cart/<int:product_id>/', views.remove_from_carts),
]
