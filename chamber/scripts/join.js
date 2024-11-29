//form load time stamp//
const form = document.querySelector("form");
form.onload = getTodaysDate();

function getTodaysDate() {
    const today = new Date();
    console.log(today.toString());
    document.querySelector("#timestamp").value = today.toString();
}

// build membership cards //

const membershipLevels = [
    {
        name: "NP Membership",
        level: "np",
        cost: "Free",
        benefits: ["Annual conference training", "Social media posts", "Online membership directory referrals"]

    },
    {
        name: "Bronze Membership",
        level: "bronze",
        cost: "$100/year",
        benefits: ["Annual conference training", "Social media posts", "Website new listing", "Electronic newsletter", "Member-to-member discounts", "Online membership directory referrals"]
    },    
    {
        name: "Silver Membership",
        level: "silver",
        cost: "$500/year",
        benefits: ["Annual conference training", "Courses/training", "Social media posts", "Website new listing", "Website banner ad", "Electronic newsletter", "Monthy magazine", "Group health/life insurance", "Member-to-member discounts", "Online membership directory referrals"]
    },
    {
        name: "Gold Membership",
        level: "gold",
        cost: "$950/year",
        benefits: ["Annual conference training", "Courses/training", "Social media posts", "Website new listing", "Website banner ad", "Online directory ad", "Electronic newsletter", "Monthy magazine", "Group health/life insurance", "Member-to-member discounts", "Online membership directory referrals", "Business referrals", "Enhanced directory listing", "Informational webinars"]
    }
];

addMembershipCards(membershipLevels);


function addMembershipCards(array) {
    const membershipCards = document.querySelector("#membership-cards");

    array.forEach((item) => {
        const membershipDiv = document.createElement("div");

        membershipDiv.classList.add("card");
        membershipDiv.classList.add("shine");
        membershipDiv.classList.add(item.level);

        membershipDiv.innerHTML = `
        <h4>${item.name}</h4>
        <button>Learn More</button>`;

        membershipDiv.addEventListener("click", () => {
            displayMembershipDetails(item)
        })

        membershipCards.appendChild(membershipDiv);
    });
}

function displayMembershipDetails(item) {
    const membershipDetails = document.querySelector("#membership-details");
    membershipDetails.innerHTML = "";
    membershipDetails.innerHTML = `<h2>${item.name}</h2>
        <p><strong>Cost:</strong> ${item.cost}</p>
        <p><strong>Benefits:</strong></p>
        <div id="benefits">${item.benefits.map((benefit) => `<p>${benefit}</p>`).join("")}</div>
        <button id="closeButton">Close</button>`;
    membershipDetails.showModal();
    membershipDetails.scrollTop = 0;
    closeButton.addEventListener("click", () =>
        membershipDetails.close());
}



