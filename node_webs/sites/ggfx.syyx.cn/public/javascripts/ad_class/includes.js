function formatEnabled(value) {
    if (value)
        return "<font color='blue'>启用</font>";
    else
        return "<font color='red'>禁用</font>";
}

function formatSchedule(value) {
    if (value)
        return "<font color='blue'>已设置</font>";
    else
        return "<font color='red'>设置中</font>";
}

function getParameterByName(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getAdUrl(classid, mediaid, adid, date, value){
    if(value == 1)
        return "<a href='/ad_report_phase.html?ClassID="+classid+"&MediaID="+mediaid+"&ADID="+adid+"&Date="+date+"'>√</a>";
    else
        return " ";
}

function checkAllByID(e) {
    var el = document.getElementsByTagName('input');
    var len = el.length;
    for(var i=0; i<len; i++)
    {
        if((el[i].type=="checkbox") && (el[i].name==name))
        {
            el[i].checked = e.checked;
        }
    }
}

function checkAllByName(e, itemname) {
    var chk = document.getElementsByName(itemname);
    if (chk == undefined) return;
    for (var i = 0; i < chk.length; i++) chk[i].checked = e.checked;
}