from django.db import models

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=100, null= False)
    designation = models.ForeignKey(Department,on_delete=models.CASCADE)
    date_of_joining = models.DateTimeField(auto_now=False)
    total_no_of_success = models.IntegerField(blank=False)
    total_no_of_failure = models.IntegerField(blank=False)
    attendence = models.IntegerField(blank = False)
    salary = models.IntegerField(blank=False)

    def __str__(self):
        return self.name
