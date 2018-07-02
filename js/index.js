var name;
var nname = "";
var flagType, datosRadMensual;
window.flagDomLoaded = false;

function initLoad() {
    $(".ventana").hide();
    $(".meses").hide();
    /* RAD ANUAL */
    $("#divEscala").html("<img class='imgScala' src='images/Rescalaanual.svg'/>");
    flagType = "rad";
    $("#imgAnual").addClass("classOn");
    name = "anual";
    window.flagDomLoaded = true;
    $("#imgInfo").addClass("classOn");
    $(".infoInfo").show();
}

function updateLabels(lat, long, altura) {
    if (flagType == "rad") {
        $("#varlat").html(lat.toFixed(2));
        $("#varlong").html(long.toFixed(2));
        $("#varalt").html(altura);
    } else {
        $("#varlatTemp").html(lat.toFixed(2));
        $("#varlongTemp").html(long.toFixed(2));
        $("#varaltTemp").html(altura);
    }
}

function getDataForm() {
    ene = $("#txtENE").val();
    feb = $("#txtFEB").val();
    mar = $("#txtMAR").val();
    abr = $("#txtABR").val();
    may = $("#txtMAY").val();
    jun = $("#txtJUN").val();
    jul = $("#txtJUL").val();
    ago = $("#txtAGO").val();
    set = $("#txtSEP").val();
    oct = $("#txtOCT").val();
    nov = $("#txtNOV").val();
    dic = $("#txtDIC").val();
    modelo = $('input[name=rModelo]').val();
    var consumoMensual = new Array(ene, feb, mar, abr, may, jun, jul, ago, set, oct, nov, dic);
    beta = $("#txtInclinacion").val();
    PgfvAux = $("#txtCap").val();
    eficiencia = $("#txtInv").val();
    perdida = $("#txtFactor").val();
    h_Mes = datosRadMensual;
    var allData = new Array(lat, long, modelo, PgfvAux, beta, eficiencia, perdida, h_Mes, consumoMensual);
    console.log(allData);
    return allData;
    /*
     $lat
     $long
     @consumoMenusal, datos de usuario
     @h_Mes  , datos de radiacion servidor
     $capadidad, $PgfvAux
     $modelo
     $inclinacion, $beta
     $eficiencia
     $perdida
     ($latitud,$longitud,$modelo,$PgfvAux,$beta,$eficiencia,$perdida,@h_Mes,@consumoMensual)
    */
    /*#el array que devuelve fotovoltaico es la linea en el grafico combinado, la barra son los datos de radiacion.*/
    /* las barras se dibujan con el array de consumo */
}
$(document).ready(function() {
    $(".nav-tabs a").click(function() {
        $(this).tab('show');
    });
    $('#btnCalcular').click(function(e) {
        e.preventDefault();
        var datos = getDataForm();
        goCalcularFoto(['args__' + datos], [callback_goCalcularFoto]);
        /*goForData(['args__' + lat, 'args__' + long, 'args__' + name], [callback_goForData]);*/
        $('.nav-tabs a[href="#resultado"]').tab('show');
    })
    initLoad();
    $("#imgBook").click(function(e) {
        e.preventDefault();
        hideVentanas();
        $("#imgBook").addClass("classOn");
        $(".infoBook").show();
    });
    $("#imgInfo").click(function(e) {
        e.preventDefault();
        hideVentanas();
        $("#imgInfo").addClass("classOn");
        $(".infoInfo").show();
    });
    $("#imgRad").click(function(e) {
        e.preventDefault();
        hideVentanas();
        clearCalendar();
        $("#title_calendar").html("RADIACION SOLAR ANUAL");
        $("#imgAnual").addClass("classOn");
        $(".meses").hide();
        $("#imgRad").addClass("classOn");
        $(".infoRad").show();
        $("#divEscala").html("<img class='imgScala' src='images/Rescalaanual.svg'/>");
        updateLabels(lat, long, altura);
        nname = "";
        name = "anual";
        flagType = "rad";
        SetMap();
    });
    $("#imgTemp").click(function(e) {
        e.preventDefault();
        hideVentanas();
        clearCalendar();
        $("#imgTemp").addClass("classOn");
        $(".infoTemp").show();
        $("#divEscala").html("<img class='imgScala' src='images/Tescalaanual.svg'/>");
        $(".meses").hide();
        $("#imgAnual").addClass("classOn");
        updateLabels(lat, long, altura);
        $("#title_calendar").html("TEMPERATURA ANUAL");
        nname = "";
        name = "tanual";
        flagType = "temp";
        SetMap();
    });
    $("#imgSolar").click(function(e) {
        e.preventDefault();
        hideVentanas();
        $("#imgSolar").addClass("classOn");
        $(".infoFoto").show();
    });
    $("#imgTerm").click(function(e) {
        e.preventDefault();
        hideVentanas();
        $("#imgTerm").addClass("classOn");
        $(".infoTerm").show();
    });
    $("#imgDiario").click(function(e) {
        e.preventDefault();
        nname = "d";
        clearCalendar();
        if (flagType == "rad") {
            $("#title_calendar").html("RADIACION SOLAR DIARIA");
            $("#imgDiario").addClass("classOn");
            $(".meses").show();
            $("#divEscala").html("<img src='images/Rescaladia.svg' class='imgScala' />");
            changeMap(null, "enero");
        } else {
            $(".meses").hide();
            flagType = "temp";
            $("#title_calendar").html("");
        }
    });
    $("#imgMensual").click(function(e) {
        e.preventDefault();
        nname = "m";
        clearCalendar();
        if (flagType == "rad") {
            $("#title_calendar").html("RADIACION SOLAR  MENSUAL");
            $("#imgMensual").addClass("classOn");
            $(".meses").show();
            $("#divEscala").html("<img src='images/Rescalames.svg' class='imgScala' />");
        } else {
            $("#title_calendar").html("TEMPERATURA MEDIA MENSUAL");
            $("#imgMensual").addClass("classOn");
            $(".meses").show();
            $("#divEscala").html("<img src='images/Tescalames.svg' class='imgScala' />");
            nname += "t";
        }
        changeMap(null, "enero");
    });
    $("#imgAnual").click(function(e) {
        e.preventDefault();
        nname = "";
        clearCalendar();
        if (flagType === "rad") {
            $("#title_calendar").html("RADIACION SOLAR ANUAL");
            $("#divEscala").html("<img src='images/Rescalaanual.svg' class='imgScala' />");
            changeMap(null, "anual");
            $("#imgAnual").addClass("classOn");
            $(".meses").hide();
        } else {
            $("#title_calendar").html("TEMPERATURA MEDIA ANUAL");
            $("#divEscala").html("<img src='images/Tescalaanual.svg' class='imgScala' />");
            changeMap(null, "tanual");
            $("#imgAnual").addClass("classOn");
            $(".meses").hide();
        }
    });
});

