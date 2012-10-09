//添加星空争霸冠军
exports.action=function(req,res){
    var count = req.body.count

    if(count == 0){
        success_error(req, res)
        return
    }

    var ret = _G_check_request_data(req, input_checks)
    if (ret) {
        console.log('check faild')
        show_error(req, res)
        return
    }

    var firerank_info = get_firerank_info(req)
    if(!firerank_info || firerank_info.length == 0){
        console.log('length == 0 !!' )
        console.log(firerank_info)
        show_error(req, res)
        return
    }
    
    save_firerank_info(firerank_info, count,function(ret){
        if(ret != 1){
            show_error(req, res)
            return
        }
        res.send("<html>{ret=1}</html>")
    })
}

function save_firerank_info(firerank_info, count, cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKFireRank_AddRecord'

    var success = 1
    for(var i = 0; i < firerank_info.length; i++){
        var args = firerank_info[i]
        db.exec_sp(sp_name, args, function(err, rows, output, ret) {

            if (ret == 0 || err) {
                cb(ret)
                return
            }
            
            if(success >= count ) {
                cb(1)
            }
            
            success++
        })
    }
}

function get_firerank_info(req){
    var firerank_info = []
    var count = req.body.count

    if(count == 0){
        return firerank_info
    }
    
    for(var i = 1; i <= count; i++){
        
        round = req.body["g" + i]
        // if(parseInt(round) != round){
        //     return false
        // }

        FirstGroupName = req.body["n" + i]
        UserName       = req.body["m" + i]
        ServerName     = req.body["s" + i]

        if((FirstGroupName && FirstGroupName.length > 30) ||(UserName && UserName.length > 30) ||(ServerName && ServerName.length > 30)){
            console.log("参数长度错误")
            console.log(req.body)
            return false
        }

        var args    = {
            "@PKRound" : round,
            "@ServerName" : ServerName, 
            "@FirstGroupName" : FirstGroupName, 
            "@UserName" : UserName
        }
        firerank_info.push(args)
    }
    return firerank_info
}

function show_error(req, res){
    console.log("添加星空争霸冠军错误：")
    console.log(req.body)
    res.send("<html>{ret=0}</html>")
}

function success_error(req, res){
    console.log("添加星空争霸冠军错误：")
    console.log(req.body)
    res.send("<html>{ret=1}</html>")
}

//--------------------------------------------------------------------------------------------------------
var input_checks = {
    count :{
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 1, max : 4, err_info : false },
            { type : 'regex', value : /^[0-9]{1,4}$/, err_info : false }
        ]
    }
}