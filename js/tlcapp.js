/*
 javascript for tlc web mapping

*/

var googleVector = new Array();
var googleOptions = {
	strokeColor: "#000000",
	strokeWeight: 2,
	strokeOpacity: 0.75,
	fillColor: "#9479DE",
	fillOpacity: .5
};

var titles = new Array();
titles["boat_access"] = "IDENT";
titles["Nature_Preserves"] = "Label";
//titles["flower_hill_trail"] = "";
titles["land_projects"] = "Project_na";
//titles["Parking_locations"] = "";
//titles["Swift_creek"] = "";
titles["trails_JMNP"] = "Name_1";
//titles["whitepines_trails"] = "";


var infoboxOptions = {
	pixelOffset: new google.maps.Size(0, 15),
	closeBoxURL: ""
};



//function for title
var titleInfo = function(title, loc) {
		var ibLabel;
		google.maps.event.addListener(loc, 'mouseover', function(e) {
			ibLabel = new InfoBox(infoboxOptions);
			ibLabel.setPosition(e.latLng);
			ibLabel.setContent(title);
			ibLabel.open(map);
			
		});
		google.maps.event.addListener(loc, 'mouseout', function() {
			ibLabel.close();
		});
	};


$("input[type|=checkbox]").change(function(e) {
	var chkd_id = e.currentTarget.id;
	if (document.getElementById(chkd_id).checked) {
		var data;
		var load_data = function(data) {
				googleVector[chkd_id] = new GeoJSON(data, googleOptions);
				if (!googleVector[chkd_id].length) {
					googleVector[chkd_id].setMap(map);
				} else {
					for (var idx in googleVector[chkd_id]) {
						if (!googleVector[chkd_id][idx].length) {
							googleVector[chkd_id][idx].setMap(map);
							
							//not sure if this will ever fail
							if(map != googleVector[chkd_id][idx].getMap()) {
								console.log("map error - map not set for feature");
							}
							var loc = googleVector[chkd_id][idx];
							if (eval("googleVector[chkd_id][idx].geojsonProperties." + titles[chkd_id])) {
								var title = eval("googleVector[chkd_id][idx].geojsonProperties." + titles[chkd_id]);
								titleInfo(title, loc);
							};

						} else {
							for (var idx2 in googleVector[chkd_id][idx]) {
								var loc = googleVector[chkd_id][idx][idx2];
								googleVector[chkd_id][idx][idx2].setMap(map);
								if (eval("googleVector[chkd_id][idx][idx2].geojsonProperties." + titles[chkd_id])) {
									var title = eval("googleVector[chkd_id][idx][idx2].geojsonProperties." + titles[chkd_id]);
									titleInfo(title, loc);
								};
							}
						}
					}
				}
			}
			//console.log(googleVector);
		var url = '/tlc/data/' + chkd_id + '.geojson';
		$.ajax({
			url: url,
			dataType: 'json',
			data: data,
			success: load_data
		});
	} else {
		
		if (!googleVector[chkd_id].length) {
			googleVector[chkd_id].setMap(null);
		} else {
			for (var idx in googleVector[chkd_id]) {
				if (!googleVector[chkd_id][idx].length) {
					googleVector[chkd_id][idx].setMap(null);
				} else {
					for (var idx2 in googleVector[chkd_id][idx]) {
						googleVector[chkd_id][idx][idx2].setMap(null);
					}

				}
			}
		}
		googleVector[chkd_id] = null;
		delete(googleVector[chkd_id]);
		//console.log(googleVector);
	}
});



$(document).ready(function() {
	$("#accordian").accordion();
	$("#radprcl").attr("checked", "checked");
	$("input[type|=checkbox]").attr("checked", false);
});