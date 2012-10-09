//--------------------------------------------------------------------------------------------------------
//设置时间
//--------------------------------------------------------------------------------------------------------
function set_date(strInterval, Number){
    var date = new Date();
    var dt2=date.Format('yyyy-MM-dd');
    var dt1=date.DateAdd(strInterval,Number).Format('yyyy-MM-dd');
    

    $("#txtStartTime").datebox("setValue", dt1); 
    $("#txtEndTime").datebox("setValue", dt2); 
}