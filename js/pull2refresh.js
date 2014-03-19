// `pulldown` load new
// `pullup` load more
;(function($, win, doc) {
  'use strict';

  var $doc = $(document),
      spring = win.spring

  // pull2refresh:init event
  $doc.on('pull2refresh:init', function(event, options) {
    var $target = $(event.target),

        $children = $target.children(),

        $pulldown = $('.pulldown', $target),

        $pullup = $('.pullup', $target),

        pulldownHeight = $pulldown.height(),

        pulldownMoveDistance = 0,

        pulldownStartScrollTop = 0,
        pulldownStartPageY = 0,

        pulldownDefaultContent = options.pulldownDefaultContent || 'Pull down to refresh',
        
        pulldownReadyContent = options.pulldownReadyContent || 'Release to refresh',
        
        pulldownLoadingContent = options.pulldownLoadingContent || '<span class="ball"></span><span class="ball"></span>',
        
        pulldownStatus = 'default',

        pullupDefaultContent = options.pullupDefaultContent || 'Pull up to refresh',
        
        pullupLoadingContent = options.pullupLoadingContent || '<span class="ball"></span><span class="ball"></span>',
        
        pullupStatus = 'default'
        
    $target.on('touchstart', function(event) {
      pulldownStartScrollTop = $target.prop('scrollTop')

      if(!event.touches.length) return

      pulldownStartPageY = event.touches[0].pageY
    })

    $target.on('touchend', function(event) {
      if(pulldownStatus == 'default' && $pulldown.length) {
        var css = {}
        css[common.transformName] = 'translate3d(0, 0px, 0)'

        $children.css(css)
      } else if(pulldownStatus == 'ready') {
        $target.trigger('pull2refresh:pulldown')
      }
    })

    var scrollTimer,
        scrollEnd = function() {
          if($pullup.length && $pullup.css('display') != 'none' && $target.prop('scrollTop') + $target.height() >= $target.prop('scrollHeight') - 200) {
            $target.trigger('pull2refresh:pullup')
          }
        }

    $target.on('scroll', function(event) {
      if(scrollTimer) {
        clearTimeout(scrollTimer)
      }
      scrollTimer = setTimeout(scrollEnd, 100)
    })

    $target.on('touchmove', function(event) {
      if(!event.touches.length) return

      if(pulldownStartScrollTop > 5 || !$pulldown.length || $pulldown.css('display') == 'none' || pulldownStatus == 'loading')
        return

      var pageY = event.touches[0].pageY

      if(pageY < pulldownStartPageY) return
      event.preventDefault()

      pulldownMoveDistance = (pageY - pulldownStartPageY) * 0.4

      if(pulldownStartScrollTop !== 0)
        $target.prop('scrollTop', 0)

      var css = {}
      css[common.transformName] = 'translate3d(0, ' + pulldownMoveDistance + 'px, 0)'

      $children.css(css)

      if(pulldownMoveDistance >= pulldownHeight && pulldownStatus == 'default') {
        pulldownStatus = 'ready'
        $pulldown.html(pulldownReadyContent)
      } else if(pulldownMoveDistance < pulldownHeight && pulldownStatus == 'ready') {
        pulldownStatus = 'default'
        $pulldown.html(pulldownDefaultContent)
      }
    })

    $target.on('pull2refresh:pulldown', function(evnet) {
      if(pulldownStatus != 'loading') {

        var css = {}
        css[common.transformName] = 'translate3d(0, ' + pulldownHeight + 'px, 0)'

        $children.css(css)
        pulldownStatus = 'loading'
        $pulldown.html(pulldownLoadingContent)
        options.pulldown && options.pulldown.call($target)
      }
    })

    $target.on('pull2refresh:pulldownFinish', function(event) {
        var css = {}
        css[common.transformName] = 'translate3d(0, 0px, 0)'

        $children.css(css)
        pulldownStatus = 'default'
        $pulldown.html(pulldownDefaultContent)
        options.pulldownFinish && options.pulldownFinish.call($target)
    })

    $target.on('pull2refresh:pullup', function(evnet) {
      if(pullupStatus != 'loading') {
        pullupStatus = 'loading'
        $pullup.html(pullupLoadingContent)
        options.pullup && options.pullup.call($target)
      }
    })

    $target.on('pull2refresh:pullupFinish', function(evnet) {
      pullupStatus = 'default'
      $pullup.html(pullupDefaultContent)
      options.pullupFinish && options.pullupFinish.call($target)
    })

  })

})(Zepto, window, document)

