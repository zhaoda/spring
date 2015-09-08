;(function($, win, doc) {
  'use strict';

  var $doc = $(document),
      spring = win.spring,
      source = '\
        <header>\
          <h1><span><%=$.spring.config.title%></span></h1>\
          <a href="#" class="btn-menu preventlink">Menu</a>\
        </header>\
        <div class="container">\
          <div class="container-inner">\
            <%if($.spring.config.desc) {%>\
            <div class="desc markdown"><%=#marked($.spring.config.desc)%></div>\
            <%}%>\
            <section class="issuelist">\
              <div class="pullup">\
                <span class="ball"></span><span class="ball"></span>\
              </div>\
            </section>\
          </div>\
        </div>',
      render = template.compile(source)

  var pageHome = {
    route: '',
    classname: 'home',
    animate: 'fadeIn',
    title: 'Spring',
    view: function(pageData) {
      var $page = this,
          data = {},
          body = render(data)
      
      $doc.trigger('spa:initpage', [$page, {title: 'Spring', body: body}])
    },
    init: function(pageData) {
      var $view = this,
          $container = $('.container', $view),
          $issuelist = $('.issuelist', $container)
      
      $container.trigger('spa:scroll', {direction: 'y'})

      $container.trigger('pull2refresh:init', {
        pullup: function() {
          $issuelist.trigger('issuelist:getdata', {pull: 'up', container: $container})
        }
      })

      $container.trigger('pull2refresh:pullup')
    }
  }

  $doc.trigger('spa:route', pageHome)

})(Zepto, window, document)