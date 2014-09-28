`html` directory contains a static web page you will use to watch the webcam video stream.

The web page contains a hardcoded IP and port of the Motion stream. IP will be the one
of your board (pull requests for making it automatic are welcome :),
port is the one where Motion runs (update if you change it in the `motion.conf`
compared to the provided example).

The page is served after starting the `motion-webserver` init script, it will be
available at `http://<your board's IP>:10080` by default.

`node_modules` contains Node.js modules used by the scripts. For whatever reason Temboo
has an outdated SDK version in the NPM repo, so you need to download it manually
and unpack into `node_modules/temboo` directory. Web server serving the static page needs
the Express framework, NPM will install it for you if you run `npm install` when your
current directory is `scripts`.

`gdrive_upload.js` is a Node.js script to upload video frames to Google Drive.
Insert proper Temboo and Google API credentials into the script before running.

`gpio_blink.sh` is a script to trigger Arduino expansion board's digital pin #7
in reaction to the motion detection event. I used LED and a buzzer connected
in parallel to provide audible and visible alert. It must be run as `root`,
otherwise you'll most probably see "permission denied" errors with GPIO exports.
This is the primary reason `motion` init script uses `root` by default. If you
don't need this functionality, use `motion` user for better security.

`motion_start_wrapper.sh` is a wrapper script to have `gpio_blink.sh`,
`twitter_post.js` and `xively_post.js` run together as a reaction to motion
detection event (Motion only allows to specify one command line per event hook).

`package.json` is a dependency description for `server.js` used by NPM.

`twitter_post.js` is a Node.js script for posting predefined text (hardcoded in
the script + timestamp passed from Motion) to Twitter as a reaction to motion
detection event. Insert proper Temboo and Twitter credentials into the script
before running.

`xively_post.js` is a Node.js script for posting event start and stop data
to Xively for longer term analysis. Insert proper Temboo and Xively credentials
into the script before running.
