# -*- coding: utf-8 -*-
from uuid import uuid4
from pyscada.hmi.models import WidgetContentModel
from pyscada.models import Variable
from django.conf import settings
STATIC_URL = str(settings.STATIC_URL) if hasattr(settings, "STATIC_URL") else "static"

from django.template.loader import get_template
from django.db import models


display_type_choice = (
    ('Energy consummation', 'Energy consummation'),
    ('CO2 estimation', 'CO2 estimation')
)


class EnergyType(models.Model):
    
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, default="")
    GESCoeffienciant = models.FloatField(verbose_name="Indicate co2 factor about your energy (default -> gaz: 0.443, electricity: 0.068)", blank=True, null=True)
    
    def __str__(self):
        return self.title


class EnergyDisplayer(WidgetContentModel):

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=400, default="")
    variable = models.ForeignKey(Variable, verbose_name=("Variable"), on_delete=models.CASCADE)
    showPedagogicConsommation = models.BooleanField(verbose_name="Show pedagogic consommation display", default=False)
    displayType = models.CharField(verbose_name="Display type", max_length=50, choices=display_type_choice, default=display_type_choice[0])
    isVisible = models.BooleanField(verbose_name="Visible ?", default=True)
    energyType = models.ForeignKey(EnergyType ,verbose_name="Choice your energy type variable related", max_length=50, blank=True, null=True, on_delete=models.DO_NOTHING)
    

    def __str__(self):
        return self.title
    

    def gen_html(self, **kwargs):
        """
        : return main template for energy display object
        """
        # energy displayer template is templates folder
        main_template = get_template("energy-displayer.html")
        main_content = None
        main_content = main_template.render(
            dict(
                uuid=uuid4().hex,
                item=self,
            )
        )
        opts = dict()
        opts["flot"] = False
        opts["show_daterangepicker"] = True
        opts["show_timeline"] = True
        opts["object_config_list"] = set()
        opts["javascript_files_list"] = [STATIC_URL + "pyscada/js/energy-displayer.js",]
        opts["css_files_list"] = [STATIC_URL + "pyscada/css/energy-displayer.css",]

        return main_content, None, opts