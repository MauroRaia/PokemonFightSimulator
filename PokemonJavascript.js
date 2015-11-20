
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

var paralyze = function(){
      if (Math.random() >= 0.25){
        return true
    }
      else{
        return false
      }
}

var sleep = function(){
  var random = Math.floor((Math.random() * 7) + 1);
  var i = 0
      while (random >= i){
        i += 1
        return true
      }
}

var pokemonPlayer;
var pokemonOpp;
var Attacks;
var types;
var selectedAttack;
var selectedAttackOpp;
var fightdata;
$(document).ready(function() {
  Attacks  = loadJSON("Attacks.json")
  types = loadJSON("Types.json")
  //var ataques = loadJSON("Attacks.json");
//var pokemonA = loadJSON("Pidgeot.json");
  //var pokemonB = loadJSON("Scyther.json");


  //fightdata.round = 0;
  // fightdata.statuses = {};
//HTML values
  //  $(".vida").html(attacker.stats.Hp);
  //  $(".vidaopp").html(defender.stats.Hp);
  //  $(".ataque0").html(attacker.Attacks[0]);
  //  $(".ataque1").html(attacker.Attacks[1]);
  //  $(".ataque2").html(attacker.Attacks[2]);
  //  $(".ataque3").html(attacker.Attacks[3]);
  //  $(".ataqueopp0").html(defender.Attacks[0]);
  //  $(".ataqueopp1").html(defender.Attacks[1]);
  //  $(".ataqueopp2").html(defender.Attacks[2]);
  //  $(".ataqueopp3").html(defender.Attacks[3]);
  //  $(".miPokemon").html(attacker.nombre);
  //  $(".oppPokemon").html(defender.nombre);


function modifier(attack, defender){

    if (_.contains(types[pokemonOpp.Type].WeakAgainst, attack.Type)){
      var result = 2;
    }
      else if (_.contains(types[pokemonOpp.Type].StrongAgainst, attack.Type)) {
        var result = 0.5;
      }
      else {
        var result = 1;
      }
    return result
  }
function calcAcc(attack, attacker, defender){
  var p = ((Attacks[attack].Accuracy * (attacker.stats.Accuracy / defender.stats.Evasion)) / 100)
  var random = Math.random()
  if (random <= p){
    return true
  }
  else {
    return false
  }
}

  function hit(attack, attacker, defender){
    var mod = modifier(attack, defender);

    if (calcAcc(attack, attacker, defender)){

    if (Attacks[attack.Category == "Physical"]){
      var dmgPokemon = calcDmg(attacker.Lvl, attacker.stats.Attack, defender.stats.Defense, Attacks[attack].Dmg, mod);
      defender.stats.Hp = Math.round(defender.stats.Hp - dmgPokemon);
      return defender.stats.Hp;
      }
    else {
      var dmgPokemon = calcDmg(attacker.Lvl, attacker.stats.SpAtk, defender.stats.SpDef, Attacks[attack].Dmg, mod);
      defender.stats.Hp = Math.round(defender.stats.Hp - dmgPokemon);
      return defender.stats.Hp;
    }
  }
  else{
    console.log("Fallaste, sos dun")
  }
  }

  function calcDmg(lvl, statAt, statDf, dmg, mod){
    return ((2 * lvl+ 10) / 250) * (statAt / statDf) * (dmg + 2) * mod;
  }


//who = "me" mi pokemon
//who = "opp" pokemon oponente

function actAttacks(pokemon, who){
  if (who == "me"){
    var variable = ".ataque";
  }
  else{
    var variable = ".ataqueopp";
  }
  for(var i=0; i<4; i++){
    if (pokemon.Attacks[i] == undefined){
      $(variable + i).html("-");
    }
    else{
      $(variable + i).html(pokemonPlayer.Attacks[i]);
    }
  }
}


  $(document).keypress(function(e){
    if(e.which == 13) {
    //  fightdata.round += 1;
      hit(selectedAttack, pokemonPlayer, pokemonOpp);
      hit(selectedAttackOpp, pokemonOpp, pokemonPlayer);
      $(".vida").html(pokemonPlayer.stats.Hp);
      $(".vidaopp").html(pokemonOpp.stats.Hp);
      $(".selectedAttack").html(selectedAttack);
      $(".selectedAttackOpp").html(selectedAttackOpp);
      console.log("my life:");
      console.log(pokemonPlayer.stats.Hp);
      console.log("opp life:");
      console.log(pokemonOpp.stats.Hp);
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
      actAttacks(pokemonPlayer, "me");
    }
    if(e.which == 50) {
      pokemonPlayer = loadJSON("Scyther.json");
      selectedAttack = pokemonPlayer.Attacks[0];
      $(".miPokemon").html(pokemonPlayer.nombre);
      actAttacks(pokemonPlayer, "me");
    }
    if(e.which == 51) {
      pokemonPlayer = loadJSON("Pikachu.json");
      selectedAttack = pokemonPlayer.Attacks[0];
      $(".miPokemon").html(pokemonPlayer.nombre);
      actAttacks(pokemonPlayer, "me");
      }
    if(e.which == 52) {
      pokemonOpp = loadJSON("Pidgeot.json");
      selectedAttackOpp = pokemonOpp.Attacks[0];
      $(".oppPokemon").html(pokemonOpp.nombre);
      actAttacks(pokemonOpp, "opp");
    }
    if(e.which == 53) {
      pokemonOpp = loadJSON("Scyther.json");
      selectedAttackOpp = pokemonOpp.Attacks[0];
      $(".oppPokemon").html(pokemonOpp.nombre);
      actAttacks(pokemonOpp, "opp");
    }
    if(e.which == 54) {
      pokemonOpp = loadJSON("Pikachu.json");
      selectedAttackOpp = pokemonOpp.Attacks[0];
      $(".oppPokemon").html(pokemonOpp.nombre);
      actAttacks(pokemonOpp, "opp");
    }
  })

});
