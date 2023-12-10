You have to set up postgres locally:
$ podman run --name 'informer_db' -e POSTGRES_USER=informer -e POSTGRES_PASSWORD=pasw -d -p 5432:5432 postgres

(Instead of podman you should able to use docker, but that is not tested)

Start/stop the db:
$ podman stop informer_db
$ podman start informer_db

Connect to db using command line:
$ psql -h localhost -p 5432 -U informer
(The password is "pasw")

To build the project do:
$ POSTGRES_PRISMA_URL=postgresql://informer:pasw@localhost:5432/informer npm run build 

To run the project do:
$ POSTGRES_PRISMA_URL=postgresql://informer:pasw@localhost:5432/informer npm run dev

etc..


