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
        const obj = parsedArray.find(obj => obj.id == id);
        return obj;
    }

    async save(product){
    try{
        product.id = 0;
        const array = await fs.readFileSync(this.fileName, 'utf8');
        const parsedArray = JSON.parse(array);
        let band = true;
        parsedArray.forEach(obj => { 
            if(obj.name == product.name){ 
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
    catch(err){
        console.log(err);
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

const instance = new Contenedor('products.txt');

const main = async () => {
    const products = await instance.getAll();
    products.forEach(product => console.log(product.title, product.price));

    const product = await instance.getById(1);
    console.log(product);

    const test = await instance.save({title: 'test', price: 10});
    console.log(test);

    await instance.deleteById(1);
    const products2 = await instance.getAll();
    products2.forEach(product => console.log(product.title, product.price));

    //Una vez ejecutado el próximo método, se eliminan todos los productos del archivo.txt
    await instance.deleteAll();

}

main();
module.exports = Contenedor;