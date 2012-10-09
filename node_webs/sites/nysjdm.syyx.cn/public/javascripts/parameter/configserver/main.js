$(document).ready(function(){

    $('#hiddenID').val(0);
    get_servertype_list(0);
    get_server_list();

    $('#btnAdd').toggle(function(){
        $('#btnAdd').val("取消")
        clear_form();
    },function(){
        $('#btnAdd').val("添加")
        clear_form();
    })

    $('#btnSave').bind('click',function(){
        if($('#hiddenID').val()==0){
            add_server();
        }else{
            upd_server();
        }
    })
})

//动态获取服务器类型
function get_servertype_list(itemID){
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/server_type_list?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            $('#radioServerType').empty();
            $.each(json.rows,function(i,item){
                if(itemID == item.ID)
                {
                    $('<span><input type="radio" name="servertype" checked="checked" value="'+item.ID+'"> '+item.ParamsTitle+'</input></span>')
                    .appendTo($('#radioServerType'));
                }else{
                    $('<span><input type="radio" name="servertype"  value="'+item.ID+'"> '+item.ParamsTitle+'</input></span>')
                    .appendTo($('#radioServerType'));
                }
            })
        }
    })
}

//动态获取服务器信息
function get_server_list(){
     $('#listContent').datagrid({
                url: 'http://nysjdm.syyx.cn/parameter/link_server_list?r=' + Math.random(),
                title: '服务器配置',
                width: 900,
                height: 400,
                fitColumns: true,
                nowrap: false,
                rownumbers: true,
                singleSelect: true,
                columns: [[
                    { field: 'ServerID', title: '服务器编号', width: 80, align: 'center' },
                    { field: 'Title', title: '服务器名称', width: 220, align: 'center' },
                    { field: 'PartName', title: '大区名称', width: 150, align: 'center' },
                    { field: 'ServerTypeTitle', title: '服务器类型', width: 100, align: 'center' },
                    { field: 'IsEnabled', title: '是否启用', width: 60, align: 'center', formatter: function(value) { return formatEnabled(value) } },
                    { field: 'IsShow', title: '是否显示', width: 60, align: 'center', formatter: function(value) { return formatEnabled(value) } },
                    { field: 'op', title: '操作', width: 60, align: 'center', formatter: function(value, rec) {
                        return "<a href='#' color='green' onclick=get_record_info(" + rec.ID + ")>编辑</a>";
                    }
                    }
                ]]
     });
}
 
function get_record_info(itemID){
     $('#hiddenID').val(itemID);
     $.ajax({
        url: "http://nysjdm.syyx.cn/parameter/link_server_info?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: {ItemID : itemID},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if(json.rows.length>0){
                var item = json.rows[0];                
                $("#txtServerID").val(item.ServerID); 
                $('#txtLinkServer').val(item.LinkServer);
                $('#txtServerAlias').val(item.ServerAlias);
                $("#chkEnable").attr("checked", item.IsEnabled);
                $("#chkShow").attr("checked", item.IsShow);
                $('#txtJobID').val(item.JobID); 
                get_servertype_list(item.ServerTypeID);  
            }         
        }
    });
}

//取消服务器配置
function clear_form(){
    $('#hiddenID').val(0);
    $('#txtServerID').val('');
    $('#txtLinkServer').val('');
    $('#txtServerAlias').val('');
    $('#chkEnable').attr('checked',false);
    $('#chkShow').attr('checked',false);
    $('#txtJobID').val('0');
    get_servertype_list(0);
}

//保存服务器配置
function add_server(){
    var serverID    = $('#txtServerID').val();
    var linkServer  = $('#txtLinkServer').val();
    var serverAlias = $('#txtServerAlias').val();
    var isEnabled   = $('#chkEnable').attr('checked') == 'checked';
    var isShow      = $('#chkShow').attr('checked') == 'checked';
    var jobID       = $('#txtJobID').val(); 
    var serverType  = $('input:radio[name="servertype"]:checked').val();

    if(!serverID || serverID == "" || serverID <= 0){
        $.messager.alert("提示", "<font color=red><b>服务器编号不能为空或者为零</b></font>", "error");
        return
    }

    if(!linkServer || linkServer == ""){
        $.messager.alert("提示", "<font color=red><b>链接服务器不能为空</b></font>", "error");
        return
    }

    if(!serverAlias || serverAlias == ""){
        $.messager.alert("提示", "<font color=red><b>服务器别名不能为空</b></font>", "error");
        return
    }

    if(!serverType || serverType == ""){
        $.messager.alert("提示", "<font color=red><b>服务器类别不能为空</b></font>", "error");
        return
    }

    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/link_server_add?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{ServerID:serverID,LinkServer:linkServer,ServerAlias:serverAlias,IsEnabled:isEnabled,IsShow:isShow,JobID:jobID,ServerType:serverType},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            if (json.retcode > 0){
                $.messager.alert("提示", "添加服务器配置成功", "info");
                get_server_list();
                return
            }else if(json.retcode == -1){
                $.messager.alert("提示", "<font color=red><b>已经存在相同的服务器ID</b></font>", "error");
                return
            }else{
                $.messager.alert("提示", "<font color=red><b>添加服务器配置失败</b></font>", "error");
                return
            }
        }
    })

}

//更新服务器信息
function upd_server(){
    var ID          = $('#hiddenID').val();
    var linkServer  = $('#txtLinkServer').val();
    var serverAlias = $('#txtServerAlias').val();
    var isEnabled   = $('#chkEnable').attr('checked') == 'checked';
    var isShow      = $('#chkShow').attr('checked') == 'checked';
    var jobID       = $('#txtJobID').val(); 
    var serverType  = $('input:radio[name="servertype"]:checked').val();
   
    if(!linkServer || linkServer == ""){
        $.messager.alert("提示", "<font color=red><b>链接服务器不能为空</b></font>", "error");
        return
    }

    if(!serverAlias || serverAlias == ""){
        $.messager.alert("提示", "<font color=red><b>服务器别名不能为空</b></font>", "error");
        return
    }

    if(!serverType || serverType == ""){
        $.messager.alert("提示", "<font color=red><b>服务器类别不能为空</b></font>", "error");
        return
    }

    if(!jobID || jobID == ""){
        jobID = 1;
    }
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/link_server_upd?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{ID:ID,LinkServer:linkServer,ServerAlias:serverAlias,IsEnabled:isEnabled,IsShow:isShow,JobID:jobID,ServerType:serverType},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            if (json.retcode == 0){
                $.messager.alert("提示", "更新服务器配置成功", "info");
                get_server_list();
                return
            }else{
                $.messager.alert("提示", "<font color=red><b>更新服务器配置失败</b></font>", "error");
                return
            }
        }
    })
}
