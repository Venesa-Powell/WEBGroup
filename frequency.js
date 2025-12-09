function ShowFrequency() {
 const users = JSON.parse(localStorage.getItem("RegistrationData")) || []; // Retrieve users from localStorage or set to empty array if none exist (||) read on left then on right

    // Gender counters
    let male = 0;
    let female = 0;
    let other = 0;

    // Age group counters
    let age18_25 = 0;
    let age26_35 = 0;
    let age36_50 = 0;
    let age50plus = 0;

     // Loop through each user
    for (let i = 0; i < users.length; i++) { //i is index that starts at 0 and goes to length of users array
        const user = users[i]; //set user to current user in loop

        // Count gender
        if (user.gender === "male") { //if gender is male add to counter
            male++;
        } else if (user.gender === "female") { // if gender is female add to counter
            female++;
        } else {
            other++;
        }

        

        // Count age groups
        // Calculate age from dob
        const birthDate = new Date(user.dob); //set birthDate to date of birth from user data
        const today = new Date(); //set today to current date
        const age = today.getFullYear() - birthDate.getFullYear(); //calculate age by subtracting birth year from current year
        if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
            age--; // adjust if birthday hasn't occurred yet this year
        }

        if (age >= 18 && age <= 25) { // if age is between 18 and 25
            age18_25++; } // append it to counter  this just adds 1 to the counter
        else if (age >= 26 && age <= 35) {
            age26_35++;}
        else if (age >= 36 && age <= 50) {
            age36_50++;}
        else if (age > 50) { 
            age50plus++;}
    }

    // Display in dashboard
    document.getElementById("Male").innerText = male; //read and find element by ID and set in that section text to maleCount
    document.getElementById("Female").innerText = female;
    document.getElementById("Other").innerText = other;

    document.getElementById("18-25").innerText = age18_25;
    document.getElementById("26-35").innerText = age26_35;
    document.getElementById("36-50").innerText = age36_50;
    document.getElementById("50+").innerText = age50plus;
}


// RUN IT WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", ShowFrequency);
