#!/bin/sh

python /code/manage.py migrate
python /code/manage.py collectstatic --noinput
python /code/manage.py rqworker &
gunicorn --pythonpath backend backend.wsgi --bind 0.0.0.0:8000
