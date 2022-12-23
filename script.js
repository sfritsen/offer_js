import {data_promotions} from './data/promotions.js';
import {data_internet} from './data/internet.js';
import {data_tv} from './data/tv.js';

// Initialize arrays
let offer_base_cost = [];
let offer_discounts = [];
let offer_total = [];

// Listen for form changes
document.getElementById("tool_form").addEventListener("change", e => {
    // Grab the output container and clear it
    const output = document.getElementById("output");
    output.innerHTML = "";

    // Clear arrays to reset totals
    offer_base_cost.length = 0;
    offer_discounts.length = 0;
    offer_total.length = 0;

    // Process sections
    process_internet();
    process_tv();
    calc_totals();
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
                    <td align="right" class="number">$${base_cost}</td>
                </tr>
                ${discounts}
                <tr>
                    <td>Subtotal</td>
                    <td align="right" class="number">$${subtotal}</td>
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
function get_product(id, array) {
    return array.find(obj => obj.id == id);
}
function sum_array(array) {
    return array.reduce((partialSum, a) => partialSum + a, 0);
}

/**
 * **********************************************************
 * PROMOTION
 * **********************************************************
 */
function process_promotion() {
    const promotion = document.getElementById("promotion").value;
    const promo_obj = data_promotions.find(obj => obj.id == promotion);
    
    const promo_description = promo_obj.description;

    if (promo_obj.discount == 0 || promo_obj.discount == null || promo_obj.discount == undefined) {
        promo_obj.discount = 0;
    }
    return promo_obj.discount;
}

/**
 * **********************************************************
 * INTERNET
 * **********************************************************
 */
function process_internet() {
    // Get selected item
    const internet = document.getElementById("internet").value;

    // Bypass if no internet is selected
    if (internet == 'no_internet') return;

    // Start discount and promo array
    let int_list_array = [];
    let int_cost_array = [];
    let int_discount_array = [];

    // Find selected item from data array
    const int_obj = get_product(internet, data_internet);

    // Add to discounts and promos array
    int_list_array.push(build_row('Promo Discount', process_promotion()));
    int_cost_array.push(int_obj.base_cost);
    int_discount_array.push(process_promotion());

    // Build box (title, base cost, discount array, subtotal)
    output.innerHTML += build_box(
        'Internet', 
        int_obj.description, 
        int_obj.base_cost, 
        int_list_array,
        int_obj.base_cost - process_promotion()
    );

    // Calculate section totals
    const sum_int_base_cost = sum_array(int_cost_array);
    const sum_int_discounts = sum_array(int_discount_array);

    // Add values to total arrays
    offer_base_cost.push(sum_int_base_cost);
    offer_discounts.push(sum_int_discounts);
    offer_total.push(sum_int_base_cost - sum_int_discounts);
}

function process_tv() {
    const tv = document.getElementById("tv").value;

    // Bypass if no internet is selected
    if (tv == 'no_tv') return;

    let tv_list_array = [];
    let tv_cost_array = [];
    let tv_discount_array = [];

    const tv_obj = get_product(tv, data_tv);

    tv_list_array.push(build_row('Promo Discount', process_promotion()));
    tv_cost_array.push(tv_obj.base_cost);
    tv_discount_array.push(process_promotion());

    output.innerHTML += build_box(
        'TV',
        tv_obj.description,
        tv_obj.base_cost,
        tv_list_array,
        tv_obj.base_cost - process_promotion()
    );

    const sum_tv_base_cost = sum_array(tv_cost_array);
    const sum_tv_discounts = sum_array(tv_discount_array);

    // Add values to total arrays
    offer_base_cost.push(sum_tv_base_cost);
    offer_discounts.push(sum_tv_discounts);
    offer_total.push(sum_tv_base_cost - sum_tv_discounts);
}

/**
 * **********************************************************
 * TOTAL COST
 * **********************************************************
 */
function calc_totals() {
    const sum_base_cost = sum_array(offer_base_cost);
    const sum_discounts = sum_array(offer_discounts);
    const sum_total = sum_array(offer_total);

    output.innerHTML += `
        <div class="box_wrapper">
            <div class="box_title">Your Offer</div>
            <div class="warning_text">Verify discounts and promo stackability before offering</div>
            <table>
                <tr>
                    <td>Base Cost</td>
                    <td align="right" class="number">$${sum_base_cost}</td>
                </tr>
                <tr>
                    <td>Discounts</td>
                    <td align="right" class="number">$${sum_discounts}</td>
                </tr>
                <tr>
                    <td>Due monthly before tax</td>
                    <td align="right" class="number">$${sum_total}</td>
                </tr>
            </table>
        </div>`
}

/**
 * **********************************************************
 * TAXES
 * **********************************************************
 */