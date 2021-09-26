const axios = require('axios');

export default {
    async read (options) {
        try{
            let response = [];
            // Make a request for a user with a given ID
            if(options.settings){
                let entityArr = options.entity.split('-');
                response = await axios.get(`http://localhost:3000/${entityArr[1]}/${entityArr[0]}`);
            }

            else{
                if(options.id)
                    response = await axios.get(`http://localhost:3000/${options.entity}/${options.id}`)
                else
                    response = await axios.get(`http://localhost:3000/${options.entity}`)

            }
            // handle success
            //console.log(response);
            return response.data.result;
        }
        catch (error) {
            console.error(error);
        }
    },
    async create (options){
        try{
            // Make a request for a user with a given ID
            let newObj = await axios.post(`http://localhost:3000/${options.entity}`,  {item:options.item});
            // handle success
            console.log(newObj);
            return newObj.data.result;
        }
        catch (error){
            console.error(error);
        }
    },
    async remove (options) {
        await axios.delete(`http://localhost:3000/${options.entity}/${options.objId}`);
    },
    async update (options) {
        await axios.put(options.entity, options.objId, options.newObj);
    }
}