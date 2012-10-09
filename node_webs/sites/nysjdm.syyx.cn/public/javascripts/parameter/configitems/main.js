//ConfigItems
$(document).ready(function(){
    
    $('#hiddenID').val(0);
    getParamsList();
    
    $('#btnQuery').bind('click',function(){
        getItemList();
    })

    $('#btnAdd').toggle(function(){
        $('#btnAdd').val("取消")
        clear_form();
    },function(){
        $('#btnAdd').val("添加")
        clear_form();
    })

    $('#btnSave').bind('click',function(){
        if($('#hiddenID').val()==0){
            add_item();
        }else{
            upd_item();
        }
    })

    $('#configParams').change(function(event){      
        var paramsType = $(this).children('option:selected').val();
        getClassList(paramsType);
        event.stopPropagation();
    })

})

//获取参数列表
function getItemList(){
    clear_form();
    var classID = $('#configClass').children('option:selected').val();
    var getType = $('#configType').children('option:selected').val();

    if(!classID || classID == ""){
        $.messager.alert("提示", "<font color=red><b>统计类不能为空，请先进行相应配置</b></font>", "error");
        return
    }

    $('#listconfigItems').datagrid({
                url: 'http://nysjdm.syyx.cn/parameter/config_items_list_post?ClassID=' + classID + '&GetType=' + getType + '&r=' + Math.random(),
                title: '参数配置',
                width: 680,
                height: 300,
                fitColumns: true,
                nowrap: false,
                rownumbers: true,
                singleSelect: true,
                columns: [[
                    { field: 'ItemNo', title: '编号', width: 100, align: 'center' },
                    { field: 'ItemName', title: '名称', width: 250, align: 'center' },
                    { field: 'OrderNo', title: '排序', width: 80, align: 'center' },
                    { field: 'IsEnabled', title: '是否启用', width: 80, align: 'center', formatter: function(value) { return formatEnabled(value) } },
                    { field: 'op', title: '操作', width: 60, align: 'center', formatter: function(value, rec) {
                        return "<a href='#' onclick=get_record_info(" + rec.ID + ")>编辑</a>  <a href='#' onclick=del_record_info(" + rec.ID + ")>删除</a>";
                    }
                    }
                ]]
            });
}

//获取类型具体明细
function get_record_info(itemID){
     $('#hiddenID').val(itemID);
     $.ajax({
        url: "http://nysjdm.syyx.cn/parameter/config_items_info?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: {ItemID : itemID},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if(json.rows.length>0){
                var item = json.rows[0];                
                $("#txtItemNo").val(item.ItemNo); 
                $('#txtItemName').val(item.ItemName);
                $("#txtOrderNo").val(item.OrderNo); 
                $("#chkEnable").attr("checked", item.IsEnabled);
            }         
        }
    });
}

//删除类型具体明细
function del_record_info(itemID){
     $.messager.confirm("确认", "确定要删除该记录吗？", function(r) {
                if (r) {
                         $.ajax({
                            url: "http://nysjdm.syyx.cn/parameter/config_items_del?r="+Math.random(),
                            type: "get",
                            dataType: "json",
                            data: {ItemID : itemID},
                            beforeSend: function() { $("#loading").show(); },
                            complete: function() { $("#loading").hide(); },
                            success: function(json) {
                                if(json.err == 0){
                                    $.messager.alert("提示", "删除记录成功", "info");
                                    getItemList();
                                    return
                                }else{
                                    $.messager.alert("提示", "<font color=red><b>删除记录失败</b></font>", "error");
                                    return
                                }         
                            }
                        });
                }
        });
}

//获取大类列表
function getParamsList(){
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_params_list?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            $('#configParams').empty();
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ParamsFlag+'"> '+item.ParamsName+'</option>')
                    .appendTo($('#configParams'));
            })
            getClassList($('#configParams').children('option:selected').val());
        }
    })
}

//获取类型列表
function getClassList(paramsType){
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_class_list?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{ParamsType:paramsType},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            $('#configClass').empty();
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ID+'"> '+item.ClassName+'</option>')
                    .appendTo($('#configClass'));
                })
            }
        });
}

//取消服务器配置
function clear_form(){
    $('#hiddenID').val(0);
    $('#txtItemNo').val('');
    $('#txtItemName').val('');
    $('#txtOrderNo').val('');
    $('#chkEnable').attr('checked',false);
}

//添加新类型
function add_item(){
    var itemNo    = $('#txtItemNo').val();
    var itemName  = $('#txtItemName').val();
    var classID = $('#configClass').children('option:selected').val();
    var getType = $('#configType').children('option:selected').val();
    var orderNo   = $('#txtOrderNo').val();
    var isEnabled = $('#chkEnable').attr('checked') == 'checked';

    if(!itemNo || itemNo == ""){
        $.messager.alert("提示", "<font color=red><b>编号不能为空</b></font>", "error");
        return
    }

    if(!itemName || itemName == ""){
        $.messager.alert("提示", "<font color=red><b>名称不能为空</b></font>", "error");
        return
    }

    if(!orderNo || orderNo == ""){
        orderNo = 1;
    }

    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_items_add?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{ItemNo:itemNo,ItemName:itemName,ClassID:classID,GetType:getType,OrderNo:orderNo,IsEnabled:isEnabled},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            if (json.retcode == 0){
                $.messager.alert("提示", "添加记录成功", "info");
                getItemList();
                return
            }else{
                $.messager.alert("提示", "<font color=red><b>添加记录失败</b></font>", "error");
                return
            }
        }
    })
}

//添加新类型
function upd_item(){
    var id        = $('#hiddenID').val();
    var itemNo    = $('#txtItemNo').val();
    var itemName  = $('#txtItemName').val();
    var classID   = $('#configClass').children('option:selected').val();
    var getType   = $('#configType').children('option:selected').val();
    var orderNo   = $('#txtOrderNo').val();
    var isEnabled = $('#chkEnable').attr('checked') == 'checked';
    
    if(!itemNo || itemNo == ""){
        $.messager.alert("提示", "<font color=red><b>编号不能为空</b></font>", "error");
        return
    }

    if(!itemName || itemName == ""){
        $.messager.alert("提示", "<font color=red><b>名称不能为空</b></font>", "error");
        return
    }
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_items_upd?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{ID:id,ItemNo:itemNo,ItemName:itemName,ClassID:classID,GetType:getType,OrderNo:orderNo,IsEnabled:isEnabled},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            if (json.retcode == 0){
                $.messager.alert("提示", "更新记录成功", "info");
                getItemList();
                return
            }else{
                $.messager.alert("提示", "<font color=red><b>更新记录失败</b></font>", "error");
                return
            }
        }
    })
}
