document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const footerYear = document.getElementById("footer-year");
    const lastModified = document.getElementById("last-modified");

    let isGridView = true; // Default view

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Failed to load members data.");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
            directory.innerHTML = "<p>Failed to load member data.</p>";
        }
    }

    function displayMembers(members) {
        directory.innerHTML = ""; // Clear existing content

        members.forEach(member => {
            const memberDiv = document.createElement("div");
            memberDiv.classList.add("member-card");
            if (!isGridView) memberDiv.classList.add("list-view");

            memberDiv.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <span class="membership-level level-${member.membership}">
                    ${getMembershipLevel(member.membership)}
                </span>
            `;
            directory.appendChild(memberDiv);
        });
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 3: return "Gold Member";
            case 2: return "Silver Member";
            case 1: return "Member";
            default: return "Member";
        }
    }

    gridViewBtn.addEventListener("click", () => {
        isGridView = true;
        directory.classList.remove("list-view");
        directory.classList.add("grid-view");
        fetchMembers(); // Re-render with the new layout
    });

    listViewBtn.addEventListener("click", () => {
        isGridView = false;
        directory.classList.remove("grid-view");
        directory.classList.add("list-view");
        fetchMembers(); // Re-render with the new layout
    });

    // Set footer info
    footerYear.textContent = new Date().getFullYear();
    lastModified.textContent = `Last Modified: ${document.lastModified}`;

    fetchMembers(); // Initial fetch
});