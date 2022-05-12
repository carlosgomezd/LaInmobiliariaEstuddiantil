localStorage["exec"] = false;

function getBusqueda() {
  var ciutat = document.getElementById("ciutat");
  var strCiutat = ciutat.options[ciutat.selectedIndex].text;
  var imm = document.getElementById("immoble");
  var strImm = imm.options[imm.selectedIndex].text;
  var hab = document.getElementById("habitacio");
  var strHab = hab.options[hab.selectedIndex].text;
  var preu = document.getElementById("pr").value;
  var sup = document.getElementById("sup").value;
  if (
    strCiutat === "Població" ||
    strImm === "Immoble" ||
    strHab === "Habitacions"
  ) {
    alert("Error hi ha algun paràmetre no vàlid. (⊙.☉)7 ");
  } else {
    window.location.href = "./cercat.html";
  }
  var busqueda = new pisos(-1, strCiutat, strImm, strHab, preu, sup);
  localStorage["busq"] = JSON.stringify(busqueda);
}

function showBusqueda() {
  console.log(JSON.parse(localStorage["busq"]));
}

function showPisos() {
  for (var i = 0; i < 10; i++) {
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

function func() {
  console.log(JSON.parse(localStorage["pis1"]).ciutat);
  console.log(JSON.parse(localStorage["busq"]).ciutat);
  var pis = JSON.parse(localStorage["pis1"]);
  var b = JSON.parse(localStorage["busq"]);
  console.log(pis.ciutat.localeCompare(b.ciutat));
}

function compararCerca() {
  const lst = [];
  for (var i = 0; i < 10; i++) {
    var pis = JSON.parse(localStorage["pis" + (i + 1)]);
    var b = JSON.parse(localStorage["busq"]);
    var ci = pis.ciutat.localeCompare(b.ciutat);
    var im = pis.immoble.localeCompare(b.immoble);
    if (
      ci == 0 &&
      im == 0 &&
      pis.habitacions == b.habitacions &&
      pis.preu <= b.preu &&
      pis.superficie <= b.superficie
    ) {
      console.log("Comparat!");
      lst.push(pis);
      localStorage["resultat" + (i + 1)] = JSON.stringify(lst[i]);
    }
  }
  for (var j = 0; j < lst.length; j++) {
    console.log(lst[j]);
  }
}

function auxCrearPisos() {
  if (localStorage["exec"] == false) crearPisos();
}

function crearPisos() {
  const ciu = ["Barcelona", "Girona", "Tarragona", "Lleida"];
  const imm = ["Pis", "Casa"];

  const piso = [];
  for (var j = 1; j <= 10; j++) {
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
    localStorage["pis" + (i + 1)] = JSON.stringify(piso[i]);
    console.log(JSON.parse(localStorage["pis" + (i + 1)]));
  }
  localStorage["exec"] = true;
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
