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