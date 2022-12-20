import {data_promotions} from './data/promotions.js';
import {data_internet} from './data/internet.js';

// Load selects from data folder
const selPromotions = document.getElementById("promotion");
data_promotions.forEach((value, key) => {
    selPromotions[key] = new Option(value.description, value.id);
})
const selInternet = document.getElementById("internet");
data_internet.forEach((value, key) => {
    selInternet[key] = new Option(value.description, value.id);
});

// Start total arrays
const offer_base_cost = [];
const offer_discounts = [];
const offer_total = [];

// Listen for form changes
document.getElementById("tool_form").addEventListener("change", e => {
    // Grab the output container and clear it
    const output = document.getElementById("output");
    output.innerHTML = "";

    // Process sections
    processInternet();   
});

/**
 * **********************************************************
 * FUNCTIONS
 * **********************************************************
 * format $ numerical values
 */
function build_box(title, desc, base_cost, disc_array, subtotal) {

    // Loop through the discounts array
    let discounts = [];
    disc_array.forEach(disc_row => {
        discounts += disc_row;
    })

    const service = `
        <div class="box_wrapper">
            <div class="box_title">${title}</div>
            <table>
                <tr>
                    <td>${desc}</td>
                    <td align="right">$${base_cost}</td>
                </tr>
                ${discounts}
                <tr>
                    <td>Subtotal</td>
                    <td align="right">$${subtotal}</td>
                </tr>
            </table>
        </div>
    `;

    return service;
}

function build_row(desc, price) {
    const row = `
        <tr class="discount">
            <td>${desc}</td>
            <td align="right">${price}</td>
        </tr>
    `;

    return row;
}

/**
 * **********************************************************
 * PROMOTION
 * **********************************************************
 */
function processPromotion() {
    const promotion = document.getElementById("promotion").value;
    const promo_obj = data_promotions.find(obj => obj.id == promotion);
    
    const promo_description = promo_obj.description;
    let promo_discount = promo_obj.discount;

    if (promo_discount == 0 || promo_discount == null || promo_discount == undefined) {
        promo_discount = 0;
    }
    return promo_discount;
}

/**
 * **********************************************************
 * INTERNET
 * **********************************************************
 */
function processInternet() {
    // Get selected item
    const internet = document.getElementById("internet").value;

    // Start discount and promo array
    let int_list_array = [];

    // Find selected item from data array
    const int_obj = data_internet.find(obj => obj.id == internet);

    // Add to discounts and promos array
    int_list_array.push(build_row('Promo Discount', processPromotion()));

    // Build box (title, base cost, discount array, subtotal)
    output.innerHTML += build_box(
        'Internet', 
        int_obj.description, 
        int_obj.base_cost, 
        int_list_array,
        int_obj.base_cost - processPromotion()
    );    

    // Add values to total arrays
    offer_base_cost.push(int_obj.base_cost);
    offer_discounts.push(processPromotion());
}

/**
 * **********************************************************
 * TOTAL COST
 * **********************************************************
 */
// output.innerHTML += 'BASE COST = ?';
// const sum = [1, 2, 3, 4].reduce((partialSum, a) => partialSum + a, 0);
// console.log('SUM = '+sum);

/**
 * **********************************************************
 * TAXES
 * **********************************************************
 */