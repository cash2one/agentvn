//--------------------------------------------------------------------------------------------------------
// bf_vote.js
//--------------------------------------------------------------------------------------------------------
// 构造函数定义，不能是匿名函数，这里的函数名即类名
function bf_vote(party, bf_id, bf_name, bf_conf) {
    var self = this
    self.evter = new ms.events.EventEmitter()

    self.id = bf_id || 0
    self.name = bf_name || ''

    bf_conf = bf_conf || {}

    self.candidates = bf_conf.candidates || []
    self.vote_types = bf_conf.vote_types || [ 'ding', 'cai' ]

    self.party = party
}

bf_vote.set_votetypes = function(vote_types) {
    var self = this

    if (typeof vote_types != 'object') {
        throw 'set votetype error. ' + vote_types
    }

    self.vote_types = vote_types
}

bf_vote.count_candi = function() {
    var self = this

    return self.candidates.length
}

bf_vote.get_candi = function(id) {
    var self = this

    for (var i in self.candidates) {
        var candi = self.candidates[i]
        if (candi.id === id) {
            return candi
        }
    }
}

bf_vote.add_candi = function(id, name) {
    var self = this

    var candi = {
        id    : id,
        name  : name,
        votes : {},
    }

    if (self.get_candi(id)) {
        throw 'candidate has existed. ' + candi
    }

    for (var i in self.vote_types) {
        var type = self.vote_types[i]
        candi.votes[type] = 0
    }

    self.candidates.push(candi)
}

bf_vote.vote = function(candi_id, vote_type) {
    var self = this

    var candi = self.get_candi(candi_id)
    if (!candi) {
        console.error('vote error, no candidate. ', candi_id)
        return
    }

    if (candi.votes[vote_type] === undefined) {
        console.error('vote error, no vote type. ', vote_type)
        return
    }

    candi.votes[vote_type] += 1
}

bf_vote.sort = function(vote_type, reverse) {
    var self = this

    var result = self.candidates.slice(0)

    result.sort(function(l, r) {
        var lv = l.votes[vote_type]
        var rv = r.votes[vote_type]

        if (lv === undefined || lv === null) {
            return reverse
        }

        if (rv === undefined || rv === null) {
            return !reverse
        }

        if (reverse) {
            return (lv < rv)
        }
        else {
            return (lv >= rv)
        }
    })

    return result
}

bf_vote.act = function(user_data) {
    var self = this

    var candi_id = user_data.candi_id
    var vote_type = user_data.vote_type

    self.vote(candi_id, vote_type)

    self.save(user_data)
}

bf_vote.save = function(user_data) {
    var self = this

    // todo: save self.party.id, self.id, user_data to db
}

bf_vote.load = function() {
    var self = this

    // todo: read user_data from db and call vote method
    // var party_user_data = ms.party.get_user_data_table_name(party_id)
    // select * from party_user_data where bf_id = self.id
}
//--------------------------------------------------------------------------------------------------------
// 这一句必须放在类定义最后
_class(bf_vote)
//--------------------------------------------------------------------------------------------------------
exports.create = function(party, id, name, bf_conf) {
    return (new exports.bf_vote(party, id, name, bf_conf))
}
//--------------------------------------------------------------------------------------------------------
// unittest block
var ut = require('unittest')
ut.unittest(__filename, [
    {   
        name : 'test_new_bf_vote_01',
        func : function() {
            var bf = new bf_vote()
            
            ut.ok(bf)
            ut.ok(bf.candidates.length == 0)
            ut.ok(bf.vote_types.length == 2)
        },
    },
    {
        name : 'test_new_bf_vote_02',
        func : function() {
            var bf_conf = { candidates : [{}, {}], vote_types : ['a', 'b'] }
            var bf = new bf_vote(null, 0, '', bf_conf)
            
            ut.ok(bf)
            ut.ok(bf.candidates.length == 2)
            ut.ok(bf.vote_types.length == 2)
        },
    },
    {
        name : 'test_add_candi_01',
        func : function() {
            var bf = new bf_vote()
            bf.add_candi(1, 'xxx')
            bf.add_candi(2, 'yyy')
            bf.add_candi(100, 'zzz')

            ut.ok(bf.count_candi() == 3)

            var candi = bf.get_candi(1)
            ut.ok(candi.name = 'xxx')

            var candi = bf.get_candi(2)
            ut.ok(candi.name = 'yyy')

            var candi = bf.get_candi(100)
            ut.ok(candi.name = 'zzz')

            ut.ok(bf.count_candi() == 3)
        },
    },
    {
        name : 'test_vote_01',
        func : function() {
            var bf = new bf_vote()
            bf.add_candi(1, 'xxx')
            bf.add_candi(2, 'yyy')
            bf.add_candi(100, 'zzz')

            bf.vote(1, 'ding')
            bf.vote(2, 'cai')
            bf.vote(100, 'ding')
            bf.vote(1, 'cai')
            bf.vote(2, 'ding')
            bf.vote(100, 'ding')
            bf.vote(1, 'ding')
            bf.vote(2, 'ding')
            bf.vote(100, 'ding')
            bf.vote(1, 'cai')
            bf.vote(2, 'ding')
            bf.vote(100, 'ding')

            ut.ok(bf.get_candi(1).votes['ding'] == 2)
            ut.ok(bf.get_candi(1).votes['cai'] == 2)
            
            ut.ok(bf.get_candi(2).votes['ding'] == 3)
            ut.ok(bf.get_candi(2).votes['cai'] == 1)

            ut.ok(bf.get_candi(100).votes['ding'] == 4)
            ut.ok(bf.get_candi(100).votes['cai'] == 0)

            var r = bf.sort('ding', true)
            ut.ok(r[0].id == 100)
            ut.ok(r[1].id == 2)
            ut.ok(r[2].id == 1)
        }
    },
])
//--------------------------------------------------------------------------------------------------------