
//localStorage.setItem("dataActived","false");
const numero_pisos = 10;
const users = [];
var num_users = 0;


function canviarText1() {
  var b = JSON.parse(localStorage["resultat1"]);
  var c = b.ciutat;
  var i = b.immoble;
  var h = b.habitacions;
  var p = b.preu;
  var s = b.superficie;
  document.getElementById("_im1").innerHTML = i;
  document.getElementById("_hab1").innerHTML = h;
  document.getElementById("_p1").innerHTML = p;
  document.getElementById("_c1").innerHTML = c;
  document.getElementById("_s1").innerHTML = s;
}
function canviarText2() {
  var b = JSON.parse(localStorage["resultat2"]);
  var c = b.ciutat;
  var i = b.immoble;
  var h = b.habitacions;
  var p = b.preu;
  var s = b.superficie;
  document.getElementById("_im2").innerHTML = i;
  document.getElementById("_hab2").innerHTML = h;
  document.getElementById("_p2").innerHTML = p;
  document.getElementById("_c2").innerHTML = c;
  document.getElementById("_s2").innerHTML = s;
}

function canviarText3() {
  var b = JSON.parse(localStorage["resultat3"]);
  var c = b.ciutat;
  var i = b.immoble;
  var h = b.habitacions;
  var p = b.preu;
  var s = b.superficie;
  document.getElementById("_im3").innerHTML = i;
  document.getElementById("_hab3").innerHTML = h;
  document.getElementById("_p3").innerHTML = p;
  document.getElementById("_c3").innerHTML = c;
  document.getElementById("_s3").innerHTML = s;
}

function getBusqueda() {
  var ciutat = document.getElementById("ciutat");
  var strCiutat = ciutat.options[ciutat.selectedIndex].text;
  var imm = document.getElementById("immoble");
  var strImm = imm.options[imm.selectedIndex].text;
  var hab = document.getElementById("habitacio");
  var strHab = hab.options[hab.selectedIndex].text;
  var preu = document.getElementById("pr").value;
  var sup = "";
  if (strCiutat === "Població") {
    strCiutat = "";
  }
  if (strImm === "Immoble") {
    strImm = "";
  }
  if (strHab === "Habitacions") {
    strHab = "";
  }
  window.location.href = "./Resultado_cerca.html";
  var busqueda = new pisos(-1, strCiutat, strImm, strHab, preu, sup);
  localStorage["busq"] = JSON.stringify(busqueda);
}

function showBusqueda() {
  console.log(JSON.parse(localStorage["busq"]));
}

function showPisos() {
  for (var i = 0; i < numero_pisos; i++) {
    console.log(JSON.parse(localStorage["pis" + (i + 1)]));
  }
}

function pisos(id, ciutat, immoble, habitacions, preu, superficie) {
  this.id = id;
  this.ciutat = ciutat;
  this.immoble = immoble;
  this.habitacions = habitacions;
  this.preu = preu;
  this.superficie = superficie;
}


function hide() {
  var h2 = document.getElementById("hide2");
  var h3 = document.getElementById("hide3");
  if (localStorage["nRes"] === 3) {
    h2.style.display = "block";
    h3.style.display = "block";
  }
  if (localStorage["nRes"] === 2) {
    h2.style.display = "block";
    h3.style.display = "none";
  }
  if (localStorage["nRes"] === 1) {
    h2.style.display = "none";
    h3.style.display = "none";
  }
}


function compararCerca() {
  const lst = [];
  for (var i = 0; i < numero_pisos; i++) {
    var pis = JSON.parse(localStorage["pis" + (i + 1)]);
    var b = JSON.parse(localStorage["busq"]);
    if (b.ciutat.localeCompare("") == 0) {
      b.ciutat = pis.ciutat;
    }
    if (b.immoble.localeCompare("") == 0) {
      b.immoble = pis.immoble;
    }
    if (b.habitacions == "") {
      b.habitacions = pis.habitacions;
    }
    if (b.superficie == "") {
      b.superficie = pis.superficie;
    }

    var ci = pis.ciutat.localeCompare(b.ciutat);
    var im = pis.immoble.localeCompare(b.immoble);

    if (
      ci == 0 &&
      im == 0 &&
      pis.habitacions == b.habitacions &&
      pis.preu <= b.preu &&
      pis.superficie <= b.superficie
    ) {
      lst.push(pis);
    }
  }
  for (var j = 0; j < lst.length; j++) {
    console.log(lst[j]);
    localStorage["resultat" + (j + 1)] = JSON.stringify(lst[j]);
  }
  localStorage["nRes"] = lst.length;
}


