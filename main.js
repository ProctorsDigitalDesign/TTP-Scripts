// CMS Wrapper Observer
document.addEventListener("DOMContentLoaded", function () {
  const cmsWrapper = document.querySelector(".case_study_wrapper");
  if (!cmsWrapper) return;

  const observer = new MutationObserver(() => {
    if (cmsWrapper.querySelectorAll(".w-dyn-item").length > 0) {
      cmsWrapper.style.opacity = "1";
      observer.disconnect();
    }
  });

  observer.observe(cmsWrapper, { childList: true, subtree: true });
});

// Footer year
const currentYear = new Date().getFullYear();
$(`[data-year]`).html(currentYear);

// Nav menu toggle
const toggleMenuButton = document.querySelector('.navbar_menu-button');
toggleMenuButton.addEventListener('click', function() {
  document.body.classList.toggle('menu-open');
});

// Nav dropdown hover
const parentElement = document.querySelector('.navbar_wrap');
const childElements = document.querySelectorAll('.navbar_menu-dropdown');
childElements.forEach(function(childElement) {
  childElement.addEventListener('mouseenter', function() {
    parentElement.classList.add('menu-active');
  });
  childElement.addEventListener('mouseleave', function() {
    parentElement.classList.remove('menu-active');
  });
});

// Nav scroll behavior
document.addEventListener("DOMContentLoaded", function () {
  const body = $("body");
  const $window = $(window);

  const initialScrollTop = $window.scrollTop();
  if (initialScrollTop > 100) {
    body.addClass("collapse_header scrolled-header");
  }

  let lastScrollTop = initialScrollTop;

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  function handleScroll() {
    const scrollTop = $window.scrollTop();
    if (scrollTop > lastScrollTop && scrollTop > 800) {
      body.addClass("hidden-header");
    } else {
      body.removeClass("hidden-header");
    }
    if (scrollTop > 150) {
      body.addClass("scrolled-header");
    } else {
      body.removeClass("scrolled-header");
    }
    lastScrollTop = Math.max(scrollTop, 0);
  }

  $window.on("scroll", throttle(handleScroll, 150));
});

// GSAP Animations
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Parallax images
      const parallaxWrappers = document.querySelectorAll('[parallax-wrapper]');
      parallaxWrappers.forEach(wrapper => {
        const parallaxImages = wrapper.querySelectorAll('[parallax-image="true"]');
        parallaxImages.forEach(parallaxImage => {
          gsap.set(parallaxImage, { yPercent: 0 });
          gsap.to(parallaxImage, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        });
      });

      // Tint parallax
      const tintWrappers = document.querySelectorAll('[parallax-tint-section]');
      tintWrappers.forEach(tintwrapper => {
        const tints = tintwrapper.querySelectorAll('[parallax-tint]');
        const altTints = tintwrapper.querySelectorAll('[parallax-tint-alt]');

        tints.forEach(tint => {
          gsap.set(tint, { yPercent: 50, opacity: 0.75 });
          gsap.to(tint, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: tintwrapper,
              start: "top 80%",
              end: "bottom top",
              scrub: true,
            }
          });
        });

        altTints.forEach(altTint => {
          gsap.set(altTint, { yPercent: -20, opacity: 0.75 });
          gsap.to(altTint, {
            yPercent: -60,
            ease: "none",
            scrollTrigger: {
              trigger: tintwrapper,
              start: "top 80%",
              end: "bottom top",
              scrub: true,
            }
          });
        });
      });

      // Hero parallax
      const heroWrappers = document.querySelectorAll('[parallax-hero-section]');
      heroWrappers.forEach(herowrapper => {
        const herotints = herowrapper.querySelectorAll('[hero-tint]');
        herotints.forEach(herotint => {
          gsap.set(herotint, { y: 64, opacity: 0.75 });
          gsap.to(herotint, {
            y: -104,
            ease: "none",
            scrollTrigger: {
              trigger: herowrapper,
              start: "top top",
              end: "bottom top",
              scrub: true,
              stagger: 1
            }
          });
        });
      });

      // Scale images
      const scaleImages = document.querySelectorAll('[scale-image]');
      if (scaleImages) {
        scaleImages.forEach(scaleImage => {
          gsap.set(scaleImage, { scale: 0.9 });
          gsap.to(scaleImage, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scaleImage,
              start: "top center",
              end: "top 10%",
              scrub: true
            }
          });
        });
      }

    } else {
      console.error("GSAP or ScrollTrigger is not available");
    }
  }, 1600);
});

