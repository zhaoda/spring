# Spring [![Build Status](https://img.shields.io/travis/zhaoda/spring.svg)](https://travis-ci.org/zhaoda/spring)

Spring is a blog engine written by GitHub Issues, or is a simple, static web site generator. No more server and database, you can setup it in free hosting with GitHub Pages as a repository, then post the blogs in the repository Issues. 

You can add some labels in your repository Issues as the blog category, and create Issues for writing blog content through Markdown.

Spring has responsive templates, looking good on mobile, tablet, and desktop.Gracefully degrading in older browsers. Compatible with Internet Explorer 10+ and all modern browsers.

Get up and running in seconds.

[中文介绍](http://zhaoda.net/2014/03/21/%E4%BD%BF%E7%94%A8Spring%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2.html)

## Quick start guide

For the impatient, here's how to get a Spring blog site up and running.

### First of all

*   Fork the [Spring](https://github.com/zhaoda/spring "Spring") repository as yours.
*   Goto your repository settings page to rename `Repository Name`.
*   Hosted directly on [GitHub Pages](http://pages.github.com "GitHub Pages") from your project repository, you can take it as *User or organization site* or *Project site(create a gh-pages branch)*.
*   Also, you can [set up a custom domain with Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-pages).

### Secondly

*   Open the `index.html` file to edit the config variables with yours below.

    ```javascript
    $.extend(spring.config, {
      // my blog title
      title: 'Spring',
      // my blog description
      desc: "A blog engine written by github issues [Fork me on GitHub](https://github.com/zhaoda/spring)",
      // my github username
      owner: 'zhaoda',
      // creator's username
      creator: 'zhaoda',
      // the repository name on github for writting issues
      repo: 'spring',
      // custom page
      pages: [
      ]
    })
    ```
*    Put your domain into the `CNAME ` file if you have.
*    Commit your change and push it.

### And then

*   Goto your repository settings page to turn on the `Issues` feature.
*   Browser this repository's issues page, like this `https://github.com/your-username/your-repo-name/issues?state=open`.
*   Click the `New Issue` button to just write some content as a new one blog.

### Finally

*   Browser this repository's GitHub Pages url, like this `http://your-username.github.io/your-repo-name`, you will see your Spring blog, have a test.
*   And you're done!

## Custom development

### Installation

*    You will need a web server installed on your system, for example, Nginx, Apache etc.
*    Configure your spring project to your local web server directory.
*    Run and browser it, like `http://localhost/spring/dev.html` .
*    `dev.html` is used to develop, `index.html` is used to runtime.

### Folder Structure

```bash
spring/
├── css/
|    ├── boot.less  #import other less files
|    ├── github.less  #github highlight style
|    ├── home.less  #home page style
|    ├── issuelist.less #issue list widget style
|    ├── issues.less #issues page style
|    ├── labels.less #labels page style
|    ├── main.less #commo style
|    ├── markdown.less #markdown format style
|    ├── menu.less #menu panel style
|    ├── normalize.less #normalize style
|    ├── pull2refresh.less #pull2refresh widget style
|    └── side.html  #side panel style
├── dist/
|    ├── main.min.css  #css for runtime
|    └── main.min.js  #js for runtime
├── img/  #some icon, startup images
├── js/
|    ├── lib/  #some js librarys need to use
|    ├── boot.js  #boot
|    ├── home.js  #home page
|    ├── issuelist.js #issue list widget
|    ├── issues.js #issues page
|    ├── labels.js #labels page
|    ├── menu.js #menu panel
|    ├── pull2refresh.less #pull2refresh widget
|    └── side.html  #side panel
├── css/
|    ├── boot.less  #import other less files
|    ├── github.less  #github highlight style
|    ├── home.less  #home page style
|    ├── issuelist.less #issue list widget style
|    ├── issues.less #issues page style
|    ├── labels.less #labels page style
|    ├── main.less #commo style
|    ├── markdown.less #markdown format style
|    ├── menu.less #menu panel style
|    ├── normalize.less #normalize style
|    ├── pull2refresh.less #pull2refresh widget style
|    └── side.html  #side panel style
├── dev.html #used to develop
├── favicon.ico #website icon
├── Gruntfile.js #Grunt task config
├── index.html #used to runtime
└── package.json  #nodejs install config
```

### Customization

*   Browser `http://localhost/spring/dev.html`, enter the development mode.
*   Changes you want to modify the source code, like `css`, `js` etc.
*   Refresh `dev.html` view change.

### Building

*   You will need [Node.js](http://nodejs.org/ "Node.js") installed on your system.
*   Installation package.

    ```bash
$ npm install
```
*   Run grunt task.

    ```bash
$ grunt
```
*   Browser `http://localhost/spring/index.html`, enter the runtime mode.
*   If there is no problem, commit and push the code.
*   Don't forget to merge `master` branch into `gh-pages` branch if you have.
*   And you're done! Good luck!

## Report a bug

*   Check if the bug is already fixed in the [master branch](https://github.com/zhaoda/spring/commits/master) since the last release.
*   Check [existing issues](https://github.com/zhaoda/spring/issues). 
*   [Open a new one](https://github.com/zhaoda/spring/issues/new), including exact browser & platform information. 

## Who used

*   http://zhaoda.net/spring
*   http://zhaoda.net/blog

If you are using, please [tell me](https://github.com/zhaoda/spring/issues/6).

## License

Spring is available under the terms of the [MIT License](https://raw.githubusercontent.com/zhaoda/spring/master/LICENSE "MIT License")

