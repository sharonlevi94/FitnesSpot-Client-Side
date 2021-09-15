export default {
    getObjects:function (objType){
        // get the objects list from the DB
        var result = localStorage.getItem(objType);
        if(result == null){
            result = '[]';
        }
        return JSON.parse(result);
    },
    //-----------------------------------------------------------------------------
    insert:function (tableType, obj){
        let id = new Date().getTime();
        let newObj = obj;
        newObj.id = id;
        // insert user into DB
        let objArr = this.getObjects(tableType);
        objArr.push(newObj);
        localStorage.setItem(tableType, JSON.stringify(objArr));
    },
    //-----------------------------------------------------------------------------
    remove:function (objType, id){
        let ObjectsTable = this.getObjects(objType);
        for (let i = 0 ; i < ObjectsTable.length ; i++){
            if(ObjectsTable[i].id == id)
                ObjectsTable.slice(i, 1);
        }
        localStorage.setItem(objType, JSON.stringify(ObjectsTable));
    },
    //-----------------------------------------------------------------------------
    update:function (objType, id, newObj){
        let ObjectsTable = this.getObjects(objType);
        for (let obj of ObjectsTable){
            if(obj.id == id) {
                obj = newObj;
                break;
            }
        }
        localStorage.setItem(objType, JSON.stringify(ObjectsTable));
    },
    //-----------------------------------------------------------------------------
    getObjById: function (objType, id){
        let objects = this.getObjects(objType);
        for (let obj of objects){
            if(obj.id == id) {
                return obj;
            }
        }
    },

}