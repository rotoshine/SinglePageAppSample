(function($){
    "use strict";
    var TEMPLATE_PATH = "/template";
    var Template = function(templatePath){
        var that = this;
        var markup = "";
        $.ajax({
            url : TEMPLATE_PATH + "/" + templatePath
        }).done(function(loadMarkup){
            markup = loadMarkup;
        });

        this.getMarkup = function(){
            return markup;
        };
    };

    window.Template = Template;
})(jQuery);
