
var _G_dsl_survey = {};

_G_dsl_survey.rules = function() {
    var question_type  = [ '单选', '多选', '填空', '矩阵单选', '矩阵多选', '打分', '说明', '问答' ];
    var professions    = [ '剑武士', '枪械师', '异能者', '格斗家' ];
    var tiankong_type  = [ 'zh', 'word', 'number', 'email', 'text' ];
    var q_type         = '.question[*].type';

    var root                               = { _type : 'object', _must : true };

    root.name                              = { _type : 'string', _must : true };
    root.award                             = { _type : 'string', _must : true };
    root.welcome                           = { _type : 'string', _must : true };
    root.thanks                            = { _type : 'string', _must : true };

    root.config                            = { _type : 'object', _must : true };
    root.config.login                      = { _type : 'boolean', _must : true };
    root.config.starttime                  = { _type : 'string', _must : true };
    root.config.endtime                    = { _type : 'string', _must : true };
    root.config.iplimit                    = { _type : 'boolean', _must : true};
    root.config.interval                   = { _type : 'number', _must : true};

    root.question                         = { _type : Array,         _must : true };
    root.question[0]                      = { _type : 'object',      _must : true };
    root.question[0].id                   = { _type : 'number',      _must : true };
    root.question[0].title                = { _type : 'string',      _must : true };
    root.question[0].type                 = { _type : question_type, _must : true };

    root.question[0].text                 = { _type : 'string' };

    root.question[0].options              = { _type : Array };
    root.question[0].options[0]           = { _type : 'object',      _must : true };
    root.question[0].options[0].item      = { _type : 'string',      _must : true };
    root.question[0].options[0].next      = { _type : 'number',      _when : _G_dsl.property_require(q_type, ['单选']) };
    root.question[0].options[0].type      = { _type : tiankong_type, _must : true, _when : _G_dsl.property_require(q_type, ['填空']) };
    root.question[0].options[0].limit     = { _type : Array,         _must : true, _when : _G_dsl.property_require(q_type, ['填空']) };

    root.question[0].rows                 = { _type : Array };
    root.question[0].rows[0]              = { _type : 'object',  _must : true };
    root.question[0].rows[0].item         = { _type : 'string',  _must : true };

    root.question[0].columns              = { _type : Array }
    root.question[0].columns[0]           = { _type : 'object', _must : true };
    root.question[0].columns[0].item      = { _type : 'string', _must : true };
    
    root.question[0].other                = { _type : 'object',      _when : _G_dsl.property_require(q_type, ['单选']) };
    root.question[0].other.item           = { _type : 'string',      _must : true, _when : _G_dsl.property_require(q_type, ['单选']) };
    root.question[0].other.type           = { _type : tiankong_type, _must : true, _when : _G_dsl.property_require(q_type, ['单选']) };
    root.question[0].other.limit          = { _type : Array,         _must : true, _when : _G_dsl.property_require(q_type, ['单选']) };
    root.question[0].other.next           = { _type : 'number',      _when : _G_dsl.property_require(q_type, ['单选']) };

    root.question[0].config               = { _type : 'object' }
    root.question[0].config.random        = { _type : 'boolean', _when : _G_dsl.property_require(q_type, ['单选', '多选', '打分','矩阵单选', '矩阵多选'])};
    root.question[0].config.min           = { _type : 'number',  _when : _G_dsl.property_require(q_type, ['多选', '矩阵多选', '问答'])};
    root.question[0].config.max           = { _type : 'number',  _when : _G_dsl.property_require(q_type, ['多选', '矩阵多选', '问答'])};
    root.question[0].config.score         = { _type : Array,     _must : true, _when : _G_dsl.property_require(q_type, ['打分']) };
    root.question[0].config.range         = { _type : 'object',  _when : _G_dsl.property_require(q_type, ['打分']) };
    root.question[0].config.range.left    = { _type : 'string',  _when : _G_dsl.property_require(q_type, ['打分']) };
    root.question[0].config.range.mid     = { _type : 'string',  _when : _G_dsl.property_require(q_type, ['打分']) };
    root.question[0].config.range.right   = { _type : 'string',  _when : _G_dsl.property_require(q_type, ['打分']) };

    return root;
};

_G_dsl_survey.check = function(survey, errs) {
    var rule = _G_dsl_survey.rules();
    return _G_dsl.do_check(survey, survey, rule, errs);
};