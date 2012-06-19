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

var preloads = new Array("Nature_Preserves", "land_projects");

var titles = new Array();
titles["boat_access"] = "IDENT";
titles["Nature_Preserves"] = "Label";
titles["land_projects"] = "Project_na";
titles["trails_JMNP"] = "Name_1";
titles["cha_lake_trail"] = "FEATURE";
titles["dur_Durham_Trails"] = "NAME";
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


		//if layer exists then set visible
		//check of array of dims 0,1,2
		if (googleVector[chkd_id]) {
			if (!googleVector[chkd_id].length) {
				googleVector[chkd_id].setVisible(true);
			} else {
				for (var idx in googleVector[chkd_id]) {
					if (!googleVector[chkd_id][idx].length) {
						googleVector[chkd_id][idx].setVisible(true);
					} else {
						for (var idx2 in googleVector[chkd_id][idx]) {
							googleVector[chkd_id][idx][idx2].setVisible(true);
						}
					}
				}
			}
		} else {

			//create new layer
			//check of array of dims 0,1,2
			var data;
			var load_data = function(data) {
					googleVector[chkd_id] = new GeoJSON(data, googleOptions);
					if (!googleVector[chkd_id].length) {
						if (googleVector[chkd_id].error) {
							// Handle the error.
							console.log(googleVector[chkd_id].message);
						} else {
							googleVector[chkd_id].setMap(map);
						}

					} else {
						for (var idx in googleVector[chkd_id]) {
							if (!googleVector[chkd_id][idx].length) {
								if (googleVector[chkd_id][idx].error) {
									// Handle the error.
									console.log(googleVector[chkd_id][idx].message);
								} else {
									googleVector[chkd_id][idx].setMap(map);
								}
								var loc = googleVector[chkd_id][idx];
								if (eval("googleVector[chkd_id][idx].geojsonProperties." + titles[chkd_id])) {
									var title = eval("googleVector[chkd_id][idx].geojsonProperties." + titles[chkd_id]);
									titleInfo(title, loc);
								};

							} else {
								for (var idx2 in googleVector[chkd_id][idx]) {
									var loc = googleVector[chkd_id][idx][idx2];
									if (googleVector[chkd_id][idx][idx2].error) {
										// Handle the error.
										console.log(googleVector[chkd_id][idx][idx2].message);
									} else {
										googleVector[chkd_id][idx][idx2].setMap(map);
									}
									if (eval("googleVector[chkd_id][idx][idx2].geojsonProperties." + titles[chkd_id])) {
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
		}
	} else {

		//hide if unchecked
		//check of array of dims 0,1,2
		if (!googleVector[chkd_id].length) {
			googleVector[chkd_id].setVisible(false);
		} else {
			for (var idx in googleVector[chkd_id]) {
				if (!googleVector[chkd_id][idx].length) {
					googleVector[chkd_id][idx].setVisible(false);
				} else {
					for (var idx2 in googleVector[chkd_id][idx]) {
						googleVector[chkd_id][idx][idx2].setVisible(false);
					}

				}
			}
		}
	}
});



$(document).ready(function() {
	$("#accordian").accordion();
	$("#radprcl").attr("checked", "checked");
	$("input[type|=checkbox]").attr("checked", false);




});