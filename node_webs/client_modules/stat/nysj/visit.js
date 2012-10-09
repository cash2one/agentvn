//-------------------------nysj_stat----------------------------------------------------
(function () {
    var args = {
        from_url        : 'blank',
        from_url_detail : 'blank',     
        dest_url        : location.protocol + '//' + location.hostname + location.pathname
    }

    if (document.referrer.length > 0) {
        args.from_url        = get_hostname(document.referrer)
        args.from_url_detail = document.referrer
    } else {
        try {
            if (args.from_url_detail == 'blank' && opener.location.href.length > 0) {
                args.from_url        = get_hostname(opener.location.href)
                args.from_url_detail = opener.location.href
            }
        } catch(err) {}
    }

    $.ajax({
        url     : 'http://nysj.syyx.com/stat/visit',
        data    : args,
        success : function(data) {
        }
    })

    function get_hostname(referrer) {
        if (!referrer) {
            return 'blank'
        }
        
        var protocol        = referrer.split('://')[0]
        var hostname        = referrer.split('://')[1].split('/')[0]
        var from_url_detail =  protocol + '://' + hostname
        if (from_url_detail) {
            return from_url_detail
        } else {
            return 'blank'
        }
    }
})()
//--------------------------------------------------------------------------------------------
