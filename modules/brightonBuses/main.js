var buses = { //Changeable variables used in this script
	busStop: 6849, //Bus stop information shown
	busStopName1: "Wish", //Name of bus stop shown on line 1
	busStopName2: "Road", //Name of bus stop shown on line 2
	busesShown: 6, //Number of buses to show on list
	refreshPeriod: 30000, //in milliseconds
	noBusesMessage: "No buses found...", //Message to display if there are no buses.
	opacityVariation: 0.15 //Amount to reduce opacity by per line of buses, set to 0 for no change. 0.15 by default.
}

setTimeout(busTimes, 1000);
setInterval(busTimes, buses.refreshPeriod);

function busTimes( ){
	var busAPI = "https://query.yahooapis.com/v1/public/yql?q=select%20content%20from%20html%20where%20url%3D%22http%3A%2F%2Fbh.buscms.com%2Fapi%2FREST%2Fhtml%2Fdepartureboard.aspx%3Fclientid%3DBrightonBuses%26sourcetype%3Dsiri%26format%3Djson%26stopid%3D"+buses.busStop+"%22%20and%20xpath%3D%27%2Fhtml%2Fbody%2Fdiv%5B1%5D%2Ftable%2Ftbody%2Ftr%2Ftd%27&format=json&callback=";
	var busSymbol = "<i class='icon fa fa-bus dimmed wi'></i>"
	var noBuses = "<tr><td style='width: 205px; text-align: right;'>" + buses.noBusesMessage + "</td></tr>";
	var myTable = "<table><tr><td></td><td></td><td style='text-align: right; font-size: 25px;'>"+buses.busStopName1+ "</td></tr>";
	myTable+= "<tr><td></td><td></td><td style='text-align: right; font-size: 25px;'>"+buses.busStopName2+"</td></tr>";
	var webSearch = $.getJSON(busAPI, function(json){
	});
	
	webSearch.done(function(json) {
		if(jQuery.isEmptyObject(json.query.results)){ //this is only entered if there are no buses upon refresh.
			myTable+=noBuses;
			document.getElementById("busIcon").innerHTML = "";
		}
		
		else{ //this is only entered if there are buses.
			var results = json.query.results.td;
			var length = results.length
			var busCount = 0;
			var opacity = 1;
			
			var loopCount = (length / 3);
			if(loopCount > 0){
				for (i = 1; i <= loopCount; i++){
					if(busCount <= buses.busesShown){
						if(i==1){
							console.log(results[0], results[1], results[2]);
							myTable+="<tr><td style='width: 30px; text-align: right; opacity: "+opacity+";'>" + results[0] + " </td><td style ='width: 130px; text-align: right; opacity: "+opacity+"'>" + results[1] + " </td><td style='width: 75px; text-align: right; opacity: "+opacity+"'>" + results[2] + "</td></tr>";
							busCount++;
						}
						else {
							console.log(results[(i*3)-3], results[(i*3)-2], results[(i*3)-1]);
							myTable+="<tr><td style='width: 30px; text-align: right; opacity: "+opacity+";'>" + results[(i*3)-3] + " </td><td style ='width: 130px; text-align: right; opacity: "+opacity+"'>" + results[(i*3)-2] + " </td><td style='width: 75px; text-align: right; opacity: "+opacity+"'>" + results[(i*3)-1] + "</td></tr>";
							busCount++;
						}
					}
					opacity = opacity-(buses.opacityVariation);
				}
			}
			else{ //this is only entered if there are no buses upon refresh. This shouldn't really be entered but who knows...
				myTable+=noBuses;
			}
		}
		
		myTable+="</table>";
		document.getElementById("busIcon").innerHTML = busSymbol;
		document.getElementById("busTable").innerHTML = myTable;
	});
	
	webSearch.fail(function(json) { //this error catching doesn't seem to work.
		myTable+="<tr><td style='width: 205px; text-align: right;'>Error getting bus data</td>/tr>";
		myTable+="</table>";
		document.getElementById("busTable").innerHTML = myTable;
	});
}



//JSON YQL Argument used: select content from html where url="http://bh.buscms.com/api/REST/html/departureboard.aspx?clientid=BrightonBuses&sourcetype=siri&format=json&stopid=6849" and xpath='/html/body/div[1]/table/tbody/tr/td'

//https://query.yahooapis.com/v1/public/yql?q=select%20content%20from%20html%20where%20url%3D%22http%3A%2F%2Fbh.buscms.com%2Fapi%2FREST%2Fhtml%2Fdepartureboard.aspx%3Fclientid%3DBrightonBuses%26sourcetype%3Dsiri%26format%3Djson%26stopid%3D6849%22%20and%20xpath%3D'%2Fhtml%2Fbody%2Fdiv%5B1%5D%2Ftable%2Ftbody%2Ftr%2Ftd'&format=json&callback=
