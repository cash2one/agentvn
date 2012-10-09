exports.action = function(req, res) {
    var account = req.body.account
    var card    = req.body.card
    if(!account || !card) {
        res.send("非法访问")
        return
    }
    ms.account_mgr.check_exists(account, function(err) {
        if(err == 1) {
            ms.card_mgr.check_card(card, function(ret) {
                if(ret == 0){
                    ms.card_mgr.activate(account, card, function(ret) {
                        if(ret == 0) {
                            res.send("0");
                        } else if(ret == -3 || ret == -2) {
                            res.send("激活码已使用")
                        } else {
                            res.send("异常错误")
                        }
                    })
                } else if(ret == -3){
                    res.send("激活码已使用");
                } else {
                    res.send("激活码无效");
                }
            })
        } else {
            res.send("帐号不存在");
        }
    })
}