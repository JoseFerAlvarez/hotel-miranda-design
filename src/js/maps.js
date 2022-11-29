let map, infoWindow, markerCluster;

function initMap() {
    const geocoder = new google.maps.Geocoder();
    let markers = null;
    let borderRegion = new google.maps.Polygon();

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 4,
            center: hotels[0],
        });

    infoWindow = new google.maps.InfoWindow();

    document.querySelector(".regions").addEventListener("change", (e) => {
        getRegionBorder(borderRegion, e.target.value);
    });

    const locationButton = document.querySelector(".button-location");
    locationButton.addEventListener("click", () => {
        getMyPosition(map);
    });

    const matrixButton = document.querySelector(".button-matrix");
    matrixButton.addEventListener("click", () => {
        getDistanceMatrix();
    });

    document.querySelector(".button-find-location").addEventListener("click", () => {
        codeAddress(geocoder, map, hotels);
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

    markers = hotels.map((hotel) => {
        const marker = new google.maps.Marker({
            position: hotel,
            icon: svgMarker,
            map: map,
        });
        return marker;
    });

    markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}

function getMyPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const myLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.setPosition(myLocation);
            infoWindow.setContent("Current location");
            infoWindow.open(map);
            map.setCenter(myLocation);
            map.setZoom(12);
        },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function getDistanceMatrix() {
    let service = new google.maps.DistanceMatrixService();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
            const myLocation = {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }

            service.getDistanceMatrix({
                origins: [myLocation],
                destinations: hotels,
                travelMode: "DRIVING",
            }, callback)
        })
    };
}

function callback(response, status) {
    const locationList = document.querySelector(".location-list");

    let html = `<table class="location-table">
        <thead>
            <tr>
                <th>Destination</th>
                <th>Distance</th>
                <th>Duration</th>
            </tr>
        </thead>
        <tbody>`;

    const listHotels = getHotelsOrdered(response);

    listHotels.map((hotel, index) => {
        html += `<tr>
                    <td>${hotel.destination}</td>
                    <td>${Math.round((hotel.distance) / 1000)} km</td>
                    <td>${hotel.duration}</td>
                </tr>`;
    });

    html += `</tbody></table>`;

    locationList.innerHTML = html;
}

function getHotelsOrdered(response) {


    let listHotels = [];

    response.rows[0].elements.map((item, index) => {
        const hotel = {
            destination: response.destinationAddresses[index],
            origin: response.originAddresses[0],
            distance: item.distance.value,
            duration: item.duration.text
        }

        listHotels.push(hotel);
    })

    listHotels = listHotels.sort((a, b) => {
        return a.distance - b.distance;
    })

    return listHotels;
}

function codeAddress(geocoder, map, hotels) {
    let address = document.querySelector(".address").value;
    let service = new google.maps.DistanceMatrixService();
    let result = null;

    geocoder.geocode({ address: address }, function (results, status) {
        if (status === "OK") {
            infoWindow.setPosition(results[0].geometry.location);
            infoWindow.setContent("Current location");
            infoWindow.open(map);
            map.setCenter(results[0].geometry.location);
            map.setZoom(12);
            service.getDistanceMatrix({
                origins: [results[0].geometry.location],
                destinations: hotels,
                travelMode: "DRIVING",
            }, callback);
        } else {
            alert("Geocode no va por " + status);
        }
    });
}

const getRegionBorder = (borderRegion, region) => {

    let regionHotels = [];

    if (region === "Spain") {
        regionHotels = hotels;
    } else {
        regionHotels = hotels.filter(
            (hotel) => hotel.region === comunitiesSpain[region]
        );
    }

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: regionHotels[0] ? 7 : 4,
            center: regionHotels[0] ? regionHotels[0] : hotels[0],
        });

    borderRegion = new google.maps.Polygon({
        paths: regionsSpain[region],
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.1,
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

    markers = regionHotels.map((hotel) => {
        const marker = new google.maps.Marker({
            position: hotel,
            icon: svgMarker,
            map: map,
        });
        return marker;
    });

    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
    borderRegion.setMap(map);
}

window.initMap = initMap;
