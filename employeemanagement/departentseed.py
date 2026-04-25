import django
from faker import Faker
import os
from datetime import datetime,timedelta
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE','employeemanagement.settings')
django.setup()

from main.models import Department,Employee

fake = Faker()

def seed():
    jobs = ["It","Management","Developer","Senior Developer","Sales","HR"]

    for job in jobs:
        Department.objects.get_or_create(
            name = job
        )

    print("Deleting old Employee Data")
    Employee.objects.all().delete()

    department_name = Department.objects.all()

    emp = []

    for _ in range(0,1000):
        employee = Employee(
            name = fake.name(),
            designation = random.choice(department_name),
            date_of_joining = fake.date_between(start_date = '-5y',end_date = 'today'),
            total_no_of_success = random.randint(0,100),
            total_no_of_failure = random.randint(0,100),
            attendence = random.randint(100,1500),
            salary = round(random.uniform(100000,1200000),2)
        )

        emp.append(employee)


    Employee.objects.bulk_create(emp)

    print("Employess created successfully")

if __name__ == '__main__':
    seed()
