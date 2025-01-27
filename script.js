"use strict";

// Hamburger menu functionality

const navToggle = document.querySelector(
  '[aria-controls="primary-navigation"]'
);
const nav = document.getElementById("primary-navigation");

navToggle.addEventListener("click", () => {
  let isNavtoggle = navToggle.getAttribute("aria-expanded");

  if (isNavtoggle === "false") {
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// filtering the css cards

const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.getElementById("season");
const edibleFilter = document.getElementById("edible");

const currentFilter = {
  season: "all",
  edible: "all",
};

function updatefilter(e) {
  const filterType = e.target.name;
  currentFilter[filterType] = e.target.value;
  console.log(currentFilter);
  filterCards();
}

function filterCards() {
  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    //

    if (
      (currentFilter.season === "all" || currentFilter.season === season) &&
      (currentFilter.edible === "all" || currentFilter.edible === edible)
    ) {
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  });
}

seasonalFilter.addEventListener("change", updatefilter);
edibleFilter.addEventListener("change", updatefilter);
