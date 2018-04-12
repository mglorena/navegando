


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


 $("#imgDiario").click(function(){
  nname="d";
   $(".meses").parent().find('td').removeAttr(" style ");
  $("#title_calendar").html("Radiaci&oacuten d&iacutea caracter&iacutestico");
  $("#titGraf").html("Radiacion dia caracteristico");
  $("#imgDiario").removeClass("classOn");
  $("#imgDiario").addClass("classOn");
  $("#imgMensual").removeClass("classOn");         
  $("#imgAnual").removeClass("classOn");
  $(".meses").show();
});

 $("#imgMensual").click(function(){
   nname="m";
    $(".meses").parent().find('td').removeAttr(" style ");
   $("#title_calendar").html("Radiaci&oacuten mensual");
   $("#titGraf").html("Radiaci&oacuten Global sobre plano Horizontal");
   $("#imgMensual").removeClass("classOn");
   $("#imgMensual").addClass("classOn");
   $("#imgDiario").removeClass("classOn");  
   $("#imgAnual").removeClass("classOn");
   $(".meses").show();

 });
 $("#imgAnual").addClass("classOn");$(".meses").hide();
 $("#imgAnual").click(function(){
   $(".meses").parent().find('td').removeAttr(" style ");
  $("#title_calendar").html("Radiaci&oacuten Anual");
   $("#imgDiario").removeClass("classOn");  
   $("#imgMensual").removeClass("classOn"); 
   $("#imgAnual").addClass("classOn");
   $(".meses").hide();
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
