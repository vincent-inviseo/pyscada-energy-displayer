from pyscada.admin import admin_site
from .models import EnergyDisplayer, EnergyType

admin_site.register(EnergyDisplayer)
admin_site.register(EnergyType)