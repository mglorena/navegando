var lat, long, altura, currentPosition, pointercenter;
lat = -24.06;
long = -63.79;
altura = 1301;
currentPosition = {lat: lat, lng: long};
pointercenter = {lat: -24.063393373551428, lng: -63.797607421875};

function SetMap()
{
    wmsLayer = GetLayer();
    map.overlayMapTypes.clear(); //removeAt(0);
    map.overlayMapTypes.push(wmsLayer);
    goForData(['args__' + lat, 'args__' + long, 'args__' + name], [callbackData]);
    //map.overlayMapTypes.push(wmsLayer);
}
function changeMap(div, divname)
{

  
   
    if (div !== null)    {

        $(".meses").parent().find('div').removeAttr(" style ");
        $("#" + div.id).css("background-color", "#791522");
        name = nname + div.id;

    } else
    {
        $(".meses").parent().find('div').removeAttr(" style ");
        $("#" + divname).css("background-color", "#791522");
        name = nname + divname;
    }
    
    SetMap();
 
}
function GetMap(n)
{


    name = n;

    var url = hostMapas + name;

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

var wmsLayer;
function GetLayer()
{
    wmsLayer =
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

    return wmsLayer;
}

var map, marker;
function LoadMap() {

    var myLatLng = currentPosition;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        /*center: {lat: -24.3260336, lng: -66.2248039}*/ 
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,

        },
        scaleControl: true,
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER,
            border: '2px solid #0bf672'
        },
        fullscreenControl: false,
        center: pointercenter
    });

    var elevator = new google.maps.ElevationService;


    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        draggable: true,
        title: 'Salta'
    });
   
    wmsLayer = GetLayer();
    
    /*goForData(['args__' + lat, 'args__' + long, 'args__' + name], [callbackData]);*/
    
    marker.setVisible(false);
    map.overlayMapTypes.push(wmsLayer);
    map.setMapTypeId('hybrid');

    map.addListener('click', function (e) {

        lat = e.latLng.lat(), long = e.latLng.lng();
         marker.setVisible(true);
        marker.setPosition(e.latLng);
        currentPosition = {lat: e.latLng.lat(), lng: e.latLng.lng()};
        altura = getLocationElevation(e.latLng, elevator);
        console.log(lat);
        console.log(long);
        updateLabels(lat, long, altura);
        goForData(['args__' + lat, 'args__' + long, 'args__' + name], [callbackData]);
    });

    function getLocationElevation(location, elevator) {
        // Initiate the location request
        elevator.getElevationForLocations({'locations': [location]}, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    $("#varalt").html(results[0].elevation.toFixed(0));
                    $("#varaltTemp").html(results[0].elevation.toFixed(0));

                } else {
                    return 0;
                }

            } else {
                return 'error';
            }
        });
    }
}
