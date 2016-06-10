from django.db import models
from app.accounts.models import Account
from django.contrib.auth.models import User

class Theme(models.Model):
    theme_name = models.CharField(max_length=50)
    user = models.ForeignKey(Account)
    theme_image = models.CharField(max_length=200)
    slug_theme=models.SlugField(max_length=50,unique=True)
    def __unicode__(self):
    	return self.theme_name
