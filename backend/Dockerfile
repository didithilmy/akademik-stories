FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /code/requirements.txt
RUN pip install -r /code/requirements.txt

COPY . /code
WORKDIR /code

RUN chmod 777 /code/start.sh

EXPOSE 8000
CMD ["/code/start.sh"]
