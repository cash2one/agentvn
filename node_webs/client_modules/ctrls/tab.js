//-------------------------------------------------------------------------------------------------
// tab.js
//-------------------------------------------------------------------------------------------------
var ctrl_tabs = {}
//-------------------------------------------------------------------------------------------------
ctrl_tabs.add_tab = function(tabs_div_id, index, tab_name) {
    var div_id = '#' + tabs_div_id
    var ul_id  = tabs_div_id + '_ul'

    var tabs_div = $(div_id)
    if (!tabs_div.has(ul_id)) {
        var ul_html = _h.ul({ id : ul_id })
        tabs_div.append(ul_html)
    }
    
    var tab_div_id = div_id + '_tab' + index
    var div_html = _h.div({ id : tab_div_id })
    tabs_div.append(div_html)
    
    var tabs_ul = $(ul_id)
    var li_html = _h.li(
        { content : _h.a(
            { href    : tab_div_id, 
              content : tab_name 
            }) 
        })

    tabs_ul.append(li_html)
}
//-------------------------------------------------------------------------------------------------
ctrl_tabs.add_tab_content = function(tabs_div_id, index, html) {
    var div_id = '#' + tabs_div_id
    var tab_div_id = div_id + '_tab' + index

    var tab_div = $(tab_div_id)
    tab_div.append(html)
}
//-------------------------------------------------------------------------------------------------
ctrl_tabs.run = function(tabs_div_id, options) {
    options = options || {}

    var event_name = options.event || "mouseover"
    var rotate = options.rotate

    var tabs_div = $('#' + tabs_div_id)
    tabs_div.tabs({ event : event_name })
    if (rotate) {
        tabs_div.tabs('rotate', rotate.ms, rotate.continuing)
    }
}
//-------------------------------------------------------------------------------------------------