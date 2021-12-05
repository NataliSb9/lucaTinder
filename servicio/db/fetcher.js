// primero hay que instalar npm install node-fetch@2

/*
"express": "^4.17.1",
    "express-handlebars": "^6.0.1",
    "fetch":"^1.1.0",
    "node":"^17.1.0",
    "node-fetch": "^2.6.6",

*/

const fetch = require('node-fetch');
const createUser = require('./db');
const descripciones= require("./descripciones")


fetch('https://randomuser.me/api/?results=100')
    .then(results => {
        return results.text()
    }).then(data => {
            data = JSON.parse(data);

            for (let i = 0; i < 100; i++) {
                let id = i;
                let pass=data.results[i].login.password;
                let name = `${data.results[i].name.first} ${data.results[i].name.last}`;
                let genero = data.results[i].gender;
                let email = data.results[i].email;
                let age = data.results[i].dob.age;
                let foto = data.results[i].picture.large;
                let descripcion = descripciones[i];
                let arrLikes = [];
                let arrDislike = [];
                let prefGen;
                if (i % 2 == 0) {
                    prefGen = "male";
                } else {
                    prefGen = "female"
                };
                let r;
                for (let j = 0; j < 10; j++) {
                     r = getRandom(0, 99);
                    if (data.results[r].gender === prefGen) {
                        arrLikes.push(data.results[r].email);
                    }
                }
                let t;
                for (let j = 0; j < 10; j++) {
                     t = getRandom(0, 99);
                    if (data.results[t].gender === prefGen) {
                        arrDislike.push(data.results[t].email);
                    }
                }
                let gustos = [];
                if (i % 2 == 0) {
                    gustos.push("Libros", "Café", "Socialismo")
                } else {
                    gustos.push("Netflix", "Youtube", "Andorra")
                };
                if (i % 3 == 0) {
                    gustos.push("Feria", "Desarrollo", "Futbol")
                } else {
                    gustos.push("Cine", "Té", "Filetes")
                };
                if (i % 5 == 0) {
                    gustos.push("Marvel", "Fabulas", "Palomitas")
                } else {
                    gustos.push("Pan", "Chocololate")
                }
                createUser(id,name, genero, email,pass, age, descripcion, gustos, arrLikes, arrDislike, prefGen, foto)
//id 


            }





        }

    )


function getRandom(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + (x));

}
