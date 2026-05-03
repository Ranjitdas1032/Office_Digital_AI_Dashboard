from django.urls import include, path
from .views import EmployeeViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'employee',EmployeeViewset)

urlpatterns = [
    path('api/', include(router.urls)),
]