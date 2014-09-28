#!/bin/sh

# This is a blink-type script for Edison D7 pin

# This rail powers the level shifters for the digital Arduino pins
if [ ! -d /sys/class/gpio/gpio214 ]; then echo -n "214" > /sys/class/gpio/export; fi
echo -n "out" > /sys/class/gpio/gpio214/direction
echo -n "1" > /sys/class/gpio/gpio214/value

# pull up/down resistor, level shifter direction, and native GPIO, respectively
if [ ! -d /sys/class/gpio/gpio223 ]; then echo -n "223" > /sys/class/gpio/export; fi
if [ ! -d /sys/class/gpio/gpio255 ]; then echo -n "255" > /sys/class/gpio/export; fi
if [ ! -d /sys/class/gpio/gpio48 ]; then echo -n "48" > /sys/class/gpio/export; fi

# Make sure the pull up/down resistor is disabled
echo -n "in" > /sys/class/gpio/gpio223/direction

# Set the level shifter to transmit from the native GPIO to DIG7 (A to B in the schematic) by outputting a high voltage
echo -n "out" > /sys/class/gpio/gpio255/direction
echo -n "1" > /sys/class/gpio/gpio255/value

# Set the native GPIO to output
echo -n "out" > /sys/class/gpio/gpio48/direction

for i in 1 2 3; do
    echo "Beep $i"
    echo -n "1" > /sys/class/gpio/gpio48/value
    usleep 500000
    echo -n "0" > /sys/class/gpio/gpio48/value
    usleep 100000
done
