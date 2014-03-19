;(function($, win, doc) {
  'use strict';

  var $doc = $(doc),
      spring = win.spring,
      source = '\
        <div class="container">\
          <div class="menu">\
            <menu>\
              <li><a href="https://github.com/<%=$.spring.config.owner%>/<%=$.spring.config.repo%>/issues?state=open" data-href="#" class="taplink">Home</a></li>\
            </menu>\
            <%if($.spring.data.labels && $.spring.data.labels.length) {%>\
            <menu>\
              <%$.each($.spring.data.labels, function(i, label) {%>\
              <li>\
                <span style="background: #<%=label.color%>"></span>\
                <a href="https://github.com/<%=$.spring.config.owner%>/<%=$.spring.config.repo%>/issues?labels=<%=encodeURIComponent(label.name)%>&state=open" data-href="#labels/<%=encodeURIComponent(label.name)%>" class="taplink"><%=label.name%></a>\
              </li>\
              <%})%>\
            </menu>\
            <%}%>\
            <%if($.spring.config.pages && $.spring.config.pages.length) {%>\
            <menu>\
              <%$.each($.spring.config.pages, function(i, page) {%>\
              <li><a href="https://github.com/<%=$.spring.config.owner%>/<%=$.spring.config.repo%>/issues/<%=page.number%>" data-href="#issues/<%=encodeURIComponent(page.number)%>" class="taplink"><%=page.name%></a></li>\
              <%})%>\
            </menu>\
            <%}%>\
            <menu>\
              <li><a href="https://github.com/<%=$.spring.config.owner%>/<%=$.spring.config.repo%>/issues?state=open" target="_blank">View on GitHub</a></li>\
            </menu>\
            <footer>Powered by <a href="https://github.com/zhaoda/spring" target="_blank">Spring</a></footer>\
          </div>\
        </div>\
        <div class="container-shadow"></div>',
      render = template.compile(source)

  var panelMenu = {
    id: 'menu',
    classname: 'menu',
    animate: 'revealInRight',
    view: function() {
      var $panel = this,
          data = {},
          body = render(data)
      
      $doc.trigger('spa:initpanel', [$panel, {body: body}])
    },
    init: function() {
      var $view = this,
          $container = $('.container', $view)

      $container.trigger('spa:scroll', {direction: 'y'})
    }
  }

  $doc.on(spring.config.tapEvent, '.btn-menu', function(event) {
    $doc.trigger('spa:openpanel', ['menu'])
  })

  $doc.on('menu:render', function(event, options) {
    var data = (options && options.data) || {},
        body = render(data)

    $('.spa-panel-menu .spa-page-body').html(body).find('.container').trigger('spa:scroll', {direction: 'y'})
  })

  $doc.trigger('spa:panel', panelMenu)

})(Zepto, window, document)