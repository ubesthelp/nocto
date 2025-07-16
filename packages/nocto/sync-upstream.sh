#!/bin/bash
UPSTREAM_DIR=./upstream/packages/admin/dashboard/src
TARGET_DIR=./src

SYNC_DIRS=("assets" "hooks" "i18n" "lib" "providers" "routes")

for dir in "${SYNC_DIRS[@]}"; do
  rsync -av --delete "$UPSTREAM_DIR/$dir/" "$TARGET_DIR/$dir/"
done

echo "Sync complete. Check git diff for any changes."
