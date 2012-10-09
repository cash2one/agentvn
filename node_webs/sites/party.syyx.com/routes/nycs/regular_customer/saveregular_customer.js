exports.action = function(req, res){
    // if(req.cookies["spokesman"]){
    //     res.send( {err:"每天限投一票！感谢你对《诺亚传说》代言人蔡依林的支持！"} )
    //     return 
    // }


    save_sing(req.body.rolename,req.body.mobile,req.body.email,req.body.servername,req.body.merolename, function(ret) {
        if (ret != 1) {
            console.log('regular_customer add error:')
            res.send( { err : "投票失败" })
            return
        }else{
            res.send( { err : "提交成功！" })
        }


        // res.header('P3P', 'CP="CAO PSA OUR"')
        // ms.u2.set_cookies(res, "spokesman","heipi", { domain:".syyx.com", maxAge : 1000 * 60 * 60 * 24 })
        // res.send( {err:null} )
    })      
}


function save_sing(rolename,mobile,email,servername,merolename,cb){

    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_tmp_regular_customer_AddRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        cb(2)
        return
    }
    
    var voting = { "@rolename" : rolename,"@mobile":mobile,"@email":email,"@server":servername,"@merolename":merolename  }
    db.exec_sp(sp_name, voting, function(err, rows, output_params, ret) {
        if (ret == 0 || err) {
            console.log(err, ret)
            cb(ret)
            return
        }
        
        cb(ret)
    })
}