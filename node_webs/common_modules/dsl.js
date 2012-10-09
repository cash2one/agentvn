
var _G_dsl = {};

_G_dsl.property_require = function(ppath, types) {
    var e = ppath.lastIndexOf('.');
    if (e < 0) {
        console.log('error: _when', ppath);
        return;
    };

    var pname = ppath.substring(e + 1);
    ppath = ppath.substring(0, e);

    return function(root, obj) {
        var o = _G_dsl.get_super_obj(root, obj, ppath)
        if (!o) {
            return ;
        }
            
        for (var i = 0; i < types.length; ++i) {
            
            if (o[pname] == types[i]) {
                return true;
            };
        };
    };
};

_G_dsl.get_ppath = function(root, obj) {
    var f = function(o, s, k) {
        s.push(k);

        if (o == obj) {;
            return true;
        };

        if (typeof o != 'object') {;
            s.pop();
            return;
        };

        for (var k in o) {
            if (f(o[k], s, k)) {
                return true;
            };
        };
        s.pop();
    }

    var ss = [];
    f(root, ss, '');
    
    return this.a_to_ref(ss);
};

_G_dsl.a_to_ref = function(a) {
    var s = ''
    for (var i = 0; i < a.length; ++i) {
        if (parseInt(a[i]) || parseInt(a[i]) === 0) {
            s = s + '[' + a[i] + ']';
        }
        else {
            s = s + '.' + a[i];
        };
    };

    return s.substring(1);
};

_G_dsl.get_super_obj = function(root, obj, opath) {
    var ppath = this.get_ppath(root, obj);
    var path = this.match_ppatch(ppath, opath);
    if (!path) {
        return false;
    };
    _G_dsl._r = root
    return eval('_G_dsl._r' + path)
};

_G_dsl.match_ppatch = function(s1, s2) {
    s2 = s2.replace(/\./g, '\\.');
    s2 = s2.replace(/\[/g, '\\[');
    s2 = s2.replace(/\]/g, '\\]');
    s2 = s2.replace(/\*/g, '\\d+');
    
    var re = RegExp('^' + s2, 'i');
    var ret = s1.match(re);
    if (ret) {
        return ret[0];
    }
};

_G_dsl.do_local_check = function(root, obj, _obj, errs) {
    for (var k in obj) {
	    if (!_obj[k]) {
            var err = 'error: no field ' + '"' + k + '" ' + this.get_ppath(root, obj);
            console.log(err);
            errs.push(err);
            return false;
        };

        if (typeof _obj[k]._type == 'string') {
            if (typeof obj[k] != _obj[k]._type) {
                var err = 'error: wrong type ' + '"' + k + '"' + '(' + _obj[k]._type + ')' + this.get_ppath(root, obj);
                console.log(err);
                errs.push(err);
                return false;
            }
        };

        if (typeof _obj[k]._type == 'function') {
            if (!(obj[k] instanceof _obj[k]._type)) {
                var err = 'error: wrong type ' + '"' + k + '"' + '(' + _obj[k]._type + ') ' + this.get_ppath(root, obj);
                console.log(err);
                errs.push(err);
                return false;
            }
        };

        if (_obj[k]._type instanceof Array) {
            var error = true;
            for (var i = 0; i < _obj[k]._type.length; ++i) {
                if (obj[k] == _obj[k]._type[i]) {
                    error = false;
                    break;
                };
            };

            if (error) {
                var err = 'error: wrong type ' + '"' + k + '"' + '(' + _obj[k]._type + ') ' + this.get_ppath(root, obj);
                console.log(err);
                errs.push(err);
                return false;
            };
        };

        if (_obj[k]._when && !_obj[k]._when(root, obj)) {
            var err = 'error: when failed ' + '"' + k + '" ' + this.get_ppath(root, obj);
            console.log(err);
            errs.push(err);
            return false;
        };
    };

    return true;
};

_G_dsl.do_recursive_check = function(root, obj, _obj, errs) {    
    for (var k in obj) {
        if (obj[k] instanceof Array) {
            for (var i = 0; i < obj[k].length; ++i) {
                if (!this.do_check(root, obj[k][i], _obj[k][0], errs)) {
                    return false;
                };
            };
            continue;
        };

        if (typeof obj[k] == 'object') {
            if (!this.do_check(root, obj[k], _obj[k], errs)) {
                return false;
            };
        };
    };

    return true;
};

_G_dsl.do_reverse_check = function(root, obj, _obj, errs) {
    for (var k in _obj) {
        if ({'_type' : true, '_must' : true, '_when' : true}[k]) {
            continue;
        };

        if (_obj[k]._must) {
            if (obj[k] === undefined) {
                if (!_obj[k]._when) {
                    var err = 'error: undefined ' + '"' + k + '" ' + this.get_ppath(root, obj);
                    console.log(err);
                    errs.push(err);
                    return false;
                };

                if (_obj[k]._when && _obj[k]._when(root, obj)) {
                    var err = 'error: undefined ' + '"' + k + '"' + this.get_ppath(root, obj);
                    console.log(err);
                    errs.push(err);
                    return false;
                };
            };
        };
    };

    return true;
};

_G_dsl.do_check = function(root, obj, _obj, errs) {    
    if (!this.do_local_check(root, obj, _obj, errs)) {
        return false;
    };

    if (!this.do_reverse_check(root, obj, _obj, errs)) {
        return false;
    };

    return this.do_recursive_check(root, obj, _obj, errs);
};