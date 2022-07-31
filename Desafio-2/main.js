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
        product.id = parsedArray.length++;
        parsedArray.push(product);
        await fs.writeFileSync(this.fileName, JSON.stringify(parsedArray));
        return product.id;
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

    const test = await instance.save({name: 'test', price: 10});
    console.log(test);

    await instance.deleteById(1);
    const products2 = await instance.getAll();
    products2.forEach(product => console.log(product.title, product.price));

    await instance.deleteAll();
    const products3 = await instance.getAll();
    products3.forEach(product => console.log(product.title, product.price));
}

main();
module.exports = Contenedor;