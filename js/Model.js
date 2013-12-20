(function(localStorage){
    "use strict";
    var Model = function(storageName){
        var that = this;
        this.storageName = storageName;
        var storedDateList = localStorage.getItem(storageName);
        var modelData;
        if(storedDateList === null){
            modelData = [];
        }else{
            modelData = JSON.parse(storedDateList);
        }

        var autoIncrementSequence = 0;

        var getIndex = function(id){
            var index = -1;
            var i;
            for (i = 0; i < modelData.length; i++) {
                if (modelData[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        };

        this.findAll = function(){
            // storedDataList를 그대로 반환하면
            // 외부에서 storedDataList 객체 자체를 변조할 수 있으므로
            // 복제하여 줌
            return modelData.slice();
        };

        this.findById = function(id) {
            var index = getIndex(id);
            if (index !== -1) {
                return modelData[i];
            }
            return undefined;
        };

        this.insert = function(data){
            data.id = autoIncrementSequence;
            modelData.push(data);
            autoIncrementSequence++;
            that.sync();

        };

        this.update = function(data){
            if(data.hasOwnProperty("id")){
                var updateData = that.findById(data.id);
                if(updateData){
                    var index = getIndex();
                    modelData[index] = data;
                    that.sync();
                }else{
                    throw new Error(data.id + " not found.");
                }
            }else{
                throw new Error("'id' property must exist.");
            }

        };

        this.remove = function(id){
            var index = getIndex(id);
            if(index !== -1){
                if(index === 0){

                }else if(index -1 === modelData.length){

                }else{
                    modelData = modelData.slice(0, index).concat(modelData.slice(index + 1, modelData.length));
                }

            }
            that.sync();
        };

        this.sync = function(){
            console.log(that.storageName + " stored!!");
            localStorage.setItem(that.storageName, JSON.stringify(modelData));
        };
    }
    window.Model = Model;
})(window.localStorage);
