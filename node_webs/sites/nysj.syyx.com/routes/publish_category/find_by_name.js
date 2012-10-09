var db_publish_categories = require('../../db/publish_categories')
var db_publish_items      = require('../../db/publish_items')
var time                  = require('../../helper/time')

exports.action = function (req, res) {
    if (!req.body.name) {
        res.send(null)
        return
    }

    db_publish_categories.find_by_name(req.body.name, function(err, result) {
        if (err) {
            console.log(err)
            res.send(null)
            return
        }

        if(!result) {
            res.send(null)
            return
        }

        if (!result.child_item) {
            res.send(null)
            return
        }

        if (result.child_item.length < 1) {
            res.send(null)
            return
        }

        db_publish_items.find_published_items(result.child_item, function(err, unrank_result) {
            var ranked_result = result.child_item.map(function(item, index, array) {
                for(var i=0; i < unrank_result.length; i++) {
                    if (unrank_result[i]._id == item) {
                        return unrank_result[i]
                    }
                }  
            })
            res.send(time.convert_target_key(ranked_result,['created_time'],'yyyymmdd'))
        })
    })
}