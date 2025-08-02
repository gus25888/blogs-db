# Blogs DB

Application to manage blogs registration using a Postgres Database.

## Get Started

```sh
npm clone https://github.com/gus25888/blogs-db
cd blogs-db
npm install
```

Then create a `.env` file like the example:

```.env
DATABASE_URL=XXXXXXXXXXX
PORT=xxxx
SECRET=XXXXXXXXXXXXXXXXXXXX
```

## Docker Command for Postgres DB

In case you want to run a local instance of PostgreSQL, you can use these commands to get started:

```sh
cd blogs-db
mkdir db
docker run \
--name blog_postgres_db \
-e POSTGRES_PASSWORD=XXXXXXXXXXXXXXXXXXXXXXX \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v ./db:/var/lib/postgresql/data \
-p 5432:5432 postgres
```
