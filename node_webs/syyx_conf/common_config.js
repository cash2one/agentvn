//-------------------------------------------------------------------------------------------------------
// 加密密钥
exports.security = {
	db     : 'shangY00',
	telnet : 'shangY00',
	cookie : 'shangY00',
}
//-------------------------------------------------------------------------------------------------------
// 主服务器
exports.host = {
	ip 			: '192.168.2.40',
	port 		: 80,
}
//-------------------------------------------------------------------------------------------------------
// http管理后台
exports.admin = {
	ip 			: '192.168.2.40',
	port 		: 8080,
}
//-------------------------------------------------------------------------------------------------------
// telnet管理后台
exports.telnet = {
	ip       : '192.168.2.40',
	port     : 8888,
	user 	 : 'root',
	password : '502058db25bae671c2928c37d906f457',
}

//-------------------------------------------------------------------------------------------------------
// 站点
exports.vhosts = [
	'events.syyx.com',
	'r.syyx.com',
]
//-------------------------------------------------------------------------------------------------------
// 数据库
exports.db_server = {
    mssql : [
        { host : '192.168.1.246\\sql2008', port : 1433, user : 'sa', password : 'ee1eec329c1cfcecbc502795f724a154' },
        // { host : '192.168.1.246\\sql2008', port : 1433, user : 'sa', password : '' },
    ],

    mongo : [
        { host : '192.168.10.238', port : 27017, user : 'sa', password : '4c55cde1ebdd612c09b70a4669451d3e' },
        // { host : '192.168.10.238', port : 27017, user : 'sa', password : '' },
    ],

    mysql : [

    ],

    oracle : [
        
    ],
}
//-------------------------------------------------------------------------------------------------------