"use strict";

async function getUserData() {
    // Mock data
    if(typeof MapTool === typeof undefined) {
        let rawData = await fetch("./data/personae.json");
        console.log(rawData);
        let personae = await rawData.json();
        console.log(personae);
        return {
            "action":"edit",
            "data": personae[1]
        }
    }
    else {
        return MapTool.getUserData();
    }
}

function setValue(id, value) {
    const element = document.getElementById(id);
    if (element != null) {
        element.innerText = value;
    }
}

function isHidden(id, value) {
    const element = document.getElementById(id);
    if (element != null) {
        element.hidden = value;
    }
}

function setArray(spanId, array) {
    const result = [];
    for (const key in array) {
        if (array[key] == 0 || array[key] == null) {
            result.push(key);
        } else {
            result.push(`${key} ${array[key]}`);
        }
    }
    setValue(spanId, result.join(", "));
}
