// Load JSON text from server hosted file and return JSON parsed object
function loadJSON(filePath) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  return JSON.parse(json);
}

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType)
{
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",filePath,false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status==200)
  {
    return xmlhttp.responseText;
  }
  else {
    // TODO Throw exception
    return null;
  }
}
$(document).ready(function() {

  //var ataques = loadJSON("Attacks.json");
//var pokemonA = loadJSON("Pidgeot.json");
  //var pokemonB = loadJSON("Scyther.json");

var attacker = loadJSON("Pikachu.json")
var defender = loadJSON("Pidgeot.json")
var attacks  = loadJSON("Attacks.json")
var types = loadJSON("Types.json")
var selectedAttack = attacker.Attacks[0]
var selectedAttackOpp = defender.Attacks[0]
var a = attacks[selectedAttack]

//HTML values
   $(".vida").html(attacker.stats.Hp);
   $(".vidaopp").html(defender.stats.Hp);
   $(".ataque0").html(attacker.Attacks[0]);
   $(".ataque1").html(attacker.Attacks[1]);
   $(".ataque2").html(attacker.Attacks[2]);
   $(".ataque3").html(attacker.Attacks[3]);
   $(".ataqueopp0").html(defender.Attacks[0]);
   $(".ataqueopp1").html(defender.Attacks[1]);
   $(".ataqueopp2").html(defender.Attacks[2]);
   $(".ataqueopp3").html(defender.Attacks[3]);
   $(".miPokemon").html(attacker.nombre);
   $(".oppPokemon").html(defender.nombre);

  function modifier(){
    //a = Pokemon attack
    //b = Pokemon defending
    //var a = ataques[pokemonA.Attacks[0]];

    if (_.contains(types[defender.type].WeakAgainst, a.Type)){
      var result = 2;
    }
      else if (_.contains(types[defender.type].StrongAgainst, a.Type)) {
        var result = 0.5;
      }
      else {
        var result = 1;
      }
    return result
  }

  function hit(attack, attacker, defender){
    var mod = modifier();

    if (attacks[attack.Category == "Physical"]){
      var dmgPokemon = calcDmg(attacker.Lvl, attacker.stats.Attack, defender.stats.Defense, attacks[attack].Dmg, mod);
      defender.stats.Hp = Math.round(defender.stats.Hp - dmgPokemon);
      return defender.stats.Hp;
      }
    else {
      var dmgPokemon = calcDmg(attacker.Lvl, attacker.stats.SpAtk, defender.stats.SpDef, attacks[attack].Dmg, mod);
      defender.stats.Hp = Math.round(defender.stats.Hp - dmgPokemon);
      return defender.stats.Hp;
    }
  }

  function calcDmg(lvl, statAt, statDf, dmg, mod){
    return ((2 * lvl+ 10) / 250) * (statAt / statDf) * (dmg + 2) * mod;
  }
var pokemonPlayer = attacker;
var pokemonOpp = defender;

function actAttacks(miPokemon, oppPokemon){
  for(var i=0; i<3; i++){
    if (miPokemon.Attacks[i] == undefined){
      $(".ataque" + i).html("-");
    }
    else{
      $(".ataque" + i).html(pokemonPlayer.Attacks[i]);
    }
  }

  for(var i=0; i<3; i++){
    if (oppPokemon.Attacks[i] == undefined){
      $(".ataqueopp" + i).html("-");
    }
    else{
      $(".ataqueopp" + i).html(oppPokemon.Attacks[i]);
    }
  }
}

  $(document).keypress(function(e){
    console.log(e)
    if(e.which == 13) {
      hit(selectedAttack, pokemonPlayer, pokemonOpp);
      hit(selectedAttackOpp, pokemonOpp, pokemonPlayer);
      $(".vida").html(attacker.stats.Hp);
      $(".vidaopp").html(defender.stats.Hp);
      $(".selectedAttack").html(selectedAttack);
      $("selectedAttackOpp").html(selectedAttackOpp);
      console.log("my life:");
      console.log(attacker.stats.Hp);
      console.log("opp life:");
      console.log(defender.stats.Hp);
    }
    if(e.which == 113) {
      selectedAttack = pokemonPlayer.Attacks[0];
      $(".selectedAttack").html(selectedAttack);
    }
    if(e.which == 119) {
      selectedAttack = pokemonPlayer.Attacks[1];
      $(".selectedAttack").html(selectedAttack);
    }
    if(e.which == 101) {
      selectedAttack = pokemonPlayer.Attacks[2];
      $(".selectedAttack").html(selectedAttack);
    }
    if(e.which == 114) {
      selectedAttack = pokemonPlayer.Attacks[3];
      $(".selectedAttack").html(selectedAttack);
    }
    if(e.which == 97) {
      selectedAttackOpp = pokemonOpp.Attacks[0];
      $(".selectedAttackOpp").html(selectedAttackOpp);
    }
    if(e.which == 115) {
      selectedAttackOpp = pokemonOpp.Attacks[1];
      $(".selectedAttackOpp").html(selectedAttackOpp);
    }
    if(e.which == 100) {
      selectedAttackOpp = pokemonOpp.Attacks[2];
      $(".selectedAttackOpp").html(selectedAttackOpp);
    }
    if(e.which == 102) {
      selectedAttackOpp = pokemonOpp.Attacks[3];
      $(".selectedAttackOpp").html(selectedAttackOpp);
    }
    if(e.which == 49) {
      pokemonPlayer = loadJSON("Pidgeot.json");
      selectedAttack = pokemonPlayer.Attacks[0];
      $(".miPokemon").html(pokemonPlayer.nombre);
      actAttacks(pokemonPlayer, pokemonOpp);
    }
    if(e.which == 50) {
      pokemonPlayer = loadJSON("Scyther.json");
      selectedAttack = pokemonPlayer.Attacks[0];
      $(".miPokemon").html(pokemonPlayer.nombre);
      actAttacks(pokemonPlayer, pokemonOpp);
    }
    if(e.which == 51) {
      pokemonPlayer = loadJSON("Pikachu.json");
      selectedAttack = pokemonPlayer.Attacks[0];
      $(".miPokemon").html(pokemonPlayer.nombre);
      actAttacks(pokemonPlayer, pokemonOpp);
      }
    if(e.which == 52) {
      pokemonOpp = loadJSON("Pidgeot.json");
      selectedAttackOpp = pokemonOpp.Attacks[0];
      $(".oppPokemon").html(pokemonOpp.nombre);
      actAttacks(pokemonPlayer, pokemonOpp);
    }
    if(e.which == 53) {
      pokemonOpp = loadJSON("Scyther.json");
      selectedAttackOpp = pokemonOpp.Attacks[0];
      $(".oppPokemon").html(pokemonOpp.nombre);
      actAttacks(pokemonPlayer, pokemonOpp);
    }
    if(e.which == 54) {
      pokemonOpp = loadJSON("Pikachu.json");
      selectedAttackOpp = pokemonOpp.Attacks[0];
      $(".oppPokemon").html(pokemonOpp.nombre);
      actAttacks(pokemonPlayer, pokemonOpp);
    }
  })

});
