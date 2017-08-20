#!/bin/sh

/usr/bin/node /home/motion/scripts/azure_upload.js "$1" &
/usr/bin/node /home/motion/scripts/gdrive_upload.js "$1" &
