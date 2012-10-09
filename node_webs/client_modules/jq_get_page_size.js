//----------------------------------------------------------------------------
// dev by 火柴
// api
//----------------------------------------------------------------------------
/* 

兼容所有浏览器

    get_page_size.page_height()   //当前页面高度
    get_page_size.page_width()    //当前页面宽度
    get_page_size.client_width()  //当前浏览器可见区域宽度
    get_page_size.client_height() //当前浏览器可见区域高度
    get_page_size.scrolltop()     //当前页面顶端被滚去的高度
    get_page_size.scrollleft()    //当前页面左边被滚去的宽度

*/
//----------------------------------------------------------------------------

var get_page_size = {
    page_height : function() {
        if($.browser.msie && $.browser.version < 7) {
            var b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
            var c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight)
            if(b < c) {
                return $(window).height()
            } else {
                return b
            }
        } else {
            return $(document).height()
        }
    },

    page_width : function() {
        if($.browser.msie) {
            var b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
            var c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth)
            if(b < c) {
                return $(window).width()
            } else {
                return b
            }

        }else {
            return $(document).width()
        }
    }, 

    client_width : function() {
        return window.innerWidth || document.documentElement.clientWidth
    },

    client_height : function() {
        return window.innerHeight || document.documentElement.clientHeight
    },

    scrolltop     : function() {
        return $("html").scrollTop() || $("body").scrollTop()
    },

    scrollleft    : function() {
        return $("html").scrollLeft() || $("body").scrollLeft()
    }
}
