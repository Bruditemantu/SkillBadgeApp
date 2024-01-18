from django.contrib import admin
from Recipient.models import *

# Register your models here.
class RecipientsAdmin(admin.ModelAdmin):
    list_display=("name","email")
    
admin.site.register(Recipients,RecipientsAdmin)    