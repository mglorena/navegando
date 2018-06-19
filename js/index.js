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
var datos;
function callback_goForData(result)
{
    try
    {
        var da = JSON.parse(result);
        var d = da[0];
        if (d === "Done")
        {
            datos = da;
            UpdateData();

        } else
        {
            humane.error(da[1]);
        }
    } catch (e)
    {
        humane.error(e.menssage);
    }
}
function UpdateData(tipo)
{
	
	if (typeof datos !== 'undefined') 
	{
		var tipo;
		
		var n = name.substring(0, 1);
		
		switch(n) {
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
		var mes = name.substring(1,name.length);
		var titDesc1;
		var agraf,vargbl,vargblin,vardiNo,vardiHo;
        var path ="files/"; 
		switch(tipo) {
			case 'dia':
			agraf = datos[1];
			vargbl = datos[3][0];
			vargblin = datos[3][1];
			vardiNo = datos[3][2];
			vardiHo = datos[3][3];
			titDesc1 = "RADIACION DIARIA DE " + mes.toUpperCase();;
			path= path + "diario/";
			
			break;
			case 'mes':
			agraf = datos[2];
			vargbl = datos[4][0];
			vargblin = datos[4][1];
			vardiNo = datos[4][2];
			vardiHo = datos[4][3];
			titDesc1 = "RADIACION MENSUAL ACUMULADO DE " + mes.toUpperCase();;
			path= path + "mes/";
			
			break;
			case 'anual':
			agraf = datos[2];
			vargbl = datos[5][0];
			vargblin = datos[5][1];
			vardiNo = datos[5][2];
			vardiHo = datos[5][3];
			titDesc1 = "RADIACION ANUAL";
			break;
			default:
			agraf = datos[2];
			vargbl = datos[5][0];
			vargblin = datos[5][1];
			vardiNo = datos[5][2];
			vardiHo = datos[5][3];
			
		}

		graf._render();
		var title ="nnnnnn";
		graf.updateDataSet(agraf);
		graf.updateChart(title); 
		$("#vargbl").html(vargbl);
		try{
			$("#vargblin").html(vargblin.toFixed(4));
			$("#vardiNo").html(vardiNo.toFixed(4));
			$("#vardiHo").html(vardiHo.toFixed(4));
			var path= path + name;
			var path2="shapes/"+name;
			var link1 ="<a href='"+ path +".pdf' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
			var link2 ="<a href='"+ path +".png' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
			var link3 ="<a href='"+ path2 + ".tif' target='_blank' ><img src='images/descarga.svg' style='width:70px' alt='descargar'/></a>";
			$("#link1").html(link1);
			$("#link2").html(link2);
			$("#link3").html(link3);
			$("#titDesc1").html(titDesc1);
			$("#titleInfoRad").html(titDesc1);
			
			
			
		}catch(e){}
	}
}
Vue.use(VueCharts);
var graf = new Vue({
	el: '#graf',
	data:{
		mylabel : 'kWh/m2',
		mylabels : ['enero', 'febrero', 'marzo', 'abril', 'mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
		mydata : [0,0,0,0,0,0,0,0,0,0,0,0]

	},  options: {
		responsive: true
	},
	methods: {
		updateChart(title) {
			this.mylabels = ['enero', 'febrero', 'marzo', 'abril', 'mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
			this.mylabel = title; 
		},
		updateDataSet(newDataSet)
		{
			this.mydata= newDataSet; 
			this.mylabel = "jsjsjsjs" ;
			
		}
	}
});

