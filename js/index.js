


var  name = "anual";

var diario = new Vue({
  el: '#imgDiario',
  data:{

  }, 
  template:'<div id="imgDiario"><div class="infoDiario" >Radiacion Dia Caracteristico<table class="meses">             <tr>              <td id="denero" onclick="changeMap(this)"> ENE</td>              <td id="dfebrero" onclick="changeMap(this)">FEB</td>                          <td id="dmarzo" onclick="changeMap(this)">MAR</td>                                     <td id="dabril" onclick="changeMap(this)">ABR</td>                                            </tr>                                                    <tr>            <td id="dmayo" onclick="changeMap(this)">MAY</td>                                                       <td id="djunio" onclick="changeMap(this)">JUN</td>                                                                <td id="djulio" onclick="changeMap(this)">JUL</td>                                                                      <td id="dagosto" onclick="changeMap(this)">AGO</td>                                                                          </tr>                                                                                <tr>                                                                                   <td id="dseptiembre" onclick="changeMap(this)">SEP</td>                                                                                     <td id="doctubre" onclick="changeMap(this)">OCT</td>                                                                                               <td id="dnoviembre" onclick="changeMap(this)">NOV</td>                                                                                                          <td id="ddiciembre" onclick="changeMap(this)">DIC</td>                                                                                                                    </tr>                                                                                                                           </table>                                                                                                                          </div>    </div> '
});


var mensual = new Vue({
  el: '#imgMensual',
  data:{

  }, 
  template:'  <div id="imgMensual"><div  class="infoMensual" >Radiacion <br/> Mensual        <table class="meses">          <tr>            <td id="menero" onclick="changeMap(this)"> ENE</td>            <td id="mfebrero" onclick="changeMap(this)">FEB</td>            <td id="mmarzo" onclick="changeMap(this)">MAR</td>            <td id="mabril" onclick="changeMap(this)">ABR</td>          </tr>          <tr>            <td id="mmayo" onclick="changeMap(this)">MAY</td>            <td id="mjunio" onclick="changeMap(this)">JUN</td>            <td id="mjulio" onclick="changeMap(this)">JUL</td>            <td id="magosto" onclick="changeMap(this)">AGO</td>          </tr>          <tr>            <td id="mseptiembre" onclick="changeMap(this)">SEP</td>            <td id="moctubre" onclick="changeMap(this)">OCT</td>           <td id="mnoviembre" onclick="changeMap(this)">NOV</td>            <td id="mdiciembre" onclick="changeMap(this)">DIC</td>          </tr>        </table>      </div></div>  '
});


$(document).ready(function(){

 $(".nav-tabs a").click(function(){
  $(this).tab('show');
});


 $(".infoRad").hide();
 $("#imgRad").click(function(){

  $(".infoRad").toggle();
  if($(".infoRad").is(":hidden")){$("#imgRad").removeClass("classOn")}
});

 $(".infoDiario").hide();
 $("#imgDiario").click(function(){

  /*$(".infoDiario").toggle();*/
       // var tit =utf8_encode("");
       $("#titGraf").html("Radiacion dia caracteristico");
       $("#imgDiario").removeClass("classOn");
       $("#imgDiario").addClass("classOn");
       $("#imgMensual").removeClass("classOn"); 
       $(".infoMensual").hide();
       $(".infoDiario").show();
       $("#imgAnual").removeClass("classOn");
     });

 $(".infoMensual").hide();
 $("#imgMensual").click(function(){

  $("#titGraf").html("Radiacion Global sobre plano Horizontal");
  $("#imgMensual").removeClass("classOn");
  $("#imgMensual").addClass("classOn");
  $("#imgDiario").removeClass("classOn"); 
  $(".infoDiario").hide();
  $(".infoMensual").show();
  $("#imgAnual").removeClass("classOn");

});

 $("#imgAnual").addClass("classOn");
 $("#imgAnual").click(function(){

  $("#imgDiario").removeClass("classOn"); 
  $(".infoDiario").hide();
  $("#imgMensual").removeClass("classOn"); 
  $(".infoMensual").hide();
  $("#imgAnual").addClass("classOn");
  name="anual";
  LoadMap();
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
