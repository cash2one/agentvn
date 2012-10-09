//-------------------------------------------------------------------------------------------------
// html.js
//-------------------------------------------------------------------------------------------------
var ctrl_html = {}
_h = ctrl_html
//-------------------------------------------------------------------------------------------------
var no_tail = {
    'img'   : true,
    'br'    : true,
    'link'  : true,
    'meta'  : true,
    'col'   : true,
    'input' : true,
}

ctrl_html.new_tag = function(name, options) {
    options = options || {}

    var properties = ''
    for (var p in options) {
        if (!options[p] || options[p] == 'content') {
            continue
        }

        properties += p + '="' + options[p] + '" '
    }
    
    properties = properties ? ' ' + properties : ''

    options.content = options.content || ''

    var tail = '>' + options.content + '</' + name + '>'
    if (no_tail[name]) {
        tail = '/>'
    }
    var tag = '<' + name + properties + tail
    return tag
}
//-------------------------------------------------------------------------------------------------
ctrl_html.img = function(options) {
    options = options || {}

    return ctrl_html.new_tag('img', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.a = function(options) {
    options = options || {}

    if (options.img) {
        if (!options.content) {
            options.content = ctrl_html.img({ src : options.img })
        }
        else {
            var img = ctrl_html.img({ src : options.img })
            var span = ctrl_html.span({ content : options.content })
            options.content = ctrl_html.combine(img, span)
        }

        delete options.img
    }

    return ctrl_html.new_tag('a', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.p = function(options) {
    options = options || {}

    if (options.text) {
        options.content = options.text
        options.text = undefined
    }

    return ctrl_html.new_tag('p', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.span = function(options) {
    options = options || {}

    if (options.text) {
        options.content = options.text
        options.text = undefined
    }

    return ctrl_html.new_tag('span', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.ul = function(options) {
    options = options || {}

    return ctrl_html.new_tag('ul', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.li = function(options) {
    options = options || {}

    return ctrl_html.new_tag('li', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.div = function(options) {
    options = options || {}

    return ctrl_html.new_tag('div', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.iframe = function(options) {
    options = options || {}

    return ctrl_html.new_tag('iframe', options)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.insert = function(parent, content) {
    var name = ctrl_html.tag_name(parent)
    if (no_tail[name]) {
        return false
    }

    var n = parent.indexOf('</' + name + '>')
    if (n < 0) {
        return false
    }

    var prefix = parent.substring(0, n)
    var subfix = parent.substring(n, parent.length)

    return (prefix + content + subfix)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.tag_name = function(tag) {
    if (tag[0] != '<') {
        return false
    }

    for (var n = 1; n < tag.length; ++n) {
        if (tag[n] == ' ' || tag[n] == '>') {
            break
        }
    }

    if (n >= tag.length) {
        return false
    }

    return tag.substring(1, n)
}
//-------------------------------------------------------------------------------------------------
ctrl_html.combine = function(tag1, tag2) {
    return (tag1 + tag2)
}
//-------------------------------------------------------------------------------------------------
/*
t = _h.new_tag('b', { a : undefined })
console.log(t)
*/