// CMS List Sync
window.addEventListener("DOMContentLoaded", (event) => {
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }

  $("[tr-listsync-element='component']").each(function (index) {
    let componentEl = $(this),
        cmsListEl = componentEl.find("[tr-listsync-element='list']"),
        cmsItemEl = cmsListEl.children(),
        prevButtonEl = componentEl.find("[tr-listsync-element='button-prev']"),
        nextButtonEl = componentEl.find("[tr-listsync-element='button-next']");
    let onLoadSetting = attr(false, componentEl.attr("tr-listsync-onload")),
        activeIndexSetting = attr(0, componentEl.attr("tr-listsync-activeindex")),
        activeClassSetting = attr("is-active", componentEl.attr("tr-listsync-activeclass"));

    function addActive(trigger) {
      cmsItemEl.removeClass(activeClassSetting);
      let itemIndex = trigger.index();
      cmsListEl.each(function () {
        $(this).children().eq(itemIndex).addClass(activeClassSetting);
      });
    }

    if (onLoadSetting) addActive(cmsItemEl.eq(activeIndexSetting));

    cmsListEl.each(function () {
      let childrenItemEl = $(this).children(),
          clickSetting = attr(true, $(this).attr("tr-listsync-click")),
          hoverInSetting = attr(false, $(this).attr("tr-listsync-hoverin")),
          hoverOutSetting = attr(false, $(this).attr("tr-listsync-hoverout"));

      if (clickSetting) {
        childrenItemEl.on("click", function () { addActive($(this)); });
      }
      if (hoverInSetting) {
        childrenItemEl.on("mouseenter", function () { addActive($(this)); });
      }
      if (hoverOutSetting) {
        childrenItemEl.on("mouseleave", function () { cmsItemEl.removeClass(activeClassSetting); });
      }
    });

    prevButtonEl.on("click", function () {
      cmsListEl.each(function () {
        let childrenItemEl = $(this).children();
        let currentItemEl = childrenItemEl.filter("." + activeClassSetting).removeClass(activeClassSetting);
        let prevItemEl = currentItemEl.prev();
        if (prevItemEl.length === 0) prevItemEl = childrenItemEl.last();
        prevItemEl.addClass(activeClassSetting);
      });
    });

    nextButtonEl.on("click", function () {
      cmsListEl.each(function () {
        let childrenItemEl = $(this).children();
        let currentItemEl = childrenItemEl.filter("." + activeClassSetting).removeClass(activeClassSetting);
        let nextItemEl = currentItemEl.next();
        if (nextItemEl.length === 0) nextItemEl = childrenItemEl.first();
        nextItemEl.addClass(activeClassSetting);
      });
    });
  });
});

// Search
$("[tr-search-element='component']").each(function (index) {
  let componentEl = $(this),
      inputEl = componentEl.find("[tr-search-element='input']"),
      clearButtonEl = componentEl.find("[tr-search-element='clear']"),
      resultsWrapperEl = componentEl.find("[tr-search-element='results-wrapper']");

  inputEl.on("input", function () {
    let fieldValue = $(this).val();
    if (fieldValue.length) {
      componentEl.addClass("is-open");
      $.ajax({
        url: "/search?query=" + fieldValue.replaceAll(" ", "+"),
        success: function (response) {
          let results = $(response).find("[tr-search-element='search-page-results']");
          resultsWrapperEl.empty();
          resultsWrapperEl.append(results);
        }
      });
    } else {
      componentEl.removeClass("is-open");
    }
  });

  clearButtonEl.on("click", function () {
    inputEl.val("");
    componentEl.removeClass("is-open");
  });
});

// Video display check
function checkVideoDisplay() {
  var videos = document.querySelectorAll('.content_img_video');
  videos.forEach(function(video) {
    var displayStyle = window.getComputedStyle(video).display;
    if (displayStyle === 'flex') {
      video.parentElement.classList.add('has-video');
    }
  });
}
checkVideoDisplay();

// Video modal - stop on close
document.addEventListener("DOMContentLoaded", function () {
  function stopVideo(event) {
    const modal = event.currentTarget.closest(".video_modal");
    if (!modal) return;
    const iframe = modal.querySelector("iframe.embedly-embed");
    if (!iframe) return;
    const wrapper = iframe.parentElement;
    const html = wrapper.innerHTML;
    wrapper.innerHTML = "";
    setTimeout(() => { wrapper.innerHTML = html; }, 50);
  }

  document.querySelectorAll(".video_modal_close").forEach(btn => btn.addEventListener("click", stopVideo));
  document.querySelectorAll(".video_modal_bg").forEach(bg => bg.addEventListener("click", stopVideo));
});
