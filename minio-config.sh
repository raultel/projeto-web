#!/bin/bash
set -e

MINIO_ALIAS="local"
MINIO_URL="http://localhost:9000"
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"
BUCKET_NAME="devweb"

mcli alias set $MINIO_ALIAS $MINIO_URL $MINIO_ACCESS_KEY $MINIO_SECRET_KEY

# Create bucket if missing
if ! mcli ls $MINIO_ALIAS/$BUCKET_NAME >/dev/null 2>&1; then
    mcli mb $MINIO_ALIAS/$BUCKET_NAME
fi

mcli anonymous set public $MINIO_ALIAS/$BUCKET_NAME
