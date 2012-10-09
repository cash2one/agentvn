function formatEnabled(value){
	if(value)
		return '<font color="blue">是</font>';
	else
		return '<font color="red">否</font>';
};

function formateDate(value){
	var time = value.substring(value.indexOf(" "));
	var time_format = time.split(":");
 	return {
 		 Hour  :   time_format[0], 
		 Minute:   time_format[1]
	} 
}

function getDate(value){
    var thisYear = value.getFullYear();
    var thisMonth = value.getMonth() + 1;
    //如果月份长度是一位则前面补0   
    if (thisMonth < 10) thisMonth = "0" + thisMonth;

    var thisDay = value.getDate();
    //如果天的长度是一位则前面补0   
    if (thisDay < 10) thisDay = "0" + thisDay;

    return thisYear + "-" + thisMonth + "-" + thisDay;
}