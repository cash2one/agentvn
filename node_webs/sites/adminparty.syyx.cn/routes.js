 exports.routes = [
    //questionnaire
    { method : "post",  url : "/login/check",   module : "login/check",   action : "action", use_session : 0 },
    { method : "post",  url : "/login/enter",   module : "login/enter",   action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/questionnaire/question_list",   module : "nycs/questionnaire/question_list",   action : "action", use_session : 0 },
    { method : "post",  url : "/nycs/questionnaire/question_del",   module : "nycs/questionnaire/question_del",   action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/questionnaire/get_question",     module : "nycs/questionnaire/get_question",   action : "action", use_session : 0 },
    { method : "post",  url : "/nycs/questionnaire/save_question",   module : "nycs/questionnaire/save_question",   action : "action", use_session : 0 },
    { method : "post",  url : "/nycs/questionnaire/add_question",    module : "nycs/questionnaire/add_question",   action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/questionnaire/answer_out",       module : "nycs/questionnaire/answer_out",   action : "action", use_session : 0 }, 
    { method : "get",  url : "/nycs/dating/get_image_list",          module : "nycs/dating/index",   action : "get_image_list", use_session : 0 },
    { method : "get",  url : "/nycs/dating/action",          module : "nycs/dating/index",   action : "action", use_session : 0 },
]