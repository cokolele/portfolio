/*
 *  waves
 */
(() => {
    CanvasWaves.create(".landpage", {
      color: "rgb(255, 119, 119, 0.8)",
      baseHeight: "2%",
      waveHeight: "6%",
      speed: 30000,
      horizontalOffset: Math.random(),
    }).toggleAnimation();

    CanvasWaves.create(".landpage", {
      color: "rgba(200, 160, 180, 0.7)",
      baseHeight: "0%",
      waveHeight: "4%",
      wavesVisible: 1,
      speed: 15000,
      horizontalOffset: Math.random(),
    }).toggleAnimation();

    CanvasWaves.create(".landpage", {
      color: "rgba(255, 160, 119, 0.9)",
      baseHeight: "3%",
      waveHeight: "6%",
      speed: 20000,
      horizontalOffset: Math.random(),
    }).toggleAnimation();
})();

/*
 *  sections scrolling
 */
(() => {
    const [arrowLandpage, arrowProjects] = document.querySelectorAll(".arrow");
    const [sectionLandpage, sectionProjects] = document.querySelectorAll("main section");
    const main = document.querySelector("main");

    const hideScrolledSection = () => {
        if (main.classList.contains("--scrolled")) {
            sectionLandpage.style.visibility = "hidden";
            sectionProjects.style.overflow = "";
        } else {
            sectionProjects.style.visibility = "hidden";
            sectionLandpage.style.overflow = "";
        }
    }
    hideScrolledSection();

    const onTransitioning = () => {
        sectionLandpage.style.visibility = "";
        sectionProjects.style.visibility = "";
        sectionLandpage.style.overflow = "hidden";
        sectionProjects.style.overflow = "hidden";
    }

    const addScroll = () => {
        onTransitioning();
        main.classList.add("--scrolled");
    }

    const removeScroll = () => {
        onTransitioning();
        main.classList.remove("--scrolled");
    };

    [sectionLandpage, sectionProjects].forEach( section => {
        section.addEventListener("transitionend", e => {
            if (e.propertyName == "transform") //filter out bubbled events
                hideScrolledSection();
        });
    });

    arrowLandpage.addEventListener("click", addScroll);
    arrowProjects.addEventListener("click", removeScroll);

    const waitTillScroll = 200;
    let previousScroll = 0;
    let currentScroll = 0;

    document.addEventListener("wheel", e => {
        currentScroll = performance.now();

        if (e.deltaY > 0) {
            if (!main.classList.contains("--scrolled") && sectionLandpage.scrollTop + sectionLandpage.clientHeight == sectionLandpage.scrollHeight && currentScroll - previousScroll > waitTillScroll) {
                addScroll();
            }
        } else {
            if (main.classList.contains("--scrolled") && sectionProjects.scrollTop == 0 && currentScroll - previousScroll > waitTillScroll) {
                removeScroll();
            }
        }

        previousScroll = currentScroll;
    });

    document.addEventListener("keyup", e => {
        if (e.code == "ArrowDown")
            addScroll();
        else if (e.code == "ArrowUp")
            removeScroll();
    })
})();

/*
 *  tabs selecting
 */
(() => {
    const tabs = document.querySelectorAll(".tab");
    const tabSelector = document.querySelector(".tab-selector");
    const slider = document.querySelector(".slider");
    const sliderItems = document.querySelectorAll(".slider-item");

    let active = 0;

    const onTabChange = (e, tab) => {
        if (e && e.currentTarget.dataset != undefined) {
            tabs[active].classList.remove("--active");
            active = e.currentTarget.dataset.tab;
        }

        if (tab !== undefined) {
            tabs[active].classList.remove("--active");
            active = tab;
        }

        tabs[active].classList.add("--active");
        sliderItems[active].style.visibility = "";

        tabSelector.style.width = tabs[active].getBoundingClientRect().width + "px";
        tabSelector.style.left = tabs[active].offsetLeft + "px";
        slider.style.transform = "translateX(-" + sliderItems[active].offsetLeft + "px)";
    }

    tabs.forEach( tab => tab.addEventListener("click", onTabChange));
    document.addEventListener("DOMContentLoaded", onTabChange);
    window.addEventListener("resize", onTabChange);

    slider.addEventListener("transitionend", e => {
        if (e.propertyName == "transform") { //filter out bubbled events
            sliderItems.forEach((slider, i) => {
                if (i != active)
                    slider.style.visibility = "hidden";
            });
        }
    });

    const main = document.querySelector("main");
    document.addEventListener("keyup", e => {
        if (main.classList.contains("--scrolled")) {
            if (e.code == "ArrowRight" && active + 1 != tabs.length)
                onTabChange(null, active + 1);
            if (e.code == "ArrowLeft" && active != 0)
                onTabChange(null, active - 1);
        }
    })
})();