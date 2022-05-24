//localStorage.setItem("dataActived","false");
const numero_pisos = 10;
const users = [];
var num_users = 0;

function img() {
  var t = JSON.parse(localStorage["resultat" + localStorage["clickID"]]);
  document.getElementById("photo").setAttribute("src", t.image_url);
}
function canviarText() {
  var t = JSON.parse(localStorage["resultat" + localStorage["clickID"]]);
  var c = t.ciutat;
  var a = t.atrb;
  var a2 = t.atrb;
  var hab2 = t.habitacions;
  var car = t.carrer;
  var s = t.superficie;
  var hab = t.habitacions;
  var im = t.immoble;
  var p = t.preu;
  var im2 = t.immoble;
  var tel = t.tel;
  im2 = im2.toLowerCase();
  document.getElementById("_im").innerHTML = im;
  document.getElementById("_hab").innerHTML = hab;
  document.getElementById("_p").innerHTML = p;
  document.getElementById("_c").innerHTML = c;
  document.getElementById("_s").innerHTML = s;
  document.getElementById("_car").innerHTML = car;
  document.getElementById("_a").innerHTML = a;
  document.getElementById("_a2").innerHTML = a2;
  document.getElementById("_hab2").innerHTML = hab2;
  document.getElementById("_im2").innerHTML = im2;
  document.getElementById("_tel").innerHTML = tel;
  var string = "";
  if (t.wifi && t.ascensor && t.transport) {
    string += " wifi, ascensor i transport públic proper";
  }
  if (t.wifi && t.ascensor && !t.transport) {
    string += " wifi i ascensor";
  }
  if (!t.wifi && t.ascensor && t.transport) {
    string += " ascensor i transport públic proper";
  }
  if (t.wifi && !t.ascensor && t.transport) {
    string += " wifi i transport públic proper";
  }
  if (t.wifi && !t.ascensor && !t.transport) {
    string += " wifi";
  }
  if (!t.wifi && !t.ascensor && t.transport) {
    string += " transport públic proper";
  }
  if (!t.wifi && t.ascensor && !t.transport) {
    string += " ascensor";
  }
  string += ".";
  document.getElementById("atributs").innerHTML = string;
  if (string === ".") {
    string = "";
    document.getElementById("no_atr").innerHTML = string;
  }
  if (t.immoble === "Casa") {
    document.getElementById("cas_pis").innerHTML = "Aquesta";
  } else {
    document.getElementById("cas_pis").innerHTML = "Aquest";
  }
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
  busqueda.carrer = "";
  busqueda.atrb = "";
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
  this.wifi = Math.floor(Math.random() * 2) == 1;
  this.transport = Math.floor(Math.random() * 2) == 1;
  this.ascensor = Math.floor(Math.random() * 2) == 1;
  const atr = ["piscina", "jardi", "àtic", "terrasa"];

  const carrer = [
    "Pau Casals",
    "Jacint Verdaguer",
    "Pompeu Fabra",
    "Joan Maragall",
    "Jaume Balmes",
    "Lluís Companys",
    "Àngel Guimerà",
    "Francesc Macià",
    "Jaume I",
    "Joan Miró",
  ];

  var list_images = [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    "photo4.jpg",
    "photo5.jpg",
    "photo6.jpg",
    "photo7.jpg",
    "photo8.jpg",
    "photo9.jpg",
    "photo10.jpg",
  ];

  this.id = id;
  this.ciutat = ciutat;
  this.immoble = immoble;
  this.habitacions = habitacions;
  this.preu = preu;
  this.superficie = superficie;
  this.image_url = list_images[id - 1];

  this.carrer = carrer[Math.floor(Math.random() * carrer.length)];
  this.atrb = atr[Math.floor(Math.random() * atr.length)];
  this.tel = 9 + Math.random().toString().slice(2, 10);
}

