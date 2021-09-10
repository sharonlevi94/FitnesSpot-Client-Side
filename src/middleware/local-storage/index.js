export default {
    getObjects:function (objType){
        // get the objects list from the DB
        var result = localStorage.getItem(objType);
        if(result == null){
            result = '{}';
        }
        return JSON.parse(result);
    },
    //-----------------------------------------------------------------------------
    insert:function (tableType, obj){
        let id = new Date().getTime();
        // insert user into DB
        let objMap = this.getObjects(tableType);
        objMap[id] = obj;
        localStorage.setItem(tableType, JSON.stringify(objMap));
    },
    //-----------------------------------------------------------------------------
    remove:function (objType, id){
        let ObjectsTable = this.getObjects(objType);
        delete ObjectsTable[id];
        localStorage.setItem(objType, JSON.stringify(ObjectsTable));
    },
    //-----------------------------------------------------------------------------
    update:function (objType, id, newobj){
        let ObjectsTable = this.getObjects(objType);
        for (var att in newobj){
            if(newobj[att])
                ObjectsTable[id][att] = newobj[att];
        }
        localStorage.setItem(objType, JSON.stringify(ObjectsTable));
    },
    //-----------------------------------------------------------------------------
    updateByKey:function (objType, id, newData, key){
        let ObjectsTable = this.getObjects(objType);
        ObjectsTable[id][key] = newData;
        localStorage.setItem(objType, JSON.stringify(ObjectsTable));
    }
}