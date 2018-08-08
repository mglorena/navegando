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
    $("#txtLat").val(parseFloat(lat).toFixed(2));
    $("#txtLong").val(parseFloat(long).toFixed(2));
}

function updateLabels(lat, long, altura) {
    $("#txtLat").val(parseFloat(lat).toFixed(2));
    $("#txtLong").val(parseFloat(long).toFixed(2));
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
var consumoMensualFoto;

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
    consumoMensualFoto = new Array(ene, feb, mar, abr, may, jun, jul, ago, set, oct, nov, dic);
    beta = $("#txtInclinacion").val();
    PgfvAux = $("#txtCap").val();
    eficiencia = $("#txtInv").val();
    perdida = $("#txtFactor").val();
    h_Mes = datosRadMensual;
    var allData = new Array(lat, long, modelo, PgfvAux, beta, eficiencia, perdida, altura, h_Mes, consumoMensualFoto);
    // console.log(allData);
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
var tipoTerm = "1";
var xLabelTerm, yLabelTerm, daConsTerm, daGrafTerm, tPeriodo;

function getFormTerm() {
    try {
        console.log("Getting data");
        //        var tipoTerm = $("input[name=rGas]").val();
        var datos;
        var perso = $("#txtFlia").val();
        var tconector = $("input[name=rColector]").val();
        console.log(tipoTerm);
        switch (tipoTerm) {
            case "1":
                console.log("Case 1");
                var enefeb = $("#txtEneFeb").val();
                var marabr = $("#txtMarAbr").val();
                var mayjun = $("#txtMayJun").val();
                var julago = $("#txtJulAgo").val();
                var sepoct = $("#txtSepOct").val();
                var novdic = $("#txtNovDic").val();
                $("#titGrafTerm").html("Consumo de gas natural y ahorro por generaci" + String.fromCharCode(243) + "n de agua caliente sanitaria (m3)");
                xLabelTerm = ['Ene-Feb', 'Mar-Abr', 'May-Jun', 'Jul-Ago', 'Sep-Oct', 'Nov-Dic'];
                yLabelTerm = ['Consumo (m3)', "Ahorro (m3)"];
                daConsTerm = [enefeb, marabr, mayjun, julago, sepoct, novdic];
                tPeriodo = "Bimestres";
                datos = new Array(perso, tconector, enefeb, marabr, mayjun, julago, sepoct, novdic);
                goCalTermGasNat(['args__' + lat, 'args__' + long, 'args__' + datos], [callback_goCalcularFormTerm]);
                break;
            case "2":
                console.log("Case 2");
                var garrafa = $("#txtGarrafa").val();
                var gameses = $("#txtGaMeses").val();
                datos = new Array(perso, tconector, garrafa, gameses);
                $("#titGrafTerm").html("Consumo de gas envasado y ahorro por generaci" + String.fromCharCode(243) + "n de agua caliente sanitaria (kg)");
                goCalTermGasEnv(['args__' + lat, 'args__' + long, 'args__' + datos], [callback_goCalcularFormTerm]);
                xLabelTerm = labelMeses;
                yLabelTerm = ['Consumo (kg)', "Ahorro (kg)"];
                var cons = parseFloat(garrafa / gameses).toFixed(0);
                daConsTerm = [cons, cons, cons, cons, cons, cons, cons, cons, cons, cons, cons, cons];
                tPeriodo = "Meses";
                break;
            case "3":
                console.log("Case 3");
                var ene = $("#txtENEt").val();
                var feb = $("#txtFEBt").val();
                var mar = $("#txtMARt").val();
                var abr = $("#txtABRt").val();
                var may = $("#txtMAYt").val();
                var jun = $("#txtJUNt").val();
                var jul = $("#txtJULt").val();
                var ago = $("#txtAGOt").val();
                var sep = $("#txtSEPt").val();
                var oct = $("#txtOCTt").val();
                var nov = $("#txtNOVt").val();
                var dic = $("#txtDICt").val();
                datos = new Array(perso, tconector, ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic);
                goCalTermGasElec(['args__' + lat, 'args__' + long, 'args__' + datos], [callback_goCalcularFormTerm]);
                $("#titGrafTerm").html("Consumo de electricidad y ahorro por generaci" + String.fromCharCode(243) + "n de agua caliente sanitaria (kWh)");
                xLabelTerm = labelMeses;
                yLabelTerm = ['Consumo (kWh)', "Ahorro (kWh)"];
                daConsTerm = [ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic];
                tPeriodo = "Meses";
                break;
            case "4":
                console.log("Case 4");
                datos = new Array(perso, tconector);
                goCalTermGasSin(['args__' + lat, 'args__' + long, 'args__' + datos], [callback_goCalcularFormTerm]);
                xLabelTerm = labelMeses;
                $("#titGrafTerm").html("Generaci" + String.fromCharCode(243) + "n de agua caliente sanitaria (litros de agua caliente acumulada mensual)");
                yLabelTerm = ["", "Litros de agua caliente acumulada mensual"];
                daConsTerm = null;
                tPeriodo = "Meses";
                break;
        }
    } catch (e) {
        humane.error("Exception getFormTerm " + e.menssage + " - " + e.error);
    }
}

function showResultTerm(datos) {
    try {
        valFrac = "45";
        var html = "<div  style='padding:5px;font-weight:bold;'>Fracci" + String.fromCharCode(243) + "n Solar: " + valFrac + " % </div>";
        if (grafTerm) updateDataSetGraf(grafTerm, daConsTerm, datos, xLabelTerm, yLabelTerm);
        var datosAgua = datos;
        html += generateTableTerm(daConsTerm, datos, datosAgua, xLabelTerm, yLabelTerm);
        $("#divTableDatosTerm").html(html);
    } catch (e) {
        humane.error("Exception showResultTerm " + e.menssage + " - " + e.error);
    }
}

function generateTableTerm(datos1, datos2, datos3, xlabel, ylabel) {
    try {
        var html = "<table id='tableData' cellpadding='0' cellspacing='0' width='100%'><tr><th>" + tPeriodo + "</th>";
        if (datos1) {
            html += "<th>" + ylabel[0] + "</th>";
        }
        html += "<th>" + ylabel[1] + "</th>";
        html += "<th>Litros de agua caliente por d" + String.fromCharCode(237) + "a</th>";
        html += "</tr>";
        var labelP = xlabel;
        for (var i in datos2) {
            html += "<tr>";
            html += "<td>" + labelP[i] + "</td>";
            if (datos1) {
                html += "<td>" + datos1[i] + "</td>";
            }
            html += "<td>" + datos2[i] + "</td>";
            html += "<td>" + datos3[i] + "</td>";
            html += "</tr>";
        }
        html += "</table>";
        return html;
    } catch (e) {
        humane.error("Exception 'generateTableTerm ' " + e.menssage + '-' + e.error);
    }
}

function callback_goCalcularFormTerm(result) {
    console.log("volviendo");
    try {
        var da = JSON.parse(result);
        console.log(da);
        var d = da[0][0];
        if (d === "Done") {
            datos = da[0][1];
            if (window.flagDomLoaded) {
                showResultTerm(datos);
            }
        } else {
            if (window.flagDomLoaded) {
                humane.error(da[1]);
            }
        }
    } catch (e) {
        humane.error("Exception callback_goCalcularFormTerm " + e.menssage + " - " + e.error);
    }
}
$(document).ready(function(e) {
    $(".nav-tabs a").click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#btnCalcular').click(function(e) {
        e.preventDefault();
        var datos = getDataForm();
        $("#divgrafFoto").show();
        goCalcularFoto(['args__' + datos], [callback_goCalcularFoto]);
        /*goForData(['args__' + lat, 'args__' + long, 'args__' + name], [callback_goForData]);*/
        $('.nav-tabs a[href="#resFoto"]').tab('show');
    })
    $('#btnCalcularTerm').click(function(e) {
        e.preventDefault();
        $("#divgrafTerm").show();
        getFormTerm();
        $('.nav-tabs a[href="#resTerm"]').tab('show');
    })
    initLoad();
    $("#imgBook").click(function(e) {
        e.preventDefault();
        hideVentanas();
        $("#imgBook").addClass("classOn");
        $(".infoBook").show();
        nname = "";
        name = "anual";
        flagType = "rad";
        LoadGrafFoto();
        $("#divEscala").html("<img class='imgScala' src='images/Rescalaanual.svg'/>");
        $("#imgAnual").addClass("classOn");
        $(".meses").hide();
        SetMap();
    });
    $("#imgInfo").click(function(e) {
        e.preventDefault();
        hideVentanas();
        $("#imgInfo").addClass("classOn");
        $(".infoInfo").show();
        $("#divEscala").html("<img class='imgScala' src='images/Rescalaanual.svg'/>");
        $("#title_calendar").html("RADIACION SOLAR ANUAL");
        $("#imgAnual").addClass("classOn");
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
        /*goForData(['args__' + lat, 'args__' + long, 'args__' + name], [callbackData]);*/
        updateLabels(lat, long, altura);
        nname = "";
        name = "anual";
        flagType = "rad";
        LoadGrafRad();
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
        LoadGrafTemp();
    });
    $("#imgSolar").click(function(e) {
        $("#divgrafFoto").hide();
        e.preventDefault();
        hideVentanas();
        $("#imgSolar").addClass("classOn");
        $(".infoFoto").show();
        nname = "";
        name = "anual";
        flagType = "rad";
        LoadGrafFoto();
        $("#divEscala").html("<img class='imgScala' src='images/Rescalaanual.svg'/>");
        $("#imgAnual").addClass("classOn");
        $(".meses").hide();
        resetReportes();
        SetMap();
    });
    $("#imgTerm").click(function(e) {
        e.preventDefault();
        hideVentanas();
        $("#imgTerm").addClass("classOn");
        $(".infoTerm").show();
        $("#divEscala").html("<img class='imgScala' src='images/Rescalaanual.svg'/>");
        $("#imgAnual").addClass("classOn");
        $(".meses").hide();
        resetReportes();
        LoadGrafTerm();
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

function callbackData(result, e) {
    /* console.log("Volviendo 1");
     console.log(result);
     console.log(e);*/
    try {
        var da = JSON.parse(result);
        var d = da[0];
        if (d === "Done") {
            datos = da;
            if (window.flagDomLoaded) {
                UpdateData();
            }
        } else {
            if (window.flagDomLoaded) {
                lat = -24.79;
                long = -65.42;
                $("#txtLat").val(parseFloat(lat).toFixed(2));
                $("#txtLong").val(parseFloat(long).toFixed(2));
                setNewLatLong();
                humane.error(da[1]);
            }
        }
    } catch (e) {
        humane.error("Exception callbackData " + e.menssage + " - " + e.error);
    }
}

function UpdateData() {
    /*console.log("cuantas veces entra");*/
    try {
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
            var titGrafRad, titDescRad, titGrafTemp, titDescTemp;
            var agraf, agrafTemp, vargbl, vargblin, vardiNo, vardiHo, vargblTemp = 0;
            var path = "files/";
            switch (tipo) {
                case 'dia':
                    agraf = datos[1];
                    vargbl = datos[3][0];
                    vargblin = datos[3][1];
                    vardiNo = datos[3][2];
                    vardiHo = datos[3][3];
                    titGrafRad = "RADIACION SOLAR GLOBAL SOBRE PLANO HORIZONTAL DIA CARACTERISTICO ";
                    titDescRad = "RADIACION SOLAR GLOBAL SOBRE PLANO HORIZONTAL DIA CARACTERISTICO: " + mes.toUpperCase();
                    path = path + "diario/";
                    break;
                case 'mes':
                    agraf = datos[2];
                    datosRadMensual = datos[2];
                    vargbl = datos[4][0];
                    vargblin = datos[4][1];
                    vardiNo = datos[4][2];
                    vardiHo = datos[4][3];
                    titGrafRad = "RADIACION SOLAR GLOBAL SOBRE PLANO HORIZONTAL ACUMULADA MENSUAL ";
                    titDescRad = "RADIACION SOLAR GLOBAL SOBRE PLANO HORIZONTAL ACUMULADA MENSUAL: " + mes.toUpperCase();
                    titGrafTemp = "TEMPERATURA MEDIA MENSUAL ";
                    titDescTemp = "TEMPERATURA MEDIA MENSUAL: " + mes.toUpperCase().substring(1, mes.length);
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
                    titGrafRad = "RADIACION SOLAR GLOBAL SOBRE PLANO HORIZONTAL ACUMULADA MENSUAL";
                    titDescRad = "RADIACION SOLAR GLOBAL SOBRE PLANO HORIZONTAL ACUMULADA ANUAL";
                    titGrafTemp = "TEMPERATURA MEDIA MENSUAL ";
                    titDescTemp = "TEMPERATURA MEDIA ANUAL";
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
            /* LoadGraficos();*/
            if (grafRad) updateDataSetGraf(grafRad, agraf);
            if (grafTemp) updateDataSetGraf(grafTemp, agrafTemp);
            /* updateDataSetGraf(grafTemp, agrafTemp);*/
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
                var link1Foto = "<a href='" + path2 + ".tif' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
                $("#link1").html(link1);
                $("#link2").html(link2);
                $("#link3").html(link3);
                $("#link1Temp").html(link1Temp);
                $("#link2Temp").html(link2Temp);
                $("#link3Temp").html(link3Temp);
                $("#titGrafRad").html(titGrafRad);
                $("#titDescRad").html(titDescRad);
                $("#titleInfoRad").html(titDescRad);
                $("#titGrafTemp").html(titGrafTemp);
                $("#titDescTemp").html(titDescTemp);
                $("#titleInfoTemp").html(titDescTemp);
                $("#link1Foto").html(link1Foto);
            } catch (e) {
                // humane.error("Exception 'UpdateData pantallas '" + e.menssage + '-' + e.error);
            }
        }
    } catch (ex) {
        humane.error("Exception 'UpdateData '" + ex.menssage + '-' + ex.error);
    }
}

function callback_goCalcularFoto(result) {
    /*console.log("volviendo de calcular:");*/
    /* 0 Done, o Eeror, 1 array de 12 valores de enero a diciembre, que hay que poner en la linea del grafico.
    /* hacer tabla, una columna consumo, y la otra generacion*/
    /*console.log(result);*/
    try {
        var da = JSON.parse(result);
        /*console.log(da[0]);*/
        var d = da[0];
        if (d === "Done") {
            var genDatosFoto = da[1];
            var linkRep = "<a href='files/InformeTecnicoRadiacion.pdf' target='_blank'>";
            linkRep += "<img src='images/descarga.svg' style='height: 40px; width: 40px;padding-right: 5px;'/>";
            linkRep += "Descargar Reporte</a>";
            $("#divLinkReporte").html(linkRep);
            updateDataSetGraf(grafFoto, genDatosFoto, datosRadMensual);
            $("#divTableDatos").html(generateTable(genDatosFoto, datosRadMensual));
        } else {
            if (window.flagDomLoaded) {
                humane.error(da[1]);
            }
        }
    } catch (e) {
        humane.error("Exception 'callback_goCalcularFoto ' " + e.menssage + '-' + e.error);
    }
}

function generateTable(datos1, datos2) {
    try {
        /* console.log(datos1);
         console.log(datos2);*/
        var html = "<table id='tableData' cellpadding='0' cellspacing='0'><tr><th>Meses</th><th>Consumo kWh</th><th> Generaci&#243;n kWh</th></tr>";
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
    } catch (e) {
        humane.error("Exception 'generateTable ' " + e.menssage + '-' + e.error);
    }
}
var labelMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var grafRad, grafTemp, grafFoto, grafTerm;

function updateDataSetGraf(chart, data1, data2, xlabel, ylabel) {
    try {
        /*console.log("Chart");
        console.log(chart);
        console.log(chart.canvas.id);*/
        chart.data.datasets[0].data = data1;
        if (chart.data.datasets.length > 1) {
            chart.data.datasets[1].data = data2;
        }
        if (xlabel) {
            chart.data.labels = xlabel;
        }
        if (ylabel) {
            chart.data.datasets[0].label = ylabel[0];
            chart.data.datasets[1].label = ylabel[1];
        }
        chart.update();
    } catch (ex) {
        humane.error("Exception updateDataSetGraf " + ex.menssage + "-" + ex.error);
    }
}

function LoadGrafTerm() {
    var ctxTerm = $("#grafTerm");
    grafTerm = new Chart(ctxTerm, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Consumo (m3)',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: "rgb(154, 66, 63)",
                backgroundColor: "rgba(154, 66, 63, 0.2)"
            }, {
                label: "Generaci" + String.fromCharCode(243) + "n (m3)",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // Changes this dataset to become a line
                type: 'line'
            }],
            labels: labelMeses
        }
    });
}

