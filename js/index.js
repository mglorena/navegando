var name = "anual";
var nname = "";

$(document).ready(function () {

    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });

    $('#btnCalcular').click(function (e) {
        e.preventDefault();
        $('.nav-tabs a[href="#resultado"]').tab('show');

    })

    /* Oculta todas las ventanas inicialmente*/
    $(".ventana").hide();

    $("#imgInfo").click(function () {
        hideVentanas();
        $("#imgInfo").addClass("classOn");
        $(".infoInfo").show();

    });

    $("#imgTemp").click(function () {
        hideVentanas();
        $("#imgTemp").addClass("classOn");
        $(".infoTemp").show();
    });

    $("#imgRad").click(function () {
        hideVentanas();
        $("#imgRad").addClass("classOn");
        $(".infoRad").show();
    });


    $("#imgSolar").click(function () {
        hideVentanas();
        $("#imgSolar").addClass("classOn");
        $(".infoFoto").show();
    });


    $("#imgTerm").click(function () {
        hideVentanas();
        $("#imgTerm").addClass("classOn");
        $(".infoTerm").show();
    });

    /*********************************************/
    $("#imgAnual").addClass("classOn");
    $(".meses").hide();
    $("#divEscala").html("<img class='imgScala' src='images/escalaanual.svg'/>");
    $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL");
    


    $("#imgDiario").click(function () {
        nname = "d";
        clearCalendar();
        
        $("#title_calendar").html("RADIACION DIARIA");
        $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL DIA CARACTERISTICO");
        $("#imgDiario").addClass("classOn");
        
        
        $(".meses").show();
        $("#divEscala").html("<img src='images/escaladia.svg' class='imgScala' />");
        changeMap(null, "enero");
    });

    $("#imgMensual").click(function () {
        nname = "m";
        clearCalendar();
        
        $("#title_calendar").html("RADIACION MENSUAL");
        $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL");
        $("#imgMensual").addClass("classOn");
        $(".meses").show();
        $("#divEscala").html("<img src='images/escalames.svg' class='imgScala' />");
        changeMap(null, "enero");

    });
    $("#imgAnual").click(function () {
        $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL");
        clearCalendar();
        
        $("#title_calendar").html("RADIACION ANUAL");  
        $("#imgAnual").addClass("classOn");
        $(".meses").hide();
        $("#divEscala").html("<img class='imgScala' src='images/escalaanual.svg'/>");
        
        nname = "";
        name = "anual";
        SetMap();
    });

    initValues();
});
function clearCalendar()
{
    $(".meses").parent().find('div').removeAttr(" style ");
    $(".toolCal").each(function () {
            $(this).removeClass("classOn");
        });
        
}

function hideVentanas()
{
    /* oculta cualquier ventana que haya estado abierta*/
    $(".ventana").hide();
    $(".iconV").each(function () {
        $(this).removeClass("classOn");
    });


}

function initValues()
{

    /*marker.setPosition(currentPosition);*/
    try
    {
        $("#varlat").html(lat.toFixed(4));
        $("#varlong").html(long.toFixed(4));
        $("#varalt").html(((typeof altura !== 'undefined' && altura) ? altura.toFixed(4) : altura));

        $("#varlatTemp").html(lat.toFixed(4));
        $("#varlongTemp").html(long.toFixed(4));
        $("#varaltTemp").html(((typeof altura !== 'undefined' && altura) ? altura.toFixed(4) : altura));

    } catch (e)
    {
        var params = {"lat": lat, "long": long, "altura": altura};
        //sendJsError(e, "initValues - index.js", ,params);
    }
}

function updateLabels(lat, long, altura)
{
    $(".infoRad").show();
    $("#imgRad").addClass("classOn");
    $(".infoFoto").hide();
    $("#varlat").html(lat.toFixed(4));
    $("#varlong").html(long.toFixed(4));
    $("#varalt").html(((typeof altura !== 'undefined' && altura) ? altura.toFixed(4) : altura));
    $("#imgSolar").removeClass("classOn");
}
