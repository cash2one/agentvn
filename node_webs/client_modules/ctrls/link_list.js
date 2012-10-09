//-------------------------------------------------------------------------------------------------
// link_list.js
//-------------------------------------------------------------------------------------------------
var ctrl_lklist = {}
//-------------------------------------------------------------------------------------------------
ctrl_lklist.new_list = function() {
    return _h.ul()
}
//-------------------------------------------------------------------------------------------------
// link_data = {
//     href    : '',
//     content : '',
//     target  : '',
//     span    : '',
// }
//-------------------------------------------------------------------------------------------------
ctrl_lklist.add_link = function(list, link_data) {
    var link = _h.a({ target : link_data.target, href : link_data.href, content : link_data.content })

    if (link_data.span) {
        var span = _h.span({ content : link_data.span })
        link = _h.combine(link, span)
    }

    var li = _h.li()
    li = _h.insert(li, link)
    
    return _h.insert(list, li)
}
//-------------------------------------------------------------------------------------------------
/*
require('./html')
l = ctrl_lklist.new_list()
console.log(l)
l = ctrl_lklist.add_link(l, { href : 'www.syyx.com' })
console.log(l)
l = ctrl_lklist.add_link(l, { href : 'nycs.syyx.com' })
console.log(l)
*/