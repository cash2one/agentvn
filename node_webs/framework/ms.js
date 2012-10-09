//--------------------------------------------------------------------------------------------------------
// ms.js: require all modules
//--------------------------------------------------------------------------------------------------------
module.exports = {
    server          : false,
    sess            : {},
    reg_use_db      : true,

    db         : require('./db_mgr'),
    u          : require('util'),
    u2         : require('util2'),
    qs         : require('querystring'),
    events     : require('events'),
    express    : require('express'),
    csv        : require('csv'),
    stylus     : require('stylus'),
    http       : require('http'),
    fs         : require('fs'),
    formidable : require("formidable"),
    child_proc : require("child_process"),
    ftp        : require("ftp"),
    cmd        : require('./cmd'),
    stat       : require('./stat'),
    module_mgr : require('./module_mgr'),
    common_app : require('./common_app'),
    captcha    : require('captcha'),
    gd         : require('node-gd'),
    telnet     : require('telnetServer'),
    //canvas     : require('canvas'),
    soap       : require('soap'),
    cipher     : require('cipher'),
    params     : require('./params'),
    dev_helper : require('./dev_helper'),
    mw_ajax    : require('./mw_ajax'),
    zip_file   : require('zip_file'),
    email      : require('email'),
    sms        : require('sms'),
    card_mgr   : require('card_mgr'),
    thumbnail  : require('thumbnail2'),
    upload     : require('upload'),

    persistence   : require('persistence'),
    mongo_session : require('mongo_session'),
    input_check   : require('../common_modules/input_check.js'),

    sy_user     : require('../model/sy_user'),

    account_mgr : require('account_mgr'),
    log_mgr     : require('log_mgr'),
    sms_check   : require('sms_check')
}
