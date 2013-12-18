(function(){
    "use strict";
    var View = function(params){
        var that = this;
        this.$element = params.$element;
        this.event = params.event;
        this.render = function(){
            var templateMarkup = template.getTemplate();

            for(var key in modelData){
                var pattern = new RegExp("{" + key + "}", "g");
                templateMarkup = templateMarkup.replace(pattern, modelData[key]);
            }
            that.element.innerHTML = templateMarkup;
        };

        var parseEventString = function(string){
            var splitString = string.split(" ");
            if(splitString.length === 2){
                return {
                    eventType : splitString[0],
                    targetElement : splitString[1]
                }
            }else{
                console.error("illega event string : " + string);
            }

        }
        for(var eventString in this.event){
            var eventStringParseResult = parseEventString(eventString);
            var $targetElement = this.$element.querySelector(eventStringParseResult.targetElement);
            $targetElement.addEventListener(eventStringParseResult.eventType, this.event[eventString]);
        }
    };

    window.View = View;
})();
