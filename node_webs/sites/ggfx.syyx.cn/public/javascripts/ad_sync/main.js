//--------------------------------------------------------------------------------------------------------

$(function(){    
	$("#btnSync").click(function(){
        $("#btnSync").attr("disabled","disabled");
        $("#spMsg").html("<font color='#0F8BDA'>正在同步数据.......</font>")
        $.ajax({
            url: "http://ggfx.syyx.cn/ad_sync_data?r="+Math.random(),
            type: "get",
            dataType: "json",
            data: { },
            beforeSend: function() { $("#loading").show(); },
            complete: function() { $("#loading").hide(); },
            success: function(json) {
                if (json.retcode == 0) {
                    alert("同步数据成功");  
                    $("#spMsg").html("<font color=blue>同步数据成功</font>");
                }
                else {
                    alert("同步数据失败");
                    $("#spMsg").html("<font color=red>同步数据失败</font>");
                }
                $("#btnSync").removeAttr("disabled");
            }
        });
	})
})
