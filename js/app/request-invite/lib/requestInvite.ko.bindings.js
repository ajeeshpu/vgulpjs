define([ "knockout", "app/request-invite/lib/tagmanager", "app/request-invite/lib/bootstrap-typeahead" ], function() {
    var locations = [ "HSR Layout", "Bellandur", "Sarjapur Road", "Koramangala", "Domlur", "Old Airport Road", "Marathahalli", "Brookefields", "Whitefield", "Old Madras Road", "Rammurthy Nagar", "Jeevan Bhima Nagar", "Indiranagar", "BTM", "MG Road", "Brigade Road", "Residency Road", "Richmond Road", "Richmond Town", "Infantry Road", "Cunningham Road", "Lavelle Road", "JP Nagar", "Jayanagar", "Bannerghatta", "Electronic City", "KR Puram", "Banashankari", "Banaswadi", "BasavanagudiBasaveshwara NagarFrazer Town", "HBR Layout", "Hebbal", "International AirportJakkur", "Kalyan Nagar", "KammanahalliKumaraswamy Layout", "Magadi Road", "MajesticMalleshwaram", "Mysore Road", "Nagawara", "New BEL Road", "Peenya", "RT Nagar", "Race Course Road", "Rajajinagar", "Rajarajeshwari Nagar", "Sadashiv Nagar", "Sahakara Nagar", "Sanjay Nagar", "Sankey Road", "Seshadripuram", "Shanti Nagar"
, "Shivajinagar", "Ulsoor", "Vijay Nagar", "Yelahanka", "Yeshwantpur" ];
    ko.bindingHandlers.tagsInput = {
        init: function(element, valueAccessor) {
            $(element).tagsManager({}), $(element).typeahead({
                source: locations
            });
        },
        update: function(element, valueAccessor) {
            valueAccessor()('input[name="hidden-' + $(element).attr("name") + '"]');
        }
    };
});;