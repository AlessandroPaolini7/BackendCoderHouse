const fs = require('fs');

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }


    async getAll(){ 
    const array = await fs.readFileSync(this.fileName, 'utf8');
    return JSON.parse(array);
    }

    async getById(id){
        const array = await fs.readFileSync(this.fileName, 'utf8');
        const parsedArray = JSON.parse(array);
        const obj = parsedArray.find(obj => obj.id === Number(id));
        return obj;
    }

    async save(product){
        const array = await fs.readFileSync(this.fileName, 'utf8');
        const parsedArray = JSON.parse(array);
        let band = true;
        parsedArray.forEach(obj => { 
            if(obj.title == product.title){ 
                band = false;
                }
            }
        );
        if(band){
        product.id = parsedArray.length + 1;
        parsedArray.push(product);
        await fs.writeFileSync(this.fileName, JSON.stringify(parsedArray));
        return product.id;
    }else{
        return console.log('El producto ya existe');
    }
}



    async deleteById(id){
        const array = await fs.readFileSync(this.fileName, 'utf8');
        const parsedArray = JSON.parse(array);
        const obj = parsedArray.find(obj => obj.id == id);
        const index = parsedArray.indexOf(obj);
        parsedArray.splice(index, 1);
        await fs.writeFileSync(this.fileName, JSON.stringify(parsedArray));
    }

    async deleteAll(){
        await fs.writeFileSync(this.fileName, JSON.stringify([]));
    }

}

module.exports = Contenedor;