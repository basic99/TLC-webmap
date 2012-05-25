/*
 javascript for tlc web mapping

*/

var googleVector = new Array();
var googleOptions = {
	strokeColor: "#FF0000",
	strokeWeight: 7,
	strokeOpacity: 0.75,
	strokeWidth: 1
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
						googleVector[chkd_id][idx].setMap(map);
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
				googleVector[chkd_id][idx].setMap(null);
			}
		}
		googleVector[chkd_id] = null;
	}
});



$(document).ready(function() {
	$("#accordian").accordion();


});