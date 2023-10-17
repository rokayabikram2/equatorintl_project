from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GlobalSettings,Navigation,ContactUS,Apply
from rest_framework.authtoken.views import Token


class GlobalSettingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = GlobalSettings
    fields = "__all__"
    
  # def create(self,validated_data):
  #   return GlobalSettings.objects.create(validated_data)
  
  # def update(self,instance,validated_data):
  #    instance.SiteName=validated_data.get('SiteName',instance.SiteName)
  #    instance.SiteEmail=validated_data.get('SiteEmail',instance.SiteEmail)
  #    instance.SiteContac = validated_data.get('SiteContact',instance.SiteContact)
    
    
    
    
class NavigationSerializer(ModelSerializer):
  class Meta:
    model = Navigation
    fields = "__all__"
    
class ContactSerializer(ModelSerializer):
  class Meta:
    model = ContactUS
    fields = "__all__"
    
class ApplySerializer(ModelSerializer):
  class Meta:
    model = Apply
    fields = "__all__"
    
class UserSerializer(serializers.ModelSerializer):
      class Meta :
        model = User
        fields ="__all__"
        
        extra_kwargs = {'password':{
           'write_only':True,
           'required':True,
        }}
        
        
def create(self,validated_data):
  user = user.objects.create_user(**validated_data)
  Token.objects.create(user=user)
  return user