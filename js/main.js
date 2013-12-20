(function(View){
    "use strict";

    var $ = function(selector){
        return document.querySelector(selector);
    };

    var mainView = new View({
        $element : $("#app"),
        templateName : "MainApp.html" ,
        event : {
            "click #add" : function(){
                var name = $("#name");
                var age = $("#age");
            }
        }
    });

    mainView.render();

    var listView = new View({
        $element : $("#list"),
        templateName : "SimpleList.html",
        event : {

        }
    });



})(View);