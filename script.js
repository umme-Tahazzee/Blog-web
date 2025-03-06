//common function
// ----------------Function to get an input element value and convert it to a number----------------------
// -------------------------------------------------------------------------------------------------------------

function getInputValue(id) {
    const inputValue = document.getElementById(id).value.trim(); // Trim spaces
    const numberValue = parseFloat(inputValue);
    return isNaN(numberValue) || numberValue <= 0 ? 0 : numberValue; // Ensure valid number
}

//-------------- Function to get an element's inner text and convert it to a number-----------------------
// -------------------------------------------------------------------------------------------------------

function getTextValue(id) {
    const textValue = document.getElementById(id).innerText.trim(); // Trim spaces
    const numberValue = parseFloat(textValue);
    return isNaN(numberValue) ? 0 : numberValue; // Return 0 if NaN
}

//------------------------------- Common function to handle donations for any card-----------------------------
// ---------------------------------------------------------------------------------------------------------------

function handleDonation(cardId) {
    const donateInputId = `${cardId}-donate-money`; // Input field ID
    const initialAmountId = `${cardId}-initial-money`; // Initial amount ID
    const donateMoney = getInputValue(donateInputId);
    console.log(donateMoney);

    if (donateMoney === 0) {
        alert("Invalid number. Please enter a valid donation amount.");
        return false;
    }

    const initialAmount = getTextValue(initialAmountId);
    const totalAmount = getTextValue("total-money"); // Global total donation

    // Update values
    const updatedAmount = initialAmount + donateMoney;
    const updatedTotalAmount = totalAmount + donateMoney;

    // Update the DOM
    document.getElementById(initialAmountId).innerText = updatedAmount;
    document.getElementById("total-money").innerText = updatedTotalAmount;

    // Clear input field
    document.getElementById(donateInputId).value = "";

    // Show success alert
    Swal.fire({
        title: "Donation Successful!",
        text: "Thank you for your donation!",
        imageUrl: "https://i.gifer.com/origin/10/101e4483715ffe1eb750286e4f2456aa_w200.gif",
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: "Success Image",
        confirmButtonText: "OK"
    });

    // add history of donation 
    addDonationHistory(cardId, donateMoney);

    return true;

}

//  -----------------Function to add donation history for a specific card-----------------------------
// ---------------------------------------------------------------------------------------------------

function addDonationHistory(cardId, donateMoney) {
    const now = new Date();
    const formattedDate = now.toString();

    // Find the donation button and then get the nearest donation card
    const buttonElement = document.getElementById(`${cardId}-donate-btn`);
    const donationCard = buttonElement.closest('.donation-card');

    // Find the title inside the card
    let donationTitle = "Unknown Donation"; // Default title

    if (donationCard) {
        const titleElement = donationCard.querySelector(".title");
        if (titleElement) {
            donationTitle = titleElement.textContent.trim();
        }
    }
    // Create a history entry
    const div = document.createElement("div");
    div.classList.add("p-4", "rounded", "shadow-md", "mt-2");

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("border", "border-gray-500", "p-3", "rounded-lg", "bg-white");

    innerDiv.innerHTML = `
        <p class="font-bold font-mono">${donateMoney} TK donated for ${donationTitle}</p>
        <p class="font-thin">Date: ${formattedDate}</p>
    `;

    // Append innerDiv to div
    div.appendChild(innerDiv);

    // Append div to history container
    document.getElementById('history-container').appendChild(div);
}



//------------------------ Add event listeners dynamically for all donation buttons-----------------------------
//--------------------------------------------------------------------------------------------------------------

document.getElementById("card1-donate-btn").addEventListener("click", function (e) {
    e.preventDefault();
    handleDonation("card1");
});

document.getElementById("card2-donate-btn").addEventListener("click", function (e) {
    e.preventDefault();
    handleDonation("card2");
});

document.getElementById("card3-donate-btn").addEventListener("click", function (e) {
    e.preventDefault();
    handleDonation("card3");
});

//---------------------------Feature button------------------------------------------

function showSectionById(id) {
    // Hide all sections
    document.getElementById('container-section').classList.add('hidden');
    document.getElementById('history-section').classList.add('hidden');

    // Show selected section
    document.getElementById(id).classList.remove('hidden');

    // Button style update
    const btnDonation = document.getElementById('btn-donation-show');
    const btnHistory = document.getElementById('btn-his-show');

    if (id === 'container-section') {
        btnDonation.style.backgroundColor = "green";
        btnDonation.style.color = "white";

        btnHistory.style.backgroundColor = "transparent";
        btnHistory.style.color = "black";
    } else if (id === 'history-section') {
        btnHistory.style.backgroundColor = "green";
        btnHistory.style.color = "white";

        btnDonation.style.backgroundColor = "transparent";
        btnDonation.style.color = "black";
    }
}


// Fetures  buttons
document.getElementById('btn-donation-show').addEventListener('click', function () {
    showSectionById('container-section');
});

document.getElementById('btn-his-show').addEventListener('click', function () {
    showSectionById('history-section');
});


// History section
console.log(document.getElementById('history-section').innerText);

