/*
 javascript for tlc web mapping

*/



var googleVector = [];

var googleOptions = {
	strokeColor: "#000000",
	strokeWeight: 2,
	strokeOpacity: 0.75,
	fillColor: "#9479DE",
	fillOpacity: 0.5
};

//var preloads = new Array("Nature_Preserves", "land_projects");
var titles = [];
titles.boat_access = "IDENT";
titles.Nature_Preserves = "Label";
titles.land_projects = "Project_na";
titles.trails_JMNP = "Name_1";
titles.cha_lake_trail = "FEATURE";
titles.dur_Durham_Trails = "NAME";
titles.ora_CarrTrails = "FEAT_NAME";
titles.ora_ExistingBikepaths = "NAME";
titles.ora_greenways_08 = "NAME";
titles.ora_ExCountyTrails = "Name";
titles.wak_CaryGreenwayTrails = "NAME";
titles.wak_apxgreenway = "NAME";
titles.wak_ToM_Greenways = "Name";
titles.wak_Wake_Greenways = "NAME";
titles.wak_wfexisting = "NAME";
titles.wak_wfproposed = "Name";
titles.wak_WendellGreenways = "Name";

var infoboxOptions = {
	pixelOffset: new google.maps.Size(0, 15),
	closeBoxURL: ""
};



//function for title
var titleInfo = function(title, loc) {
		"use strict";
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
	"use strict";
	var chkd_id = e.currentTarget.id;
	if (document.getElementById(chkd_id).checked) {


		//if layer exists then set visible
		//check of array of dims 0,1,2
		if (googleVector[chkd_id]) {
			if (!googleVector[chkd_id].length) {
				googleVector[chkd_id].setVisible(true);
			} else {
				for (var idx in googleVector[chkd_id]) {
					if (!isNaN(idx)) {
						if (!googleVector[chkd_id][idx].length) {
							googleVector[chkd_id][idx].setVisible(true);
						} else {
							for (var idx2 in googleVector[chkd_id][idx]) {
								if (!isNaN(idx2)) {
									googleVector[chkd_id][idx][idx2].setVisible(true);
								}
							} //end idx2 loop
						}
					}
				} //end idx loop
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
								if (!isNaN(idx)) {
									if (googleVector[chkd_id][idx].error) {
										// Handle the error.
										console.log(googleVector[chkd_id][idx].message);
									} else {
										googleVector[chkd_id][idx].setMap(map);
									}
									var loc = googleVector[chkd_id][idx];
									var props = googleVector[chkd_id][idx].get("geojsonProperties");
									if (props[titles[chkd_id]] !== undefined) {
										var title = props[titles[chkd_id]];
										titleInfo(title, loc);
									}

								} else {
									for (var idx2 in googleVector[chkd_id][idx]) {
										if (!isNaN(idx2)) {
											var loc = googleVector[chkd_id][idx][idx2];
											if (googleVector[chkd_id][idx][idx2].error) {
												// Handle the error.
												console.log(googleVector[chkd_id][idx][idx2].message);
											} else {
												googleVector[chkd_id][idx][idx2].setMap(map);
											}
											var props = googleVector[chkd_id][idx][idx2].get("geojsonProperties");
											if (props[titles[chkd_id]] !== undefined) {
												var title = props[titles[chkd_id]];
												titleInfo(title, loc);
											}
										}
									} //end idx2 loop
								}
							}
						} //end idx loop
					}
				};
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
				if (!isNaN(idx)) {
					if (!googleVector[chkd_id][idx].length) {
						googleVector[chkd_id][idx].setVisible(false);
					} else {
						for (var idx2 in googleVector[chkd_id][idx]) {
							if (!isNaN(idx2)) {
								googleVector[chkd_id][idx][idx2].setVisible(false);
							}
						} //end of idx2 loop
					}
				}
			}
		}
	}
});



$(document).ready(function() {
	"use strict";
	$("#accordian").accordion();
	$("#radprcl").attr("checked", "checked");
	$("input[type|=checkbox]").attr("checked", false);

	//setInterval(function(){console.log("hello");},7000);
});