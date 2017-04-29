# simple-webhook-server

A barebones Node.js app to run in Heroku, configured to accept webhook posts.  Based off the [node-js-getting-started](https://github.com/heroku/node-js-getting-started) from Heroku.  This version of the Node.js application takes an inbound webhook from ThousandEyes and translates it (an example which posts to slack is posted), forwarding it to a target webhook and returning that target's response.

Note: you'll need to update the code in webhook-server.js to target your own slack webhook for this example.

For information This application support the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.

```
$ git clone https://github.com/thousandeyes/simple-webhook-server.git # or clone your own fork
$ cd simple-webhook-server
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For information on ThousandEyes webhooks, visit these articles in the Customer Success Center:

- [Using Webhooks](https://success.thousandeyes.com/PublicArticlePage?articleIdParam=kA0E0000000CmmVKAS)
- [November 12, 2014 Release Notes](https://success.thousandeyes.com/PublicArticlePage?articleIdParam=kA0E0000000CmlcKAC)

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

## Making Changes

If you need to make changes in the code (for example, to modify the webhook target, which is currently configured as `https://hooks.slack.com/services/<my_target>`, you'll need to make changes and then commit them to your local branch.  To do this, save your changes, and commit them locally, then push them to heroku.  Once the changes are pushed, heroku will rebuild the app.  To monitor logs, run `heroku logs --tail`.

```
$ git commit -am "your commit message"
$ git push heroku master
```

Note: unless ThousandEyes receives a 200 response to a webhook post, it will continue trying to push the webhook every 5 minutes for an hour.


## Shutting down the sample server

To shut down and remove your sample server on heroku, run the following command:

```
$ heroku destroy
 ▸    WARNING: This will delete ⬢ (your-instance-name) including all add-ons.
 ▸    To proceed, type (your-instance-name) or re-run this command with --confirm 
```

## License

The MIT License (MIT)

Copyright (c) 2015 ThousandEyes, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
