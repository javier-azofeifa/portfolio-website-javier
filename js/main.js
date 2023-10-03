/*===== Resize Navbar on Scroll =====*/
const navbar = document.querySelector(".navbar");
window.onscroll = () => {
  this.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
};

/*===== Skill Animation =====*/
const skills_wrap = document.querySelector(".about-skills"),
  skills_bar = document.querySelectorAll(".progress-line");

window.addEventListener("scroll", () => {
  skillsEffect();
});

function checkScroll(el) {
  let rect = el.getBoundingClientRect();
  if (window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}

function skillsEffect() {
  if (!checkScroll(skills_wrap)) return;
  skills_bar.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

/*===== Portfolio Item Filter =====*/
const filterContainer = document.querySelector(".portfolio-filter"),
  filterBtns = filterContainer.children;
totalFilterBtn = filterBtns.length;
(portfolioItems = document.querySelectorAll(".portfolio-item")),
  (totalPortfolioItem = portfolioItems.length);
console.log(totalPortfolioItem);

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");
    const filterValue = this.getAttribute("data-filter");
    for (let j = 0; j < totalPortfolioItem; j++) {
      if (filterValue === portfolioItems[j].getAttribute("data-category")) {
        portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      } else {
        portfolioItems[j].classList.remove("show");
        portfolioItems[j].classList.add("hide");
      }
      if (filterValue === "all") {
        portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      }
    }
  });
}

/*===== Lightbox =====*/
const lightbox = document.querySelector(".lightbox"),
  lightboxImg = lightbox.querySelector(".lightbox-img"),
  lightboxClose = lightbox.querySelector(".lightbox-close"),
  lightboxText = lightbox.querySelector(".caption-text"),
  lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;
for (let i = 0; i < totalPortfolioItem; i++) {
  portfolioItems[i].addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLighbox();
  });
}

function nextItem() {
  if (itemIndex === totalPortfolioItem - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }
  changeItem();
}

function prevItem() {
  if (itemIndex === 0) {
    itemIndex = totalPortfolioItem - 1;
  } else {
    itemIndex--;
  }
  changeItem();
}

function toggleLighbox() {
  lightbox.classList.toggle("open");
}

function changeItem() {
  const portfolioItem = portfolioItems[itemIndex];
  const imgSrc = portfolioItem
    .querySelector(".portfolio-img img")
    .getAttribute("src");
  const link = portfolioItem.getAttribute("data-link");

  lightboxImg.src = imgSrc;
  lightboxText.innerHTML = portfolioItem.querySelector("h4").innerHTML;
  lightboxCounter.innerHTML = itemIndex + 1 + " of " + totalPortfolioItem;

  const lightButtonLink = document.querySelector(".light-button a");
  lightButtonLink.href = link;
}

lightbox.addEventListener("click", function (event) {
  if (event.target === lightboxClose || event.target === lightbox) {
    toggleLighbox();
  }
});