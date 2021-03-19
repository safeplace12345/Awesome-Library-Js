# Install netlify CLI globally
npm install netlify-cli -g
### OR ### 
# Serveless by netlify

npm i netlify-lambda --save-dev

"netlify:serve" : "netlify-lambda serve functions",
    "netlify:build":
    "netlify-lambda build functions"


    
yarn global add netlify-cli

Getting Started with Netlify CLI

In order to fully harness the power of Netlify CLI, you must first ensure that your project is connected up to a Netlify account. This ensures that the Netlify CLI can pull down the appropriate environment variables and various site specific configurations for a particular project. To do this, start by logging in to your Netlify account with the following command:

# login to your netlify account
netlify login

With your CLI now synced to your Netlify account, the next step is to connect a local project to a site on Netlify. There are two ways to do this. You can either use the netlify link command or the netlify init command. The former connects your local codebase to an existing Netlify site in your account, while the latter creates a new site. An important thing to note when using netlify link is that you’ll need to enter in either your Site ID or Site Name to the prompt in the CLI so Netlify knows which site to link your project to.

    The netlify link command to link an existing site in netlify to your local codebase.
    The netlify init command to create a brand new site in your netlify account.

Getting Started with Netlify Dev

Now that we’re all set up, let’s dive into how we can use Netlify Dev to supercharge our local development workflow. Getting started with Netlify Dev is as easy as running the following command inside your site directory:

netlify dev

If you want to go one step further and share the locally running version of your site, you can simply add the --live flag and you’ll have a local tunnel automagically created for you.

netlify dev --live

Faster deploys with the Netlify CLI

One of my favorite features of the Netlify CLI is the netlify deploy command. This command will pipe up your locally built site into a live deploy preview without needing to wait for the Netlify CI process to run. Ordinarily, this process takes a couple of minutes to run depending on the size of your build. Because this feature circumvents the traditional netlify build process where a git commit is triggered and fires off a build in Netlify, it’s important to run your local build with npm run build before running a deploy.

With this build step completed, it’s now time to deploy your project!

netlify deploy --open

This will deploy your local site build up into Netlify and return back a handy dandy preview URL. Yay!

The quicker turn around time that this process provides means that your feedback loop is significantly reduced when testing things with live URLs. You can also share your deploy preview URLs with your team much faster than with a traditional deploy workflow. Let’s be honest, not all changes, tweaks & updates need a new branch or deserve Git commits just for that handy preview URL to share with the team 😄.
Deploying to production

This same workflow can be replicated to deploy your locally built site to your live site URL using:

# deploy to live site
netlify deploy -p

netlify deploy -p is short for netlify deploy --prod.