
document.addEventListener("DOMContentLoaded", function () {
    const clubList = document.querySelector(".club-list");
    const searchInput = document.getElementById("search");
    const clubContainer = document.getElementById("clubContainer");
    const menuBtn = document.getElementById("menu-btn");
    const menuOptions = document.getElementById("menu-options");
    const clubOfDayBtn = document.getElementById("club-of-day");

    let clubsData = [];

    const categoryColors = {
        "Technology": "#3498db", "Arts": "#e74c3c", "Sports": "#27ae60",
        "Photography": "#9b59b6", "Community": "#f39c12", "Engineering": "#1abc9c",
        "Science": "#00cec9", "Business": "#e67e22", "Music": "#8e44ad",
        "literature": "#2c3e50", "Environment": "#16a085", "Other": "#7f8c8d"
    };

    // Fetch and display clubs
    fetch("../clubs.json")
        .then(response => response.json())
        .then(data => {
            clubsData = data;
            displayClubs(data);
            displayFeaturedClubs(data);
        })
        .catch(error => console.error("Error loading clubs:", error));

    function displayClubs(clubs) {
        clubList.innerHTML = "";
        clubs.forEach(club => {
            const clubDiv = document.createElement("div");
            clubDiv.classList.add("club");
            clubDiv.style.borderLeft = `5px solid ${categoryColors[club.category] || categoryColors["Other"]}`;

            clubDiv.innerHTML = `
                <div>${club.name}</div>
                <p><small style="color: gray;">${club.description}</small></p>
            `;

            clubDiv.addEventListener("click", () => {
                localStorage.setItem("selectedClub", club.name);
                window.location.href = "../html/club.html";
            });

            clubList.appendChild(clubDiv);
        });
    }

    function displayFeaturedClubs(clubs) {
        clubContainer.innerHTML = ""; // Clear previous content

        let selectedClubs = clubs.sort(() => 0.5 - Math.random()).slice(0, 5);

        selectedClubs.forEach(club => {
            let card = document.createElement("div");
            card.className = "club-card";
            card.innerHTML = `
                <h3>${club.name}</h3>
                <p>${club.description}</p>
            `;
            clubContainer.appendChild(card);
        });
    }

    // Search functionality
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        displayClubs(clubsData.filter(club =>
            club.name.toLowerCase().includes(searchText) ||
            club.description.toLowerCase().includes(searchText) ||
            club.category.toLowerCase().includes(searchText)
        ));
    });

    // Menu Toggle
    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        menuOptions.classList.toggle("show");
        menuOptions.style.display = menuOptions.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
        if (!menuOptions.contains(event.target) && event.target !== menuBtn) {
            menuOptions.style.display = "none";
        }
    });

    // Club of the Day
    clubOfDayBtn.addEventListener("click", () => {
        if (clubsData.length === 0) return;
        const randomClub = clubsData[Math.floor(Math.random() * clubsData.length)];
        alert(`🎉 Club of the Day: ${randomClub.name}\n${randomClub.description}`);
    });
});


