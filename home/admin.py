from django.contrib import admin

# Register your models here.

from . models import Location, Car, RentalTransaction


admin.site.register(Location)
admin.site.register(Car)
admin.site.register(RentalTransaction)



