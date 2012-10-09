//--------------------------------------------------------------------------------------------------------
// input_check.js
//--------------------------------------------------------------------------------------------------------
_G_all_input_checks = {
    //判断是否为空
    empty : function(value, check_info) {
        if (value == "") {
            return check_info.err_info
        }
    },

    //判断控件值字符长度是否在指定范围内
    length : function(value, check_info) {
        //判断是否在指定长度数组中_G_all_input_checks
        if (check_info.options) {
            for (var i in check_info.options) {
                if (value.length == check_info.options[i]) {
                    return
                }
            }

            return check_info.err_info
        }
        check_info.min = check_info.min || 0
        check_info.max = check_info.max || Math.pow(2, 32)

        if (value.length < check_info.min || value.length > check_info.max) {
            return check_info.err_info
        }
    },

    //正则判断
    regex : function(value, check_info) {
        if (!check_info.value.test(value)) {
            return check_info.err_info
        }
    },

    //判断两个值是否相等，side为server时为服务器判断
    equal : function(value, check_info) {
        if (check_info.side == 'server') {
            var compare_value = check_info.req.body[check_info.value]
            if (compare_value != value) {
                return check_info.err_info
            }
        }
        else if (check_info.side == 'session') {
            var compare_value = check_info.req.session[check_info.value]
            if (compare_value != value) {
                return check_info.err_info
            }
        }
        else {
            var input_id = '#' + check_info.value
            if ($(input_id).val() != value) {
                return check_info.err_info
            }
        }
    },

    notequal:function(value, check_info) {
        //判断是否在指定长度数组中_G_all_input_checks   
        if (check_info.options) {
            for (var i in check_info.options) {
                if (value == check_info.options[i]) {
                    return check_info.err_info
                }
            }

            return
        }
    }
}
//--------------------------------------------------------------------------------------------------------
_G_check_request_data = function(req, input_checks) {
    for (var key in req.body) {
        if (!input_checks[key]) {
            continue
        }
        
        var value = req.body[key]

        var checks = input_checks[key].checks
        for (var i in checks) {
            var type = checks[i].type
            var check_info = checks[i]

            check_info.req = req

            var check_func = _G_all_input_checks[type]
            if (!check_func) {
                var ret = {}
                ret[key] = type

                return ret
            }

            var ret = check_func(value, check_info)
            if (ret != undefined) {
                var ret = {}
                ret[key] = type

                return ret
            }
        }
    }
}
//--------------------------------------------------------------------------------------------------------