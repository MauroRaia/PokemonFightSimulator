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
$( document ).ready(function() {

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

  $(document).keypress(function(e){
    if(e.which == 13) {
      hit(selectedAttack, pokemonPlayer, pokemonOpp);
      hit(selectedAttackOpp, pokemonOpp, pokemonPlayer);
      console.log("my life:")
      console.log(attacker.stats.Hp)
      console.log("opp life:")
      console.log(defender.stats.Hp)
    }
    if(e.which == 49) {
      selectedAttack = pokemonPlayer.Attacks[0]
    }
    if(e.which == 50) {
      selectedAttack = pokemonPlayer.Attacks[1]
    }
    if(e.which == 51) {
      selectedAttack = pokemonPlayer.Attacks[2]
    }
    if(e.which == 55) {
      selectedAttackOpp = pokemonOpp.Attacks[0]
    }
    if(e.which == 56) {
      selectedAttackOpp = pokemonOpp.Attacks[1]
    }
    if(e.which == 57) {
      selectedAttackOpp = pokemonOpp.Attacks[2]
    }
    if(e.which == 97) {
      pokemonPlayer = loadJSON("Pidgeot.json");
      selectedAttack = pokemonPlayer.Attacks[0]
    }
    if(e.which == 98) {
      pokemonPlayer = loadJSON("Scyther.json");
      selectedAttack = pokemonPlayer.Attacks[0]
    }
    if(e.which == 99) {
      pokemonPlayer = loadJSON("Pikachu.json");
      selectedAttack = pokemonPlayer.Attacks[0]
      }
    if(e.which == 103) {
      pokemonOpp = loadJSON("Pidgeot.json");
      selectedAttackOpp = pokemonOpp.Attacks[0]
    }
    if(e.which == 104) {
      pokemonOpp = loadJSON("Scyther.json");
      selectedAttackOpp = pokemongOpp.Attacks[0]
    }
    if(e.which == 105) {
      pokemonOpp = loadJSON("Pikachu.json");
      selectedAttackOpp = pokemonOpp.Attacks[0]
    }
  })

});
