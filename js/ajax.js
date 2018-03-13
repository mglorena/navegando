
function callback_GetArray(result)
{
	/*console.log("Result " + result);*/
	var aares = JSON.parse(result);
	/*console.log(aares);*/
	graf._render();
	graf.updateChart();
	graf.updateDataSet(aares);

}