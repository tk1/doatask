#!/bin/bash

echo "hi from init-db.sh"
date

# cwd is /
cd /docker-entrypoint-initdb.d
ls -la

# remove carriage returns
tr -d '\r' < .env > /tmp/.env.lf

set -o allexport
source /tmp/.env.lf
set +o allexport

# -e  Exit immediately if a command exits with a non-zero status.
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE ROLE $NEST_DB_USER WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  PASSWORD '$NEST_DB_PASSWORD';
GRANT $POSTGRES_USER TO $NEST_DB_USER;
CREATE DATABASE $NEST_DB_NAME;
GRANT ALL PRIVILEGES ON DATABASE $NEST_DB_NAME TO $NEST_DB_USER;

CREATE ROLE $LTI_DB_USER WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  PASSWORD '$LTI_DB_PASSWORD';
CREATE DATABASE $LTI_DB_NAME;
GRANT ALL PRIVILEGES ON DATABASE $LTI_DB_NAME TO $LTI_DB_USER;
EOSQL
