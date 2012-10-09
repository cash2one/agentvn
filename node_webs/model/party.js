//--------------------------------------------------------------------------------------------------------
// party.js
//--------------------------------------------------------------------------------------------------------
// 构造函数定义，不能是匿名函数，这里的函数名即类名
function party(id, name, desc) {
    var self = this
    self.evter = new ms.events.EventEmitter()

    self.id = id || 0
    self.name = name || ''
    self.desc = desc || ''

    self.bfs = []
}

party.participate = function(bf_id, bf_user_data) {
    var self = this

    var bf = self.bfs[bf_id]
    if (!bf) {
        console.error('invalid bf id', bf_id, self.name)
        return
    }

    bf.act(bf_user_data)
}
//--------------------------------------------------------------------------------------------------------
// 这一句必须放在类定义最后
_class(party)
//--------------------------------------------------------------------------------------------------------
var all_parties = {}
exports.all_parties = all_parties
//--------------------------------------------------------------------------------------------------------
function load_bf(bf_name) {
    var parties_path = process.env['HOME'] + '/code/node_webs/model/bfs/'
    var file = parties_path + bf_name

    return require(file)
}

function init_party(party_conf_file) {
    var m = require(party_conf_file)
    if (all_parties[m.id]) {
        console.error('duplicated party', m.id, m.name)
        return
    }

    var party = new exports.party(m.id, m.name, m.desc)
    party.begin = m.begin
    party.end = m.end
    
    for (var i in m.bfs) {
        var bf = m.bfs[i]
        
        if (party.bfs[bf.id]) {
            console.error('duplicated bf', bf.id, bf.name, bf.type)
            return
        }

        var bf_mod = 'bf_' + bf.type
        ms[bf_mod] = load_bf(bf_mod)

        if (!ms[bf_mod]) {
            console.error('no bf type', bf.type)
            return
        }

        var bf_o = ms[bf_mod].create(party, bf.id, bf.name, bf.conf)
        party.bfs[bf_o.id] = bf_o
    }

    all_parties[party.id] = party
}
//--------------------------------------------------------------------------------------------------------
var fs = require('fs')

exports.init_all_parties = function() {
    var parties_path = process.env['HOME'] + '/code/node_webs/common_modules/parties'
    var r = fs.readdirSync(parties_path)
    for (var i in r) {
        var file = parties_path + '/' + r[i]
        init_party(file)
    }
}
//--------------------------------------------------------------------------------------------------------
exports.get_party(party_id) {
    return all_parties[party_id]
}
//--------------------------------------------------------------------------------------------------------