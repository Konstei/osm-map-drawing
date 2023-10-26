let map = L.map('map').setView([44.941376, 26.021981], 10);
let lines = {};
let linesCnt = 0;
let areas = {};
let areasCnt = 0;
let colors = {
    'rgb(255, 192, 203)': '#ffc0cb33',
    'rgb(220, 20, 60)': '#dc143c33',
    'rgb(138, 43, 226)': '#8a2be233'
};
let currentColor = document.querySelector('#colors').firstElementChild;
let currentShape;
let weight = document.querySelector('#weight');
let radius = document.querySelector('#radius');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


[...currentColor.parentElement.children].forEach(color => {
    color.addEventListener('click', e => {
        currentColor.classList.remove('current-color');
        e.currentTarget.classList.add('current-color');
        currentColor = e.currentTarget;
        let shapes = document.querySelector('#shapes').children;
        shapes[0].firstElementChild.firstElementChild.setAttribute('fill', getComputedStyle(currentColor).backgroundColor);
        shapes[1].firstElementChild.firstElementChild.setAttribute('stroke', getComputedStyle(currentColor).backgroundColor);
        shapes[2].firstElementChild.firstElementChild.setAttribute('stroke', getComputedStyle(currentColor).backgroundColor);
        shapes[2].firstElementChild.firstElementChild.setAttribute('fill', colors[getComputedStyle(currentColor).backgroundColor]);
    });
});

[...document.querySelector('#shapes').children].forEach(shape => {
    shape.addEventListener('click', e => {
        let line = false;
        
        if (currentShape) {
            if (currentShape.id === 'line') line = true;
            currentShape.classList.remove('current-shape');
        }
        e.currentTarget.classList.add('current-shape');
        currentShape = e.currentTarget;
        
        let size = document.querySelector('#size');
        switch (currentShape.id) {
            case 'brush':
                if (getComputedStyle(size.firstElementChild).display === 'none') {
                    size.lastElementChild.style.display = 'none';
                    size.firstElementChild.style.display = 'block';
                }
                break;
            
            case 'line':
                line = false;
                if (getComputedStyle(size.firstElementChild).display === 'none') {
                    size.lastElementChild.style.display = 'none';
                    size.firstElementChild.style.display = 'block';
                }
                break;

            case 'area':
                if (getComputedStyle(size.lastElementChild).display === 'none') {
                    size.firstElementChild.style.display = 'none';
                    size.lastElementChild.style.display = 'block';
                }
                break;
        }
        if (line && marker) removeMarker();
    });
});
