
function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;

    var orbArray = [];
    var arrLen = arr.length;
    for (var i = 0; i < arrLen; i++) {
        var comp = Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + arr[i].avgAlt, 3) / GM));
        orbArray.push({ name: arr[i].name, orbitalPeriod: comp });
    }


    return orbArray;
}

orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]);
