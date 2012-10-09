var db_articles = require('../../db/articles')
var time        = require('../../helper/time')

exports.action = function (req, res) {
    if (!req.body.classid || !req.body.page) {
        res.send(null)
        return
    }

    if (parseInt(req.body.page)<1) {
        res.send(null)
        return
    }

    db_articles.find_by_category_page(req.body.classid,parseInt(req.body.page), function(err, result) {
        if (err) {
            res.send(null)
            return
        }

        if(!result) {
            res.send(null)
            return
        }
        db_articles.total_count(req.body.classid,function(num){
            var send_client_data = {
                total_page : num,
                newslist   : time.convert_target_key(result,['display_time'],'yyyymmdd')
            }
            res.send(send_client_data)
        })
        
        
    })
}