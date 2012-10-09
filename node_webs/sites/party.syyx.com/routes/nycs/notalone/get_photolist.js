exports.action = function(req,res){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_notalone_GetPageRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        res.send({count : 0})
        return
    }

    var args = {
        "@RoleType" : req.body.RoleType || '',
        "@Province" : req.body.Province || '',
        "@City"     : req.body.City || '',
        "@Page"     : req.body.Page || 1,
        "@PageSize" : req.body.PageSize || 8
    }

    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
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
                    '  "RoleType" : '     + ms.u2.json_escape(rows[i].RoleType) + 
                    ', "Province" : '     + ms.u2.json_escape(rows[i].Province) + 
                    ', "City" : '         + ms.u2.json_escape(rows[i].City) +
                    ', "NickName" : '     + ms.u2.json_escape(rows[i].NickName) + 
                    ', "UserPic" : '      + ms.u2.json_escape(rows[i].UserPic) +
                    ', "UserPicSmall" : ' + ms.u2.json_escape(rows[i].UserPicSmall) + 
                    ', "Content" : '      + ms.u2.json_escape(rows[i].Content) + 
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