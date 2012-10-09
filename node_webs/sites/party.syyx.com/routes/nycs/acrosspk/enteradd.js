//添加跨服战入围名单
exports.action = function(req, res){
    var round = req.body.gp
    if (!round || round <= 0) {
        show_error(req, res)
        return
    }

    var ret = _G_check_request_data(req, input_checks)
    if (ret) {
        console.log('check faild')
        show_error(req, res)
        return
    }

    var game_info = get_game_info(req)
    if (game_info.length == 0) {
        console.log('length == 0 !!' )
        console.log(firerank_info)
        show_error(req, res)
        return
    }

    save_game_info(game_info, function(ret) {
        if (ret != 1) {
            show_error(req, res)
            return
        }

        res.send("<html>{ret=1}</html>")
    })
}

function save_game_info(game_info, cb) {
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKServerEnter_AddRecord'

    db.exec_sp(sp_name, game_info, function(err, rows, output, ret) {
        if (ret == 0 || err) {
            cb(ret)
            return
        }
        
        cb(1)
    })
}

function get_game_info(req) {
    var game_info = {
        "@PKRound"         : req.body.gp,
        "@ServerName"      : req.body.sn, 
        "@FirstGroupName"  : req.body.cn1, 
        "@SecondGroupName" : req.body.cn2
    }
    return game_info
}

function show_error(req, res) {
    ms.u.log("添加跨服战入围名单错误：" + req.url)
    ms.u.log(req.body)
    res.send("<html>{ret=0}</html>")
}
//--------------------------------------------------------------------------------------------------------
var input_checks = {
    gp     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 1, max : 4, err_info : false },
            { type : 'regex', value : /^[0-9]{1,4}$/, err_info : false }
        ]
    }
}


