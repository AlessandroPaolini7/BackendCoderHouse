class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName () {
        return `Nombre completo: ${this.nombre} ${this.apellido}`
    }

    addMascota(m1){
        this.mascotas.push(m1);
    }

    countMascotas (){
        return this.mascotas.length;
    }

    addBook(nom, aut){
        this.libros.push({nombre: nom, autor: aut})
    }

    getBookNames(){
        let nombreLibros =[]
        for (const l of this.libros)
            nombreLibros.push(l.nombre)
        return nombreLibros
    }
}


let libros = [
                {nombre: "libro1", autor: "autor1"}, 
                {nombre: "libro2", autor: "autor2"},
                {nombre: "libro3", autor: "autor3"},
            ]
let mascotas = ["mascota1", "mascota2", "mascota3"]
const p1 = new Usuario("Pedro", "Sanchez", libros, mascotas);

console.log(p1.getFullName())

p1.addMascota("mascota4")
// console.log(p1.mascotas)

console.log(p1.countMascotas())

p1.addBook("libro4", "autor4")
// console.log(p1.libros)

console.log(p1.getBookNames());