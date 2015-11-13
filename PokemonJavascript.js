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
//  $(".vida").html(pokemonB.stats.Hp);

var attacker = loadJSON("Pickachu.json")
var defender = loadJSON("Pidgeot.json")
var attacks  = loadJSON("Attacks.json")
var types = loadJSON("Types.json")
var selectionedAttack = attacker.attacks[0]
var selectionedAttackOpp = defender.attacks[0]
var a = attacks[selectionedAttack]


  function modifier(){
    //a = Pokemon attack
    //b = Pokemon defending
    //var a = ataques[pokemonA.Attacks[0]];

    if (_.contains(Types[Defender.type].WeakAgainst, a.Type)){
      var result = 2;
    }
      else if (_.contains(Types[Defender.type].StrongAgainst, a.Type)) {
        var result = 0.5;
      }
      else {
        var result = 1;
      }
    return result
  }

  console.log(modifier());

  function hit(selectionedAttack, attacker, defender){
    if (attacks[selectionedAttack.Category == "Physical"]){
      var dmgPokemon = ((2 * attacker.Lvl + 10) / 250) * (attacker.stats.Attack / defender.stats.Defense) * (attacks[selectionedAttack].Dmg + 2) * modifier();
      defender.stats.Hp = Math.round(defender.stats.Hp - dmgPokemon);
      return defender.stats.Hp;
      }
    else {
      var dmgPokemon = ((((2 * attacker.Lvl + 10) / 250) * (attacker.stats.SpAtk / defender.stats.SpDef) * (attack[selectionedAttack.Dmg + 2)) * modifier());
      defender.stats.Hp = Math.round(defender.stats.Hp - dmgPokemon);
      return defender.stats.Hp;
    }
  }

var pokemonPlayer = attacker;
var pokemonOpp = defender;

  $(document).keypress(function(e){
    if(e.which == 13) {
      hit(selectionedAttack, pokemonPlayer, pokemonDefender);
      hit(selectionedAttackOpp, pokemonOpp, pokemonPlayer)
    }
    if(e.which == 49) {
      selectionedAttack = pokemonPlayer.Attacks[0]
    }
    if(e.which == 50) {
      selectionedAttack = pokemonPlayer.Attacks[1]
    }
    if(e.which == 51) {
      selectionedAttack = pokemonPlayer.Attacks[2]
    }
    if(e.which == 55) {
      selectionedAttackOpp = pokemonOpp.Attacks[0]
    }
    if(e.which == 56) {
      selectionedAttackOpp = pokemonOpp.Attacks[1]
    }
    if(e.which == 57) {
      selectionedAttackOpp = pokemonOpp.Attacks[2]
    }
    if(e.which == 97) {
      pokemonPlayer = loadJSON("Pidgeot.json");
      selectionedAttack = pokemonPlayer.Attacks[0]
    }
    if(e.which == 98) {
      pokemonPlayer = loadJSON("Scyther.json");
      selectionedAttack = pokemonPlayer.Attacks[0]
    }
    if(e.which == 99) {
      pokemonPlayer = loadJSON("Pikachu.json");
      selectionedAttack = pokemonPlayer.Attacks[0]
      }
    if(e.which == 103) {
      pokemonOpp = loadJSON("Pidgeot.json");
      selectionedAttackOpp = pokemonOpp.Attacks[0]
    }
    if(e.which == 104) {
      pokemonOpp = loadJSON("Scyther.json");
      selectionedAttackOpp = pokemongOpp.Attacks[0]
    }
    if(e.which == 105) {
      pokemonOpp = loadJSON("Pikachu.json");
      selectionedAttackOpp = pokemonOpp.Attacks[0]
    }
  })

});
