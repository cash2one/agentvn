//--------------------------------------------------------------------------------------------------------
$(function(){
    $("#btnSearch").click(function(){
        search_adname();
    })
})
//--------------------------------------------------------------------------------------------------------
//获取记录列表
//--------------------------------------------------------------------------------------------------------
function search_adname() {
    var str = $("#txtADIDList").val();
    if($.trim(str)==""){
        alert("请输入需要反查的广告代码");
        return;
    }
    
    var adidlist = str.replace(/\n/g,",");

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_pegging_search?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ADIDList: adidlist },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            //显示记录
            var str="";
            $.each(json.rows, function(i, item) {
                str=str+item.ADName+"\n";
            });
            $("#txtADNameList").val(str);
        }
    });

}