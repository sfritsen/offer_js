import {data_internet} from './data/internet.js';

// Listen for form changes
document.getElementById("tool_form").addEventListener("change", processForm);

// Process form changes
function processForm() {
    var internet = document.getElementById("internet").value
    processInternet(internet);
}

/**
 * **********************************************************
 * FUNCTIONS
 * **********************************************************
 * 1. build box
 * 2. build row
 * 3. format $ numerical values
 */

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
    const int_obj = data_internet.find(obj => obj.id == val)

    const int_description = int_obj.description
    const int_cost_base = int_obj.base_cost

    console.log(int_description)
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