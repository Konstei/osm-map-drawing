function drawArea(latlng) {
    areas[String(areasCnt)] = L.circle(latlng, {
        color: getComputedStyle(currentColor).backgroundColor,
        fill: colors[getComputedStyle(currentColor).backgroundColor],
        radius: parseFloat(radius.value)
    });
    areas[String(areasCnt)].addTo(map);
    areas[String(areasCnt)].bindPopup(`<button onclick="removeArea(${String(areasCnt)})" style="width: 60px; height: 30px; border: none; border-radius: 5px; background-color:#f03; color: antiquewhite; font-weight: bold; cursor: pointer;">Delete</button><span style="display: none;">${areas.length-1}</span>`);
    areasCnt++;
}

function removeArea(index) {
    map.removeLayer(areas[index]);
    for (let i=index+1; i<areas.length; i++) {
        let content = areas[i].getPopup().getContent();
        let currentIndex = parseInt(content.slice(content.indexOf('D') + 44, content.length - 7));
        areas[i].getPopup().setContent(`<button onclick="removeLine(${currentIndex-1})" style="width: 60px; height: 30px; border: none; border-radius: 5px; background-color:#f03; color: antiquewhite; font-weight: bold; cursor: pointer;">Delete</button><span style="display: none;">${currentIndex-1}</span>`);
    }
    areas.splice(index, 1);
}