function LoadGrafRad() {
    var ctxR = $("#grafRad");
    grafRad = new Chart(ctxR, {
        type: 'bar',
        data: {
            datasets: [{
                label: "kWh/m" + String.fromCharCode(178),
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: "rgba(249,180,8,0.2)",
                backgroundColor: "rgba(249,180,8,0.5)"
            }],
            labels: labelMeses
        }
    });
}

function LoadGrafTemp() {
    try {
        var ctxT = $("#grafT");
        grafTemp = new Chart(ctxT, {
            type: 'bar',
            data: {
                datasets: [{
                    label: "(" + String.fromCharCode(176) + "C grados Celsius)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                }],
                labels: labelMeses
            }
        });
    } catch (ex) {
        humane.error("Exception LoadGrafTemp " + ex.menssage + "-" + ex.error);
    }
}

function LoadGrafFoto() {
    var ctxF = $("#grafFoto");
    grafFoto = new Chart(ctxF, {
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
}

function disabledMeses(red) {
    if (red === 0) {
        $(".iMes").css("color", "#B6B6B6");
        $(".iMes").each(function() {
            //To disable 
            $(this).val(0);
            $(this).attr('disabled', 'disabled');
        });
    } else {
        $(".iMes").removeAttr(" style ");
        //To enable 
        $('.iMes').removeAttr('disabled');
        // OR you can set attr to "" 
        $('.iMes').attr('disabled', '');
        $("#txtENE").val(168);
        $("#txtFEB").val(139);
        $("#txtMAR").val(228);
        $("#txtABR").val(148);
        $("#txtMAY").val(217);
        $("#txtJUN").val(331);
        $("#txtJUL").val(250);
        $("#txtAGO").val(228);
        $("#txtSEP").val(197);
        $("#txtOCT").val(174);
        $("#txtNOV").val(169);
        $("#txtDIC").val(142);
    }
}
var tipUser, hasR, hasRT;

function hasReporte(v, e) {
    if (v === 1) {
        $(".tipUser").show();
        hasR = 1;
    } else {
        $(".tipUser").hide();
        hasR = 0;
    }
    $(".rReporte").prop('checked', false);
    $("#" + e.id).prop('checked', true);
}

function disabledBloque(b, t) {
    console.log(t);
    $(".dBloque").hide();
    $("#" + b).show();
    tipoTerm = t;
    resetReporteT();
}

function resetReportes() {
    $(".reporteF").hide();
    $(".rReporte").prop('checked', false);
    $("#rRTNo").prop("checked", true);
    $(".rFGasNat").hide();
    $(".repFGasEnv").hide();
    $(".repFinan").hide();
    $("#rReNo").prop("checked", true);
    $(".repFElectri").hide();
    $("#rPSanNo").prop("checked", true);
    $(".tipUser").hide();
    $("#rRNo").prop("checked", true);
}

function hasReporteT(v, e) {
    if (v === 1) {
        $(".reporteF").show();
        hasRT = 1;
    } else {
        $(".reporteF").hide();
        resetReporteT();
        hasRT = 0;
    }
    $(".rReporteT").prop('checked', false);
    $("#" + e.id).prop('checked', true);
}

function hasCalFinan(v, e) {
    if (v === 1) {
        $(".repFinan").show();
        if (tipoTerm == 1) $(".repFGasNat").show();
        else {
            $(".repFGasNat").hide();
            if (tipoTerm == 2) {
                $(".repFGasEnv").show();
            } else {
                $(".repFGasEnv").hide();
                if (tipoTerm == 3) {
                    $(".repFElectri").show();
                } else {
                    $(".repFElectri").hide();
                }
            }
        }
        hasRT = 1;
    } else {
        $(".repFinan").hide();
        $(".repFGasNat").hide();
        $(".repFGasEnv").hide();
        hasRT = 0;
    }
    $(".repFinan").prop('checked', false);
    $("#" + e.id).prop('checked', true);
}