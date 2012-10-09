
exports.action = function(req, res) {
    var account   = " "
    var client_ip = ms.u2.get_req_ip(req)
    var page_name = req.query.page_name

    if(req.query.validate_pic && req.session.captcha){
        if (req.query.validate_pic.toLocaleLowerCase() != req.session.captcha.toLocaleLowerCase()) {
            res.send({ type : 1 })
            return
        }
    }

    var ret = ms.card_mgr.apply_card(account, client_ip, page_name, function(err, card) {
        if (!card) {
            res.send({ type : 'no_card' })
            ms.u.log(ms.u.format('[%s] get card failed, %s', page_name, err))

            return
        }

        res.send({ type : 'ok', info : card })
        ms.u.log(ms.u.format('[%s] get card ok', page_name))
    })

    if (!ret) {
        res.send({ type : 'no_card' })
        ms.u.log(ms.u.format('[%s] get card failed, invalid page_name', page_name))
    }
}
