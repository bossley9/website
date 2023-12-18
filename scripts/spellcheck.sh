#!/usr/bin/env sh
# spell check staged files

for file in $(git diff --name-only --staged); do
  aspell check $file
  rm -f ${file}.bak
done
