from rest_framework import serializers
from api.models import Category, Product, UserInfo, Cart
from django.contrib.auth.models import User


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    imageUrl = serializers.CharField()

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'category', 'name', 'description', 'imageUrl')
        read_only_fields = ('id',)


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('__all__')


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("__all__")