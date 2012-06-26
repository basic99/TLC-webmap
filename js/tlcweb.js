var map, tlcshp, managed, tlcpts, counties;

$("input[name|='maptype']").change(function() {
	var radio_id = $("input[name|='maptype']:checked").attr("id");
	if (radio_id == 'radman') {
		setBaseManaged();
	/*} else if (radio_id == 'radpts') {
		setBaseTlcPts();
		console.log("radpts");*/
	} else if (radio_id == 'radprcl') {
		setBaseTlcParcel();

	} else if (radio_id == 'ggl'){
        setBaseGgl();
    }
});

//set base layer as Triangle managed areas

function setBaseGgl(){
    if (tlcshp) {
		tlcshp.setMap(null);
		tlcshp = null;
	}
	if (tlcpts) {
		tlcpts.setMap(null);
	}
    if (managed) {
		managed.setMap(null);
		managed = null;
	}
}

function setBaseManaged() {
	if (tlcshp) {
		tlcshp.setMap(null);
		tlcshp = null;
	}
	if (tlcpts) {
		tlcpts.setMap(null);
	}
	managed = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			//from: '1TH8AeO5XVAPZkioLjfTnIjRTFwmqBy8dLmiHV0s'
			//from: '1G2M-RZrNqe1OlKuY0BiIDpYeUpPw53QTvnkuVDg'
			from: '1gxLNysB_QJ6lBzOjoeOP6vXcUk_zvLF_Qz0mzNs'
		},
		styles: [{
			polygonOptions: {
				fillColor: "#dddddd",
				fillOpacity: .5
			}
		}, {
			where: "OWNER_TYPE contains 'State' ",
			polygonOptions: {
				fillColor: "#FF8000",
				fillOpacity: .5
			}
		}, {
			where: "OWNER_TYPE contains 'Local' ",
			polygonOptions: {
				fillColor: "#FFDBA8",
				fillOpacity: .5
			}
		}, {
			where: "OWNER_TYPE contains 'Federal' ",
			polygonOptions: {
				fillColor: "#C000C0",
				fillOpacity: .5
			}
		}, {
			where: "OWNER_TYPE = 'Dedicated Nature Preserve' ",
			polygonOptions: {
				fillColor: "#00C000",
				fillOpacity: .5
			}
		}]
	});
	managed.setMap(map);

};

//set base layer as TLC parcels

function setBaseTlcParcel() {
	if (managed) {
		managed.setMap(null);
		managed = null;
	}
    /*
	if (tlcpts) {
		tlcpts.setMap(null);
	}*/
	tlcshp = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			//from: '137AARWKjWRYVgUcT2JoTipuF_OueVksjL1VMD6Q'
			//from: '1FPtTRQzIznd-N4mz_7HFRiuj5F9NP2CffpEDORg'
			from: '1Xwc3Z1o5Hx2HdNVTRGvwR1Xltm7sAtVcs3JOuig'
		},
		styles: [{
			where: "FIRST_PUBL contains 'Nature Preserve' ",
			polygonOptions: {
				fillColor: "#00C000",
				fillOpacity: 0.4
			}
		}, {
			where: "FIRST_PUBL contains 'Open' ",
			polygonOptions: {
				fillColor: "#FFDBA8",
				fillOpacity: 0.4
			}
		}]
	});
	
    
    tlcpts = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			//from: '16muglruOwBb1Wjntj1EJrgavUIJUeXQSE4pU6iI'
			from: '1MyWuCEFIW8DYu-ZIcXJSrvnMTVyZgNaWflCyLBk'

		}
	});
    tlcshp.setMap(map);
	tlcpts.setMap(map);
    
    counties.setMap(map);
};

//set base map tlc points

function setBaseTlcPts() {
	if (tlcshp) {
		tlcshp.setMap(null);
	}
	if (managed) {
		managed.setMap(null);
	}
	tlcpts = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			//from: '16muglruOwBb1Wjntj1EJrgavUIJUeXQSE4pU6iI'
			from: '1MyWuCEFIW8DYu-ZIcXJSrvnMTVyZgNaWflCyLBk'

		}
	});

	tlcpts.setMap(map);
};

$(document).ready(

function() {
	var myLatlng = new google.maps.LatLng(35.775, -78.8);
	var myOptions = {
		zoom: 9,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	}

	map = new google.maps.Map(document.getElementById("map"), myOptions);
    
	counties = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			from: '1C-ksMVxm3pPQxs3mZgUVz4QlpsSbFmT1DOr4Muw'
		}
	});
    setBaseTlcParcel();
	counties.setMap(map);



});