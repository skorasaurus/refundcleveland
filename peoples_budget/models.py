from django.db import models
from django.contrib.postgres.fields import JSONField
import uuid 

# Create your models here.

class BudgetSubmission(models.Model):
    # https://docs.djangoproject.com/en/3.1/ref/models/fields/#model-field-types
    submitter_email = models.EmailField()
    submitter_address = models.TextField()
    the_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    submitter_json = models.JSONField()
    
