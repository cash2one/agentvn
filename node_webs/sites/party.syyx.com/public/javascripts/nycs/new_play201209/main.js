+function () {
    var curr = 0

    var hash = document.location.hash.substring(1) - 1
    if(hash > 0 && hash < 5) {
        $("#tab div").eq(curr).stop().removeAttr("class")
        $("#tab div").eq(hash).addClass("t" + hash)
        $("#con .scroll").stop().animate({"margin-top" : -510 * hash}, 500)
        curr = hash
    }

    for(var i = 0 ; i < 4 ; i++) {
        $("#tab div").eq(i).mouseover(function(index) {
            return function() {
                if(index == curr) {
                    return
                }
                $("#tab div").eq(curr).stop().removeAttr("class")
                $("#tab div").eq(index).addClass("t" + index)
                $("#con .scroll").stop().animate({"margin-top" : -510 * index}, 500)
                curr = index
            }
        }(i))
    }

    $(".to4").click(function() {
        $("#tab div").eq(curr).stop().removeAttr("class")
        $("#tab div").eq(3).addClass("t" + 3)
        $("#con .scroll").stop().animate({"margin-top" : -510 * 3}, 500)
        curr = 3
    })




}()


try{
    document.execCommand("BackgroundImageCache", false, true);
}catch(e){}

$("a").attr("hidefocus", "true")