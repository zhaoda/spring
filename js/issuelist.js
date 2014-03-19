;(function($, win, doc) {
  'use strict';

  var $doc = $(doc),
      spring = win.spring,
      source = '\
        <%$.each(blogs, function(i, blog) {%>\
        <article>\
        <span class="date"><%=$.spring.fn.getDate(blog.created_at)%></span>\
        <h3><a href="<%=blog.html_url%>" data-href="#issues/<%=encodeURIComponent(blog.number)%>" class="taplink"><%=blog.title%></a></h3>\
        <%if(blog.labels.length) {%>\
        <p class="tag">\
          <%$.each(blog.labels, function(j, label) {%>\
          <a href="https://github.com/<%=$.spring.config.owner%>/<%=$.spring.config.repo%>/issues?labels=<%=encodeURIComponent(label.name)%>&page=1&state=open" class="taplink" style="background: #<%=label.color%>" data-href="#labels/<%=encodeURIComponent(label.name)%>"><%=label.name%></a>\
          <%})%>\
        </p>\
        <%}%>\
        </article>\
        <%})%>',
      render = template.compile(source)
  
  function hasNext(link) {
    var next = false

    link && $.each(link, function(index, item) {
      if(item[1].rel === 'next') {
        next = true
      }
    })

    return next
  }

  $doc.on('issuelist:render', function(event, options) {
    var $target = $(event.target),
        data = options.data,
        next = false,
        html = '',
        sum = 0

    if(data.meta && data.data) {
      next = hasNext(data.meta.Link)

      html = render({blogs: data.data})

      $target.append(html).trigger('pull2refresh:pullupFinish')
    }

    if(!next) {
      $('.pullup', $target).hide().remove()
      sum = $('article', $target).length
      $target.append('<div class="end">' + sum + (sum > 1 ? ' blogs' : ' blog') + '</div>')
    }
  })

  $doc.on('issuelist:getdata', function(event, options) {
    var $target = $(event.target),
        method = '/repos/' + spring.config.owner + '/' + spring.config.repo + '/issues',
        parameters = {per_page: spring.config.per_page},
        $blogs = $('article', $target),
        $lastOne,
        labels = $target.attr('data-labels') || '',
        page = $target.attr('data-page') || 1

    if(spring.config.creator) {
      parameters.creator = spring.config.creator
    }

    if(labels) {
      parameters.labels = labels
    }

    parameters.page = page

    spring.fn.request(method, parameters, function(data) {
      $.each(data.data, function(i, issue) {
        spring.data.issues[issue.number] = issue
      })

      $target.trigger('issuelist:render', {data: data})
      $target.attr('data-page', + page + 1)
    })
  })

})(Zepto, window, document)