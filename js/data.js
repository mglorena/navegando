
var datos;


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
function callback_goForData(result)
{
	try
	{

		var da = JSON.parse(result);
		console.log(da);
		var d = da[0];
		if(d === "Done")
		{
			datos = da;
			UpdateData();

		}
		else
		{
			alert("KKKKK" + da[1]);
		}
	}
	catch(e)
	{
		alert("KSKKSKSKS " + e.menssage);
		console.log(e);
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
			titDesc1 = "Radiaci&oacuten d&iacutea caracter&iacutestico de " + mes;
			path= path + "diario/";
			
			break;
			case 'mes':
			agraf = datos[2];
			vargbl = datos[4][0];
			vargblin = datos[4][1];
			vardiNo = datos[4][2];
			vardiHo = datos[4][3];
			titDesc1 = "Radiaci&oacuten mensual acumulado de " + mes;
			path= path + "mes/";
			
			break;
			case 'anual':
			agraf = datos[2];
			vargbl = datos[5][0];
			vargblin = datos[5][1];
			vardiNo = datos[5][2];
			vardiHo = datos[5][3];
			titDesc1 = "Radiaci&oacuten anual";
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

