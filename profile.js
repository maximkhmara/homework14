document.addEventListener('DOMContentLoaded', function () {
	const loader = document.querySelector('.loader');
	const backBtn = document.querySelector('.back-btn');

	backBtn.addEventListener('click', (e) => {
		e.preventDefault();
		loader.classList.add('show');
		setTimeout(function () {
			location.href = 'index.html';
		}, 2000);
	});

	console.log(`Розмір вашого монітору: ${screen.width} на ${screen.height}`);
	console.log(
		`Розмір вікна браузера: ${window.innerWidth} на ${window.innerHeight}`
	);

	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function (position) {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			getAddressFromCoords(latitude, longitude);
		});
	} else {
		console.log('Geolocation is not available on this device.');
	}

	function getAddressFromCoords(latitude, longitude) {
		const apiKey = 'AIzaSyCEu5MPtT7LQj48Vml2ONR6knsbu_RDxIQ';
		const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				if (data.results && data.results.length > 0) {
					const address = data.results[0].formatted_address;
					const nameAddress = document.createElement('div');
					nameAddress.classList.add('name-address');
					nameAddress.textContent = `Ваша адреса: ${address}`;
					document.body.insertBefore(nameAddress, backBtn.nextSibling);
				} else {
					console.log('Address not found.');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	let map;

	async function initMap() {
		const position = { lat: 40.731, lng: -73.997 };
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const latitude = pos.coords.latitude;
					const longitude = pos.coords.longitude;
					position.lat = latitude;
					position.lng = longitude;
					createMap(position);
				},
				() => {
					createMap(position);
				}
			);
		} else {
			createMap(position);
		}
	}

	async function createMap(position) {
		const { Map } = await google.maps.importLibrary('maps');
		const { AdvancedMarkerView } = await google.maps.importLibrary('marker');

		map = new Map(document.getElementById('map'), {
			zoom: 14,
			center: position,
			mapId: 'DEMO_MAP_ID',
		});
		const marker = new AdvancedMarkerView({
			map: map,
			position: position,
			title: 'Ваше місцезнаходження',
		});
	}

	initMap();
});
