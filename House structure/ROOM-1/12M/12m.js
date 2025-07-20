// Object mapping predefined values to descriptions
const labels = {
    "5s": "5Ams Switch",
    "2w": "5Ams 2Way Switch",
    "5p": "5Ams Socket",
    "15s": "15Ams Switch",
    "15p": "15Ams Socket",
    "fs": "Fan Step Regulator SwitchType",
    "fp": "Fan Step Regulator SocketType",
    "bs" : "Bell Switch"
};

// Function to save values
function storeValues() {
    let inputs = document.querySelectorAll(".userInput");
    let values = [];

    // Loop through inputs and store only valid values
    inputs.forEach(input => {
        let trimmedValue = input.value.trim();
        if (labels.hasOwnProperty(trimmedValue)) {
            values.push(trimmedValue);
        }
    });

    // Store in localStorage as JSON
    localStorage.setItem("switchStates", JSON.stringify(values));
    showStoredValues(); // Update display
    alert("Valid values saved!");
}

// Function to refresh (clear) values
function refreshValues() {
    localStorage.removeItem("switchStates"); // Remove stored values
    let inputs = document.querySelectorAll(".userInput");

    // Reset input fields
    inputs.forEach(input => {
        input.value = "";
    });

    showStoredValues(); // Update display
    alert("Values cleared!");
}

// Function to process and display stored values with the special counting condition
function showStoredValues() {
    let storedValues = JSON.parse(localStorage.getItem("switchStates")) || [];
    let displayElement = document.getElementById("display");

    if (storedValues.length > 0) {
        let countMap = {};
        let specialCounts = { "5p": 0, "15p": 0, "fp": 0 };

        // Count occurrences of each value
        storedValues.forEach(val => {
            if (specialCounts.hasOwnProperty(val)) {
                specialCounts[val]++;
            } else {
                countMap[val] = (countMap[val] || 0) + 1;
            }
        });

        // Convert every two occurrences of 5p, 15p, and fp into one 5s, 15s, and fs respectively
        countMap["5p"] = (countMap["5p"] || 0) + Math.floor(specialCounts["5p"] / 2);
        countMap["15p"] = (countMap["15p"] || 0) + Math.floor(specialCounts["15p"] / 2);
        countMap["fp"] = (countMap["fp"] || 0) + Math.floor(specialCounts["fp"] / 2);

        // Format output with count and description
        let formattedValues = Object.keys(countMap).map(val => {
            return `${labels[val]} (Total: ${countMap[val]})`;
        });

        displayElement.innerHTML = "<strong>Stored Values:</strong> " + formattedValues.join(", ");
    } else {
        displayElement.innerHTML = "<strong>Stored Values:</strong> No values saved.";
    }
}

// Show saved values when the page loads
document.addEventListener("DOMContentLoaded", showStoredValues);