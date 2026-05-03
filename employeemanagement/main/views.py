from django.shortcuts import render
from django.http import HttpResponse
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.viewsets import ModelViewSet
from .employeepagination import EmployeePagination
from rest_framework.decorators import action
from rest_framework.response import Response
from collections import Counter
import numpy as np

# Create your views here.
class EmployeeViewset(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    pagination_class = EmployeePagination

    @action(detail=False,methods=["get"])
    def stats(self,request):
        employee_salaries = list(Employee.objects.values_list('salary',flat=True))
        if not employee_salaries:
            return Response({
                "mean" : 0,
                "mode" : 0,
                "median" : 0,
                "std" : 0,
            })
        
        mean = np.mean(employee_salaries)
        median = np.median(employee_salaries)
        mode = Counter(employee_salaries).most_common(1)[0][0]
        std = np.std(employee_salaries)

        return Response({
            "mean" : f"{mean:.2f}",
            "mode" : f"{mode:.2f}",
            "median" : f"{median:.2f}",
            "std" : f"{std:.2f}",
        })

