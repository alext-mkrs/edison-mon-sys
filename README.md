Sources and config files for Edison-based monitoring system
===========================================================
This repo contains sources and instructions for building an Intel(r) Edison-based monitoring system with motion detection and cloud/social connection.

This is an example project one can do with Edison, with the following features:

1. Motion detection in a webcam stream (using [Motion](http://sourceforge.net/projects/motion/))
2. Posting alerts to Twitter with predefined text (script triggered by Motion);
2. Capturing video frames with motion in them and storing them locally (through Motion) + posting them to Google Drive (script triggered by Motion);
3. Posting the event data to Xively for longer-term preservation and analysis (script triggered by Motion);
4. Triggering digital pin #7 (can be changed, script is triggered by Motion) on the Arduino expansion board, so that you can implement audible and/or visible alerts (I used LED and buzzer connected in parallel);
5. Streaming the live webcam feed via HTTP (Motion standard feature) with a workaround for browser bugs with displaying raw mjpeg streams. There's a wrapper web page which is server via the basic Node.js-based web server;

Dependencies
=============
Your Edison image should have Motion and webcam driver installed to be able to run this. Node.js is there by default.

Additionally, I've used [Temboo](https://www.temboo.com) as a middleware to (a) check it out and (b) make the development faster. You should put the Temboo Node.js SDK into `home/motion/scripts/node_modules/temboo`, the project was tested with version 2.2.0.

You of course need Twitter, Google Drive and Xively accounts to be able to post data there. Then use Temboo's ability to run Choreos via their web page to obtain necessary OAuth credentials and insert them into scripts (you'll see placeholders there).

For details on the contents see README files in each directory.

You can see the system in action on these videos/photos made by IFA visitors:

1. http://www.youtube.com/watch?v=JUJ5FUrAOcY
2. https://www.youtube.com/watch?v=qsvedUOWq9g
3. https://www.tinhte.vn/threads/ifa-2014-intel-edison-chiec-may-tinh-sieu-nho-co-2-nhan-cpu-ram-wi-fi-bluetooth.2355953/
