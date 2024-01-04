#!/usr/bin/env sh

ffmpeg -i "$1" -vframes 1 -q:v 5 "${1%%.*}-poster.jpg"
