# questions/models.py
from django.db import models


class BrakeQuestion(models.Model):
    response = models.BooleanField()
