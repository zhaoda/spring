;(function($, win, doc) {
  'use strict';

  var $doc = $(document),
      spring = win.spring,
      source = '\
        <header>\
          <h1><span><%=$.spring.config.title%></span></h1>\
          <a href="#" class="btn-back preventlink">Back</a>\
        </header>\
        <a href="#" class="btn-back preventlink">Back</a>\
        <div class="container">\
          <section class="issues" data-number="<%=number%>">\
            <div class="pullup">\
              <span class="ball"></span><span class="ball"></span>\
            </div>\
          </section>\
        </div>',
      sourceContent = '\
        <h1 class="title"><%=title%></h1>\
        <div class="desc markdown">\
          <p>\
          Created <%=$.spring.fn.getDate(created_at)%>\
          <%if(created_at !== updated_at) {%>\
           / Updated <%=$.spring.fn.getDate(updated_at)%>\
          <%}%>\
          </p>\
        </div>\
        <article class="markdown">\
          <%=#marked(body)%>\
          <p><a href="<%=html_url%>" target="_blank" class="btn-view"><%=comments%> comments / view on github</a></p>\
        </article>',
      render = template.compile(source),
      renderContent = template.compile(sourceContent)

  var pageLabels = {
    route: 'issues/(:number)',
    classname: 'issues',
    animate: 'slideInLeft',
    title: 'Spring',
    view: function(pageData) {
      var $page = this,
          number = pageData.requestData[0],
          data = {number: number},
          body = render(data)

      if(!number) {
        $doc.trigger('spa:navigate', {hash: '', replace: true})
      }
      
      $doc.trigger('spa:initpage', [$page, {body: body}])
    },
    init: function(pageData) {
      var $view = this,
          $container = $('.container', $view),
          $issues = $('.issues', $container),
          number = $issues.attr('data-number'),
          issue = spring.data.issues[number]

      $container.trigger('spa:scroll', {direction: 'y'})

      if(issue) {
        $issues.trigger('issues:render', {issue: issue})
      } else {
        var method = '/repos/' + spring.config.owner + '/' + spring.config.repo + '/issues/' + number,
            parameters = {}

        spring.fn.request(method, parameters, function(data) {
          if(data.meta && data.meta.status === 200) {
            issue = data.data
            spring.data.issues[number] = issue

            $issues.trigger('issues:render', {issue: issue})
          } else {
            $doc.trigger('spa:navigate', {hash: '', replace: true})
          }
        })
      }
    },
    afteropen: function(pageData) {
    }
  }

  $doc.on('issues:render', function(event, options) {
    var $target = $(event.target),
        issue = options.issue

    $target.html(renderContent(issue))
  })

  $doc.trigger('spa:route', pageLabels)

})(Zepto, window, document)