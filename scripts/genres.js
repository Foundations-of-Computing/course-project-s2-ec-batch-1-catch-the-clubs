document.addEventListener("DOMContentLoaded", function () {
    const genreList = document.querySelector(".genre-list");
    const clubsContainer = document.getElementById("clubs-container");

    const categories = [
        "Technology", "Arts", "Sports", "Photography", "Community",
        "Engineering", "Science", "Business", "Music", "literature", "Environment"
    ];

    let clubsData = [];

    // Fetch clubs data from clubs.json
    fetch("../clubs.json")
        .then(response => response.json())
        .then(data => {
            clubsData = data;
        })
        .catch(error => console.error("Error loading clubs:", error));

    // Create buttons for each category
    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category;
        categoryButton.classList.add("genre-button");

        categoryButton.addEventListener("click", function () {
            displayClubs(category);
        });

        genreList.appendChild(categoryButton);
    });

    // Function to display filtered clubs
    function displayClubs(selectedCategory) {
        clubsContainer.innerHTML = ""; // Clear previous clubs

        const filteredClubs = clubsData.filter(club => club.category === selectedCategory);

        if (filteredClubs.length === 0) {
            clubsContainer.innerHTML = "<p>No clubs available in this category.</p>";
            return;
        }

        filteredClubs.forEach(club => {
            const clubElement = document.createElement("div");
            clubElement.classList.add("club-item");
            clubElement.innerHTML = `
                <h3 class="club-name">${club.name}</h3>
                <p>${club.description}</p>
                <span>Category: ${club.category}</span>
            `;

            // Make clubs clickable
            clubElement.addEventListener("click", function () {
                localStorage.setItem("selectedClub", club.name); // Store selected club name
                window.location.href = "../html/club.html"; // Redirect to club details page
            });

            clubsContainer.appendChild(clubElement);
        });
    }
});
