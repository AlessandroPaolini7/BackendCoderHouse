const fs = require('fs');

class Container{
    constructor(){
        this.products = [];
        this.id = 0;
    }

    async getById(id){
        id = Number(id);
        const data = await this.getData();
        const parsedData = JSON.parse(data);
        const product = parsedData.find((producto) => producto.id === id);
        return product || {error: 'Producto no encontrado'};
    }

    async getAll(){
        return[...this.products];
    }

    async save(product){
        const newProduct = { ...product, id: this.id++ };
        this.products.push(product);
        return newProduct;
    }

    async updateById(product, id){
        const newProd = {id: Number(id), ...product};
        const index = this.products.findIndex((prod) => prod.id === id);
        if (index !== -1) {
            this.products[index] = newProd;
            return newProd;
        } else {
            return {error: 'Producto no encontrado'};
        }
    }


    async deleteById(id){
        const index = this.products.findIndex((prod) => prod.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        } else {
            return {error: 'Producto no encontrado'};
        }
    }
    
}

module.exports = Container;