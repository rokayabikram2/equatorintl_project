

from .serializers import *
from rest_framework import viewsets
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from django.core.paginator import Paginator
# ViewSets define the view behavior.


class GlobalViewSet(viewsets.ModelViewSet):
    queryset = GlobalSettings.objects.all() 
    serializer_class = GlobalSettingsSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication)




class GlobalSettings(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """
    def get_object(self, pk):
        try:
            return GlobalSettings.objects.get(pk=pk)
        except GlobalSettings.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = GlobalSettingsSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = GlobalSettingsSerializer(snippet,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self,request, format=None):
        serializer = GlobalSettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class NavigationViewSet(viewsets.ModelViewSet):
    queryset = Navigation.objects.all()
    serializer_class = NavigationSerializer

class Navigation(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """
    def get_object(self, pk):
        try:
            return Navigation.objects.get(pk=pk)
        except Navigation.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = NavigationSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = NavigationSerializer(snippet,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self,request, format=None):
        serializer = NavigationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class NavigationViewSet(viewsets.ModelViewSet):
#     queryset = Navigation.objects.all()
#     serializer_class = NavigationSerializer
    


# class Navigation(APIView):
#     """
#     Retrieve, update or delete a snippet instance.

#     """
#     def get_object(self, pk):
#         try:
#             return Navigation.objects.get(pk=pk)
#         except Navigation.DoesNotExists:
#             raise Http404

#     def get(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         serializer = NavigationSerializer(snippet)
#         return Response(serializer.data)

#     def put(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         serializer = NavigationSerializer(snippet,data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         snippet.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#     def post(self,request, format=None):
#         serializer = NavigationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = ContactUS.objects.all()
    serializer_class = ContactSerializer

class contactUS(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """
    def get_object(self, pk):
        try:
            return ContactUS.objects.get(pk=pk)
        except ContactUS.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ContactSerializer(snippet)
        return Response(serializer.data)
    
    
    
class ApplyViewSet(viewsets.ModelViewSet):
    queryset = Apply.objects.all()
    serializer_class = ApplySerializer

class apply(APIView):
    """
    Retrieve, update or delete a snippet instance.

    """
    def get_object(self, pk):
        try:
            return Apply.objects.get(pk=pk)
        except Apply.DoesNotExists:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ApplySerializer(snippet)
        return Response(serializer.data)
    
# views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from sendgrid import SendGridAPIClient
# from sendgrid.helpers.mail import Mail
# import os

# @api_view(['POST'])
# def send_email(request):
#     data = request.data

#     subject = data.get('subject', 'Contact Form Submission')
#     sender_email = data.get('email')
#     message = data.get('message')

#     message_body = f"From: {sender_email}\n\n{message}"

#     message = Mail(
#         from_email=sender_email,
#         to_emails='recipient@example.com',  # Replace with your recipient's email address
#         subject=subject,
#         html_content=message_body,
#     )

#     try:
#         sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
#         response = sg.send(message)
#         return Response({'message': 'Email sent successfully'})
#     except Exception as e:
#         return Response({'message': 'Error sending email'}, status=400)

    
# def get_paginated_data(request, queryset, items_per_page):
#     paginator = Paginator(queryset, items_per_page)
#     page = request.GET.get('page')
#     paginated_data = paginator.get_page(page)
#     return paginated_data

# from .models import GlobalSettings
# from .serializers import GlobalSettingsSerializer
# from django.http  import JsonResponse
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework  import status

# @api_view(['GET','POST'])
# def globalSettings_list(request,pk):
#     try:
#         globs = GlobalSettings.objects.get(pk=pk)
        
#     except GlobalSettings.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
        
#     # get all globalSettings
#     if request.method == 'GET':
#         globs = GlobalSettings.objects.all()
#         serializer = GlobalSettingsSerializer(globs, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = GlobalSettingsSerializer(data =request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

        
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
    
    
    