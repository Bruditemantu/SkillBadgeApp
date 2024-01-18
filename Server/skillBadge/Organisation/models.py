import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from Recipient.models import *
# from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Badges(models.Model):
    name=models.CharField(max_length=10,default='')
    description=models.TextField(max_length=1000,default='')
    criteria=models.CharField(max_length=10,default='')
    image_url = models.ImageField(upload_to='images',default='',null=True, blank=True)
    # issuer_id = models.ForeignKey('CustomUser',on_delete=models.CASCADE,null=True)
    date_created=models.DateField(default=timezone.now)
    expiration_durations = models.IntegerField(default=0)
    
class Badge_Assignments(models.Model):
    badge_id=models.ForeignKey(Badges,on_delete=models.CASCADE,related_name='badge_id')
    recipient_id=models.ManyToManyField(Recipients,related_name='recipient_id')    
    unique_verification_code=models.CharField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        # Generate a unique verification code using UUID
        if not self.unique_verification_code:
            self.unique_verification_code = str(uuid.uuid4())
        super().save(*args, **kwargs)         
