# Blogs DB

Application to manage blogs registration using a Postgres Database.

## Docker Command for Postgres DB

docker run \
--name blog_postgres_db \
-e POSTGRES_PASSWORD=XXXXXXXXXXXXXXXXXXXXXXX \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v ./db:/var/lib/postgresql/data \
-p 5432:5432 postgres
