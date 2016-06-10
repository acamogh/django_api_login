from rest_framework import serializers
from app.themes.models import Theme
# from app.user_themes.models import User_theme

class ThemeSerializer(serializers.ModelSerializer):
    # purchased = serializers.SerializerMethodField('get_is_purchased')
    #
    # def get_is_purchased(self, theme):
    #     if self.context:
    #         user = self.context['user']
    #         is_purchased = False
    #         user_theme = User_theme.objects.filter(profile=user, theme=theme)
    #         if user_theme:
    #             is_purchased = True
    #         return is_purchased
    #     else:
    #         return None
    country_names=serializers.SerializerMethodField('country_name')

    def country_name(self,theme):
        fire='fire'
        return fire


    class Meta:
        model = Theme
        fields = ('country_names','theme_name', 'theme_image', 'slug_theme')
