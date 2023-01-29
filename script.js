var navMenuAnchorTags = document.querySelectorAll(".nav-menu a");
var interval;

for (var i = 0; i < navMenuAnchorTags.length; i++) {
  navMenuAnchorTags[i].addEventListener("click", function (event) {
    event.preventDefault();

    var targetSectionID = this.textContent.trim().toLowerCase();
    var targetSection = document.getElementById(targetSectionID);

    var interval = setInterval(function () {
      var targetCoordinates = targetSection.getBoundingClientRect();

      if (targetCoordinates.top <= 0) {
        clearInterval(interval);
        return;
      }
      window.scrollBy(0, 50);
    }, 200);
  });
}

var progressBars = document.querySelectorAll(".skill-progress > div");
var skillsContainer = document.getElementById("skills-container");
var animationDone = false;

function initializeBars(bar) {
  bar.setAttribute("data-visited", false);
  bar.style.width = 0 + "%";
}

for (var bar of progressBars) {
  initializeBars(bar);
}

function fillBars(bar) {
  let currentWidth = 0;
  let targetWidth = bar.getAttribute("data-bar-width");

  let interval = setInterval(function () {
    if (currentWidth >= targetWidth) {
      clearInterval(interval);
      return;
    }
    currentWidth++;
    bar.style.width = currentWidth + "%";
  }, 5);
}

function checkscroll() {
  //check whether individual skill is visible or not
  for (let bar of progressBars) {
    var barCoordinates = bar.getBoundingClientRect();
    if (
      bar.getAttribute("data-visited") == "false" &&
      barCoordinates.top <= this.window.innerHeight - barCoordinates.height
    ) {
      bar.setAttribute("data-visited", true);
      fillBars(bar);
    } else if (barCoordinates.top > window.innerHeight) {
      bar.setAttribute("data-visited", false);
      initializeBars(bar);
    }
  }
}

//for the percentage of the scrolled document.
var scrolledBar = document.querySelector(".scroll-percent p");

// This function will return the maximum of the following
function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.body.offsetHeight,
    D.body.clientHeight
  );
}

var docHeight = getDocHeight();
var windowHeight = window.innerHeight;

window.onresize = function (e) {
  docHeight = getDocHeight();
  windowHeight = window.innerHeight;
};

// This function uses a for loop for individual progress bars. You can modify it so that it applies to the whole skill section at once
function checkViewed() {
  var scrolled = Math.floor(
    (window.scrollY / (docHeight - windowHeight)) * 100
  );

  scrolledBar.innerText = scrolled;
}

window.addEventListener("scroll", (event) => {
  checkscroll();
  checkViewed();
});
