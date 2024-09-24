### Servicio REST simple

    - NodeJS
    - Express
    - MongoDB
    - Firebase
---

#### Docker

    > docker build -t servicio_rest .
    > docker run --rm -it -p 5000:4000 --env-file .env --name app servicio_rest