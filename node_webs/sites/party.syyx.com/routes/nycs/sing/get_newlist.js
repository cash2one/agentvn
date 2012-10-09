exports.action = function(req,res){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_resing_GetPageRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        res.send({count : 0})
        return
    }

    var args = {
        "@Page"     : req.body.Page || 1,
        "@PageSize" : req.body.PageSize || 8
    }
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret) {
        if (err) {
            console.log("sing newlist error")
            res.send({count : 0})
            return
        }
        
        var len = rows.length
        var ret = []
        var n = {}
        for(var i = 0; i < len; i++) {
            var ID = rows[i].ID
            if(!n[ID]) {
                n[ID] = true
                var s = '{' +
                    '  "NickName" : '     + ms.u2.json_escape(rows[i].NickName) + 
                    ', "ID" : '         + (rows[i].ID) + 
                    ', "content" : '         + ms.u2.json_escape(rows[i].content) +
                    ', "votecount" : '     + (rows[i].votecount) + 
                    '  }'
                ret.push(s)
            }           
        }

         if(rows){
            var ret_str = '{"count" : '+ output_params["@RowCount"] + ', "rows" : [' + ret + ']}'
            try {
                var r = JSON.parse(ret_str)
                res.send(r)
            }
            catch (e) {
                console.error('JSON.parse error:', ret_str)
                console.error(e, '\n')
                
                res.send({count : 0})
            }
        }
        else{
            res.send({count : 0})
        }
    })
}