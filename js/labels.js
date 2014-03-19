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
          <div class="desc markdown"><p>Labels / <strong><%=label%></strong></p></div>\
          <section class="issuelist" data-labels="<%=label%>">\
            <div class="pullup">\
              <span class="ball"></span><span class="ball"></span>\
            </div>\
          </section>\
        </div>',
      render = template.compile(source)

  var pageLabels = {
    route: 'labels/(:label)',
    classname: 'labels',
    animate: 'fadeIn',
    title: 'Spring',
    view: function(pageData) {
      var $page = this,
          label = pageData.requestData[0],
          data = {label: label},
          body = render(data)

      if(!label) {
        $doc.trigger('spa:navigate', {hash: '', replace: true})
      }
      
      $doc.trigger('spa:initpage', [$page, {title: $.spring.fn.encodeHtml(label), body: body}])
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
    },
    afteropen: function(pageData) {
    }
  }

  $doc.trigger('spa:route', pageLabels)

})(Zepto, window, document)