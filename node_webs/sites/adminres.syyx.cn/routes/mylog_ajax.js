
exports.action = function (req, res) {

    var su      = req.session.user
    if(su && (su["RES_UPLOAD"] || su["RES_ALLLOG"]) ) {
        if( req.body.active == "all"){
            if(su["RES_ALLLOG"]){

                ms.persistence.find("adminres_uploadLog", {}, {sort:{upload_time : -1}}, function(err, doc) {
                    content(doc,1)
                })

            }else{
                res.send({con : "没有权限查看" , name : su.name})
            }            

        }else {

            ms.persistence.find("adminres_uploadLog", {name : su.name}, {sort:{upload_time : -1}}, function(err, doc) {
                content(doc)
            })

        }
    }
    else{
        res.send({con: "", name: ""})
    }

    //------------------------------------------------------------------------------------


    function content(doc,del) {
        var content  = ""
        var date     = new Date()
        var today    = RegExp(date.getMonth() + 1 + "月"+  date.getDate() + "日", "g")
        var len      = doc.length
        for (var i = 0; i < len; i ++ ) {
            if(doc[i].replace_time){
                date.setTime(doc[i].replace_time)                    
            }else{
                date.setTime(doc[i].upload_time)
            }
            var replace_times = (date.getMonth() + 1 + "月" + date.getDate() + "日/" + date.getHours() + ":" + date.getMinutes()).replace(today,"今天")
            content += "<tr class='" + ((doc[i].status == 0) ? "times" : "") + "'>"
            content += "<td>" + doc[i].name + "</td>"
            if(/.swf/.test(doc[i].file_fullName)) {
                content += '<td><embed width="100" height="100" name="plugin" src="http://' + doc[i].file_fullName + '" type="application/x-shockwave-flash"></td>'
            }else{
                content += "<td><img src='http://" + doc[i].file_fullName + "' /></td>"
            }            
            content += "<td><a href='http://" + doc[i].operation_page + "' target='_blank'>" + doc[i].operation_page + "</a></td>"
            content += "<td>" + replace_times + "</td>"
            content += (doc[i].status != 0) ? "<td class='" + ((/成功/.test(doc[i].status)) ? "" : "er") + "'>" + doc[i].status + "</td>" : "<td><a class='can' onclick='can($(this))'>取消定时</a><i>" + doc[i]._id + "</i></td>"
            content += "</tr>"
        }
        
        if(del) {
            var del = '删除<input id="date" type="text">天前上传记录<button onclick = "del()">删除</button>'
            res.send({con : content, name : su.name, del : del})
        }else{
            res.send({con : content, name : su.name})
        }
    }

}