/*
 javascript for tlc web mapping

*/

var googleVector = new Array();
var googleOptions = {
	strokeColor: "#000000",
	strokeWeight: 2,
	strokeOpacity: 0.75
};

var titles = new Array();
titles["boat_access"] = "IDENT";
titles["Nature_Preserves"] = "Label";

//function for title
var titleInfo = function(title, loc) {
		var infowindow;
		google.maps.event.addListener(loc, 'mouseover', function(e) {
			console.log(e.latLng.toString());
			infowindow = new google.maps.InfoWindow({
				content: title
			});
			infowindow.open(map, loc);
		});
		google.maps.event.addListener(loc, 'mouseout', function() {
			infowindow.close();
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
							var loc = googleVector[chkd_id][idx];
							//console.log(idx);
							var title;
							if (eval("googleVector[chkd_id][idx].geojsonProperties." + titles[chkd_id])) {
								//console.log(eval("googleVector[chkd_id][idx].geojsonProperties." + titles[chkd_id]));
								var title = eval("googleVector[chkd_id][idx].geojsonProperties." + titles[chkd_id]);
								titleInfo(title, loc);
							};

						} else {
							for (var idx2 in googleVector[chkd_id][idx]) {
								console.log(idx + "  " + idx2);
								var loc = googleVector[chkd_id][idx][idx2];
								googleVector[chkd_id][idx][idx2].setMap(map);
								var title;
								if (eval("googleVector[chkd_id][idx][idx2].geojsonProperties." + titles[chkd_id])) {
									console.log(eval("googleVector[chkd_id][idx][idx2].geojsonProperties." + titles[chkd_id]));
									var title = eval("googleVector[chkd_id][idx][idx2].geojsonProperties." + titles[chkd_id]);
									titleInfo(title, loc);
								};
							}
						}
					}
				}
			}
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
						//console.log(googleVector[chkd_id][idx][idx2].geojsonProperties);
					}

				}
			}
		}
		googleVector[chkd_id] = null;
	}
});



$(document).ready(function() {
	$("#accordian").accordion();


});