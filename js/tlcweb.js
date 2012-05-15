var map, tlcshp, managed, tlcpts;



$("input").change(function () {
    var test = $("input:checked").attr("id");
    console.log(test);
    if (test == 'radman') {
        setBaseManaged();
    } else if (test == 'radpts') {
        if (tlcshp) {
            tlcshp.setMap(null);
        }
        if (managed) {
            managed.setMap(null);
        }

        tlcpts.setMap(map);
    } else if (test == 'radprcl') {
        setBaseTlcParcel();

    }
});

//set base layer as Triangle managed areas
function setBaseManaged() {
    tlcshp.setMap(null);
    tlcshp = null;
    tlcpts.setMap(null);
    managed = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '1TH8AeO5XVAPZkioLjfTnIjRTFwmqBy8dLmiHV0s'
        },
        styles: [{
            polygonOptions: {
                fillColor: "#888800",
                fillOpacity: 1
            }
        }, {
            where: "ma_id > 1000 and ma_id < 1500",
            polygonOptions: {
                fillColor: "#0000ff",
                fillOpacity: 1
            }
        }, {
            where: "ma_id > 2000",
            polygonOptions: {
                fillColor: "#00FF00",
                fillOpacity: 1
            }
        }, {
            where: "ma_id < 1000",
            polygonOptions: {
                fillColor: "#ff0000",
                fillOpacity: 1
            }
        }]
    });
    managed.setMap(map);

};

//set base layer as TLC parcels
function setBaseTlcParcel() {
    managed.setMap(null);
    managed = null;
    tlcpts.setMap(null);

    tlcshp = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '137AARWKjWRYVgUcT2JoTipuF_OueVksjL1VMD6Q'
        },
        styles: [{
            polygonOptions: {
                fillColor: "#888800",
                fillOpacity: 1
            }
        }]
    });
    tlcshp.setMap(map);
};

function setBaseTlePts() {};

$(document).ready(

function () {
    var myLatlng = new google.maps.LatLng(35.775, -78.8);
    var myOptions = {
        zoom: 9,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    map = new google.maps.Map(document.getElementById("map"), myOptions);
    var counties = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '1C-ksMVxm3pPQxs3mZgUVz4QlpsSbFmT1DOr4Muw'
        }
    });
    counties.setMap(map);



    managed = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '1TH8AeO5XVAPZkioLjfTnIjRTFwmqBy8dLmiHV0s'
        },
        styles: [{
            polygonOptions: {
                fillColor: "#888800",
                fillOpacity: 1
            }
        }, {
            where: "ma_id > 1000 and ma_id < 1500",
            polygonOptions: {
                fillColor: "#0000ff",
                fillOpacity: 1
            }
        }, {
            where: "ma_id > 2000",
            polygonOptions: {
                fillColor: "#00FF00",
                fillOpacity: 1
            }
        }, {
            where: "ma_id < 1000",
            polygonOptions: {
                fillColor: "#ff0000",
                fillOpacity: 1
            }
        }]
    });
    managed.setMap(map);

    tlcpts = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '16muglruOwBb1Wjntj1EJrgavUIJUeXQSE4pU6iI'
        }
    });
    tlcpts.setMap(null);



});



//counties map
//https://www.google.com/fusiontables/DataSource?docid=1C-ksMVxm3pPQxs3mZgUVz4QlpsSbFmT1DOr4Muw
//tlc shape
//https://www.google.com/fusiontables/DataSource?docid=137AARWKjWRYVgUcT2JoTipuF_OueVksjL1VMD6Q
//tlc points
//https://www.google.com/fusiontables/DataSource?docid=16muglruOwBb1Wjntj1EJrgavUIJUeXQSE4pU6iI
//managed areas
//https://www.google.com/fusiontables/DataSource?docid=1TH8AeO5XVAPZkioLjfTnIjRTFwmqBy8dLmiHV0s