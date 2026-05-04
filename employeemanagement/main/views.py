from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Employee
from .serializers import employeeserializer

# Create your views here.
class employeeviewset(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = employeeserializer