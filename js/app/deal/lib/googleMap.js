define(["async!http://maps.google.com/maps/api/js?sensor=false"],function(googleMap,$){
    var Map=function(data){
        var self=this;
        self.location=data.location
        self.map= new google.maps.Map(data.mapDiv, {
            center: new google.maps.LatLng(self.location.latitude,self.location.longitude),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            navigationControl: true,
            navigationControlOptions: {
                style: google.maps.MapTypeId.ROADMAP
            }
        });
        new google.maps.Marker({
            position: new google.maps.LatLng(self.location.latitude,self.location.longitude),
            map: self.map
            //title:aListing.name
        });
    }

    return Map;

})