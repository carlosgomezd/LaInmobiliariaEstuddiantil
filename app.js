
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
function Pis(poblacio, numHabitacions, preu, superficie, tipus){
    this.poblacio = poblacio;
    this.numHabitacions = numHabitacions;
    this.preu = preu;
    this.superficie = superficie;
    this.tipus = tipus;
}


const app = Vue.createApp({
    data:function(){
        return {
            list_users:[],
            list_pisos:[]
        }
    },
    methods: {

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


        }

    }
});
app.mount("#app");