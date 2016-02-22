# Chatroom

## This is a project for WEPO at Reykjavik University, Spring 2016.



After pulling the repository, you have to be sure that you've installed NodeJS and then run:

	npm install
  
to get all packages. Please also install gulp globally:

	npm install gulp -g

## Gulp

Gulp tasks available now are

* gulp
	* Defaults to 'gulp build'
* gulp build
	* Creates a build folder with everything we need. Run index.html from this folder.
* gulp jshint
* gulp minifyApp
	* Minifies the code of the app to the build folder
* gulp minifyVendors
	* Minifies the code from all vendors and concatenates to one file in the build folder
* gulp minifyVendorCss
	* Minifies all vendor css and concatenates to one file in the build folder
* gulp moveStuff
	* Takes care of moving all other files to the build folder


## Running the app

To run the app it is necessary to have NodeJS installed and to have already installed all dependencies by running

	npm install

in both the **root**  and the **server** folders.

Then we should be able to run

	gulp

Next you should navigate to the **server** folder and run

	node chatserver.js

We also have to run a simple server in the build folder, which gulp made for us, and run:

	python -m SimpleHTTPServer

Then you should be able to navigate to *localhost:8000* via **Google Chrome**.

## Using the app

Using the app should be fairly straight-forward. Choose a nick to begin with on the begin screen.

On the left there is a list of active channels. You should be able to click on any one of them to get in (unless banned), but in this app we only use one channel at a time, so you will leave the current channel. You can also simply write

	/join channelname

On the right there is a list of the users of the current channel, ops are yellow and normal users are red. Ops can /op other users, /kick and /ban by using the respective command followed by the nick of the wanted user.

The messaging terminal has two tabs. One for the current channel and the other for private messaging. It is possible to send a private message from either terminal by entering

	/msg nick message

If you are not currently in the private messaging tab, you will get notified both visually and aurally.

That's about it for now.
