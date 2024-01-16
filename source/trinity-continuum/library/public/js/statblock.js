"use strict";

async function getUserData() {
    // Mock data
    if(typeof MapTool === typeof undefined) {
        let rawData = await fetch("./data/personae.json");
        let personae = await rawData.json();
        return {
            action: "edit",
            data: personae[4]
        }
    }
    else {
        return MapTool.getUserData();
    }
}

async function getSources() {
    // Mock data
    if(typeof MapTool === typeof undefined) {
        let rawData = await fetch("./data/sources.json");
        let sources = await rawData.json();
        return sources;
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

function setEnhancements(id, data) {
    const result = [];
    for (const key in data) {
        const value = Number(data[key]);
        const prefix = (value > 0) ? "+" : "";
        result.push(`${prefix}${value} (${key})`);
    }
    setValue(id, result.join(", "));
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
