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
const noMatch = document.querySelector('.no-match')

const currentFilter = {
  season: "all",
  edible: "all",
};
// adding view transitions to cards 

cards.forEach((card, index) => {
  const musID = `mush-${index +1}`; 
  card.style.viewTransitionName = `card${musID}`; 
})

function updatefilter(e) {
  const filterType = e.target.name;
  currentFilter[filterType] = e.target.value;
  console.log(currentFilter);
  // 
  if(!document.startViewTransition()) {
    filterCards()
  }
  document.startViewTransition( () => filterCards())
;
}

function filterCards() {

  let hasVisibleCards = false; 
  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    //

    if (
      (currentFilter.season === "all" || currentFilter.season === season) &&
      (currentFilter.edible === "all" || currentFilter.edible === edible)
    ) {
      card.hidden = false;
      hasVisibleCards = true; 
    } else {
      card.hidden = true;
    }

    if(hasVisibleCards) {
      noMatch.hidden  = true; 
    } else  {
      noMatch.hidden = false; 
    }
  });
}

seasonalFilter.addEventListener("change", updatefilter);
edibleFilter.addEventListener("change", updatefilter);
