"use strict";


let allCones = Math.floor(Math.random() * 50) + 50;

do {
    let conesSold = Math.floor(Math.random() * 5) + 1;
        if (conesSold <= allCones) {
        allCones = allCones - conesSold;
        console.log(conesSold + " cones sold!");
            if (allCones === 0){
                console.log("Yay! I sold them all!");
            }
    } else if (conesSold > allCones){
        console.log("Cannot sell you " + conesSold + " cones, I only have " + allCones + " cone left.")
    }
} while (allCones > 0);