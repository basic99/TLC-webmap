/*global google:false  InfoBox:false GeoJSON:false map:false */
/*jshint onevar:true*/


/*
 javascript for tlc web mapping

*/



var googleVector = [];
var latlon_dest, directions_result;

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

//use closure function to set ajax callback 
var func_load_data = function(chkd_id, visible) {
		"use strict";
		return function(data) {
			var layer, idx, idx2, loc, props, title;

			layer = new GeoJSON(data, googleOptions);
			googleVector[chkd_id] = layer;
			if (!googleVector[chkd_id].length) {
				if (googleVector[chkd_id].error) {
					// Handle the error.
					console.log(googleVector[chkd_id].message);
				} else {
					if (!visible) {
						googleVector[chkd_id].setVisible(false);
					}
					googleVector[chkd_id].setMap(map);

				}

			} else {
				for (idx = 0; idx < googleVector[chkd_id].length; idx++) {
					//if (!isNaN(idx)) {
					if (!googleVector[chkd_id][idx].length) {

						if (googleVector[chkd_id][idx].error) {
							// Handle the error.
							console.log(googleVector[chkd_id][idx].message);
						} else {
							if (!visible) {
								googleVector[chkd_id][idx].setVisible(false);
							}
							googleVector[chkd_id][idx].setMap(map);
						}
						loc = googleVector[chkd_id][idx];
						props = googleVector[chkd_id][idx].get("geojsonProperties");
						if (props[titles[chkd_id]] !== undefined) {
							title = props[titles[chkd_id]];
							titleInfo(title, loc);
						}

					} else {
						for (idx2 = 0; idx2 < googleVector[chkd_id][idx].length; idx2++) {
							//if (!isNaN(idx2)) {
							loc = googleVector[chkd_id][idx][idx2];
							if (googleVector[chkd_id][idx][idx2].error) {
								// Handle the error.
								console.log(googleVector[chkd_id][idx][idx2].message);
							} else {
								if (!visible) {
									googleVector[chkd_id][idx][idx2].setVisible(false);
								}
								googleVector[chkd_id][idx][idx2].setMap(map);
							}
							props = googleVector[chkd_id][idx][idx2].get("geojsonProperties");
							if (props[titles[chkd_id]] !== undefined) {
								title = props[titles[chkd_id]];
								titleInfo(title, loc);
							}
							//}
						} //end idx2 loop
					}
					//}
				} //end idx loop
			}
		}; //end load_data
	};


//function for directions
var get_fusion_data = function(data) {
		"use strict";
		var tract, lon, lat;
		
		$("#accordian").accordion("activate", 8);
		tract = data.table.rows[0][1];
		$("#drive_to").val(tract);
		lon = data.table.rows[0][0].coordinates[0];
		lat = data.table.rows[0][0].coordinates[1];
		latlon_dest = lat + "," + lon;
	};

var showroute = function(a, b) {
		"use strict";
		if (directions_result !== undefined) {
			directions_result.setMap(null);
			directions_result.setPanel(null);
		}

		directions_result = new google.maps.DirectionsRenderer();
		directions_result.setDirections(a);
		directions_result.setMap(map);
		directions_result.setPanel(document.getElementById("directions_text"));
	};

var printSelection = function (node, hdr){

  var content=node.innerHTML
  var pwin=window.open('','print_content','width=100,height=100');

  pwin.document.open();
  pwin.document.write('<html><body onload="window.print()">'+ hdr + content+'</body></html>');
  pwin.document.close();
 
  setTimeout(function(){pwin.close();},1000);

}


$(document).ready(function() {
	"use strict";
	var chkd_id, idx, idx2, load_data, data, url;

	//set up side panel
	$("#accordian").accordion({ clearStyle: true,  autoHeight: false });
	//$("#accordian").accordion( "activate", 0 );
	$("#radprcl").attr("checked", "checked");
	$("input[type|=checkbox]").attr("checked", false);
	$("#drive_to").val("");

	//capture click function for driving directions	
	$(window).click(function(e) {
		var url, target;
		target = e.target;
		if ($(target).hasClass('directions')) {
			e.preventDefault();
			url = 'http://tables.googlelabs.com/api/query?sql=SELECT geometry, LABEL FROM 1MyWuCEFIW8DYu-ZIcXJSrvnMTVyZgNaWflCyLBk WHERE ';
			url += $(target).attr("href");
			//url+= '&jsonCallback=?';
			$.ajax({
				url: url,
				dataType: 'jsonp',
				jsonp: 'jsonCallback',
				data: data,
				success: get_fusion_data
			});
		}
	});

	$("#get_directions").click(function() {
		var dir_service, latlon_start;

		dir_service = new google.maps.DirectionsService();
		latlon_start = $("#drive_from").val();
		dir_service.route({
			origin: latlon_start,
			destination: latlon_dest,
			travelMode: google.maps.TravelMode.DRIVING
		}, showroute);
		//console.log(dir_service);
	});

	$("#directions_clear").click(function() {
		directions_result.setMap(null);
		directions_result.setPanel(null);
	});
	
	$("#directions_print").click(function() {
		var hdr = "<h2>Directions to " + $("#drive_to").val() + "</h2>";
		printSelection(document.getElementById("directions_text"), hdr);

	});
	

	$("input[type|=checkbox]").change(function(e) {

		chkd_id = e.currentTarget.id;
		if (document.getElementById(chkd_id).checked) {
			//if layer exists then set visible
			//check of array of dims 0,1,2
			if (googleVector[chkd_id]) {
				if (!googleVector[chkd_id].length) {
					googleVector[chkd_id].setVisible(true);
				} else {
					for (idx = 0; idx < googleVector[chkd_id].length; idx++) {
						if (!googleVector[chkd_id][idx].length) {
							googleVector[chkd_id][idx].setVisible(true);
						} else {
							for (idx2 = 0; idx2 < googleVector[chkd_id][idx].length; idx2++) {
								googleVector[chkd_id][idx][idx2].setVisible(true);
							} //end idx2 loop
						}
					} //end idx loop
				}
			} else {
				//create new layer
				//create proper ajax callback function
				load_data = func_load_data(chkd_id, true);
				//check of array of dims 0,1,2
				url = '/tlc/data/' + chkd_id + '.geojson';
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
				for (idx = 0; idx < googleVector[chkd_id].length; idx++) {
					//if (!isNaN(idx)) {
					if (!googleVector[chkd_id][idx].length) {
						googleVector[chkd_id][idx].setVisible(false);
					} else {
						for (idx2 = 0; idx2 < googleVector[chkd_id][idx].length; idx2++) {
							googleVector[chkd_id][idx][idx2].setVisible(false);
						} //end of idx2 loop
					}
					//}
				}
			}
		}
	});

	//load 2 polygon layers
	load_data = func_load_data("Nature_Preserves", false);
	url = '/tlc/data/' + "Nature_Preserves" + '.geojson';
	$.ajax({
		url: url,
		dataType: 'json',
		data: data,
		success: load_data
	});
	load_data = func_load_data("land_projects", false);
	url = '/tlc/data/' + "land_projects" + '.geojson';
	$.ajax({
		url: url,
		dataType: 'json',
		data: data,
		success: load_data
	});
});