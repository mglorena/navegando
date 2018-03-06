
function callback_GetArray(result)
{
	console.log("Result " + result);
	var aares = JSON.parse(result);
	console.log(aares);
	/*
	graf.mydata[0]= aares['Enero']; 
	graf.mydata[1]= aares['Febrero']; 
	graf.mydata[2]= aares['Marzo']; 
	graf.mydata[3]= aares['Abril']; 
	graf.mydata[4]= aares['Mayo']; 
	graf.mydata[5]= aares['Junio']; 
	graf.mydata[6]= aares['Julio']; 
	graf.mydata[7]= aares['Agosto']; 
	graf.mydata[8]= aares['Septiembre']; 
	graf.mydata[9]= aares['Octubre']; 
	graf.mydata[10]= aares['Noviembre']; 
	graf.mydata[11]= aares['Diciembre']; */

	graf._render();
	/*graf._update(graf.mydata);*/
	graf.updateChart();
	graf.updateDataSet(aares);

}