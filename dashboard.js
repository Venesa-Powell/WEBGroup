
/* function that displays user frequency and pie charts*/
function ShowUserFrequency() {
    // Retrieve users from localStorage or set to empty array if none exist
    const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    // Gender counters
    let male = 0;
    let female = 0;

    // Age group counters
    let age18_25 = 0;
    let age26_35 = 0;
    let age36_50 = 0;
    let age50plus = 0;

    // Loop through each user to count gender and age groups
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // Count gender
        const genderLower = (user.gender || "").toLowerCase();
        if (genderLower === "male") {
            male++;
        } else if (genderLower === "female") {
            female++;
        }

        // Calculate age from date of birth
        const birthDate = new Date(user.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        
        // Adjust age if birthday hasn't occurred yet this year
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Count age groups based on calculated age
        if (age >= 18 && age <= 25) {
            age18_25++;
        } else if (age >= 26 && age <= 35) {
            age26_35++;
        } else if (age >= 36 && age <= 50) {
            age36_50++;
        } else if (age > 50) {
            age50plus++;
        }
    }

    // Update Gender Table
    document.getElementById("male-count").innerText = male;
    document.getElementById("female-count").innerText = female;

    // Update Age Group Table
    document.getElementById("age-18-25").innerText = age18_25;
    document.getElementById("age-26-35").innerText = age26_35;
    document.getElementById("age-36-50").innerText = age36_50;
    document.getElementById("age-50plus").innerText = age50plus;

    // Calculate totals for pie charts
    const totalGender = male + female || 1; // Prevent division by zero
    const totalAge = age18_25 + age26_35 + age36_50 + age50plus || 1;

    // Update Gender Pie Charts
    // Calculate degrees for pie chart (360 degrees = 100%)
    const maleDeg = (male / totalGender) * 360;
    const femaleDeg = (female / totalGender) * 360;

    // Male pie - filled portion shows male percentage
    document.getElementById("male-pie").style.background = 
        `conic-gradient(rgb(75, 75, 240) 0deg, rgb(75, 75, 240) ${maleDeg}deg, #ddd ${maleDeg}deg, #ddd 360deg)`;
    
    // Female pie - filled portion shows female percentage
    document.getElementById("female-pie").style.background = 
        `conic-gradient(rgb(133, 201, 228) 0deg, rgb(133, 201, 228) ${femaleDeg}deg, #ddd ${femaleDeg}deg, #ddd 360deg)`;

    // Update Age Group Pie Chart (combined pie showing all 4 age groups)
    // Calculate degrees for each segment
    const age1Deg = (age18_25 / totalAge) * 360;
    const age2Deg = age1Deg + (age26_35 / totalAge) * 360;
    const age3Deg = age2Deg + (age36_50 / totalAge) * 360;
    const age4Deg = 360; // Remaining goes to 50+

    // Create combined pie chart with 4 segments
    document.getElementById("age-pie").style.background = 
        `conic-gradient(
            rgb(75, 75, 240) 0deg, 
            rgb(75, 75, 240) ${age1Deg}deg, 
            rgb(133, 201, 228) ${age1Deg}deg, 
            rgb(133, 201, 228) ${age2Deg}deg, 
            rgb(100, 180, 100) ${age2Deg}deg, 
            rgb(100, 180, 100) ${age3Deg}deg, 
            rgb(240, 180, 75) ${age3Deg}deg, 
            rgb(240, 180, 75) ${age4Deg}deg
        )`;

}
// RUN IT WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", ShowUserFrequency);

// Function to display invoices using the saved HTML from localStorage
function showUserInvoices() {
    const container = document.getElementById("user-invoices-container");
    container.innerHTML = ""; // Clear previous invoices

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        container.innerHTML = "<p>No logged-in user found.</p>";
        return;
    }

    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    const userInvoices = allInvoices.filter(inv => inv.trn === user.trn);

    if (userInvoices.length === 0) {
        container.innerHTML = "<p>No invoices found for this user.</p>";
        return;
    }

    // Append each invoice HTML safely
    userInvoices.forEach(inv => {
        container.insertAdjacentHTML("beforeend", inv.htmlContent);
    });
}


