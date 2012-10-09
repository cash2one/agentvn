jQuery.extend({
    createUploadIframe: function(id, uri){
        var frameId = 'jUploadFrame' + id;
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
        if(window.ActiveXObject){
            if(typeof uri== 'boolean'){
                iframeHtml += ' src="' + 'javascript:false' + '"';
            }
            else if(typeof uri== 'string'){
                iframeHtml += ' src="' + uri + '"';
            }    
        }
        iframeHtml += ' />';
        jQuery(iframeHtml).appendTo(document.body);
        return jQuery('#' + frameId).get(0);
    },
    createUploadForm: function(id, file){
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');    
        var oldElement = file;
        var newElement = jQuery(oldElement).clone();
        jQuery(oldElement).attr('id', fileId);
        jQuery(oldElement).before(newElement);
        jQuery(oldElement).appendTo(form);
        jQuery(form).css('position', 'absolute');
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body');
        return form;
    },
    ajaxFileUpload: function(s){
        var id = new Date().getTime()
        var form = jQuery.createUploadForm(id, s.file);
        var io = jQuery.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        var uploadCallback = function(){
            var fr = document.getElementById(frameId)
            var io = fr.contentDocument.body;
            var data = io?io.innerHTML:null;
            s.success(data);
            setTimeout(function(){
                jQuery(fr).remove();
                jQuery(form).remove();                            
            }, 100)
        }
        try{
            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url);
            jQuery(form).attr('method', 'POST');
            jQuery(form).attr('target', frameId);
            jQuery(form).attr('enctype', 'multipart/form-data');            
            jQuery(form).find("input").attr("name","upload");
            jQuery(form).submit();
        } catch(e){}        
        jQuery('#' + frameId).load(uploadCallback);
    }
})
           

