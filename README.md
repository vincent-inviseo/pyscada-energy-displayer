# PyScada Energy Displayer Extension

This PyScada plugin allow PyScada application to display an energy counter

## How that works

This plugin do diffrence between values in end date selected and start date selected

```
value_will_display = index_date_end - index_date_start
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
- Fill title field and complete variable will be count
- Go to "Widget" section and complet content field with your new content (energy displayer)
- Save


## Lisence

The project is licensed under the _GNU AFFERO GENERAL PUBLIC LICENSE Version 3 (AGPLv3)_.