function clearCalendar() {
    $(".meses").hide();
    $(".meses").parent().find('div').removeAttr(" style ");
    $(".toolCal").each(function() {
        $(this).removeClass("classOn");
    });
}

function hideVentanas() {
    /* oculta cualquier ventana que haya estado abierta*/
    $(".ventana").hide();
    $(".meses").hide();
    $(".iconV").each(function() {
        $(this).removeClass("classOn");
    });
}
var datos;

function callback_goForData(result) {
    try {
        var da = JSON.parse(result);
        var d = da[0];
        if (d === "Done") {
            datos = da;
            UpdateData();
        } else {
            if (window.flagDomLoaded) {
                humane.error("Getting data " + da[1]);
            }
        }
    } catch (e) {
        humane.error("Exception " + e.menssage);
    }
}

function UpdateData(tipo) {
    if (typeof datos !== 'undefined') {
        datosRadMensual = datos[2];
        var tipo;
        var n = name.substring(0, 1);
        switch (n) {
            case 'd':
                tipo = 'dia';
                break;
            case 'm':
                tipo = 'mes';
                break;
            case 'a':
                tipo = 'anual';
                break;
            default:
                tipo = 'anual';
        }
        var mes = name.substring(1, name.length);
        var titDesc1, titDesc2;
        var agraf, agrafTemp, vargbl, vargblin, vardiNo, vardiHo, vargblTemp = 0;
        var path = "files/";
        switch (tipo) {
            case 'dia':
                agraf = datos[1];
                vargbl = datos[3][0];
                vargblin = datos[3][1];
                vardiNo = datos[3][2];
                vardiHo = datos[3][3];
                titDesc1 = "RADIACION SOLAR SOBRE PLANO HORIZONTAL DIA CARACTERISTICO: " + mes.toUpperCase();;
                path = path + "diario/";
                break;
            case 'mes':
                agraf = datos[2];
                datosRadMensual = datos[2];
                vargbl = datos[4][0];
                vargblin = datos[4][1];
                vardiNo = datos[4][2];
                vardiHo = datos[4][3];
                titDesc1 = "RADIACION SOLAR SOBRE PLANO HORIZONTAL ACUMULADA MENSUAL: " + mes.toUpperCase();
                titDesc2 = "TEMPERATURA MEDIA MENSUAL: " + mes.toUpperCase().substring(1, mes.length);
                path = path + "mes/";
                try {
                    vargblTemp = datos[6][12];
                    agrafTemp = datos[6];
                } catch (e) {}
                break;
            case 'anual':
                agraf = datos[2];
                vargbl = datos[5][0];
                vargblin = datos[5][1];
                vardiNo = datos[5][2];
                vardiHo = datos[5][3];
                try {
                    vargblTemp = datos[6][12];
                    agrafTemp = datos[6].slice(1, 13);
                } catch (e) {}
                titDesc1 = "RADIACION SOLAR SOBRE PLANO HORIZONTAL ACUMULADA ANUAL";
                titDesc2 = "TEMPERATURA MEDIA MENSUAL ";
                break;
            default:
                agraf = datos[2];
                vargbl = datos[5][0];
                vargblin = datos[5][1];
                vardiNo = datos[5][2];
                vardiHo = datos[5][3];
                try {
                    vargblTemp = datos[6][12];
                    agrafTemp = datos[6].slice(1, 13);
                } catch (e) {}
        }
        graf._render();
        graf.updateDataSet(agraf);
        grafTemp._render();
        grafTemp.updateDataSetTemp(agrafTemp);
        // Would update the first dataset's value of 'March' to be 50
        $("#vargbl").html(vargbl);
        $("#vargblTemp").html(parseFloat(vargblTemp).toFixed(2));
        try {
            $("#vargblin").html(vargblin.toFixed(2));
            $("#vardiNo").html(vardiNo.toFixed(2));
            $("#vardiHo").html(vardiHo.toFixed(2));
            var path = path + name;
            var path2 = "shapes/" + name;
            var link1 = "<a href='" + path + ".pdf' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
            var link2 = "<a href='" + path + ".png' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
            var link3 = "<a href='" + path2 + ".tif' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
            var link1Temp = "<a href='" + path + ".pdf' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
            var link2Temp = "<a href='" + path + ".png' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
            var link3Temp = "<a href='" + path2 + ".tif' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
            $("#link1").html(link1);
            $("#link2").html(link2);
            $("#link3").html(link3);
            $("#link1Temp").html(link1Temp);
            $("#link2Temp").html(link2Temp);
            $("#link3Temp").html(link3Temp);
            $("#titDesc1").html(titDesc1);
            $("#titleInfoRad").html(titDesc1);
            $("#titGraf").html(titDesc1);
            $("#titGrafTemp").html(titDesc2);
            $("#titleInfoTemp").html(titDesc2);
            $("#titDesc1Temp").html(titDesc2);
        } catch (e) {}
    }
}

