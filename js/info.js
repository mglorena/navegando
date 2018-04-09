
var datos;


Vue.use(VueCharts);
var graf = new Vue({
	el: '#graf',
	data:{
		mylabel : 'Meses',
		mylabels : ['enero', 'febrero', 'marzo', 'abril', 'mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
		mydata : [0,0,0,0,0,0,0,0,0,0,0,0]
	},    methods: {
		updateChart(l) {
			this.mylabels = ['enero', 'febrero', 'marzo', 'abril', 'mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
			this.mylabel = l; 
		},
		updateDataSet(newDataSet)
		{
			this.mydata= newDataSet; 
			
		}
	}
});
function callback_GetArray(result)
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
			alert(da[1]);
		}
	}
	catch(e)
	{
		alert(e.menssage);
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
		
		
		var agraf,vargbl,vargblin,vardiNo,vardiHo;

		switch(tipo) {
			case 'dia':
			agraf = datos[1];
			vargbl = datos[3][0];
			vargblin = datos[3][1];
			vardiNo = datos[3][2];
			vardiHo = datos[3][3];
			
			break;
			case 'mes':
			agraf = datos[2];
			vargbl = datos[4][0];
			vargblin = datos[4][1];
			vardiNo = datos[4][2];
			vardiHo = datos[4][3];
			
			break;
			case 'anual':
			agraf = datos[2];
			vargbl = datos[5][0];
			vargblin = datos[5][1];
			vardiNo = datos[5][2];
			vardiHo = datos[5][3];
			
			break;
			default:
			agraf = datos[2];
			vargbl = datos[5][0];
			vargblin = datos[5][1];
			vardiNo = datos[5][2];
			vardiHo = datos[5][3];
			
		}

		graf._render();
		
		graf.updateDataSet(agraf);

		$("#vargbl").html(vargbl);
		$("#vargblin").html(vargblin.toFixed(4));
		$("#vardiNo").html(vardiNo.toFixed(4));
		$("#vardiHo").html(vardiHo.toFixed(4));
	}
}

