#!/bin/sh

/bin/sh /home/motion/scripts/gpio_blink.sh &
/usr/bin/node /home/motion/scripts/twitter_post.js "$1" &
/usr/bin/node /home/motion/scripts/xively_post.js start &
