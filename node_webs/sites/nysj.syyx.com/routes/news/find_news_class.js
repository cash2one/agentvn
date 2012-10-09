var db_article_category = require('../../db/article_categories')

exports.action = function (req, res) {
    
    db_article_category.find_all(function(err, result) {
        if (err) {
            res.send(null)
            return
        }

        if(!result) {
            res.send(null)
            return
        }
        
        res.send(result)
    })
}