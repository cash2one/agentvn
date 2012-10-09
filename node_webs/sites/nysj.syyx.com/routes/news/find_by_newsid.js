var db_articles = require('../../db/articles')
var time        = require('../../helper/time')

exports.action = function (req, res) {
    if (!req.body.id) {
        res.send(null)
        return
    }

    db_articles.find_article_by_id(req.body.id, function(err, result) {
        if (err) {
            res.send(null)
            return
        }

        if(!result) {
            res.send(null)
            return
        }
       
        res.send(time.convert_target_key(result,['display_time'],'yyyymmdd'))
    })
}