
var map, tlcshp, managed, tlcpts;



$("input").change(function(){
     var test = $("input:checked").attr("id");
    console.log(test);
    if(test == 'radman'){
        tlcshp.setMap(null);
        managed.setMap(map);
        tlcpts.setMap(null);
    } else if(test == 'radpts') {
        tlcshp.setMap(null);
        managed.setMap(null);
        tlcpts.setMap(map);
    } else if (test == 'radprcl') {
        tlcshp.setMap(map);
        managed.setMap(null);
        tlcpts.setMap(null);
    }
});

$(document).ready(
    function(){
        var myLatlng = new google.maps.LatLng(35.775,-78.8);
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
        
        tlcshp = new google.maps.FusionTablesLayer({
            query: {
            select: 'geometry',
            from: '137AARWKjWRYVgUcT2JoTipuF_OueVksjL1VMD6Q'
            }
        });
        tlcshp.setMap(null);
        
         managed = new google.maps.FusionTablesLayer({
            query: {
            select: 'geometry',
            from: '1TH8AeO5XVAPZkioLjfTnIjRTFwmqBy8dLmiHV0s'
            }
        });
        managed.setMap(map);
        
        tlcpts = new google.maps.FusionTablesLayer({
            query: {
            select: 'geometry',
            from: '16muglruOwBb1Wjntj1EJrgavUIJUeXQSE4pU6iI'
            }
        });
        tlcpts.setMap(null);
        
        
        
    }
);



//counties map
//https://www.google.com/fusiontables/DataSource?docid=1C-ksMVxm3pPQxs3mZgUVz4QlpsSbFmT1DOr4Muw

//tlc shape
//https://www.google.com/fusiontables/DataSource?docid=137AARWKjWRYVgUcT2JoTipuF_OueVksjL1VMD6Q

//tlc points
//https://www.google.com/fusiontables/DataSource?docid=16muglruOwBb1Wjntj1EJrgavUIJUeXQSE4pU6iI

//managed areas
//https://www.google.com/fusiontables/DataSource?docid=1TH8AeO5XVAPZkioLjfTnIjRTFwmqBy8dLmiHV0s

