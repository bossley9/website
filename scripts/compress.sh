#!/usr/bin/env sh
# compress html files for webserver optimization

for file in $(find "$1" -type f -name *.html); do
  gzip -9k $file
done
