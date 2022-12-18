import {data_internet} from './data/internet.js';

// Listen for form changes
document.getElementById("tool_form").addEventListener("change", processChange);

// Process form changes
function processChange() {
    // Grab the output and clear it
    const output = document.getElementById("output");
    output.innerHTML = "";

    // Process internet section
    const internet = document.getElementById("internet").value;

    // Build output
    output.innerHTML += processInternet(internet);
    // output.innerHTML += testinfo;
    // output.innerHTML += build_box();
}

/**
 * **********************************************************
 * FUNCTIONS
 * **********************************************************
 * 1. build box
 * 2. build row
 * 3. format $ numerical values
 */
function build_box(title, desc, base_cost) {
    const service = `
        <div class="box_wrapper">
            <div class="box_title">${title}</div>
            <table>
                <tr>
                    <tb>${desc}</td>
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

    // Build and return box
    const int_box = build_box('Internet', int_description, int_cost_base);
    return int_box;    
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