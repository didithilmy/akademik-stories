#!/bin/sh

python /code/manage.py migrate
python /code/manage.py collectstatic --noinput
gunicorn --pythonpath backend backend.wsgi --bind 0.0.0.0:8000
