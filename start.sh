#!/bin/bash

minio server ./minio_data &
MINIO_PID=$!
node index.js
kill $MINIO_PID
