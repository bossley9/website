#!/usr/bin/env sh
# compress html files for webserver optimization

cd $1

minify -v --match ".*.html" -r . -o .

for file in $(find . -type f -regex ".*\.html"); do
  echo gzipping $file
  gzip -9k $file
done
