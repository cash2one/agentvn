function get_checkbox_server(){
    var partNameKey = {};
    var divBody = "<div class='serverlist_box'>"
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/link_server_list?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            $('#checkboxDetailList').empty();
            var serverlistLen = json.rows.length;
            var serverlistObj = {};
            for(var i = 0 ; i < serverlistLen; i++){
                if(!serverlistObj[json.rows[i].PartName]){
                    serverlistObj[json.rows[i].PartName] = [{Title : json.rows[i].Title, ServerID : json.rows[i].ServerID}]
                }else{
                    serverlistObj[json.rows[i].PartName].push({Title : json.rows[i].Title, ServerID : json.rows[i].ServerID})
                }
            }
            var index = 0;
            for(var serverKey in serverlistObj) {
                index ++;
                divBody += "<div class='part_server'>";
                divBody += "<h1><input type='checkbox' value='0' onclick=\"select_all(this,'Part"+ index + "')\"></input><font size='3' color='#9F5F9F'>" + serverKey + "</font></h1>";
                divBody += "<div class='about_part'>";
                var partserverLen = serverlistObj[serverKey].length;
                for(var j = 0; j < partserverLen; j++) {
                    var serverItem = serverlistObj[serverKey][j];
                    divBody += "<input id='checkServer" + serverItem.ServerID + "' name='Part"+ index +"' type='checkbox' value='" + serverItem.ServerID + "'>" + serverItem.Title + "</input>";
                }
                divBody += "</div></div>";
            }
            divBody += "</div>"
            $(divBody).appendTo("#checkboxDetailList");

            $('#checkboxserverList').dialog({
            buttons: [{
                text: '确定',
                iconCls: 'icon-ok',
                handler: function() {
                    close_window();
                } }]
            });
        }
    })     
}

function close_window(){
    $('#checkboxserverList').window('close');  
}

function show_window(){
    $('#checkboxserverList').window('open');  
}

function get_server_value(){
    var v_radio = document.getElementById('rdAll');
    var checkbox_val = "";
    var checkbox_text = "";

    if(v_radio.checked){
         return 0;
    }
    $(".about_part input[type='checkbox']:checked").each(function(){
        checkbox_val  += $(this).val()+',';
        checkbox_text += $(this).parent().text()+'--'; 
    }); 
    if(checkbox_val.length == 0){
        return -1;
    }else{
        checkbox_val  = checkbox_val.substring(0,checkbox_val.length-1);
        checkbox_text = checkbox_text.substring(0,checkbox_text.length-2); 
        $('#hiddenServerName').val(checkbox_text);
        return checkbox_val;
    }
}

function select_all(e, itemname) {
    var chk = document.getElementsByName(itemname);
    if (chk == undefined) return;
    for (var i = 0; i < chk.length; i++) chk[i].checked = e.checked;
}
