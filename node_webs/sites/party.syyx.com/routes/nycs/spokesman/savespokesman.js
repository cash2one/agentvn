exports.action = function(req, res){
    if(req.cookies["spokesman"]){
        res.send( {err:"每天限投一票！感谢你对《诺亚传说》代言人蔡依林的支持！"} )
        return 
    }


    save_sing(req.body.votingtype, function(ret) {
        if (ret != 1) {
            console.log('spokesman add error:')
            res.send( { err : "投票失败" })
            return
        }


        res.header('P3P', 'CP="CAO PSA OUR"')
        ms.u2.set_cookies(res, "spokesman","heipi", { domain:".syyx.com", maxAge : 1000 * 60 * 60 * 24 })
        res.send( {err:null} )
    })      
}

function save_sing(voting_type,cb){

    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_spokesman_AddRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        cb(2)
        return
    }
    
    var voting = {"@VotingType" : voting_type}
    db.exec_sp(sp_name, voting, function(err, rows, output_params, ret) {
        if (ret == 0 || err) {
            cb(ret)
            return
        }
        
        cb(ret)
    })
}