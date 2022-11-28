const hotels = [
    {
        "lat": 39.445760,
        "lng": -2.681001,
        "region": "Castilla la Mancha",
        "name": "Las Pedroñeras"
    },
    {
        "lat": 40.296708,
        "lng": -2.021673,
        "region": "Castilla la Mancha",
        "name": "Las Majadas"
    },
    {
        "lat": 40.073091,
        "lng": -2.136696,
        "region": "Castilla la Mancha",
        "name": "Cuenca Carreteria"
    },
    {
        "lat": 40.077702,
        "lng": -2.128767,
        "region": "Castilla la Mancha",
        "name": "Cuenca Casas Colgadas"
    },

    {
        "lat": 42.177816,
        "lng": -7.112357,
        "region": "Galicia",
        "name": "Galicia Viana do Bolo"
    },

    {
        "lat": 37.827588,
        "lng": -5.240340,
        "region": "Andalucia",
        "name": "Cordoba Hornachuelos"
    },
    {
        "lat": 37.693265,
        "lng": -5.277360,
        "region": "Andalucia",
        "name": "Cordoba Palma del Rio"
    },
    {
        "lat": 37.877217,
        "lng": -4.779746,
        "region": "Andalucia",
        "name": "Cordoba Guadalquivir"
    },
    {
        "lat": 37.881186,
        "lng": -4.817163,
        "region": "Andalucia",
        "name": "Cordoba Azahara"
    },

    {
        "lat": 37.599305,
        "lng": -0.975659,
        "region": "Murcia",
        "name": "Cartagena Puerto"
    },
    {
        "lat": 37.604077,
        "lng": -0.980405,
        "region": "Murcia",
        "name": "Cartagena Residencia Universitaria"
    },

    {
        "lat": 28.486241,
        "lng": -16.317950,
        "region": "Canarias",
        "name": "Tenerife la Laguna"
    },
    {
        "lat": 28.460230,
        "lng": -16.258193,
        "region": "Canarias",
        "name": "Tenerife Santa Cruz"
    },
    {
        "lat": 28.096742,
        "lng": -16.683161,
        "region": "Canarias",
        "name": "Tenerife Arona"
    },

    {
        "lat": 41.353305,
        "lng": 2.165849,
        "region": "Barcelona",
        "name": "Barcelona Puerto"
    },

    {
        "lat": 40.355929,
        "lng": -3.907603,
        "region": "Madrid",
        "name": "Madrid Villaviciosa de Odon"
    },
    {
        "lat": 40.427253,
        "lng": -3.687521,
        "region": "Madrid",
        "name": "Madrid Salamanca"
    },
    {
        "lat": 40.428121,
        "lng": -3.714598,
        "region": "Madrid",
        "name": "Madrid Oxygen"
    },
    {
        "lat": 40.539214,
        "lng": -3.629631,
        "region": "Madrid",
        "name": "Madrid Alcobendas"
    },
    {
        "lat": 40.734236,
        "lng": -3.944903,
        "region": "Madrid",
        "name": "Madrid Mataelpino"
    },
]

function initMap() {
    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 4,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
            },
            center: hotels[0],
        });

    const svgMarker = {
        path: "M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
        fillColor: "#d52a52",
        fillOpacity: 1,
        strokeWeight: 0.15,
        rotation: 0,
        scale: 1.5,
        anchor: new google.maps.Point(15, 30),
    };

    const markers = hotels.map((hotel) => {
        const marker = new google.maps.Marker({
            position: hotel,
            icon: svgMarker,
            map: map,
        });
        return marker;
    });

    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}

window.initMap = initMap;
