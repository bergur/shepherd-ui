FROM hasura/graphql-engine:v1.3.1.cli-migrations-v2

COPY migrations /hasura-migrations

ARG SHEPHERD_METADATA
LABEL shepherd.metadata=${SHEPHERD_METADATA}
