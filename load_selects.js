import {data_promotions} from './data/promotions.js';
import {data_internet} from './data/internet.js';
import {data_tv} from './data/tv.js';

// Load selects from data folder
const selPromotions = document.getElementById("promotion");
data_promotions.forEach((value, key) => {
    selPromotions[key] = new Option(value.description, value.id);
})
const selInternet = document.getElementById("internet");
data_internet.forEach((value, key) => {
    selInternet[key] = new Option(value.description, value.id);
});
const selTv = document.getElementById("tv");
data_tv.forEach((value, key) => {
    selTv[key] = new Option(value.description, value.id);
});