var life = 0;
var nombre = pikachu 

function life_bar(){
    life = 100;
    $('#health').animate({
        width: '100%'
    }, {
        step: function(now, fx) {
            $(this).text(parseInt(now, 10) + '%');
        }
    });

$('#damager').click(function() {
    if (life > 0) {
        life = life - 25;
        $('#health').animate({
            width: life+'%'
        }, {
            step: function(now, fx) {
                $(this).text(parseInt(now, 10) + '%');
            }
        })
    }
    else {
        alert("estoy muerto x_x")
    }
})
};




