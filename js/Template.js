(function(){
    "use strict";
    var TEMPLATE_PATH = "/template";
    var Template = function(templatePath){
        var markup = "";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", TEMPLATE_PATH + "/" + templatePath, false);
        xhr.send(null);

        if(xhr.status === 200){
            markup = xhr.responseText;
        }else{
            console.error(xhr.statusText);
        }

        this.getMarkup = function(){
            return markup;
        };
    };

    window.Template = Template;
})();
