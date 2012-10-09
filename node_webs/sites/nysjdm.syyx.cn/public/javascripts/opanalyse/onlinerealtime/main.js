$(document).ready(function(){
	
    $('#divserverTip').addClass('displaynone'); 

    $('#txtStatDate').datepicker({
                changeMonth: true,
                changeYear: true,
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                dateFormat: 'yy-mm-dd',
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                yearRange: '-60:+00',
                maxDate: '+0d',
                duration: 'fast'
            });
	$('#txtEndDate').datepicker({
                changeMonth: true,
                changeYear: true,
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                dateFormat: 'yy-mm-dd',
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                yearRange: '-60:+00',
                maxDate: '+0d',
                duration: 'fast'
            });
	
	getServerList();
    
    $('#btnQuery').bind('click',function(){
        get_dailyonline_list();
    })

    $('#rdCus').click(function(){
       get_checkbox_server();
    })

    setInterval(get_dailyonline_list,600000);
})

function getServerList(){
     $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/link_server_viewlist?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $('#serverList').empty();
            $('<option value="0">全服</option>').appendTo($('#serverList'));
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ServerID+'"> '+item.Title+'</option>')
                    .appendTo($('#serverList'));
            })
        }
    })
    var formatDate = getDate(new Date());
    $('#txtStatDate').val(formatDate);
    $('#txtEndDate').val(formatDate);
    $('#queryType').val(0);
    $('input[name=server]').get(0).checked = true;
    $('#chkShowValue').attr('checked',false);
}

//动态获取实时在线数据
function get_dailyonline_list(){
    //var serverID    = $('#serverList').children('option:selected').val();
    var serverID    = get_server_value();
    var allServer   = serverID == 0?1:0;
    var startDate   = $('#txtStatDate').val();
    var endDate     = $('#txtEndDate').val();
    var type        = $('#queryType').val();
    var isShowValue = $('#chkShowValue').attr('checked') == 'checked';
    var serverName = "";

    if(serverID == 0){
        serverName = "全服";
    }else if(serverID == -1){
        serverName = "未选择服务器";
    }else{
        serverName = $('#hiddenServerName').val();
    }

    $('#divserverTip').removeClass('displaynone').empty();
    $('<span class="tip_icon"></span><lable>服务器：' + serverName +'</lable>').appendTo('#divserverTip');
    

    if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }

    if(startDate == endDate && type == 2){
        $('#queryType').val(1);
        type = 1;
    }

    if(startDate != endDate){
        $('#queryType').val(2);
        type = 2;
    }
   
     $.ajax({
        url:'http://nysjdm.syyx.cn/opanalyse/daily_online_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {StartDate:startDate,EndDate:endDate,AllServer:allServer,ServerID:serverID,Type:type},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
                var strXml = "<graph caption='在线人数' animation='0' baseFont='宋体' color='8BBA00' baseFontSize='12' xAxisName='时间' YAxisName='人数' formatNumberScale='0' divLineColor='ff5904' showNames='1' ";
                if(isShowValue == 0){
                    strXml = strXml + "showValues='0' >";
                }else{
                    strXml = strXml + "showValues='1' >";
                }
                $.each(json.rows, function(i, item) {
                    if(type == 2){
                       strXml = strXml + "<set name='"+item.RecordTime+"' value='"+item.Amount+"' hoverText='("+item.RecordTime+")="+item.Amount+"' />";
                    }else{
                        var dateObject = formateDate(item.RecordTime);
                        var RecordTime = dateObject.Hour + ":" + dateObject.Minute;
                        if(dateObject.Minute == "00"){   
                            strXml = strXml + "<set name='"+ RecordTime +"' value='"+item.Amount+"' hoverText='("+ RecordTime +")="+item.Amount+"' />";
                        }else{
                            strXml = strXml + "<set value='"+item.Amount+"' hoverText='("+ RecordTime +")="+item.Amount+"' />";     
                        }
                    }
                 })
                strXml = strXml + "</graph>";
                var chartLine = new FusionCharts("http://s1.syyx.com/nysjdm/FusionCharts/Line.swf", "chartLineID", "1050", "300");
                chartLine.setDataXML(strXml);
                chartLine.render('allServerChart');
            }
        });
}