# Blogs DB

Application to manage blogs registration using a Postgres Database.

## Docker Command for Postgres DB

docker run \
--name blog_postgres_db \
-e POSTGRES_PASSWORD=ov58gt6r76dfh7id8ERlSPErmURI \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v ./db:/var/lib/postgresql/data \
-p 5432:5432 postgres

docker run --hostname=26ad05d7c0ce --env=POSTGRES_PASSWORD=ov58gt6r76dfh7id8ER --env=PGDATA=C:/Program Files/Git/var/lib/postgresql/data/pgdata --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/17/bin --env=GOSU_VERSION=1.17 --env=LANG=en_US.utf8 --env=PG_MAJOR=17 --env=PG_VERSION=17.5-1.pgdg120+1 --volume=C:\Users\gusta\Desktop\node_projects\blogs-db\db;C:\Program Files\Git\var\lib\postgresql\data --volume=/var/lib/postgresql/data --network=bridge -p 5432:5432 --restart=no --runtime=runc -d postgres
