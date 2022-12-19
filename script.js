import {data_promotions} from './data/promotions.js';
import {data_internet} from './data/internet.js';

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
    const internet = document.getElementById("internet").value;
    processInternet(internet);   
});

/**
 * **********************************************************
 * FUNCTIONS
 * **********************************************************
 * 1. build box
 * 2. build row
 * 3. format $ numerical values
 */
function build_box(title, desc, base_cost, discounted_cost, subtotal) {
    const service = `
        <div class="box_wrapper">
            <div class="box_title">${title}</div>
            <table>
                <tr>
                    <td>${desc}</td>
                    <td align="right">${base_cost}</td>
                </tr>
                <tr>
                    <td>Discounted</td>
                    <td align="right">${discounted_cost}</td>
                </tr>
            </table>
        </div>
    `;
    return service;
}

/**
 * **********************************************************
 * PROMOTION
 * **********************************************************
 */
function processPromotion() {
    // const promo_obj = data_promotions.find(obj => obj.id == val);
    
    // const promo_description = promo_obj.description;
    // const promo_discount = promo.obj.discount;
    const promo_discount = 5;

    return promo_discount;
}

/**
 * **********************************************************
 * INTERNET
 * **********************************************************
 */
function processInternet(val) {
    
    // Find selected internet from data object
    const int_obj = data_internet.find(obj => obj.id == val);

    // Set variables
    const int_description = int_obj.description;
    const int_cost_base = int_obj.base_cost;
    const int_tech_stack = int_obj.tech;
    const int_cost_discounted = int_cost_base - processPromotion();

    // Add values to total arrays
    offer_base_cost.push(int_cost_base);

    // Build box
    output.innerHTML += build_box('Internet', int_description, int_cost_base, int_cost_discounted, 0);
    output.innerHTML += 'BASE COST = '+offer_base_cost;

    const sum = [1, 2, 3].reduce((partialSum, a) => partialSum + a, 0);
    console.log('SUM = '+sum);
}

/**
 * **********************************************************
 * TOTAL COST
 * **********************************************************
 */

/**
 * **********************************************************
 * TAXES
 * **********************************************************
 */