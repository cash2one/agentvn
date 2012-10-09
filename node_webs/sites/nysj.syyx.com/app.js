//-------------------------------------------------------------------------------------------------------
// app.js: 
//-------------------------------------------------------------------------------------------------------
console.log('\nwebsite:', __dirname)
var app = exports.app = ms.common_app.create(__dirname)
//-------------------------------------------------------------------------------------------------------
app.et.on('common_init_ready', function() {
        init()
    })
//-------------------------------------------------------------------------------------------------------
var init = function() {
	load_sms_info()
}
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
function load_sms_info() {
    var sms_config  = ms.sites_config['nysj.syyx.com'].sms

    var account  = sms_config.account
    var password = sms_config.password
    
    if(!account || !password) {
        return
    }

    app.sms_sp = ms.sms.init(account, password)
    app.et.emit('ready')
}