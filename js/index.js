
var lat,long,altura, currentPosition,pointercenter;
lat = -24.9124;
long = -65.3961;
altura = 1159,0023;
currentPosition = { lat : lat, lng: long};
pointercenter = { lat: -23.895882703682627,lng:-62.303466796875};

var  name = "anual";

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

    $("#varlat").html(lat.toFixed(4));
    $("#varlong").html(long.toFixed(4));
    $("#varalt").html(((typeof altura != 'undefined' && altura)? altura.toFixed(4): altura));

}
function changeMap(td)
{
    $(".meses").parent().find('td').removeAttr(" style ");
    $("#"+td.id).css("background-color","#F58220") ;
    name=td.id;

    LoadMap();
}
function GetMap(n)
{


    name = n;

    var url = "http://localhost:8080/geoserver/sisol/wms?&layers=sisol:"+n;

    url += "&service=WMS";
    url += "&version=1.1.0";
    url += "&request=GetMap";
    url += "&BGCOLOR=0xFFFFFF";
    url += "&TRANSPARENT=TRUE";
    url += "&styles=";
    url += "&width=256";
    url += "&height=256";
    url += "&tiled=true";
    url += "&srs=EPSG:4326";
    url += "&format=image/png";

    
    UpdateData();
    return url;


}

var map,marker;
function LoadMap(){
    /* var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 18,
     center: {lat: - 65.285, lng: - 25.09}
 });*/

 var myLatLng = currentPosition;
 
 map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    /*center: {lat: -24.3260336, lng: -66.2248039}*/
    center: pointercenter
});
 var elevator = new google.maps.ElevationService;

 
 marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  draggable : true,
  title: 'Hello World!'
});

 
 var wmsLayer =
 new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
        var url = GetMap(name);
        var s = Math.pow(2, zoom);
        var twidth = 768;
        var theight = 540;

                    //define boundingbox
                    var gBl = map.getProjection().fromPointToLatLng(
                            new google.maps.Point(coord.x * twidth / s, (coord.y + 1) * theight / s)); //zuidwest coördinaat
                    var gTr = map.getProjection().fromPointToLatLng(
                            new google.maps.Point((coord.x + 1) * twidth / s, coord.y * theight / s)); //noordoost coördinaat

                    var bbox = gBl.lng() + "," + gBl.lat() + "," + gTr.lng() + "," + gTr.lat();

                    //basics WMS URL
                    
                    url += "&bbox=" + bbox;
                    return url;
                },

                tileSize: new google.maps.Size(768, 540),
                opacity: 0.85,
                isPng: true
            }
            );


  GetArray(['args__'+lat,'args__'+ long,'args__'+name],[callback_GetArray]); 

 map.overlayMapTypes.push(wmsLayer);
 map.setMapTypeId('hybrid');
 map.addListener('click', function (e) {

    lat = e.latLng.lat(), long = e.latLng.lng();


    marker.setPosition(e.latLng);
    currentPosition = { lat: e.latLng.lat(),lng:e.latLng.lng()};
    altura = getLocationElevation(e.latLng, elevator);
    clickDataRad(lat,long,altura); 
     GetArray(['args__'+lat,'args__'+ long,'args__'+name],[callback_GetArray]); 
});

 function getLocationElevation(location, elevator) {
        // Initiate the location request
        elevator.getElevationForLocations({'locations': [location]}, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {                                        
                   $("#varalt").html(results[0].elevation.toFixed(4));

               } else {
                return 0;
            }

        } else {
            return 'error';
        }
    });
    }
}


function clickDataRad(lat,long, altura)
{
    $(".infoRad").show();
    $("#imgRad" ).addClass( "classOn" );
    
    $("#varlat").html(lat.toFixed(4));
    $("#varlong").html(long.toFixed(4));
    $("#varalt").html(((typeof altura != 'undefined' && altura)? altura.toFixed(4): altura));

    
}
