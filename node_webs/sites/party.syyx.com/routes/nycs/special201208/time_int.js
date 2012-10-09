exports.action = function(req, res) {
    var now = Date.parse(new Date())
    var ret = {status : ["no", "yes", "no", "no", "no"]}
    if(now >= Date.parse('Aug 11, 2012')) {
        ret.status[0] = "yes"
    }
    if(now >= Date.parse('Aug 27, 2012')) {
        ret.status[0] = "end"
    }

    if(now >= Date.parse('Aug 24, 2012')) {
        ret.status[1] = "end"
    }

    if(now >= Date.parse('Aug 11, 2012')) {
        ret.status[2] = "yes"
    }
    if(now >= Date.parse('Aug 19, 2012')) {
        ret.status[2] = "end"
    }

    if(now >= Date.parse('Aug 11, 2012')) {
        ret.status[3] = "yes"
        ret.status[4] = "yes"
    }
    if(now >= Date.parse('Aug 21, 2012')) {
        ret.status[3] = "end"
        ret.status[4] = "end"
    }

    res.send(ret)
}