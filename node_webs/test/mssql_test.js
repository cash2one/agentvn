//----------
var mssql = require("mssql_odbc")
var u2    = require("util2")

var date = new Date()
console.log(date)
date = u2.date_to_ms_datetime(date, "odbc")
console.log(date)

mssql.open("dsn=ShangYoo;uid=sa;pwd=soholife123",function(db,err) {
	mssql.exec_sp(db,"test","cp_TestData_AddRecord",[date], function(){
		console.log(arguments)
	})
})	
	



