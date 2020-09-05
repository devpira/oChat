#!/bin/bash

CURRENT_DIR=`pwd`

# Generate the Python libs
python -m grpc_tools.protoc -I ${CURRENT_DIR}/proto_lib/proto \
        --python_out=${CURRENT_DIR}/proto_lib/libs/python \
        --grpc_python_out=${CURRENT_DIR}/proto_lib/libs/python \
        ${CURRENT_DIR}/proto_lib/proto/*.proto

sed -i.old -E "s/^import (.+_pb2.*)/from . import \1/g" ${CURRENT_DIR}/proto_lib/libs/python/*_pb2*.py

# In the future we'll add in the generation of the PHP and Go libs too.

cd ${CURRENT_DIR}