exports.action = function(req, res) {

    var url     = req.body.url
    var index   = url.indexOf("/")
    var host    = url
    var dir     = url + "/"
    var path    = "/"

    if (index > 0) {
        host    = url.substring(0, index)
        path    = url.substring(index)
        dir     = url.substring(0, url.lastIndexOf("/")) + "/"
    }
    
    //--------------------------------------------------------------------------------

    var options = {
        host: host,
        port: 80,
        path: path
    }

    ms.http.get(options, function(response) {
        var code = '';
        response.setEncoding('utf8');

        response.on('data', function(chunk) {
            code += chunk;
        });

        response.on('end', function() {            
            res.end(filter(code));
        })
    });


    //-----------------------------------------------------------------------------

    function filter(css_code) {

        var r_dir   = "http://" + dir
        var rehttp  = new RegExp(r_dir + "http://", "g")
        var slash   = new RegExp(r_dir + "/", "g")

        css_code_arr =  css_code.replace(/\n+|\r+/g     , "")
                                .replace(/^\s+\(\s+$/g  , "")
                                .replace(/\'/g          , '"')
                                .replace(/\(\"/g        , '(')
                                .replace(/\"\)/g        , ')')
                                .replace(/\/\*.*?\*\//g , "")
                                .replace(/url\(/g       , "url(" + r_dir)
                                .replace(rehttp         , "http://")
                                .replace(slash          , "http://" + host + "/")
                                .split("}") 
             
        var imgs = ""
        var len  = css_code_arr.length;

        for (var i = 0; i < len; i++) {

            if (/url\(/.test(css_code_arr[i])) {
                imgs += (css_code_arr[i] + "}")
            }

        }
        return imgs
    }
}