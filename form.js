const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const dob = document.getElementById("dob");
const address = document.getElementById("address");
const telephone = document.getElementById("telephone");
const email = document.getElementById('email');
const acknowledge = document.getElementById("acknowledge");
const agreement = document.getElementById("agreement");
const submit = document.querySelector("button");
const errorMessages = document.getElementById("errorMessages");

submit.addEventListener("click", buttonClicked);

function buttonClicked(e) {
    errorMessages.textContent = ""; // Clear previous error messages
    
    const maleChecked = document.getElementById("male").checked;
    const femaleChecked = document.getElementById("female").checked;
    
    // Validating email
    if (!isValidEmail(email.value)) {
        displayErrorMessage("Please enter a valid email address.");
        return;
    }
    
    // Validating gender
    if (!maleChecked && !femaleChecked) {
        displayErrorMessage("Please select a gender.");
        return;
    }

    // Validating first name
    if (!isValidName(firstName.value)) {
        displayErrorMessage("Please enter a valid first name.");
        return;
    }

    // Validating last name
    if (!isValidName(lastName.value)) {
        displayErrorMessage("Please enter a valid last name.");
        return;
    }

    // Validating telephone number
    if (!isValidTelephone(telephone.value)) {
        displayErrorMessage("Please enter a valid Nigerian telephone number.");
        return;
    }

    // Validating date of birth
    if (!isValidDOB(dob.value)) {
        displayErrorMessage("Please enter a valid date of birth (1945 or later).");
        return;
    }

    // Validating house address
    if (!address.value.trim()) {
        displayErrorMessage("Please enter your house address.");
        return;
    }

    // Validating parent contact
    if (!telephone.value.trim()) {
        displayErrorMessage("Please enter the parent contact number.");
        return;
    }

    // Validating agreement checkbox
    if (!agreement.checked) {
        displayErrorMessage("Please agree to the terms.");
        return;
    }

    // Form submission logic can go here if all validations pass
    // alert("Form submitted successfully!");
    function exportToCSV(data) {
        // Prepare CSV content
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += Object.keys(data).join(",") + "\n";
        csvContent += Object.values(data).join(",") + "\n";
    
        // Create a link element to trigger the download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "form_data.csv");
    
        // Append the link to the DOM and trigger the download
        document.body.appendChild(link);
        link.click();
    }
    
    // Example usage:
    const formData = {
        "First Name": "John",
        "Last Name": "Doe",
        "Date of Birth": "1990-01-01",
        "Address": "123 Main St",
        "Telephone": "1234567890",
        "Email": "john@example.com",
        "Parent Contact": "9876543210",
        "Name of Person Completing the Form": "Jane Smith",
        "Agreement": "Yes",
        "Date": "2023-01-01"
    };
    
    exportToCSV(formData);
    
    e.preventDefault();
}

function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function isValidName(name) {
    var pattern = /^[A-Za-z\s]+$/;
    return pattern.test(name);
}

function isValidTelephone(phone) {
    var pattern = /^(?:\+?234|0)([789][01]\d{8})$/;
    return pattern.test(phone);
}

function isValidDOB(dob) {
    var dobDate = new Date(dob);
    var minDOBDate = new Date("1945-01-01");
    return dobDate >= minDOBDate;
}

function displayErrorMessage(message) {
    errorMessages.textContent += message + "\n";
}
