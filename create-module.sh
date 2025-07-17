#!/bin/bash

# Check if module name is provided
if [ -z "$1" ]; then
  echo "❌ Vui lòng cung cấp tên module. Ví dụ: ./create-module.sh activities"
  exit 1
fi

# Lowercase module name
MODULE_NAME=$(echo "$1" | tr '[:upper:]' '[:lower:]')
MODULE_PATH="src/modules/$MODULE_NAME"

# Generate module, controller, service using Nest CLI
nest g module modules/$MODULE_NAME
nest g controller modules/$MODULE_NAME --no-spec
nest g service modules/$MODULE_NAME --no-spec

# Create subfolders
mkdir -p $MODULE_PATH/{dto,config,strategies}

# Create placeholder files
touch $MODULE_PATH/dto/example.dto.ts
touch $MODULE_PATH/config/example.config.ts
touch $MODULE_PATH/strategies/example.strategy.ts

echo "✅ Đã tạo module $MODULE_NAME đầy đủ ở $MODULE_PATH"
