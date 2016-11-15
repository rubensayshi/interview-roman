### Interview Task #1: Angular + Webworker
**Required Skills:** (Node)JS, Gulp, Browserify, Angular  
**Things to figure out:** HTML5 Webworkers

In this repo is a small boilerplate app that needs to execute a CPU intensive task when a button is clicked.  
This task (called `HeavyTask`) represents a real world task that takes 1 second to execute, 
this could for example be keyderivation (HMAC-SHA512 with many rounds) or just something else that takes a while to do in javascript.

Because javascript is single threaded a long executing task will cause the whole browser to block,
not only will all other javascript be halted during the execution but also any interaction with the webapp 
will degrate or completely halt.

As you can see when running the current state of this app, when you hit the "gogo" button 
you can no longer type in the textarea and the (javascript powered) ticker will also completely halt.

**The task for you:** move the `HeavyTask` execution into a "Web Worker", a fancy HTML5 addition 
that allows you to execute javascript in a seperate thread.  
As a result when pressing the "gogo" button users should be able to continue interacting with the webapp 
and the other javascript running shouldn't halt.

#### What is expected
 - Readable / clean code.
 - If possible something that is reusable or easily refactored into being reusable.
 - Not changing the contents of `mypackage/lib/heavy-task`.
 - Feel free to make any other changes you want.

#### Resources
 - Mozilla web worker spec: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

#### Boilerplate app
To save you some time there's already some boilerplate code for the webapp, both the actual app 
and some gulp tasks to browserify and concat the files.

##### Install
```
npm install
npm install -g gulp bower serve
bower update
```

##### Build
```
gulp
```

This will execute all the tasks:
 - concat the libs installed with bower (`angular` and `q`) into `web/www/js/libs.js`
 - browserify `mypackage` into `web/www/js/mypackage.js` (available as global `window.mypackage`)
 - concat all files in `web/src/js` into `web/www/js/app.js`

##### Run
```
serve -p 3000 web/www
```

This will serve the `web/www` folder on `http://localhost:3000` 
and is the easiest way of quickly being able to get things to run and start developing.

##### Watch
```
gulp watch
```
If you're using the livereload browser extension you can add `--live-reload`.  
**KEEP IN MIND:** if you add files you need to restart `gulp watch` 
