(function(localStorage){
    "use strict";
    var Storage = function(storageName){
        var that = this;
        var storedDateList = localStorage.getItem(storageName);
        if(storedDateList === null){
            storedDateList = [];
        }

        var autoIncrementSequence = 0;
        this.storageName = that.storageName;

        var getIndex = function(id){
            var index = -1;
            var i;
            for (i = 0; i < storedDateList.length; i++) {
                if (storedDateList[i].id === id) {
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
            return storedDateList.slice();
        };

        this.findById = function(id) {
            var index = getIndex(id);
            if (index !== -1) {
                return storedDateList[i];
            }
            return undefined;
        };

        this.insert = function(data){
            data.id = autoIncrementSequence;
            storedDateList.push(data);
            autoIncrementSequence++;
            that.sync();

        };

        this.update = function(data){
            if(data.hasOwnProperty("id")){
                var updateData = that.findById(data.id);
                if(updateData){
                    var index = getIndex();
                    storedDateList[index] = data;
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

                }else if(index -1 === storedDateList.length){

                }else{
                    storedDateList = storedDateList.slice(0, index).concat(storedDateList.slice(index + 1, storedDateList.length));
                }

            }
            that.sync();
        };

        this.sync = function(){
            localStorage.setItem(that.storageName, that.storedDataList);
        };
    }
    window.Storage = Storage;
})(window.localStorage);
