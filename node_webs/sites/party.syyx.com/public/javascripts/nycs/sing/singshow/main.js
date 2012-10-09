$(function(){
    $("#map1").addClass("map1hover")
    default_set()
    if(getParameter("id") == 0){
        $(".toupiao").html("")
        $("#jquery_jplayer_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3:"http://r.syyx.com/party/nycs/sing/drjolin.mp3"
                }).jPlayer("play")
            },
            ended: function (event) {
                $(this).jPlayer("play")
            },
            swfPath: "http://r.syyx.com/party/jplayer/",
            supplied: "mp3"
        })
        return
    }

    $.get("/nycs/sing/get_singinfo?ID="+ getParameter("id") +"&r=" + Math.random(), function(rows) {

        if(rows.length > 0){
            $("#nickname").html(rows[0]["NickName"])
            $("#singcontent").html(rows[0]["content"])
            $(".votecount").html("已获得票数：<span id='votecount'>"+rows[0]["votecount"] + "</span>")
            $("#toupiao").attr("href","javascript:vote("+ rows[0]["ID"] +")")
            var mp3url = "http://r.syyx.com"+ rows[0]["mp3url"]
            $("#jquery_jplayer_1").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: mp3url
                    }).jPlayer("play")
                },
                ended: function (event) {
                    $(this).jPlayer("play")
                },
                swfPath: "http://r.syyx.com/party/jplayer/",
                supplied: "mp3"
            })
            .bind($.jPlayer.event.play, function() { // Using a jPlayer event to avoid both jPlayers playing together.
                    $(this).jPlayer("pauseOthers")
            })
        }
        else{
            document.location = "/nycs/sing/index.html"    
        }
        
    })
})

function getParameter(param)
{
 var query = window.location.search;
 var iLen = param.length;
 var iStart = query.indexOf(param);
 if (iStart == -1)
  return "";
 iStart += iLen + 1;
 var iEnd = query.indexOf("&", iStart);
 if (iEnd == -1)
  return query.substring(iStart);

 return query.substring(iStart, iEnd);
}