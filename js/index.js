
var lat,long,altura;

var name = "anual";

/*var anio = new Vue({
    el: '#solarInfo',
    data: {
        varlat: lat,
        varlong: long,
        varalt: altura         
    }
})*/


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

        $(".infoDiario").toggle();
        $("#imgDiario").removeClass("classOn");
        $("#imgDiario").addClass("classOn");
        $("#imgMensual").removeClass("classOn"); 
        $(".infoMensual").hide();
        $("#imgAnual").removeClass("classOn");
    });

    $(".infoMensual").hide();
    $("#imgMensual").click(function(){

        $(".infoMensual").toggle();
        $("#imgMensual").removeClass("classOn");
        $("#imgMensual").addClass("classOn");
        $("#imgDiario").removeClass("classOn"); 
        $(".infoDiario").hide();
        $("#imgAnual").removeClass("classOn");
        
    });
  
    $("#imgAnual").addClass("classOn");
    $("#imgAnual").click(function(){

        $("#imgDiario").removeClass("classOn"); 
        $(".infoDiario").hide();
        $("#imgMensual").removeClass("classOn"); 
        $(".infoMensual").hide();
        $("#imgAnual").addClass("classOn");
    });
});

function GetMap(name)
{

    var url = "http://localhost:8080/geoserver/"+name+"/wms?&layers="+name+":"+name;

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

    return url;


}


function LoadMap(){
    /* var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 18,
     center: {lat: - 65.285, lng: - 25.09}
 });*/
 
 var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    /*center: {lat: -24.3260336, lng: -66.2248039}*/
    center: { lat: -23.895882703682627,lng:-62.303466796875}
});
 var elevator = new google.maps.ElevationService;

 

 
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
 map.overlayMapTypes.push(wmsLayer);
 map.setMapTypeId('hybrid');
 map.addListener('click', function (e) {

    lat = e.latLng.lat(), long = e.latLng.lng();
    altura = getLocationElevation(e.latLng, elevator);
    clickDataRad(lat,long,altura); 
    GetArray(['args__'+lat,'args__'+ long],[callback_GetArray]); 
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
