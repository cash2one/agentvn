//------------------------------------------------------------------------------------------------
// table.js
//------------------------------------------------------------------------------------------------
var ctrl_table = {}
//------------------------------------------------------------------------------------------------
ctrl_table.new_table = function(options) {
    return _h.new_tag('table', options)
}
//------------------------------------------------------------------------------------------------
ctrl_table.header = function(tbl, fields) {
    var tr = _h.new_tag('tr')

    for (var i = 0; i < fields.length; ++i) {
        var th = _h.new_tag('th', { content : fields[i] })
        tr = _h.insert(tr, th)
    }

    tbl = _h.insert(tbl, tr)
    return tbl
}
//------------------------------------------------------------------------------------------------
// record = [
//     {
//         content : '',
//         link    : {}
//     }
// ]
ctrl_table.record = function(tbl, record) {
    var tr = _h.new_tag('tr')

    for (var i = 0; i < record.length; ++i) {
        var rec = record[i]
        if (rec.link) {
            var link = _h.a(rec.link)
            if (rec.content) {
                var span = _h.span({ content : rec.content })
                link = _h.combine(link, span)
            }
            var td = _h.new_tag('td', { content : link })
        }
        else {
            var td = _h.new_tag('td', { content : rec.content })
        }

        tr = _h.insert(tr, td)
    }

    tbl = _h.insert(tbl, tr)
    return tbl
}
//------------------------------------------------------------------------------------------------
/*
require('./html')
tbl = ctrl_table.new_table()
console.log(tbl)
tbl = ctrl_table.header(tbl, ['name', 'age', 'class', 'gender'])
console.log(tbl)
tbl = ctrl_table.record(tbl, [ { link : { href : 'www.syyx.com', img : 'a.jpg', content : 'xxxt' } }, { content : 10 } ])
console.log(tbl)
*/