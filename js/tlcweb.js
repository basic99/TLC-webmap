
var map, tlcshp, managed, tlcpts;

$("input").change(function () {
    var chkd_id = $("input:checked").attr("id");
    if (chkd_id == 'radman') {
        setBaseManaged();
    } else if (chkd_id == 'radpts') {
        setBaseTlcPts();
    } else if (chkd_id == 'radprcl') {
        setBaseTlcParcel();

    }
});

//set base layer as Triangle managed areas
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
            from: '1G2M-RZrNqe1OlKuY0BiIDpYeUpPw53QTvnkuVDg'
        },
        styles: [{
            polygonOptions: {
                fillColor: "#888800",
                fillOpacity: .5
            }
        }, {
            where: "ma_id > 1000 and ma_id < 1500",
            polygonOptions: {
                fillColor: "#0000ff",
                fillOpacity: .5
            }
        }, {
            where: "ma_id > 2000",
            polygonOptions: {
                fillColor: "#00FF00",
                fillOpacity: .5
            }
        }, {
            where: "ma_id < 1000",
            polygonOptions: {
                fillColor: "#ff0000",
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
    if (tlcpts) {
        tlcpts.setMap(null);
    }
    tlcshp = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            //from: '137AARWKjWRYVgUcT2JoTipuF_OueVksjL1VMD6Q'
            from: '1FPtTRQzIznd-N4mz_7HFRiuj5F9NP2CffpEDORg'
        },
        styles: [{
            polygonOptions: {
                fillColor: "#888800",
                fillOpacity: .5
            }
        }]
    });
    tlcshp.setMap(map);
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
            from: '16muglruOwBb1Wjntj1EJrgavUIJUeXQSE4pU6iI'
            
        }
    });

    tlcpts.setMap(map);
};

$(document).ready(

function () {
    var myLatlng = new google.maps.LatLng(35.775, -78.8);
    var myOptions = {
        zoom: 9,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    map = new google.maps.Map(document.getElementById("map"), myOptions);
    setBaseManaged();
    var counties = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '1C-ksMVxm3pPQxs3mZgUVz4QlpsSbFmT1DOr4Muw'
        }
    });
    counties.setMap(map);

   

});