from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^accounts/', include('app.accounts.urls')),
    url(r'^api/', include('app.accounts.urls')),
    url(r'^check/', 'app.themes.views.themes_check'),
    url(r'^api-token-auth/', obtain_jwt_token),

)
