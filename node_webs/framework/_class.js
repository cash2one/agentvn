//-------------------------------------------------------------------------------------------------------
// _class.js: a class define helper
//-------------------------------------------------------------------------------------------------------
_class = function(cons) {
    if ((typeof cons) != 'function') {
        throw '_class error: constructor must be a function'
    }

    for (var f in cons) {
        cons.prototype[f] = cons[f]
        delete cons[f]
    }

    arguments.callee.caller.arguments[2].exports[cons.name] = cons
}
//-------------------------------------------------------------------------------------------------------