function crearDivAux() {
  if (localStorage["nRes"] == 0) {
    alert("No hi ha resultats per a mostrar");
    window.location.href = "./main.html";
  }
  for (var i = 0; i < localStorage["nRes"]; i++) {
    crearDiv(localStorage["resultat" + (i + 1)], i + 1);
  }
}
function getID(id) {
  localStorage["clickID"] = id;
}

function crearDiv(valor, i) {
  var pars = JSON.parse(valor);
  var link = document.createElement("a");
  var nLista = document.createElement("li");
  var card = document.createElement("div");
  var el = document.getElementById("listado");
  var class_row = document.createElement("div");
  var class_col6 = document.createElement("div");
  var class_cardb = document.createElement("div");
  var class_carti = document.createElement("h5");
  var class_cart = document.createElement("p");
  var class_cart2 = document.createElement("p");
  var class_cart3 = document.createElement("p");
  var class_col5 = document.createElement("div");
  var tel = document.createElement("p");
  var img = document.createElement("img");
  var info = document.createTextNode(
    pars.immoble +
      ", " +
      pars.habitacions +
      " habitacions amb " +
      pars.atrb +
      ", " +
      pars.superficie +
      "m² (" +
      pars.preu +
      "€/mes)"
  );
  var string = "";
  if (pars.wifi) {
    string += "📶 Wifi \xa0\xa0\xa0";
  }
  if (pars.ascensor) {
    string += "🛗 Ascensor \xa0\xa0\xa0";
  }
  if (pars.transport) {
    string += "🚏 Transport públic";
  }
  var atri = document.createTextNode(string);
  var atr = document.createTextNode("☎︎ +34 " + pars.tel);
  var carrer = document.createTextNode(pars.carrer + ", " + pars.ciutat);

  link.setAttribute("id", i);
  link.setAttribute("style", "text-decoration: none; color: black;");
  class_row.setAttribute("class", "row no-gutters");
  class_col6.setAttribute("class", "col-sm-6");
  class_cardb.setAttribute("class", "card-body");
  card.setAttribute("style", "width: 1100px");
  class_carti.setAttribute("class", "card-title");
  class_cart.setAttribute("class", "card-text");
  class_cart2.setAttribute("class", "card-text");
  class_cart3.setAttribute("class", "card-text");
  class_cart3.setAttribute("style", "display: flex; bottom:2px;");
  link.setAttribute("href", "./finalResult.html");
  card.setAttribute("class", "card card2");
  class_col5.setAttribute("class", "col-sm");
  img.setAttribute("class", "img-cerca");

  link.setAttribute("onClick", "getID(this.id)");
  el.appendChild(nLista);
  nLista.appendChild(link);
  link.appendChild(card);
  card.appendChild(class_row);
  class_row.appendChild(class_col6);
  class_col6.appendChild(class_cardb);
  class_cardb.appendChild(class_carti);
  class_cardb.appendChild(class_cart);
  class_cardb.appendChild(class_cart2);
  class_cardb.appendChild(class_cart3);
  class_row.appendChild(class_col5);
  class_col5.appendChild(img);
  img.src = pars.image_url;

  class_carti.appendChild(info);
  class_cart.appendChild(carrer);
  class_cardb.appendChild(atri);
  class_col6.appendChild(tel);
  tel.appendChild(atr);
  tel.setAttribute(
    "style",
    "float: left; position: absolute; bottom:25px; left:50px;"
  );
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
  if (localStorage.getItem("dataActived") === null) {
    localStorage["exec"] = false;
    localStorage["dataActived"] = "false";
    if (localStorage.getItem("dataActived") === "false") {
      console.log("Iniciando datos");
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

function User(name, surname, username, password) {
  this.name = name;
  this.surname = surname;
  this.username = username;
  this.password = password;
  this.saved_pisos = [];
}

function registerUser() {
  var name = document.getElementById("register_user_name").value;
  var surname = document.getElementById("register_user_surname").value;
  var username = document
    .getElementById("register_user_mail")
    .value.toLowerCase();
  var password = document.getElementById("register_user_password").value;
  var r_password = document.getElementById(
    "register_user_password_repeat"
  ).value;

  // Comprovem si falta algun camp
  if (name && surname && username && password && r_password) {
    if (password === r_password) {
      if (this.getUser(username) === null) {
        var user = new User(name, surname, username, password, r_password);

        var numUser = parseInt(localStorage.getItem("numUsers")) + 1;
        localStorage["numUsers"] = numUser.toString();
        localStorage.setItem(username, JSON.stringify(user));

        console.log("NUMERO DE CLIENTS: " + localStorage.getItem("numUsers"));
        window.location.href = "./main.html";
        localStorage["actualUser"] = JSON.stringify(user);
      } else {
        window.alert("Ja existeix un usuari amb aquest compte");
        window.location.href = "./register.html";
      }
    } else {
      window.alert("Els contrasenyes introduides no coincideixen");
      window.location.href = "./register.html";
    }
  } else {
    window.alert("Algun dels camps no es troba complert");
    window.location.href = "./register.html";
  }
}

function existUser(username, password) {
  return localStorage.getItem(username) !== null;
}

/**
 * Aquesta funció ens recupera l'usuari que el seu nom coincideixi
 * @param {} username
 * @returns
 */
function getUser(username) {
  return localStorage.getItem(username);
}

/**
 * Realitza el logun de l'usuari introduit al login.html
 */
function login_user() {
  username = document.getElementById("user_mail").value.toLowerCase();
  password = document.getElementById("user_password").value;

  if (this.existUser(username, password)) {
    localStorage.setItem("actualUser", JSON.stringify(this.getUser(username)));
    localStorage.setItem("initUser", "true");
    window.location.href = "./main.html";
    document.getElementById("loginButton").innerHTML = "El meu perfil";
    localStorage["exec"] = true;
  } else {
    window.alert("L'usuari introduit no existeix");
    window.location.href = "./login.html";
  }
}

function manageLogin() {
  console.log("Inside ManageLogin");
  // En cas que no hi hagi cap usuari registrat, anirem a formualri de login
  if (localStorage.getItem("actualUser") === null) {
    console.log("Charging login.html");
    window.location.href = "./login.html";
  }

  // En cas contrari, anem al menu de l'usuari
  else {
    window.location.href = "./menuUsuari.html";
  }
}

function closeSession() {
  console.log("Tancant sessió");

  // GUardem la variable actualUser a null per evitar que carregui les dades de l'usuari anterior.
  localStorage.removeItem("actualUser");
  window.location.href = "./main.html";
}

function goToBustia() {
  console.log("Accedint a la bustia");
  window.location.href = "./messages.html";
}

function goToInmobles() {
  console.log("Accedint als inmobles llogats");
  window.location.href = "./inmoblesLlogats.html";
}

/**
 * Aquesta funció s'encarrega de recuperar la llista de pisos llogats per un usuari
 */
function getListFromUser(username) {
  var user = JSON.parse(this.getUser(username));
  console.log("LONGITUD LISTA: " + user.saved_pisos.length);
  return user.saved_pisos;
}

function addPisos(username) {
  var user = JSON.parse(this.getUser(username));
  console.log("NOM DE L'USUARI: " + user.username.toString());

  var pis1 = JSON.parse(localStorage.getItem("pis1"));
  console.log("URL:" + pis1.image_url.toString());
  var pis2 = JSON.parse(localStorage.getItem("pis2"));
  var pis3 = JSON.parse(localStorage.getItem("pis3"));
  var pis4 = JSON.parse(localStorage.getItem("pis4"));

  var list = [];
  list.push(pis1);
  list.push(pis2);
  list.push(pis3);
  list.push(pis4);

  user.saved_pisos = list;
  localStorage[username] = JSON.stringify(user);
}
