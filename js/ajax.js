
var datos;

function callback_GetArray(result)
{
	try
	{

		var d = JSON.parse(result);
		d = d[0];
		if(d[0] === "Done")
		{
			datos = d[1];
			UpdateData();

		}
		else
		{
			alert(d[1]);
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
			agraf = datos[0];
			vargbl = datos[2][0];
			vargblin = datos[2][1];
			vardiNo = datos[2][2];
			vardiHo = datos[2][3];
			
			break;
			case 'mes':
			agraf = datos[1];
			vargbl = datos[3][0];
			vargblin = datos[3][1];
			vardiNo = datos[3][2];
			vardiHo = datos[3][3];
			
			break;
			case 'anual':
			agraf = datos[1];
			vargbl = datos[4][0];
			vargblin = datos[4][1];
			vardiNo = datos[4][2];
			vardiHo = datos[4][3];
			
			break;
			default:
			agraf = datos[1];
			vargbl = datos[2][0];
			vargblin = datos[2][1];
			vardiNo = datos[2][2];
			vardiHo = datos[2][3];
			
		}

		graf._render();
		
		graf.updateDataSet(agraf);

		$("#vargbl").html(vargbl.toFixed(2));
		$("#vargblin").html(vargblin.toFixed(2));
		$("#vardiNo").html(vardiNo.toFixed(2));
		$("#vardiHo").html(vardiHo.toFixed(2));
	}
}