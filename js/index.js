


var  name = "anual"; var nname="";

$(document).ready(function(){

 $(".nav-tabs a").click(function(){
  $(this).tab('show');
});


 $(".infoRad").hide();
 $("#imgRad").click(function(){

   $(".infoRad").toggle();
   if($(".infoRad").is(":hidden")){$("#imgRad").removeClass("classOn")}
 });


 $(".infoFoto").hide();
 $("#imgSolar").click(function(){
  $(".infoRad").hide();
   $(".infoFoto").toggle();
   if($(".infoFoto").is(":hidden")){$("#imgSolar").removeClass("classOn")}
   $("#imgRad").removeClass("classOn")
 });
 $("#imgDiario").click(function(){
  nname="d";
  
  $(".meses").parent().find('td').removeAttr(" style ");
  $("#title_calendar").html("RADIACION DIARIA");
  $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL DIA CARACTERISTICO");
  $("#imgDiario").removeClass("classOn");
  $("#imgDiario").addClass("classOn");
  $("#imgMensual").removeClass("classOn");         
  $("#imgAnual").removeClass("classOn");
  $(".meses").show();
   $("#divEscala").html("<img src='images/escaladia.svg' class='imgScala' />");
   changeMap(null,"enero");
});

 $("#imgMensual").click(function(){
   nname="m";
   
   $(".meses").parent().find('td').removeAttr(" style ");
   $("#title_calendar").html("RADIACION MENSUAL");
   $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL");
   $("#imgMensual").removeClass("classOn");
   $("#imgMensual").addClass("classOn");
   $("#imgDiario").removeClass("classOn");  
   $("#imgAnual").removeClass("classOn");
   $(".meses").show();
   $("#divEscala").html("<img src='images/escalames.svg' class='imgScala' />");
   changeMap(null,"enero");

 });
 $("#imgAnual").addClass("classOn");$(".meses").hide();$("#divEscala").html("<img class='imgScala' src='images/escalaanual.svg'/>");
 $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL");
 $("#imgAnual").click(function(){
   $("#titGraf").html("RADIACION GLOBAL SOBRE PLANO HORIZONTAL");
   $(".meses").parent().find('td').removeAttr(" style ");
   $("#title_calendar").html("RADIACION ANUAL");
   $("#imgDiario").removeClass("classOn");  
   $("#imgMensual").removeClass("classOn"); 
   $("#imgAnual").addClass("classOn");
   $(".meses").hide();
   $("#divEscala").html("<img class='imgScala' src='images/escalaanual.svg'/>");
   nname="";
   name="anual";
  SetMap();
 });

 initValues();
});

function initValues()
{

  /*marker.setPosition(currentPosition);*/
  try
  {
   $("#varlat").html(lat.toFixed(4));
   $("#varlong").html(long.toFixed(4));
   $("#varalt").html(((typeof altura != 'undefined' && altura)? altura.toFixed(4): altura));

 }catch (e)
 {
   var params = {"lat": lat, "long": long, "altura": altura};
   //sendJsError(e, "initValues - index.js", ,params);
 }
}

function updateLabels(lat,long, altura)
{
  $(".infoRad").show();
  $("#imgRad" ).addClass( "classOn" );  
  $("#varlat").html(lat.toFixed(4));
  $("#varlong").html(long.toFixed(4));
  $("#varalt").html(((typeof altura != 'undefined' && altura)? altura.toFixed(4): altura));


}
