document.addEventListener("DOMContentLoaded", function () {
    const clubDetailsContainer = document.getElementById("club-details");

    // Get the selected club name from localStorage
    const selectedClubName = localStorage.getItem("selectedClub");

    if (!selectedClubName) {
        clubDetailsContainer.innerHTML = "<p>No club selected.</p>";
        return;
    }

    // Fetch clubs data from clubs.json
    fetch("../clubs.json")
        .then(response => response.json())
        .then(clubs => {
            const club = clubs.find(club => club.name === selectedClubName);

            if (!club) {
                clubDetailsContainer.innerHTML = "<p>Club not found.</p>";
                return;
            }

            // Display club details
            clubDetailsContainer.innerHTML = `
                <h2>${club.name}</h2>
                <p>${club.description}</p>
                <p>${club.details}</p>
            `;
        })
        .catch(error => console.error("Error loading club details:", error));
});
