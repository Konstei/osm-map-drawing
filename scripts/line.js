function drawLine(latlng, cnt) {
    if (cnt === 1) {
        marker = L.marker(latlng).addTo(map);
        marker.bindPopup(`<button onclick="removeMarker()" style="width: 60px; height: 30px; border: none; border-radius: 5px; background-color:#f03; color: antiquewhite; font-weight: bold; cursor: pointer;">Delete</button>`);
        lines[String(linesCnt)] = L.polyline([latlng], {
            color: getComputedStyle(currentColor).backgroundColor,
            weight: parseFloat(weight.value)
        });
        lines[String(linesCnt)].addTo(map);
    } else if (cnt === 2) {
        lines[String(linesCnt)].addLatLng(latlng);
        lines[String(linesCnt)].bindPopup(`<button onclick="removeLine(${linesCnt})" style="width: 60px; height: 30px; border: none; border-radius: 5px; background-color:#f03; color: antiquewhite; font-weight: bold; cursor: pointer;">Delete</button><span style="display: none;">${lines.length-1}</span>`)
        map.removeLayer(marker);
        linesCnt++;
    }
    return cnt;
}

function removeLine(index) {
    map.removeLayer(lines[index]);
    delete linesCnt[String(linesCnt)];
    // console.log(lines);
}

function removeMarker() {
    map.removeLayer(marker);
    delete linesCnt[String(linesCnt)];
    clickCount = 0;
}