function callback_goCalcularFoto(result) {
    console.log("volviendo de calcular");
    /* 0 Done, o Eeror, 1 array de 12 valores de enero a diciembre, que hay que poner en la linea del grafico.
    /* hacer tabla, una columna consumo, y la otra generacion*/
    try {
        var da = JSON.parse(result);
        var d = da[0][0];
        if (d === "Done") {
            datos = da[0][1];
            updataGrafFoto(grafFoto, datos, datosRadMensual);
            $("#divTableDatos").html(generateTable(datos, datosRadMensual));
        } else {
            if (window.flagDomLoaded) {
                humane.error("Getting data " + da[1]);
            }
        }
    } catch (e) {
        humane.error("Exception " + e.menssage);
    }
}

function generateTable(datos1, datos2) {
    var html = "<table id='tableData' cellpadding='0' cellspacing='0'><tr><th>Meses</th><th>Consumo kW</th><th> Producci&#243;n kW</th></tr>";
    var meses = labelMeses;
    for (var i in datos1) {
        html += "<tr>";
        html += "<td>" + meses[i] + "</td>";
        html += "<td>" + datos1[i] + "</td>";
        html += "<td>" + datos2[i] + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

function updataGrafFoto(chart, datos, datosRad) {
    chart.data.datasets[0].data = datos;
    chart.data.datasets[1].data = datosRad;
    chart.update();
}
var labelMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
Vue.use(VueCharts);
var graf = new Vue({
    el: '#graf',
    data: {
        mylabel: "kWh/m" + String.fromCharCode(178),
        mylabels: labelMeses,
        mydata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    options: {
        responsive: true,
        legend: {
            display: false,
            position: 'right',
            labels: {
                hidden: true,
                fontColor: '#777'
            }
        }
    },
    methods: {
        updateDataSet(newDataSet) {
            this.mydata = newDataSet;
        }
    }
});
var grafTemp = new Vue({
    el: '#grafTemp',
    data: {
        mylabel: "(" + String.fromCharCode(176) + "C grados Celsius)",
        mylabels: labelMeses,
        mydata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    options: {
        responsive: true,
        legend: {
            display: false,
            position: 'right',
            labels: {
                hidden: true,
                fontColor: '#777'
            }
        },
        animation: {
            onComplete: function(animation) {
                alert("aaa");
                document.querySelector('#savegraph').setAttribute('src', this.toBase64Image());
            }
        }
    },
    methods: {
        updateDataSetTemp(newDataSet) {
            this.mydata = newDataSet;
        }
    }
});
var ctx = $("#grafFoto");
var grafFoto = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Consumo (kWh)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: "rgb(154, 66, 63)",
            backgroundColor: "rgba(154, 66, 63, 0.2)"
        }, {
            label: "Generaci" + String.fromCharCode(243) + "n (kWh)",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            // Changes this dataset to become a line
            type: 'line'
        }],
        labels: labelMeses
    }
});
/*
new Chart(document.getElementById("chartjs-7"), {
    "type": "bar",
    "data": {
        "labels": ["January", "February", "March", "April"],
        "datasets": [{
            "label": "Bar Dataset",
            "data": [10, 20, 30, 40],
            "borderColor": "rgb(255, 99, 132)",
            "backgroundColor": "rgba(255, 99, 132, 0.2)"
        }, {
            "label": "Line Dataset",
            "data": [50, 50, 50, 50],
            "type": "line",
            "fill": false,
            "borderColor": "rgb(54, 162, 235)"
        }]
    },
    "options": {
        "scales": {
            "yAxes": [{
                "ticks": {
                    "beginAtZero": true
                }
            }]
        }
    }
});
/*
var grafFoto = new Vue({
    el: '#grafFoto',
    data: {
        mylabel: '',
        mylabels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        mydata: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: window.chartColors.blue,
                borderWidth: 2,
                fill: false,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: window.chartColors.red,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: window.chartColors.green,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            }]
    },


        };
    options: {
        responsive: true,
        legend: {
            display: false,
            position: 'right',
            labels: {
                hidden: true,
                fontColor: '#777'
            }
        },
        animation: {
            onComplete: function(animation) {
                alert("aaa");
                document.querySelector('#savegraph').setAttribute('src', this.toBase64Image());
            }
        }
    },
    methods: {
        updateDataSetTemp(newDataSet) {
            this.mydata = newDataSet;
        }
    }
});*/