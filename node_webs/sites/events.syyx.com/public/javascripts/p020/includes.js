/**
 * jQuery lightBox plugin
 * This jQuery plugin was inspired and based on Lightbox 2 by Lokesh Dhakar (http://www.huddletogether.com/projects/lightbox2/)
 * and adapted to me for use like a plugin from jQuery.
 * @name jquery-lightbox-0.5.js
 * @author Leandro Vieira Pinho - http://leandrovieira.com
 * @version 0.5
 * @date April 11, 2008
 * @category jQuery plugin
 * @copyright (c) 2008 Leandro Vieira Pinho (leandrovieira.com)
 * @license CC Attribution-No Derivative Works 2.5 Brazil - http://creativecommons.org/licenses/by-nd/2.5/br/deed.en_US
 * @example Visit http://leandrovieira.com/projects/jquery/lightbox/ for more informations about this jQuery plugin
 */

// Offering a Custom Alias suport - More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
(function($) {
    /**
     * $ is an alias to jQuery object
     *
     */
    $.fn.lightBox = function(settings) {
        // Settings to configure the jQuery lightBox plugin how you like
        settings = jQuery.extend({
            // Configuration related to overlay
            overlayBgColor:         '#000',     // (string) Background color to overlay; inform a hexadecimal value like: #RRGGBB. Where RR, GG, and BB are the hexadecimal values for the red, green, and blue values of the color.
            overlayOpacity:         0.8,        // (integer) Opacity value to overlay; inform: 0.X. Where X are number from 0 to 9
            // Configuration related to navigation
            fixedNavigation:        false,      // (boolean) Boolean that informs if the navigation (next and prev button) will be fixed or not in the interface.
            // Configuration related to images
            imageLoading:           'http://s.syyx.com/nycs/plugin/light-box/img/lightbox-ico-loading.gif',     // (string) Path and the name of the loading icon
            imageBtnPrev:           'http://s.syyx.com/nycs/plugin/light-box/img/cur-left.cur',         // (string) Path and the name of the prev button image
            imageBtnNext:           'http://s.syyx.com/nycs/plugin/light-box/img/cur-right.cur',            // (string) Path and the name of the next button image
            imageBtnClose:          'http://s.syyx.com/nycs/plugin/light-box/img/lightbox-btn-close.gif',       // (string) Path and the name of the close btn
            imageBlank:             'http://s.syyx.com/nycs/plugin/light-box/img/lightbox-blank.gif',           // (string) Path and the name of a blank image (one pixel)
            // Configuration related to container image box
            containerBorderSize:    10,         // (integer) If you adjust the padding in the CSS for the container, #lightbox-container-image-box, you will need to update this value
            containerResizeSpeed:   400,        // (integer) Specify the resize duration of container image. These number are miliseconds. 400 is default.
            // Configuration related to texts in caption. For example: Image 2 of 8. You can alter either "Image" and "of" texts.
            txtImage:               '第',    // (string) Specify text "Image"
            txtOf:                  ' 张/ 共',        // (string) Specify text "of"
            // Configuration related to keyboard navigation
            keyToClose:             'c',        // (string) (c = close) Letter to close the jQuery lightBox interface. Beyond this letter, the letter X and the SCAPE key is used to.
            keyToPrev:              'p',        // (string) (p = previous) Letter to show the previous image
            keyToNext:              'n',        // (string) (n = next) Letter to show the next image.
            imgMaxWidth:            900,
            imgMaxHeight:           450,
            // Don�t alter these variables in any way
            imageArray:             [],
            activeImage:            0
        },settings);
        // Caching the jQuery object with all elements matched
        var jQueryMatchedObj = this; // This, in this context, refer to jQuery object
        /**
         * Initializing the plugin calling the start function
         *
         * @return boolean false
         */
        function _initialize() {
            _start(this,jQueryMatchedObj); // This, in this context, refer to object (link) which the user have clicked
            return false; // Avoid the browser following the link
        }
        /**
         * Start the jQuery lightBox plugin
         *
         * @param object objClicked The object (link) whick the user have clicked
         * @param object jQueryMatchedObj The jQuery object with all elements matched
         */
        function _start(objClicked,jQueryMatchedObj) {
            // Hime some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
            $('embed, object, select').css({ 'visibility' : 'hidden' });
            // Call the function to create the markup structure; style some elements; assign events in some elements.
            _set_interface();
            // Unset total images in imageArray
            settings.imageArray.length = 0;
            // Unset image active information
            settings.activeImage = 0;
            // We have an image set? Or just an image? Let�s see it.
            if ( jQueryMatchedObj.length == 1 ) {
                settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('rev')));
            } else {
                // Add an Array (as many as we have), with href and title atributes, inside the Array that storage the images references        
                for ( var i = 0; i < jQueryMatchedObj.length; i++ ) {
                    settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('rev')));
                }
            }
            while ( settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href') ) {
                settings.activeImage++;
            }
            // Call the function that prepares image exibition
            _set_image_to_view();
        }
        /**
         * Create the jQuery lightBox plugin interface
         *
         * The HTML markup will be like that:
            <div id="jquery-overlay"></div>
            <div id="jquery-lightbox">
                <div id="lightbox-container-image-box">
                    <div id="lightbox-container-image">
                        <img src="../fotos/XX.jpg" id="lightbox-image">
                        <div id="lightbox-nav">
                            <a href="#" id="lightbox-nav-btnPrev"></a>
                            <a href="#" id="lightbox-nav-btnNext"></a>
                        </div>
                        <div id="lightbox-loading">
                            <a href="#" id="lightbox-loading-link">
                                <img src="../images/lightbox-ico-loading.gif">
                            </a>
                        </div>
                    </div>
                </div>
                <div id="lightbox-container-image-data-box">
                    <div id="lightbox-container-image-data">
                        <div id="lightbox-image-details">
                            <span id="lightbox-image-details-caption"></span>
                            <span id="lightbox-image-details-currentNumber"></span>
                        </div>
                        <div id="lightbox-secNav">
                            <a href="#" id="lightbox-secNav-btnClose">
                                <img src="../images/lightbox-btn-close.gif">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
         *
         */
        function _set_interface() {
            // Apply the HTML markup into body tag
            $('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a hidefocus="true" href="#" id="lightbox-nav-btnPrev"></a><a hidefocus="true" href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a hidefocus="true" href="#" id="lightbox-loading-link"><img src="' + settings.imageLoading + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-secNav"><a hidefocus="true" href="#" id="lightbox-secNav-btnClose"><img src="' + settings.imageBtnClose + '"></a></div><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div></div></div></div>');   
            // Get page sizes
            var arrPageSizes = ___getPageSize();
            // Style overlay and show it
            $('#jquery-overlay').css({
                backgroundColor:    settings.overlayBgColor,
                opacity:            settings.overlayOpacity,
                width:              arrPageSizes[0],
                height:             arrPageSizes[1]
            }).fadeIn();
            // Get page scroll
            var arrPageScroll = ___getPageScroll();
            // Calculate top and left offset for the jquery-lightbox div object and show it
            $('#jquery-lightbox').css({
                top:    arrPageScroll[1] + (arrPageSizes[3] / 30),
                left:   arrPageScroll[0]
            }).show();
            // Assigning click events in elements to close overlay
            $('#jquery-overlay,#jquery-lightbox').click(function() {
                //_finish();                                    
            });
            // Assign the _finish function to lightbox-loading-link and lightbox-secNav-btnClose objects
            $('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function() {
                _finish();
                return false;
            });
            // If window was resized, calculate the new overlay dimensions
            $(window).resize(function() {
                // Get page sizes
                var arrPageSizes = ___getPageSize();
                // Style overlay and show it
                $('#jquery-overlay').css({
                    width:      arrPageSizes[0],
                    height:     arrPageSizes[1]
                });
                // Get page scroll
                var arrPageScroll = ___getPageScroll();
                // Calculate top and left offset for the jquery-lightbox div object and show it
                $('#jquery-lightbox').css({
                    top:    arrPageScroll[1] + (arrPageSizes[3] / 30),
                    left:   arrPageScroll[0]
                });
            });
        }
        /**
         * Prepares image exibition; doing a image�s preloader to calculate it�s size
         *
         */
        function _set_image_to_view() { // show the loading
            // Show the loading
            $('#lightbox-loading').show();
            if ( settings.fixedNavigation ) {
                $('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
            } else {
                // Hide some elements
                $('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
            }
            // Image preload process
            var objImagePreloader = new Image();
        
            objImagePreloader.onload = function() {
                
                var pic_ration = objImagePreloader.width/objImagePreloader.height;
                var arrPageSizes2 = ___getPageSize();
                  settings.imgMaxWidth =  arrPageSizes2[2] - 100;
                  settings.imgMaxHeight =  arrPageSizes2[3]- 160;
                  //alert(settings.imgMaxWidth); 
                if(objImagePreloader.width > settings.imgMaxWidth )
                {
                    objImagePreloader.width=settings.imgMaxWidth;
                    objImagePreloader.height=objImagePreloader.width/pic_ration;
                }
                if(objImagePreloader.height >settings.imgMaxHeight)
                {
                    objImagePreloader.height = settings.imgMaxHeight;
                    objImagePreloader.width=objImagePreloader.height * pic_ration;
                }
                
                $('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);
                $('#lightbox-image').width(objImagePreloader.width);
                $('#lightbox-image').height(objImagePreloader.height);
                
                
                // Perfomance an effect in the image container resizing it
            
                _resize_container_image_box(objImagePreloader.width,objImagePreloader.height);
                //  clear onLoad, IE behaves irratically with animated gifs otherwise
                objImagePreloader.onload=function(){};
            };
            objImagePreloader.src = settings.imageArray[settings.activeImage][0];
        };
        /**
         * Perfomance an effect in the image container resizing it
         *
         * @param integer intImageWidth The image�s width that will be showed
         * @param integer intImageHeight The image�s height that will be showed
         */
        function _resize_container_image_box(intImageWidth,intImageHeight) {
            // Get current width and height
            var intCurrentWidth = $('#lightbox-container-image-box').width();
            var intCurrentHeight = $('#lightbox-container-image-box').height();
            // Get the width and height of the selected image plus the padding
            var intWidth = (intImageWidth + (settings.containerBorderSize * 2)); // Plus the image�s width and the left and right padding value
            var intHeight = (intImageHeight + (settings.containerBorderSize * 2)); // Plus the image�s height and the left and right padding value
            
            
            // Diferences
            var intDiffW = intCurrentWidth - intWidth;
            var intDiffH = intCurrentHeight - intHeight;
            // Perfomance the effect
            $('#lightbox-container-image-box').animate({ width: intWidth, height: intHeight },settings.containerResizeSpeed,function() { _show_image(); });
            if ( ( intDiffW == 0 ) && ( intDiffH == 0 ) ) {
                if ( $.browser.msie ) {
                    ___pause(250);
                } else {
                    ___pause(100);  
                }
            } 
            $('#lightbox-container-image-data-box').css({ width: intImageWidth });
            $('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ height: intImageHeight + (settings.containerBorderSize * 2) });
        };
        /**
         * Show the prepared image
         *
         */
        function _show_image() {
            $('#lightbox-loading').hide();
            $('#lightbox-image').fadeIn(function() {
                _show_image_data();
                _set_navigation();
            });
            _preload_neighbor_images();
        };
        /**
         * Show the image information
         *
         */
        function _show_image_data() {
            $('#lightbox-container-image-data-box').slideDown('fast');
            $('#lightbox-image-details-caption').hide();
            if ( settings.imageArray[settings.activeImage][1] ) {
                $('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]+"<a target=\"_blank\" href=\""+settings.imageArray[settings.activeImage][0]+"\">查看原图</a>").show();
            }
            // If we have a image set, display 'Image X of X'
            if ( settings.imageArray.length > 1 ) {
                $('#lightbox-image-details-currentNumber').html(settings.txtImage + ' ' + ( settings.activeImage + 1 ) + ' ' + settings.txtOf + ' ' + settings.imageArray.length + ' 张').show();
            }       
        }
        /**
         * Display the button navigations
         *
         */
        function _set_navigation() {
            $('#lightbox-nav').show();

            // Instead to define this configuration in CSS file, we define here. And it�s need to IE. Just.
            $('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
            
            // Show the prev button, if not the first image in set
            if ( settings.activeImage != 0 ) {
                if ( settings.fixedNavigation ) {
                    $('#lightbox-nav-btnPrev').css({ 'cursor' : 'url(' + settings.imageBtnPrev + '), pointer' })
                        .unbind()
                        .bind('click',function() {
                            settings.activeImage = settings.activeImage - 1;
                            _set_image_to_view();
                            return false;
                        });
                } else {
                    // Show the images button for Next buttons
                    $('#lightbox-nav-btnPrev').unbind().hover(function() {
                        $(this).css({ 'cursor' : 'url(' + settings.imageBtnPrev + '), pointer' });
                    },function() {
                        $(this).css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
                    }).show().bind('click',function() {
                        settings.activeImage = settings.activeImage - 1;
                        _set_image_to_view();
                        return false;
                    });
                }
            }
            
            // Show the next button, if not the last image in set
            if ( settings.activeImage != ( settings.imageArray.length -1 ) ) {
                if ( settings.fixedNavigation ) {
                    $('#lightbox-nav-btnNext').css({ 'cursor' : 'url(' + settings.imageBtnNext + '), pointer' })
                        .unbind()
                        .bind('click',function() {
                            settings.activeImage = settings.activeImage + 1;
                            _set_image_to_view();
                            return false;
                        });
                } else {
                    // Show the images button for Next buttons
                    $('#lightbox-nav-btnNext').unbind().hover(function() {
                        $(this).css({ 'cursor' : 'url(' + settings.imageBtnNext + '), pointer' });
                    },function() {
                        $(this).css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
                    }).show().bind('click',function() {
                        settings.activeImage = settings.activeImage + 1;
                        _set_image_to_view();
                        return false;
                    });
                }
            }
            // Enable keyboard navigation
            _enable_keyboard_navigation();
        }
        /**
         * Enable a support to keyboard navigation
         *
         */
        function _enable_keyboard_navigation() {
            $(document).keydown(function(objEvent) {
                _keyboard_action(objEvent);
            });
        }
        /**
         * Disable the support to keyboard navigation
         *
         */
        function _disable_keyboard_navigation() {
            $(document).unbind();
        }
        /**
         * Perform the keyboard actions
         *
         */
        function _keyboard_action(objEvent) {
            // To ie
            if ( objEvent == null ) {
                keycode = event.keyCode;
                escapeKey = 27;
            // To Mozilla
            } else {
                keycode = objEvent.keyCode;
                escapeKey = objEvent.DOM_VK_ESCAPE;
            }
            // Get the key in lower case form
            key = String.fromCharCode(keycode).toLowerCase();
            // Verify the keys to close the ligthBox
            if ( ( key == settings.keyToClose ) || ( key == 'x' ) || ( keycode == escapeKey ) ) {
                _finish();
            }
            // Verify the key to show the previous image
            if ( ( key == settings.keyToPrev ) || ( keycode == 37 ) ) {
                // If we�re not showing the first image, call the previous
                if ( settings.activeImage != 0 ) {
                    settings.activeImage = settings.activeImage - 1;
                    _set_image_to_view();
                    _disable_keyboard_navigation();
                }
            }
            // Verify the key to show the next image
            if ( ( key == settings.keyToNext ) || ( keycode == 39 ) ) {
                // If we�re not showing the last image, call the next
                if ( settings.activeImage != ( settings.imageArray.length - 1 ) ) {
                    settings.activeImage = settings.activeImage + 1;
                    _set_image_to_view();
                    _disable_keyboard_navigation();
                }
            }
        }
        /**
         * Preload prev and next images being showed
         *
         */
        function _preload_neighbor_images() {
            if ( (settings.imageArray.length -1) > settings.activeImage ) {
                objNext = new Image();
                objNext.src = settings.imageArray[settings.activeImage + 1][0];
            }
            if ( settings.activeImage > 0 ) {
                objPrev = new Image();
                objPrev.src = settings.imageArray[settings.activeImage -1][0];
            }
        }
        /**
         * Remove jQuery lightBox plugin HTML markup
         *
         */
        function _finish() {
            $('#jquery-lightbox').remove();
            $('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
            // Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
            $('embed, object, select').css({ 'visibility' : 'visible' });
        }
        /**
         / THIRD FUNCTION
         * getPageSize() by quirksmode.com
         *
         * @return Array Return an array with page width, height and window width, height
         */
        function ___getPageSize() {
            var xScroll, yScroll;
            if (window.innerHeight && window.scrollMaxY) {  
                xScroll = window.innerWidth + window.scrollMaxX;
                yScroll = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
            var windowWidth, windowHeight;
            if (self.innerHeight) { // all except Explorer
                if(document.documentElement.clientWidth){
                    windowWidth = document.documentElement.clientWidth; 
                } else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else if (document.body) { // other Explorers
                windowWidth = document.body.clientWidth;
                windowHeight = document.body.clientHeight;
            }   
            // for small pages with total height less then height of the viewport
            if(yScroll < windowHeight){
                pageHeight = windowHeight;
            } else { 
                pageHeight = yScroll;
            }
            // for small pages with total width less then width of the viewport
            if(xScroll < windowWidth){  
                pageWidth = xScroll;        
            } else {
                pageWidth = windowWidth;
            }
            arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
            return arrayPageSize;
        };
        /**
         / THIRD FUNCTION
         * getPageScroll() by quirksmode.com
         *
         * @return Array Return an array with x,y page scroll values.
         */
        function ___getPageScroll() {
            var xScroll, yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
                xScroll = self.pageXOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {     // Explorer 6 Strict
                yScroll = document.documentElement.scrollTop;
                xScroll = document.documentElement.scrollLeft;
            } else if (document.body) {// all other Explorers
                yScroll = document.body.scrollTop;
                xScroll = document.body.scrollLeft; 
            }
            arrayPageScroll = new Array(xScroll,yScroll);
            return arrayPageScroll;
        };
         /**
          * Stop the code execution from a escified time in milisecond
          *
          */
         function ___pause(ms) {
            var date = new Date(); 
            curDate = null;
            do { var curDate = new Date(); }
            while ( curDate - date < ms);
         };
        // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
        return this.unbind('click').click(_initialize);
    };
})(jQuery); // Call and execute the function immediately passing the jQuery object
//--------------------------------------------------------------------------------------------------------
// input_check.js
//--------------------------------------------------------------------------------------------------------
_G_all_input_checks = {
    empty : function(value, check_info) {
        if (value == "") {
            return check_info.err_info
        }
    },

    length : function(value, check_info) {
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

    regex : function(value, check_info) {
        if (!check_info.value.test(value)) {
            return check_info.err_info
        }
    },

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
//--------------------------------------------------------------------------------------------------------//--------------------------------------------------------------------------------------------------------
// input.js 一个通用的input控件处理模块
//--------------------------------------------------------------------------------------------------------
/*
var example_input_data = [
    {   name          : "account_name",
        input_id      : "txtUserAccount",
        info_div_id   : "txtUserAccount",
        status_div_id : "txtUserAccountTip",
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }
        ],
        remote_check  : {
            url      : '/account_check',
            1        : '该账号已经存在'
        }
    },
    {   name             : "password",
        input_id         : "txtPasswords",
        info_div_id      : "txtPasswordsVal",
        status_div_id    : "txtPasswordsTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码的长度为6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "输入的密码不能包含空格" }
        ]
    },
    {   name             : "confirm_password",
        input_id         : "txtConfirm",
        info_div_id      : "txtConfirmVal",
        status_div_id    : "txtConfirmTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请再输入一遍密码" },
            { type : 'equal', value : "txtPasswords", err_info : "两次输入的密码不一致" }
        ]
    },
    {
        name          : "id_card",
        input_id      : "txtCardID",
        info_div_id   : "txtCardID",
        status_div_id : "txtCardIDTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的身份证信息" },
            { type : 'length', options : [ 15, 18 ], err_info : "身份证应为15位或18位" },
        ],
        remote_check  : {
            url : "",
            1   : ""
        }
    },
    {   name          : "true_name",
        input_id      : "txtTrueName",
        info_div_id   : "txtTrueName",
        status_div_id : "txtTrueNameTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的姓名" },
            { type : 'length', min : 2, max : 10, err_info : "姓名必须2-10个汉字" } ,
            { type : 'regex', value : /^[\u4e00-\u9fa5]{2,6}$/, err_info : "姓名必须是汉字" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        status_div_id : "txtValidateVal",
        pic_img       : { id : "validateimg", src : "" },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : "",
            1   : ""
        }
    }
]
*/
//--------------------------------------------------------------------------------------------------------
var input_config = {
    background_highlight_class : "focus_in_inut",
    error_tag_class            : "input_wrong",
    status_class               : {
        ok       : "check_result_right",
        error    : "check_result_wrong",
        checking : "check_result_loading"
    }
}

var captcha_dom
//--------------------------------------------------------------------------------------------------------
var input_local_check_func = _G_all_input_checks
//--------------------------------------------------------------------------------------------------------
function input_highlight_background(input) {
    input.addClass(input_config.background_highlight_class)
}

function input_recover_background(input) {
    input.removeClass(input_config.background_highlight_class)
}
//--------------------------------------------------------------------------------------------------------
function input_recover(input, input_data) {
    var input_err = input.hasClass(input_config.error_tag_class)
    if (input_err) {
        input.removeClass(input_config.error_tag_class)
        input.val("")
        
        var status_div_id = input_data.status_div_id
        if (status_div_id) {
            status_div_id = '#' + status_div_id
            $(status_div_id).attr('class', '')
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_check_ok(input, input_data) {
    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.ok)
    }
}

function input_check_error(input, input_data, err_info) {
    input.addClass(input_config.error_tag_class)

    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.error)
    }

    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        if ($(info_div_id).is(":hidden")) {
            input.hide()
            $(info_div_id).show()
        }

        if (err_info) {
            $(info_div_id).val(err_info)
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_local_check(input, input_data) {
    var value = input.val()

    for (var i in input_data.local_check) {
        var check_info = input_data.local_check[i]
        var key = check_info.type
        var check_func = input_local_check_func[key]

        var err_info = check_func(value, check_info)
        if (err_info !== undefined) {
            input_check_error(input, input_data, err_info)
            return false
        }
    }

    input_check_ok(input, input_data)

    return true
}

function input_remote_check(input, input_data) {
    if (!input_data.remote_check) {
        return true
    }

    var value = input.val()
    var check_url = input_data.remote_check.url

    var status_div_id = '#' + input_data.status_div_id
    $(status_div_id).attr("class", input_config.status_class.checking)


    $.ajax({
        type     : 'GET',
        cache    : false,
        url      : check_url,
        data     : { v : value },
        dataType : 'json',
        success  : function(data){
            if (data.type == 0) {
                input_check_ok(input, input_data)
                return
            }

            var err_info = input_data.remote_check[data.type + '']
            input_check_error(input, input_data, err_info)
        }
        
    });
}
//--------------------------------------------------------------------------------------------------------
function input_show_pic(input, input_data) {
    get_captcha(captcha_dom)

    $('#' + input_data.pic_img.id).show()
}

function input_pic_setting(input, input_data) {
    var input_id = '#' + input_data.input_id
    var img_id = '#' + input_data.pic_img.id

    //$(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())

    $(input_id).keyup(function() {
        if($(input_id).val().length >= 4){
            var ret = input_local_check(input, input_data)
            if (!ret) {
                return
            }
            
            input_remote_check(input, input_data)
        }
        
    })
            
    $(img_id).click(function() {
        var status_div_id = '#' + input_data.status_div_id
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
        $(status_div_id).attr("class", input_config.status_class.error)
    })
}
//--------------------------------------------------------------------------------------------------------
function input_info_cover_input_setting(input, input_data) {
    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        $(info_div_id).focus(function() {
            if (input.is(':hidden')) {
                $(this).hide()
                input.show()
                input.focus()
            }
        })
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting(input_data) {
    var input_id = '#' + input_data.input_id
    var input = $(input_id)

    input.val("")
 
    input.focus(function() {
        get_captcha(captcha_dom)

        if (input_data.pic_img) {
            input_show_pic(input, input_data)
        }

        input_highlight_background(input)
        input_recover(input, input_data)
    })

    input.blur(function() {
        input_recover_background(input)

        if (input_data.pic_img) {
            return
        }

        var ret = input_local_check(input, input_data)
        if (!ret) {
            return
        }

        input_remote_check(input, input_data)
    })

    if (input_data.pic_img) {
        input_pic_setting(input, input_data)
    }

    if (input_data.info_cover_input) {
        input_info_cover_input_setting(input, input_data)
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting_inputs(inputs_data) {
    for(var j in inputs_data) {
        if(inputs_data[j].pic_img){
           captcha_dom = inputs_data[j]
        }
    }
    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        input_setting(input_data)
    }

}
//--------------------------------------------------------------------------------------------------------
function input_get_inputs_value(inputs_data) {
    var ret = false

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        var key = input_data.name
        var value = $(input_id).val()

        ret = ret || {}
        ret[key] = value
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_local_check_inputs(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        if (!input_local_check($(input_id), input_data)) {
            ret = false
        }
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_status_check(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var status     = check_unit_status(input_data)
        
        if(status == false) {
            ret = false
            break
        }  
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function get_captcha(input_data) {
    var img_id = '#' + input_data.pic_img.id
    if (!$(img_id).attr("src")) {
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
    }
}
//------------------------------------------------------------------------------------------------
function check_unit_status(input_data) {            //  add by jiangxi
    var status_div_id = '#' + input_data.status_div_id
    var ok_status     =  $(status_div_id).hasClass(input_config.status_class.ok)
    
    if(ok_status) {
        return true
    } 

    if(!input_data.pic_img) {
        return false
    }

    var input_id     = '#' + input_data.input_id
    var char_num     = $(input_id).val().length

    if(char_num != 4) {
        return false
    }
    
    var err_status   = $(status_div_id).hasClass(input_config.status_class.error)
    var check_status = $(status_div_id).hasClass(input_config.status_class.checking)
    
    if(err_status || check_status) {
        return false
    }

    return true
    
}
//------------------------------------------------------------------------------------------------
var pathname = document.location.pathname.toLowerCase()
var pagename = pathname.substring(pathname.lastIndexOf("/") + 1).replace(".html", "")
if(/nycs360/.test(pathname)) {
    pagename = "index_360"
}

var stat_id  = {
    "index"          : 3224992,
    "index31"        : 3171333,
    "index32"        : 3190993,
    "index34"        : 3257232,
    "index35"        : 3243019,
    "index40"        : 3208005,
    "index5"         : 2625354,
    "index_173"      : 4097942,
    "index_dw"       : 4200748,
    "index_xq"       : 4535836,
    "index_zfgc"     : 2001608,
    //"index_bd"     : 4005964,

    // "index_bd_1"  : 4005964,
    // "index_bd_2"  : 4005964,
    // "index_bd_3"  : 4005964,
    // "index_bd_4"  : 4005964,
    // "index_bd_5"  : 4005964,
    // "index_bd_6"  : 4005964,
    // "index_bd_7"  : 4005964,
    // "index_bd_8"  : 4005964,
    // "index_bd_9"  : 4005964,
    // "index_bd_10" : 4433832,
    // "index_bd_11" : 4433832,
    // "index_bd_12" : 4005964,
    // "index_bd_13" : 4005964,
    // "index_bd_14" : 4005964,
    // "index_bd_15" : 4005964,
    // "index_bd_16" : 4005964,
    // "index_bd_17" : 4005964,
    // "index_bd_18" : 4005964,
    // "index_bd_19" : 4005964,
    // "index_bd_20" : 4005964,
    // "index_bd_wm" : 4005964,

    "index_i8"       : 3771802,
    "index_i8_embed" : 3519134,
    "index_sw"       : 3915789,
    "index_sw_embed" : 4304121,
    "index_yy"       : 3915783,
    "index_xs"       : 4246749,
    "index_360"      : 3396138
}

if(stat_id[pagename]){
    var script  = document.createElement("script")
    script.src  = 'http://s21.cnzz.com/stat.php?id=' + stat_id[pagename] + '&amp;web_id=' + stat_id[pagename]
    script.type = 'text/javascript'
    var stat    = document.getElementById("stat")
    stat.appendChild(script)
}

if(pagename == "index_xs"){
    $("#stat").append('<object name="x" id="x" classid="clsid:EDB8FAC0-ED79-4B27-AE51-FB19D8348087"></object>')
}

if(/index_bd/.test(pagename) || /index_sg/.test(pagename)) {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-27991465-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(ga, s);
    })();

}

if(/index_bd_wm/.test(pagename)) {
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fe8d1b8ee3e36c619631565174aec8aa0' type='text/javascript'%3E%3C/script%3E"));
}

function rungame(){
    if(pagename == "index_i8" || pagename == "index_i8_embed") {
        window.open("i8desk://gid=40863")
        $("#card_type").html("VIP网吧礼包")
    }else if(pagename == "index_sw" || pagename == "index_sw_embed") {
        window.open("barclientview://-Package 13420/")
        $("#card_type").html("VIP网吧礼包")
    }else if(pagename == "index_yy") {
        window.open("gamerun://127.0.0.1/game/run.php?game=917B50C4702CFFA3")
    }else if(pagename == "index_xs"){
        $("#card_type").html("VIP网吧礼包")
        var x = document.getElementById("x");
        !function(){
            if(x.IsCanRunGame){
                x.RunGame('102849');}
             else{
                alert('本机没有安装迅闪客户端，不支持从网页启动游戏');
            }
        }()
    }
}

//-以上与页面属性相关------------------------------------------------------------------------------------------------------------------------
// var platform = 'iis'
var platform = 'node'

if (platform == 'node') {
    var url_account_check    = "/account_check"
    var url_check_idcard     = "/check_idcard"
    var url_captcha          = "/captcha"
    var url_check_captcha    = "/check_captcha"
    var url_register_account = "/register_account"
    var url_get_card         = "/get_card"
}
else {
    var url_account_check    = "/ajax/account_check.aspx"
    var url_check_idcard     = "/ajax/check_idcard.aspx"
    var url_captcha          = "/ajax/captcha.aspx"
    var url_check_captcha    = "/ajax/check_captcha.aspx"
    var url_register_account = "/ajax/register_account.aspx"
    var url_get_card         = "/ajax/get_card.aspx"
}

$("document").ready(function() {
    $(".reg_form input").val("")
})

$(".reg_form input").focus(function() {
        $("#validateimg").show()
})

var account_register_input_data = [
    {   name          : "account_name",
        input_id      : "txtUserAccount",
        info_div_id   : "txtUserAccount",
        status_div_id : "txtUserAccountTip",
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }
        ],
        remote_check  : {
            url      : url_account_check,
            1        : '该账号已经存在',
            2        : '系统错误'
        }
    },
    {   name             : "password",
        input_id         : "txtPasswords",
        info_div_id      : "txtPasswordsVal",
        status_div_id    : "txtPasswordsTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码的长度为6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "输入的密码不能包含空格" }
        ]
    },
    {   name             : "confirm_password",
        input_id         : "txtConfirm",
        info_div_id      : "txtConfirmVal",
        status_div_id    : "txtConfirmTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请再输入一遍密码" },
            { type : 'equal', value : "txtPasswords", err_info : "两次输入的密码不一致" }
        ]
    },
    {
        name          : "id_card",
        input_id      : "txtCardID",
        info_div_id   : "txtCardID",
        status_div_id : "txtCardIDTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的身份证信息" },
            { type : 'length', options : [ 15, 18 ], err_info : "身份证应为15位或18位" }
        ],
        remote_check  : {
            url : url_check_idcard,
            1   : "无效的身份证号码"
        }
    },
    {   name          : "true_name",
        input_id      : "txtTrueName",
        info_div_id   : "txtTrueName",
        status_div_id : "txtTrueNameTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的姓名" },
            { type : 'length', min : 2, max : 10, err_info : "姓名必须2-10个汉字" } ,
            { type : 'regex', value : /^[\u4e00-\u9fa5]{2,6}$/, err_info : "姓名必须是汉字" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        status_div_id : "txtValidateVal",
        pic_img       : { id : "validateimg", src : url_captcha },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : url_check_captcha,
            1   : ""
        }
    }
]

function account_register_setting() {
    input_setting_inputs(account_register_input_data)

    $("#reg_button").click(function(event) {
        account_register_request()
        event.preventDefault()
    })

    $("table.reg_form").keypress(function(event) {
        if (event.which == 13) { // 回车
            account_register_request()
        }
    })
}
//---------------------------------------------------------------------------------------------------------
function account_register_request() {
    var ret = input_status_check(account_register_input_data)
    if(!ret) {
        return
    }

    
    if (!check_license_agreement()) {
        return
    }

    var ret = input_get_inputs_value(account_register_input_data)
    if (!ret) {
        return
    }

    set_reg_progress()
    var pn = pagename
    if(/index_bd_/.test(pathname)) {
        pn = "index_bd"
    }

    if(/index_sg_/.test(pathname)) {
        pn = "index_sg"
    }

    ret.page_name = pn
    ret.r = Math.random()
    
    if (platform == 'iis') {
        $.post(url_register_account, ret, function(data) {
            clear_reg_progress()

            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
        }, "json")
    }
    else {
        $.post(url_register_account, ret, function(data) {
            clear_reg_progress()

            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
        })
    }
}
//---------------------------------------------------------------------------------------------------------
function check_license_agreement() {
    if (!$("#chk_XieYi").attr("checked")) {
        alert("请阅读并同意注册协议！"); 
        return false
    }

    return true
}
//---------------------------------------------------------------------------------------------------------
function set_reg_progress() {
    $("#regProcessTip").attr("class", "check_result_loading")
}
//---------------------------------------------------------------------------------------------------------
function clear_reg_progress() {
    $("#regProcessTip").attr("class", "")
}
//---------------------------------------------------------------------------------------------------------
var reg_result_func = {
    ok: function(info) {
        $("#reg_account").val(info[0])
        $('#active_code').val(info[1])
        $(".reg").hide()
        $("#reg_step2").show()

        $("#active_link").click(function(event) {
            var reg_account = $("#reg_account").val()
            var active_code = $("#active_code").val()
            if(reg_account == "" || active_code == "" ){
                alert('请输入帐号或者激活码')
            }else {
                $.post('/activate_card', {account : $("#reg_account").val() , card : $("#active_code").val()}, function(data) {
                    $("#reg_step2").hide()
                    switch (data){
                        case "0"://激活成功                            
                            $("#reg_step4").show()
                            break;
                        case "1"://帐号已激活
                            $("#active_tip").html("对不起，帐号错误");
                            $("#reg_step5").show()
                            break;
                        case "-2"://礼包卡已使用
                            $("#active_tip").html("对不起，新手卡错误");
                            $("#reg_step5").show()
                            break;
                        default://异常错误
                            $("#active_tip").html("对不起，服务器异常");
                            $("#reg_step5").show()
                            break;
                    }
                    $("#back").click(function() {
                        $("#reg_step2").show()
                        $("#reg_step5").hide()
                    })
                }, 'html')
            }
            return false
        })
    },

    no_card: function(info) {
        $(".reg").hide()
        $("#reg_step3").show()
        $('#reg_account3').html(info[0])
    },

    failed: function(info) {
        alert(info)
    },

    default_: function(info) {
        $("#txtPasswords").val("")
        $("#txtConfirm").val("")
        $("#txtValidate").val("")
        $("#regProcessTip").attr("class", "")
        alert(info)
    }
}

account_register_setting();

$("a").attr("hidefocus", "true");