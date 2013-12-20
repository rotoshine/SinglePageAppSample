(function(View, Model){
    "use strict";

    var users = new Model("users");

    // query selector 유틸리티 함수
    var $ = function(selector){
        return document.querySelector(selector);
    };

    window.mainView = new View({
        $element : $("#app"),
        templateName : "MainApp.html",
        event : {
            "click #addButton" : function(){
                var $name = $("#name");
                var $age = $("#age");

                // users model에 데이터 추가
                users.insert({
                    name : $name.value,
                    age : $age.value
                });
                $name.value = "";
                $age.value = "";
                listView.render();
            }
        }
    });

    var listView = new View({
        $element : $("#list"),
        templateName : "SimpleList.html",
        model : users
    });



})(View, Model);