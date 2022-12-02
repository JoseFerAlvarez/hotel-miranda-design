let map, infoWindow, cluster, currentPosition, geocoder, markers, borderRegion, regions;

function initMap() {

    /*Variable declaration*/
    map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 4,
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

    regions = regionsSpain.map((region) => {
        return new google.maps.Polygon({
            paths: region,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.1,
        });
    });

    markers = hotels.map((hotel) => {
        const marker = new google.maps.Marker({
            position: hotel,
            icon: svgMarker,
            map: map,
        });
        return marker;
    });

    geocoder = new google.maps.Geocoder();
    borderRegion = new google.maps.Polygon();
    infoWindow = new google.maps.InfoWindow();
    cluster = new markerClusterer.MarkerClusterer({ map, markers });

    const regionsSelect = document.querySelector(".regions");
    regionsSelect.addEventListener("change", (e) => {
        getRegionBorder(borderRegion, e.target.value);
    });

    const locationButton = document.querySelector(".button-location");
    locationButton.addEventListener("click", () => {
        getMyPosition(map);
    });

    const matrixButton = document.querySelector(".button-matrix");
    matrixButton.addEventListener("click", () => {
        getDistanceMatrix(currentPosition);
    });

    const findLocation = document.querySelector(".button-find-location");
    findLocation.addEventListener("click", () => {
        codeAddress(geocoder, map, hotels);
    });
}

function getMyPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.setPosition(currentPosition);
            infoWindow.setContent("Current location");
            infoWindow.open(map);
            map.setCenter(currentPosition);
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
            currentPosition = results[0].geometry.location;
        } else {
            alert("Geocode no va por " + status);
        }
    });
}

function getDistanceMatrix(currentPosition) {
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [currentPosition],
        destinations: hotels,
        travelMode: "DRIVING",
    }, printDistanceList)
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

/*TODO: Cambiar el innerhtml por elementos anidados*/
function printDistanceList(response, status) {
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

const getRegionBorder = (borderRegion, region) => {

    regions.forEach((item) => {
        item.setMap(null);
    });

    cluster.clearMarkers();

    let regionHotels = [];

    if (region === "Spain") {
        regionHotels = hotels;
    } else {
        regionHotels = hotels.filter(
            (hotel) => hotel.region === comunitiesSpain[region]
        );
    }

    if (region !== "Spain") {
        regions[region].setMap(map);
    }


    const svgMarker = {
        path: "M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
        fillColor: "#d52a52",
        fillOpacity: 1,
        strokeWeight: 0.15,
        rotation: 0,
        scale: 1.5,
        anchor: new google.maps.Point(15, 30),
    };

    cluster.addMarkers(regionHotels.map((hotel) => {
        return new google.maps.Marker({
            position: hotel,
            icon: svgMarker,
            map: map,
        });
    }));

    if (regionHotels.length > 0) {
        map.setCenter(regionHotels[0]);
        map.setZoom(6);
    }
}

window.initMap = initMap;