function initData() {
  if (localStorage.getItem("dataActived") === null){
    console.log("ENTRA EN EL INITDATA");
    localStorage["exec"] = false;
    localStorage["dataActived"] = "false";
    console.log("VALOR LOCAL STORAGE: " + JSON.parse(localStorage["exec"]));
    if (localStorage.getItem("dataActived") === "false"){
      console.log("INiciando datos");
      crearPisos();
      localStorage["exec"] = true;
      localStorage["numUsers"] = "0";
      localStorage["dataActived"] = "true";
    }
  }
}


function crearPisos() {
  const ciu = ["Barcelona", "Girona", "Tarragona", "Lleida"];
  const imm = ["Pis", "Casa"];

  const piso = [];
  for (var j = 1; j <= numero_pisos; j++) {
    const ciuRandom = Math.floor(Math.random() * ciu.length);
    const immRandom = Math.floor(Math.random() * imm.length);
    const habRandom = Math.floor(Math.random() * 5) + 1;
    const prRandom = Math.floor(Math.random() * (1500 - 150 + 1)) + 150;
    const supRandom = Math.floor(Math.random() * (250 - 15 + 1)) + 15;
    var pis = new pisos(
      j,
      ciu[ciuRandom],
      imm[immRandom],
      habRandom,
      prRandom,
      supRandom
    );
    piso.push(pis);
  }

  for (var i = 0; i < piso.length; i++) {
    localStorage.setItem("pis" + (i + 1), JSON.stringify(piso[i]));
    //localStorage["pis" + (i + 1)] = JSON.stringify(piso[i]);
    //console.log(JSON.parse(localStorage["pis" + (i + 1)]));
  }
  //localStorage["nPisos"] = piso.length;
  localStorage.setItem("nPisos", piso.length.toString());
}


function getValorPreu() {
  var slider = document.getElementById("pr");
  var output = document.getElementById("preu");
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}


function getValorSuperficie() {
  var slider = document.getElementById("sup");
  var output = document.getElementById("m2");
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}


function User(name, surname, username, password){
  this.name = name;
  this.surname = surname;
  this.username = username;
  this.password = password;
  this.saved_pisos = [];
}


function registerUser () {
  var name = document.getElementById("register_user_name").value;
  var surname = document.getElementById("register_user_surname").value;
  var username = document.getElementById("register_user_mail").value.toLowerCase();
  var password = document.getElementById("register_user_password").value;
  var r_password = document.getElementById("register_user_password_repeat").value;

  // Comprovem si falta algun camp
  if (name && surname && username  && password && r_password){

    if (password === r_password){
    
      if (this.getUser(username) === null){
        var user = new User (name, surname, username, password, r_password);

        var numUser = parseInt(localStorage.getItem("numUsers")) + 1;
        localStorage["numUsers"] = numUser.toString();
        localStorage.setItem("user" + numUser.toString(), JSON.stringify(user));

        console.log("NUMERO DE CLIENTS: " + localStorage.getItem("numUsers"));
        window.location.href="./main.html";
        localStorage["actualUser"] = JSON.stringify(user);
      }

      else{
        window.alert("Ja existeix un usuari amb aquest compte");
        window.location.href="./register.html";
      }
    }
    else{
      window.alert("Els contrasenyes introduides no coincideixen");
      window.location.href="./register.html";
    }
  }
  else{
    window.alert("Algun dels camps no es troba complert");
    window.location.href="./register.html";
  }
}

function existUser (username, password) {
  console.log("Usuaris: " + localStorage["numUsers"]);
  var numUsuaris = parseInt(localStorage.getItem("numUsers"));
  
  for (let i = 0; i < numUsuaris; i++){
    var user = JSON.parse(localStorage.getItem("user" + (i + 1).toString()));

    if (user.username === username && user.password === password){
      return true;
    }
    
  }

  return false;
}


/**
 * Aquesta funció ens recupera l'usuari que el seu nom coincideixi
 * @param {} username 
 * @returns 
 */
function getUser (username) {
  var numUsuaris = parseInt(localStorage.getItem("numUsers"));

  for (let i = 0; i < numUsuaris; i++){
    var user = JSON.parse(localStorage.getItem("user" + (i + 1).toString()));

    if (user.username === username){
      return user;
    }
  }

  return null;
}


/**
 * Realitza el logun de l'usuari introduit al login.html
 */
function login_user () {
  username = document.getElementById("user_mail").value;
  password = document.getElementById("user_password").value;

  if (this.existUser(username, password)){


    localStorage.setItem("actualUser", JSON.stringify(this.getUser(username)));
    localStorage.setItem("initUser", "true"); 
    window.location.href="./main.html";
    document.getElementById("loginButton").innerHTML = 'El meu perfil';
    localStorage["exec"] = true;
  }
  else{
    window.alert("L'usuari introduit no existeix");
    window.location.href="./login.html";
  }
}
