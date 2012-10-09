var editor = ace.edit("editor")
editor.setTheme("ace/theme/twilight")
var json_mode = require("ace/mode/json").Mode
var js_mode = require("ace/mode/javascript").Mode
editor.getSession().setMode(new js_mode())