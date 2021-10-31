var map = L.map('mapid').setView([10.9039413,76.900576], 50);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([10.9037613,76.8997096]).addTo(map)
    .bindPopup('<a href="https://www.google.com/maps/dir//10.9037613,76.8997096/@10.9038885,76.8649261,14226m/">Eunomia Bin 1</a>');



L.marker([10.903703,76.9018208]).addTo(map)
    .bindPopup('<a href="https://www.google.com/maps/dir//10.903703,76.9018208/@10.9038865,76.8667961,13z/">Eunomia Bin 2</a>');



L.marker([10.904655,76.9017857]).addTo(map)
    .bindPopup('<a href="https://www.google.com/maps/dir//10.904655,76.9017857/@10.9038865,76.8667961,13z/">Eunomia Bin 3</a>');


L.marker([10.904094,76.9018071]).addTo(map)
    .bindPopup('<a href="https://www.google.com/maps/dir//10.904094,76.9018071/@10.9038865,76.8667961,13z/">Eunomia Bin 4</a>');

L.marker([10.9039413,76.900576]).addTo(map)
    .bindPopup('<a href="https://www.google.com/maps/dir//10.9039413,76.900576/@10.9038865,76.8667961,13z/">Eunomia Bin 5</a>');
