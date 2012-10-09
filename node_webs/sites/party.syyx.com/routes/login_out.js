exports.action = function(req,res){
	res.header('P3P', 'CP="CAO PSA OUR"')
    var coo = ms.u2.set_cookies(res, "shangyoo2","", { domain:".syyx.com", path: '/' })
    res.send("1")
}