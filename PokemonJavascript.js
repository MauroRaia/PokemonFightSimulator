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

  var ataques = loadJSON("Attacks.json");
  var types = loadJSON("Types.json");
  var pokemonA = loadJSON("Ivysaur.json");
  var pokemonB = loadJSON("Scyther.json");
  $(".vida").html(pokemonB.stats.Hp);

  function modifier(){
    //a = Pokemon attack
    //b = Pokemon defending
    var a = ataques[pokemonA.Attacks[0]];

    if (_.contains(types[pokemonB.types[0]].WeakAgainst, a.Type)){
      var result = 2;
    }
      else if (_.contains(types[pokemonB.types[0]].StrongAgainst, a.Type)) {
        var result = 0.5;
      }
      else {
        var result = 1;
      }
    return result
  }

  console.log(modifier());

  function hit(){
    if (ataques[pokemonA.Attacks[0]].Category == "Physical"){
      var dmgPokemon = ((((2 * pokemonA.level + 10) / 250) * (pokemonA.stats.Attack / pokemonB.stats.Defense) * (ataques[pokemonA.Attacks[0]].Dmg + 2)) * modifier());
      pokemonB.stats.Hp = Math.round(pokemonB.stats.Hp - dmgPokemon);
      return pokemonB.stats.Hp;
      }
    else {
      var dmgPokemon = ((((2 * pokemonA.level + 10) / 250) * (pokemonA.stats.SpAtk / pokemonB.stats.SpDef) * (ataques[pokemonA.Attacks[0]].Dmg + 2)) * modifier());
      pokemonB.stats.Hp = Math.round(pokemonB.stats.Hp - dmgPokemon);
      return pokemonB.stats.Hp;
    }
  }

  $(document).keypress(function(e) {
      if(e.which == 13) {
          console.log(hit());
          $(".vida").html(pokemonB.stats.Hp);
      }
  });

});
