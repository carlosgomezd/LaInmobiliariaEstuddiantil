//localStorage.setItem("dataActived","false");
const numero_pisos = 10;
const users = [];
var num_users = 0;

function canviarText() {
  var t = JSON.parse(localStorage["resultat" + localStorage["clickID"]]);
  var c = t.ciutat;
  var a = t.atrb;
  var car = t.carrer;
  var s = t.superficie;
  var hab = t.habitacions;
  var im = t.immoble;
  var p = t.preu;
  document.getElementById("_im").innerHTML = im;
  document.getElementById("_hab").innerHTML = hab;
  document.getElementById("_p").innerHTML = p;
  document.getElementById("_c").innerHTML = c;
  document.getElementById("_s").innerHTML = s;
  document.getElementById("_car").innerHTML = car;
  document.getElementById("_a").innerHTML = a;
  document.getElementById("_a2").innerHTML = a;
  document.getElementById("_hab2").innerHTML = hab;
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
  const carrer = [
    "Pau Casals",
    "Jacint Verdaguer",
    "Pompeu Fabra",
    "Joan Maragall",
    "Jaume Balmes",
    "Lluís Companys",
    "Àngel Guimerà",
    "	Francesc Macià",
    "Jaume I",
    "	Joan Miró",
  ];
  const atr = ["Piscina", "Jardi", "Àtic", "Terrasa"];

  this.id = id;
  this.ciutat = ciutat;
  this.immoble = immoble;
  this.habitacions = habitacions;
  this.preu = preu;
  this.superficie = superficie;
  this.carrer = carrer[Math.floor(Math.random() * carrer.length)];
  this.atrb = atr[Math.floor(Math.random() * atr.length)];
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
  var class_col5 = document.createElement("div");
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
  var carrer = document.createTextNode(pars.carrer + ", " + pars.ciutat);
  //var atributs = document.createTextNode();

  link.setAttribute("id", i);
  link.setAttribute("style", "text-decoration: none; color: black;");
  class_row.setAttribute("class", "row no-gutters");
  class_col6.setAttribute("class", "col-sm-6");
  class_cardb.setAttribute("class", "card-body");
  class_carti.setAttribute("class", "card-title");
  class_cart.setAttribute("class", "card-text");
  class_cart2.setAttribute("class", "card-text");
  link.setAttribute("href", "./finalResult.html");
  card.setAttribute("class", "card card2");
  class_col5.setAttribute("class", "col-sm-4");
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
  class_row.appendChild(class_col5);
  class_col5.appendChild(img);
  img.src = "photo" + i + ".jpg";

  class_carti.appendChild(info);
  class_cart.appendChild(carrer);
  //class_cart2.appendChild(atributs);
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
    console.log("ENTRA EN EL INITDATA");
    localStorage["exec"] = false;
    localStorage["dataActived"] = "false";
    console.log("VALOR LOCAL STORAGE: " + JSON.parse(localStorage["exec"]));
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

function getValorSuperficie() {
  var slider = document.getElementById("sup");
  var output = document.getElementById("m2");
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
        localStorage.setItem("user" + numUser.toString(), JSON.stringify(user));

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
  console.log("Usuaris: " + localStorage["numUsers"]);
  var numUsuaris = parseInt(localStorage.getItem("numUsers"));

  for (let i = 0; i < numUsuaris; i++) {
    var user = JSON.parse(localStorage.getItem("user" + (i + 1).toString()));

    if (user.username === username && user.password === password) {
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
function getUser(username) {
  var numUsuaris = parseInt(localStorage.getItem("numUsers"));

  for (let i = 0; i < numUsuaris; i++) {
    var user = JSON.parse(localStorage.getItem("user" + (i + 1).toString()));

    if (user.username === username) {
      return user;
    }
  }

  return null;
}

/**
 * Realitza el logun de l'usuari introduit al login.html
 */
function login_user() {
  username = document.getElementById("user_mail").value;
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
