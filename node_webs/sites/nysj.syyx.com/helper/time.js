var time_zone_offset   = 8*60*60*1000
var format_data_time   = {
    yyyymmdd : function(date) {
        var date_add_time_zone = new Date(date.getTime() + time_zone_offset)

        return date_add_time_zone.getUTCFullYear() 
        + '/'
        + date_add_zero((date_add_time_zone.getUTCMonth() + 1))
        + '/'
        + date_add_zero(date_add_time_zone.getUTCDate())
    }
}

exports.convert_target_key = function(result, target_key, method) {
    if(Array.isArray(result)) {
        if (result.length > 0) {
            result.forEach(function(item, index, array) {
                exports.convert_target_key(item, target_key, method)
            }) 
        } 
    } else {
        if (typeof result == 'object') {
            for (var key in result) {
                if ( target_key.indexOf(key) > -1 ) {
                    result[key]  = format_data_time[method](new Date(result[key]))
                }
            }
        }
    }

    return result
}

exports.convert_client_time_string = function(str) {
    str = str.replace(/-/g,'/')
    var date_arr = str.split('/')
    var year     = parseInt(date_arr[0],10)
    var month    = parseInt(date_arr[1],10)-1
    var day      = parseInt(date_arr[2],10)
    return new Date(Date.UTC(year,month,day) - time_zone_offset)
}

function date_add_zero(str) {
    if (parseInt(str) < 10 ) {
        return '0' + str
    } else {
        return str
    }
}

exports.tomorrow_midnight = function(date) {
    var hours_one_day     = 1000*60*60*24
    var temp_beijing_time = new Date(date.getTime() + time_zone_offset)
    var hours             = temp_beijing_time.getUTCHours()
    var minutes           = temp_beijing_time.getUTCMinutes()
    var seconds           = temp_beijing_time.getUTCSeconds()
    var milliseconds      = temp_beijing_time.getUTCMilliseconds()

    var distance_to_next_day = hours_one_day - (1000*60*60*hours + 1000*60*minutes + 1000*seconds + milliseconds)
    return new Date(date.getTime() + distance_to_next_day)
}

exports.today_midnight = function(date) {
    var temp_beijing_time = new Date(date.getTime() + time_zone_offset)
    var hours             = temp_beijing_time.getUTCHours()
    var minutes           = temp_beijing_time.getUTCMinutes()
    var seconds           = temp_beijing_time.getUTCSeconds()
    var milliseconds      = temp_beijing_time.getUTCMilliseconds()

    var distance_to_prev_day = 1000*60*60*hours + 1000*60*minutes + 1000*seconds + milliseconds
    return new Date(date.getTime() - distance_to_prev_day)
}