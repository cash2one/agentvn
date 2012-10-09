//添加星空争霸
exports.action = function(req, res){
    var round = req.body.g
    var count = req.body.count
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
        console.log('length == 0 !!')
        show_error(req, res)
        return
    }

    save_game_info(game_info, count, function(ret) {
    if (ret != 1) {
            console.log('ret!=1 !!!!')
            show_error(req, res)
            return
        }

    res.send("<html>{ret=1}</html>")
    })
}

function save_game_info(game_info, count, cb) {
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKFire_AddRecord'

    var success = 1

    console.log(game_info)  
    for (var i = 0; i < game_info.length; ++i) {
        var args = game_info[i]
        db.exec_sp(sp_name, args, function(err, rows, output, ret) {
            console.log('ret:'+ret)
        err && console.log("err:"+err)
            if (ret == 0 || err) {
                cb(ret)
                return
            }
            
            if(success >= count) {
                cb(1)
            }
            
            success++
        })
    }
}

function get_game_info(req) {
    var count = req.body.count
    var game_info = []

    if(count == 0){
        var info = {
            "@PKRound"         : req.body.g,
            "@TableNo"         : 0, 
        }
        game_info.push(info)
        return game_info
    }

    for(var i = 1; i <= count; i++){
        var TableNo   = req.body["i" + i]
        // if(parseInt(TableNo) != TableNo){
        //     return false
        // }

        var LeftName  = req.body["l" + i]
        var RightName = req.body["r" + i]

        var LeftServerName  = req.body["ls" + i]
        var RightServerName = req.body["rs" + i]

        if( (LeftName && LeftName.length > 30) || (RightName  && RightName.length > 30) || ( LeftServerName&&LeftServerName.length > 30)||(RightServerName&&RightServerName.length > 30)){
            return false
        }
        
        var info = {
            "@PKRound"         : req.body.g,
            "@TableNo"         : TableNo, 
            "@LeftName"        : LeftName, 
            "@RightName"       : RightName,
            "@LeftServerName"  : LeftServerName,
            "@RightServerName" : RightServerName
        }

        game_info.push(info)
    }

    return game_info
}

function show_error(req, res) {
    console.log("添加星空争霸错误：")
    console.log(req.body)
    res.send("<html>{ret=0}</html>")
}
//--------------------------------------------------------------------------------------------------------
var input_checks = {
    g     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 1, max : 4, err_info : false },
            { type : 'regex', value : /^[0-9]{1,4}$/, err_info : false }
        ]
    },
    count :{
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 1, max : 4, err_info : false },
            { type : 'regex', value : /^[0-9]{1,4}$/, err_info : false }
        ]
    }
}
