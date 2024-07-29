// burger menu
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("burger").addEventListener("click", function(){
		document.querySelector("header").classList.toggle("open")
	})
})


// Phone mask
mask('[data-tel-input]');
const phoneInputs = document.querySelectorAll('[data-tel-input]')
phoneInputs.forEach((input) =>{
	input.addEventListener('input',()=> {
		if (input.value == '+') input.value = '';
	})
	input.addEventListener('blur', ()=>{
		if (input.value == '+') input.value = '';
	})
});

// Yandex map


// Initialize the map when the API and DOM are fully loaded
ymaps.ready(init);
        
function init() {
    // Create a new map instance
    var myMap = new ymaps.Map("map", {
        // Set the center coordinates and zoom level
        center: [59.93868, 30.35633], // Coordinates of Moscow
        zoom: 15
    });

    // Add a placemark (marker) to the map
    var myPlacemark = new ymaps.Placemark([59.93868, 30.35633], {
        hintContent: 'Moscow',
        balloonContent: 'Capital of Russia'
    });

    // Add the placemark to the map
    myMap.geoObjects.add(myPlacemark);
}
