;(function($, win, doc) {
  'use strict';

  var $doc = $(doc),
      spring = win.spring,
      source = '\
        <h1 class="logo"><%=$.spring.config.title%></h1>\
        <div class="desc markdown"><%=#marked($.spring.config.desc)%></div>\
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
        ',
      render = template.compile(source)

  $doc.on('side:create', function(event) {
    var $side = $('<aside class="side"><div class="container"></div></aside>')
    $side.appendTo($('body', $doc))
      .find('.container').trigger('spa:scroll', {direction: 'y'})
      .trigger('side:render')
  })

  $doc.on('side:render', function(event, options) {
    var data = (options && options.data) || {},
        body = render(data)

    $('.side .container').html(body)
  })

})(Zepto, window, document)