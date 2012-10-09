
$(function(){

    $.get("/check_user_login?r=" + Math.random(), function(data) {

        if(!data.login){
            document.location = "/nycs/notalone/login.html"
        }
        else{
            $.get("/nycs/notalone/get_info?r=" + Math.random(), function(rows) {
                if(rows.length == 0){
                    document.location = "/nycs/notalone/uploadphoto.html"
                }
                else{
                    set_info(rows)
                }
            }, "json")
        }
    }, "json")

    

    $("#viewall").click(function(){
        top.location = "/nycs/notalone/photolist.html"
    })

    $("#getrnd").click(function(){
        get_rndinfo($("#rolename").html().replace("尊敬的",""))
    })

    $(".div_close").click(function(){
        parent.login_close()
    })
         
})

function set_info(rows){
    $("#rolename").html("尊敬的"+ rows[0].RoleType)
    $("#roleimg").attr("src","http://r.syyx.com"+ rows[0].UserPicSmall)

    var str = "【来自"
    if(rows[0].Province != "亚洲" && rows[0].Province != "非洲" && rows[0].Province != "欧洲" && rows[0].Province != "美洲" && rows[0].Province != "大洋洲"){
        str += rows[0].Province 
    }
    else{
    	str += rows[0].City
    }
    str += "】"
    $("#rolefrom").html(str)
    $("#rolenick").html(rows[0].NickName)
    get_rndinfo(rows[0].RoleType)
    get_server_count(rows[0].ServerName + "-"+ rows[0].RoleType, rows[0].RoleType)

    set_share("我正在参与《诺亚传说》%23秀出诺米真我%23活动，快来看看我的靓照吧~在这里我找到好多同城好友！快来和我一起参与，这个仲夏不孤单~@诺亚传说","http://r.syyx.com"+ rows[0].UserPicSmall)
}

function set_share(title,pic){
    $(".sina").click(function() {
        window.open('http://v.t.sina.com.cn/share/share.php?url=http://activity.syyx.com/cgweibo/index.aspx&title=' + title + '&pic=' + pic + '&ralateUid=1703998792&appkey=3783886085', 'newwindow', 'height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no')
    })

    $(".qq").click(function() {
        window.open('http://share.v.t.qq.com/index.php?c=share&a=index&url=http://activity.syyx.com/cgweibo/index.aspx&title=' + title + '&pic=' + pic + '&appkey=801152397', 'newwindow', 'height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no')
    })
}

function get_rndinfo(RoleType){

    var data = "r="+ Math.random() + "&RoleType=" + encodeURIComponent(RoleType)
    $.get("/nycs/notalone/get_list_rnd?r=" + Math.random(),data, function(rows) {
        if(rows.length == 0){
            return
        }

        var str = ""

        for(var v in rows){
            str += '<div class="userimg"><div class="roleimg"><img src="http://r.syyx.com'+ rows[v].UserPicSmall +'" /></div>【来自'
            if(rows[v].Province != "亚洲" && rows[v].Province != "非洲" && rows[v].Province != "欧洲" && rows[v].Province != "美洲" && rows[v].Province != "大洋洲"){
                str += rows[v].Province 
            }
            else{
                str += rows[v].City
            }
            str += "】<br>" + rows[v].NickName
            str += "</div>"
        }

        $("#rndlist").html(str)
    }, "json")
}

