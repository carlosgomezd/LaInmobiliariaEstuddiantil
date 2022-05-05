
/*
Classe que emmagatzema totes les dades dels usuaris
 */
function User(name, surname, email, password){
    
    // Dades de l'usuari
    this.name = name;
    this.surname = surname;
    this.email = email;
    this,password = password;

    // Pisos guardats de l'usuari
    this.pisosGuardats = [];
}


/*
Classe que emmagatzema totes les dades d'un pis
*/
function Pis(id, poblacio, numHabitacions, preu, superficie, tipus, description){
    this.id = id;
    this.poblacio = poblacio;
    this.numHabitacions = numHabitacions;
    this.preu = preu;
    this.superficie = superficie;
    this.tipus = tipus;
    this.descrption = description;
}

var poblacions = ["Barcelona", "Girona", "Tarragona", "Lleida"]
var type = ["Casa", "Pis"]



const app = Vue.createApp({
    data:function(){
        return {
            list_users:[],
            list_pisos: this.createRandomPisos()
        }
    },
    methods: {

        /*
            Aquesta funció s'encarrega de crear 10 pisos aleatoris en un 
        */
        createRandomPisos(){
            var list = [];

            var pis1 = new Pis(0, "Barcelona", 2, 120, 50, "Pis", "Pis situat en el centre de la ciutat ben comunicat amb transport public");
            list.push(pis1);
            var pis2 = new Pis(1, "Girona", 3, 450, 70, "Casa", "Casa situada a les afores de Girona. Compte amb parking");
            list.push(pis2);
            var pis3 = new Pis(2, "Barcelona", 1, 150, 40, "Pis", "Petit pis situat a la zona de Sagrada Familia, amb comunicació a la L5");
            list.push(pis3);
            var pis4 = new Pis(3, "Barcelona", 4, 600, 80, "Casa", "Duplex situat al barri de la Sagrera amb 4 habitacions. Ideal per entrar a viure amb companys");
            list.push(pis4);
            var pis5 = new Pis(4, "Tarragona", 2, 200, 60, "Pis", "Pis genial per a estudiants. Dues habitacions amb una gran comunicació amb transport públic");
            list.push(pis5);
            var pis6 = new Pis(5, "Tarragona", 5, 300, 90, "Pis", "Pis ideal per a grans grups d'estudiants ");
            list.push(pis6);
            var pis7 = new Pis(6, "Girona", 1, 90, 30, "Pis", "Pis individual amb un cost petit però a prop de la facultat de Matematiques");
            list.push(pis7);
            var pis8 = new Pis(7, "Barcelona", 3, 480, 60, "Pis", "Pis per a tres persones, situat a Plaça Universitat, just al costat de la UB");
            list.push(pis8);

            return list;
        },

        // Afegeix a un usuario passant els parametres corresponents. Retorna true si s'ha afegit i false en cas contrari
        addUser:function(name, surname, email, password){

            // Comprovem que l'usuari no existeixi
            if (!this.checkIfUserExist(email)){
                var user = new User(name, surname, email, password);
                this.list_user.push(user);
                
                return true;
            }

            return false;
        },

        checkIfUserExist: function(email){
            for(let i = 0; i < this.list_users.length; i++){
                if (list_user[i].email === email){
                    return true;
                }
            }

            return false;
        },

        addPis: function(poblacio, numHabitacions, preu, superficie, tipus){
            var new_pis = new Pis(poblacio, numHabitacions, preu, superficie, tipus);

            if (!this.checkIfPisExists(new_pis)){
                this.list_pisos.push(new_pis);

                return true;
            }

            return false;
        },

        checkIfPisExists: function(pis){
            for (let i = 0; i < this.list_pisos.length; i++){
                if (this.list_pisos[i] === pis){
                    return true;
                }
            }

            return false;
        },

        pisIsEquals(pis1, pis2){
            var equals =  ((pis1.poblacio === pis2.poblacio) &&
                            (pis1.numHabitacions === pis2.numHabitacions) &&
                            (pis1.preu === pis2.preu) &&
                            (pis1.superficie === pis2.superficie) &&
                            (pis1.tipus === pis2.tipus))
        },

        searchPis(poblacio, numHabitacions, preu, superficie, tipus){
            searched_pis = []
            var pis_ideal = new Pis(poblacio, numHabitacions, preu, superficie, tipus);

            for (let i = 0; i < list_pisos.length; i++){
                if (this.pisIsEquals(pis_ideal, list_pisos[i])){
                    this.searched_pis.push(list_pisos[i]);
                }
            }

            return searched_pis;
        },


        search_by_id(id){
            for (let i = 0; i < list_pisos.length; i++){
                if (this.list_pisos[i].id === id){
                    return list_pisos[i];
                }
            }

            return null;
        }

    }
});
app.mount("#app");