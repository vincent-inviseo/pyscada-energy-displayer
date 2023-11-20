# PyScada Energy Displayer Extension

This PyScada plugin allow PyScada application to display an energy counter or co2 estimate

## How that works

This plugin do diffrence of indexes between end date selected and start date selected. That same functionment. it able to estimate co2 rejected using enegy factor

for energy displayer `energy consummation` mode
```
value_will_display = index_date_end - index_date_start
```

for energy displayer `co2 estimate` mode
```
consummation = index_date_end - index_date_start
value_will_display = consummation * energy_factor

```

## Installation

First, download this projet using git
```
# Download plugin
git clone git@github.com:vincent-inviseo/pyscada-energy-displayer.git
# Activate virutal env PyScada
source /home/pyscada/.venv/bin/activate
# Install plugin
sudo -u pyscada -E env PATH=${PATH} pip3 install -e ./pyscada-energy-displayer
# apply migrations
python3 /var/www/pyscada/PyScadaServer/manage.py migrate
# copy static files
sudo -u pyscada -E env PATH=${PATH} python3 /var/www/pyscada/PyScadaServer/manage.py collectstatic
```

After restart gunicorn
```
systemctl restart gunicorn
```

## How to use

- Access to PyScada administration
- Click on add button on Energy displayers section
- Fill fields :
    - Title is title of your energy displayer widget
    - Variable is the variable will be compute that will do
    - "Show pedagogic consommation display" is a pedagogic show for CO2 estimation will compare your CO2 estimation to go-back in plane between Paris and New York
    - "display type" change display mode
        - Energy consummation show energy consummed in kWh
        - CO2 estimation show an estimation about CO2 rejected
    - isVisible can toggle show/hide widget
    - Energy type is a relation with this widget. That allow to link this widget with an energy which take a name and a GES emmission coefficiant
- Go to "Widget" section and complet content field with your new content (energy displayer)
- Save


## Lisence

The project is licensed under the _GNU AFFERO GENERAL PUBLIC LICENSE Version 3 (AGPLv3)_.
