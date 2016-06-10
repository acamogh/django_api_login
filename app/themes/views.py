from django.shortcuts import render
from .models import Theme

# Create your views here.
from .models import Theme
from .serializer import ThemeSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


@api_view(['GET'])
# @authentication_classes([JSONWebTokenAuthentication, ])
def themes_check(request):
    print request
    theme = Theme.objects.filter(user=request.user)
    theme_ser=ThemeSerializer(theme, many=True)
    print (theme_ser.data)
    return Response(theme_ser.data)

# @api_view(['POST'])
# def themes_check(request):
#     theme_name =  request.data.get('theme_name')
#     slug_name = request.data.get('slug_name')
#     theme_image = request.data.get('theme_image')
#     theme = Theme.objects.create(user=request.user,theme_name='111',slug_theme='222',theme_image='333')
#     print theme
#
#     return Response('sdf')

# @api_view(['PUT'])
# def themes_check(request):
#     theme = Theme.objects.get(user=request.user,theme_name='111')
#     theme.theme_name ='helloooo'
#     theme.save()
#     return Response('dldhjhjdh')
#
# @api_view(['DELETE'])
# def themes_check(request):
#     theme = Theme.objects.filter(user=request.user,theme_name='bcn')
#     theme.delete()
#     return Response('dldhjhjdh')