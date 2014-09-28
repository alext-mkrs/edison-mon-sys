This is a copy of my `/etc` directory content related to the project.

`motion.conf` is a Motion config file I used, with all the custom scripts
being used to to react to the motion detection events.

`init.d` directory contains two utility init scripts:
1. `motion` is used to start Motion in the daemon mode and redirect the output
to a log file. By default it uses `root` user, but if you don't use the GPIO
triggering script, then I suggest you to change that to `motion` for better security;
2. `motion-webserver` starts a simple Node.js-based webserver serving just one
static page, used to work around a browser glitch with displaying raw mjpeg streams.
By default the server is started as a `motion` user for better security, so you
either need to create it using `useradd` command or change that to `root`.

Example user creation commands are below:
```
groupadd -r motion
useradd -r -m -s /bin/true -g motion -G video motion
```

After that you can put the scripts and Node.js modules into `/home/motion`,
as you can see in the repo file structure.
