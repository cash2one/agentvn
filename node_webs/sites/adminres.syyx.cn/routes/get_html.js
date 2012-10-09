exports.action = function(req, res) {

    var options = {
        host: req.body.host,
        port: 80,
        path: req.body.path
    }

    ms.http.get(options, function(response) {

        var code = '';
        response.setEncoding('utf8');

        response.on('data', function(chunk) {
            code += chunk;
        });

        response.on('end', function() {
            var html = format(code);
            html = html.substring(html.indexOf("<!"))
            res.end(html);
        })

    });

    //----------------------------------------------------------------------------------------------
    function format(code) {
        
        var dir     = "http://" + req.body.dir
        var host    = "http://" + req.body.host + "/"
        var rehttp  = new RegExp(dir + "http://"  , "g") 
        var slash   = new RegExp(dir + "/"        , "g") 
        var hash    = new RegExp(dir + "#"        , "g") 

        return  code.replace(/href\s*\=\s*\"\s*/g , 'href="' + dir)
                    .replace(/href\s*\=\s*\'\s*/g , "href='" + dir)
                    .replace(/(src|delay)\s*\=\s*\"\s*/g  , 'src="' + dir)
                    .replace(/(src|delay)\s*\=\s*\'\s*/g  , "src='" + dir)
                    .replace(rehttp               , "http://")
                    .replace(slash                , host)
                    .replace(hash                 , "#")
                    .replace(/<\/body>/           , '<script type="text/javascript">window.parent.htmled()</script></body>')
    }
}