function get_server_count(servername, RoleType){
    var serverlist = {
        "曙光-格斗家": 101538,
        "曙光-剑武士": 228617,
        "曙光-枪械师": 136450,
        "曙光-异能者": 173124,
        "寂灭领域-格斗家": 40997,
        "寂灭领域-剑武士": 94728,
        "寂灭领域-枪械师": 45904,
        "寂灭领域-异能者": 66327,
        "异度空间-格斗家": 50497,
        "异度空间-剑武士": 122132,
        "异度空间-枪械师": 60614,
        "异度空间-异能者": 86779,
        "炽焰森林-格斗家": 65839,
        "炽焰森林-剑武士": 138838,
        "炽焰森林-枪械师": 67978,
        "炽焰森林-异能者": 93778,
        "风暴城-格斗家": 43788,
        "风暴城-剑武士": 84676,
        "风暴城-枪械师": 51337,
        "风暴城-异能者": 70533,
        "月亮湾-格斗家": 56887,
        "月亮湾-剑武士": 97587,
        "月亮湾-枪械师": 60656,
        "月亮湾-异能者": 79875,
        "星陨大陆-格斗家": 67327,
        "星陨大陆-剑武士": 143846,
        "星陨大陆-枪械师": 72166,
        "星陨大陆-异能者": 100159,
        "黎明峡谷-格斗家": 46317,
        "黎明峡谷-剑武士": 101069,
        "黎明峡谷-枪械师": 50770,
        "黎明峡谷-异能者": 69024,
        "天空之城-格斗家": 60400,
        "天空之城-剑武士": 130812,
        "天空之城-枪械师": 64187,
        "天空之城-异能者": 92837,
        "自由港-格斗家": 48240,
        "自由港-剑武士": 86908,
        "自由港-枪械师": 55345,
        "自由港-异能者": 72881,
        "皓月峡谷-格斗家": 64569,
        "皓月峡谷-剑武士": 126681,
        "皓月峡谷-枪械师": 54508,
        "皓月峡谷-异能者": 74217,
        "风之谷-格斗家": 50664,
        "风之谷-剑武士": 88455,
        "风之谷-枪械师": 51925,
        "风之谷-异能者": 67668,
        "众神之域-格斗家": 64262,
        "众神之域-剑武士": 115940,
        "众神之域-枪械师": 50013,
        "众神之域-异能者": 71035,
        "迷雾-格斗家": 31247,
        "迷雾-剑武士": 52898,
        "迷雾-枪械师": 36322,
        "迷雾-异能者": 47374,
        "烈日幻屿-格斗家": 43616,
        "烈日幻屿-剑武士": 117584,
        "烈日幻屿-枪械师": 45957,
        "烈日幻屿-异能者": 62272,
        "空中花园-格斗家": 58315,
        "空中花园-剑武士": 188128,
        "空中花园-枪械师": 48730,
        "空中花园-异能者": 67673,
        "天际云海-格斗家": 50007,
        "天际云海-剑武士": 192823,
        "天际云海-枪械师": 41756,
        "天际云海-异能者": 57660,
        "极天城-格斗家": 37413,
        "极天城-剑武士": 70840,
        "极天城-枪械师": 39337,
        "极天城-异能者": 51981,
        "神佑岛-格斗家": 42621,
        "神佑岛-剑武士": 71065,
        "神佑岛-枪械师": 43454,
        "神佑岛-异能者": 59006,
        "星际之门-格斗家": 82389,
        "星际之门-剑武士": 181254,
        "星际之门-枪械师": 39107,
        "星际之门-异能者": 51009,
        "水云间-格斗家": 124246,
        "水云间-剑武士": 89120,
        "水云间-枪械师": 50180,
        "水云间-异能者": 63992,
        "远古战场-格斗家": 52952,
        "远古战场-剑武士": 122807,
        "远古战场-枪械师": 42380,
        "远古战场-异能者": 54932,
        "龙行天下-格斗家": 23578,
        "龙行天下-剑武士": 30508,
        "龙行天下-枪械师": 23286,
        "龙行天下-异能者": 29155,
        "龙啸苍穹-格斗家": 24664,
        "龙啸苍穹-剑武士": 33928,
        "龙啸苍穹-枪械师": 25149,
        "龙啸苍穹-异能者": 31200,
        "游龙谷-格斗家": 23477,
        "游龙谷-剑武士": 30611,
        "游龙谷-枪械师": 27532,
        "游龙谷-异能者": 31792,
        "龙腾四海-格斗家": 26635,
        "龙腾四海-剑武士": 46230,
        "龙腾四海-枪械师": 32554,
        "龙腾四海-异能者": 42512,
        "云龙殿-格斗家": 25422,
        "云龙殿-剑武士": 38929,
        "云龙殿-枪械师": 31186,
        "云龙殿-异能者": 37943,
        "多美圣域-格斗家": 25812,
        "多美圣域-剑武士": 35133,
        "多美圣域-枪械师": 24577,
        "多美圣域-异能者": 35294,
        "幻彩森林-格斗家": 19826,
        "幻彩森林-剑武士": 34428,
        "幻彩森林-枪械师": 22737,
        "幻彩森林-异能者": 31681,
        "九寨天堂-格斗家": 11733,
        "九寨天堂-剑武士": 21857,
        "九寨天堂-枪械师": 14536,
        "九寨天堂-异能者": 21026,
        "精灵海-格斗家": 20300,
        "精灵海-剑武士": 33019,
        "精灵海-枪械师": 27220,
        "精灵海-异能者": 35139,
        "奇迹之城-格斗家": 30739,
        "奇迹之城-剑武士": 45272,
        "奇迹之城-枪械师": 30998,
        "奇迹之城-异能者": 43419,
        "太阳神庙-格斗家": 27231,
        "太阳神庙-剑武士": 46638,
        "太阳神庙-枪械师": 30788,
        "太阳神庙-异能者": 42848,
        "爱琴海-格斗家": 25159,
        "爱琴海-剑武士": 41476,
        "爱琴海-枪械师": 32661,
        "爱琴海-异能者": 42603,
        "荣耀圣殿-格斗家": 36144,
        "荣耀圣殿-剑武士": 72869,
        "荣耀圣殿-枪械师": 45864,
        "荣耀圣殿-异能者": 67178,
        "云霄战舰-格斗家": 22272,
        "云霄战舰-剑武士": 24521,
        "云霄战舰-枪械师": 18032,
        "云霄战舰-异能者": 17428,
        "时空隧道-格斗家": 12492,
        "时空隧道-剑武士": 22330,
        "时空隧道-枪械师": 15559,
        "时空隧道-异能者": 23232,
        "烈焰领地-格斗家": 27420,
        "烈焰领地-剑武士": 46163,
        "烈焰领地-枪械师": 30955,
        "烈焰领地-异能者": 44147,
        "星空角-格斗家": 16826,
        "星空角-剑武士": 18096,
        "星空角-枪械师": 14853,
        "星空角-异能者": 11350,
        "云之巅-格斗家": 25461,
        "云之巅-剑武士": 49216,
        "云之巅-枪械师": 34952,
        "云之巅-异能者": 46615,
        "无极界-格斗家": 25665,
        "无极界-剑武士": 25775,
        "无极界-枪械师": 20304,
        "无极界-异能者": 19917
    }

    if(serverlist[servername]){
        $("#rolecount").html("你的服务器中还有"+ serverlist[servername] + "名"+ RoleType)
    }
    else{
        $("#rolecount").html("你的服务器中还有88888名"+ RoleType)
    }
}