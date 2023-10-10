# -*- coding: utf-8 -*-
from uuid import uuid4
from pyscada.hmi.models import WidgetContentModel
from pyscada.models import Variable
from django.conf import settings
STATIC_URL = str(settings.STATIC_URL) if hasattr(settings, "STATIC_URL") else "static"

from django.template.loader import get_template
from django.db import models

class EnergyDisplayer(WidgetContentModel):

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=400, default="")
    variable = models.ForeignKey(Variable, verbose_name=("Variable"), on_delete=models.CASCADE)


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
                widget_pk=self.id,
                title=self.title,
                variable=self.variable
            )
        )
        opts = dict()
        opts["flot"] = False
        opts["object_config_list"] = set()
        opts["javascript_files_list"] = [STATIC_URL + "pyscada/js/energy-displayer.js",]

        return main_content, None, opts
