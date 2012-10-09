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
    app.et.emit('ready')
}
//-------------------------------------------------------------------------------------------------------
app.ip = {}
function get_ip() {
    var ip_addr   = ms.csv().fromPath(__dirname + "/shangyooip.csv")
    ip_addr.on('data', function(data, index) {
        if (index <= 0 || !data[0]) {
            return
        }
        app.ip[data] = true
    })
}
get_ip()