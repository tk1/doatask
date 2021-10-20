docker rm -f -v doatask_postgres_1
docker rm -f -v doatask_pgadmin_1 
docker volume rm doatask_pg-data
docker image rm doatask_postgres
