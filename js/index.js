
var lat, long;

var name = "anual";

var exa = new Vue({
    el: '#imgRad',
    data: {
        show: false,
        class:'classRed'
        
    }
})
var anio = new Vue({
    el: '#imgAnual',
    data: {
        show: true
        
    }, methods:{
       /* showData(e,h){
            this.show = !this.show;
            console.log(this);
            h.className = "classRed";
            name = "enero";
            LoadMap();


        }*/
    }
})
var mensual = new Vue({
    el: '#imgMensual',
    data: {
        show: false
        
    }, methods:{
        showData(e,h){
            this.show = !this.show;
            console.log(this);
            h.className = "classRed";
            name = "enero";
            LoadMap();


        }
    }
})

var diario = new Vue({
    el: '#imgDiario',
    data: {
        show: false
        
    }, methods:{
        showData(e,h){
            this.show = !this.show;
            console.log(this);
            h.className = "classRed";
            name = "enero";
            LoadMap();


        }
    }
})


function GetMap(name)
{

    var url = "http://192.168.1.6:8080/geoserver/"+name+"/wms?&layers="+name+":"+name;

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
    center: {lat: -24.3260336, lng: -66.2248039}
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
    GetArray(['args__'+lat,'args__'+ long],[callback_GetArray]);
    $( "#imgRad" ).trigger( "click" );
    getLocationElevation(e.latLng, elevator);
});

 function getLocationElevation(location, elevator) {
        // Initiate the location request
        elevator.getElevationForLocations({'locations': [location]}, function (results, status) {

            if (status === 'OK') {
                // Retrieve the first result
                if (results[0]) {
                    // Open the infowindow indicating the elevation at the clicked position.
                  //  alert('The elevation at this point <br>is ' +
                       //results[0].elevation + ' meters.');
                   } else {
                    alert('No results found');
                }
            } else {
                alert('Elevation service failed due to: ' + status);
            }
        });
    }

}

