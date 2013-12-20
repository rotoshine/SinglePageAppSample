(function(){
    "use strict";
    var View = function(params){
        var that = this;
        this.$element = params.$element;
        this.event = params.event;
        this.modelData = params.modelData;

        // template load
        this.template = new Template(params.templateName);

        var simpleRendering = function(templateMarkup, modelData){
            for(var key in modelData){
                var pattern = new RegExp("{" + key + "}", "g");
                templateMarkup = templateMarkup.replace(pattern, modelData[key]);
            }
            return templateMarkup;
        };

        this.render = function(){
            var templateMarkup = that.template.getMarkup();
            var renderingResult = "";

            // model이 array인 경우 반복생성하고 아니면 한 번 생성
            if(that.modelData.hasOwnProperty("length")){
                for(var i = 0; i < that.modelData.length; i++){
                    renderingResult += simpleRendering(templateMarkup, that.modelData[i]);
                }
            }else{
                renderingResult = simpleRendering(templateMarkup, that.modelData);
            }

            that.$element.innerHTML = renderingResult;
        };

        var parseEventString = function(string){
            var splitString = string.split(" ");
            if(splitString.length === 2){
                return {
                    eventType : splitString[0],
                    targetElement : splitString[1]
                }
            }else{
                console.error("illegal event string : " + string);
            }
        };

        for(var eventString in this.event){
            var eventStringParseResult = parseEventString(eventString);
            var $targetElement = this.$element.querySelector(eventStringParseResult.targetElement);
            $targetElement.addEventListener(eventStringParseResult.eventType, function(){
                that.event[eventString](that.modelData);
            });
        }
    };

    window.View = View;
})();
