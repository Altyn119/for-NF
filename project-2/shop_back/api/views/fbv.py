from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from api.models import Category, Product, Cart
from api.serializers import ProductSerializer, CartSerializer


@api_view(['GET'])
def product_by_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def product_list(request):
    if request.method == "GET":
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def cart(request, user_id):
    if request.method == "GET":
        cart = Cart.objects.get(user_id = user_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    user_id = request.user.id
    return JsonResponse({'user_id': user_id})


@api_view(['DELETE','GET'])
def remove_from_carts(request, product_id):
    user_id = request.user.id
    try:
        cart = Cart.objects.get(user_id=user_id)
        cart.products.remove(product_id)
        cart.save()
        return Response({'message': f'Product item {product_id} has been removed from carts.'})
    except Cart.DoesNotExist:
        return Response({'error': 'No cart found for this user.'}, status=status.HTTP_404_NOT_FOUND)
    except ValueError:
        return Response({'error': 'The specified product ID is invalid.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST','GET'])
def add_to_carts(request, product_id):
    user_id = request.user.id
    try:
        cart = Cart.objects.get(user_id=user_id)
        cart.products.add(product_id)
        cart.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except Cart.DoesNotExist:
        return Response({'error': 'No cart found for this user.'}, status=status.HTTP_404_NOT_FOUND)
    except ValueError:
        return Response({'error': 'The specified product ID is invalid.'}, status=status.HTTP_400_BAD_REQUEST)