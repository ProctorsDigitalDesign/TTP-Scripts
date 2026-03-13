document.addEventListener("DOMContentLoaded", function () {
    const cmsWrapper = document.querySelector(".case_study_wrapper");

    // Check periodically if CMS items have been injected
    const observer = new MutationObserver(() => {
      if (cmsWrapper.querySelectorAll(".w-dyn-item").length > 0) {
        cmsWrapper.style.opacity = "1";
        observer.disconnect(); // Stop observing once loaded
      }
    });

    observer.observe(cmsWrapper, { childList: true, subtree: true });
  });


  //footer year
  const currentYear = new Date().getFullYear();
  $(`[data-year]`).html(currentYear);


  const toggleMenuButton = document.querySelector('.navbar_menu-button');

  // Add click event listener to the button
  toggleMenuButton.addEventListener('click', function() {
    // Toggle the 'menu-open' class on the body element
    document.body.classList.toggle('menu-open');
  });

  // Select the parent element
  const parentElement = document.querySelector('.navbar_wrap');
  // Select all child elements
  const childElements = document.querySelectorAll('.navbar_menu-dropdown');

  // Loop through each child element
  childElements.forEach(function(childElement) {
    // Add event listeners for mouseenter and mouseleave
    childElement.addEventListener('mouseenter', function() {
      parentElement.classList.add('menu-active');
    });

    childElement.addEventListener('mouseleave', function() {
      parentElement.classList.remove('menu-active');
    });
  });

  //Nav scroll
  document.addEventListener("DOMContentLoaded", function () {
    // Cache selectors
    const body = $("body");
    const $window = $(window);

    // Initial check on DOMContentLoaded
    const initialScrollTop = $window.scrollTop();
    if (initialScrollTop > 100) {
      body.addClass("collapse_header scrolled-header");
    }

    let lastScrollTop = initialScrollTop;

    // Throttle function to limit the rate at which the scroll event is handled
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

    // Scroll event handler
    function handleScroll() {
      const scrollTop = $window.scrollTop();

      // Toggle hidden-header based on scroll direction and position
      if (scrollTop > lastScrollTop && scrollTop > 800) {
        body.addClass("hidden-header");
      } else {
        body.removeClass("hidden-header");
      }

      // Toggle scrolled-header based on scroll position
      if (scrollTop > 150) {
        body.addClass("scrolled-header");
      } else {
        body.removeClass("scrolled-header");
      }

      // Update lastScrollTop
      lastScrollTop = Math.max(scrollTop, 0);
    }

    // Apply throttling to the scroll event
    $window.on("scroll", throttle(handleScroll, 150));  // Adjust the delay (100ms) as needed

  });


  //animations
  document.addEventListener("DOMContentLoaded", function() {

    setTimeout(() => {

      // Ensure GSAP and ScrollTrigger are available
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        //window.onload = function() {

        // Select all elements with the parallax-wrapper attribute
        const parallaxWrappers = document.querySelectorAll('[parallax-wrapper]');

        parallaxWrappers.forEach(wrapper => {
          const parallaxImages = wrapper.querySelectorAll('[parallax-image="true"]');

          parallaxImages.forEach(parallaxImage => {
            // Set initial position or properties using gsap.set()
            gsap.set(parallaxImage, {
              yPercent: 0, // Initial y position (change this value as needed)
              // You can set other properties here if needed
            });

            // Create the parallax effect
            gsap.to(parallaxImage, {
              yPercent: 12, // Adjust this value to control the parallax effect
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom", // Adjust this value as needed
                end: "bottom top",   // Adjust this value as needed
                scrub: true,
              }
            });
          });
        });

        const tintWrappers = document.querySelectorAll('[parallax-tint-section]');

        tintWrappers.forEach(tintwrapper => {
          const tints = tintwrapper.querySelectorAll('[parallax-tint]');
          const altTints = tintwrapper.querySelectorAll('[parallax-tint-alt]');

          tints.forEach(tint => {
            // Set initial position or properties using gsap.set()
            gsap.set(tint, {
              yPercent: 50,
              opacity: 0.75
            });

            // Create the parallax effect
            gsap.to(tint, {
              yPercent: 0, // Adjust this value to control the parallax effect
              //y: -104,
              ease: "none",
              scrollTrigger: {
                trigger: tintwrapper,
                start: "top 80%", // Adjust this value as needed
                end: "bottom top",   // Adjust this value as needed
                scrub: true,
              }
            });
          });

          altTints.forEach(altTint => {
            // Set initial position or properties using gsap.set()
            gsap.set(altTint, {
              //y: 56, // Initial y position (change this value as needed)
              // You can set other properties here if needed
              yPercent: -20,
              opacity: 0.75
            });

            // Create the parallax effect
            gsap.to(altTint, {
              yPercent: -60, // Adjust this value to control the parallax effect
              //y: -104,
              ease: "none",
              scrollTrigger: {
                trigger: tintwrapper,
                start: "top 80%", // Adjust this value as needed
                end: "bottom top",   // Adjust this value as needed
                scrub: true,
              }
            });
          });
        });


        const heroWrappers = document.querySelectorAll('[parallax-hero-section]');

        heroWrappers.forEach(herowrapper => {
          const herotints = herowrapper.querySelectorAll('[hero-tint]');
          console.log(herotints);
          herotints.forEach(herotint => {
            // Set initial position or properties using gsap.set()
            gsap.set(herotint, {
              y: 64, // Initial y position (change this value as needed)
              opacity: 0.75
            });

            // Create the parallax effect
            gsap.to(herotint, {
              //yPercent: -30, // Adjust this value to control the parallax effect
              y: -104,
              ease: "none",
              scrollTrigger: {
                trigger: herowrapper,
                start: "top top", // Adjust this value as needed
                end: "bottom top",   // Adjust this value as needed
                scrub: true,
                stagger: 1
              }
            });
          });
        });

        // Select all images with the data attribute [data-scale-image]
        const scaleImages = document.querySelectorAll('[scale-image]');
        if(scaleImages){
          // Loop through each image and apply the scroll-triggered animation
          scaleImages.forEach(scaleImage => {
            gsap.set(scaleImage, {
              scale: 0.9, // Initial y position (change this value as needed)
              // You can set other properties here if needed
            });
            // Create the GSAP animation for each image
            gsap.to(scaleImage, {
              scale: 1,  // Scale the image to 2x its size
              ease: "none",  // No easing, the scaling is linear
              scrollTrigger: {
                trigger: scaleImage,  // Trigger the animation based on this image
                start: "top center",  // Start the animation when the top of the image reaches the center of the viewport
                end: "top 10%",  // End the animation when the bottom of the image reaches the top of the viewport
                scrub: true  // Smooth scrubbing for the animation based on scroll
              }
            });
          });
        }
        // Refresh ScrollTrigger after everything is set up
        // ScrollTrigger.refresh();
        //};

      } else {
        console.error("GSAP or ScrollTrigger is not available");
      }

    }, "1600");
  });



 // CMS LIST SYNC POWER-UP
  window.addEventListener("DOMContentLoaded", (event) => {
    // attribute value checker
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    }
    // cms list sync component
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
          childrenItemEl.on("click", function () {
            addActive($(this));
          });
        }
        if (hoverInSetting) {
          childrenItemEl.on("mouseenter", function () {
            addActive($(this));
          });
        }
        if (hoverOutSetting) {
          childrenItemEl.on("mouseleave", function () {
            cmsItemEl.removeClass(activeClassSetting);
          });
        }
      });
      prevButtonEl.on("click", function () {
        cmsListEl.each(function (index) {
          let childrenItemEl = $(this).children();
          let currentItemEl = childrenItemEl.filter("." + activeClassSetting).removeClass(activeClassSetting);
          let prevItemEl = currentItemEl.prev();
          if (prevItemEl.length === 0) prevItemEl = childrenItemEl.last();
          prevItemEl.addClass(activeClassSetting);
        });
      });
      nextButtonEl.on("click", function () {
        cmsListEl.each(function (index) {
          let childrenItemEl = $(this).children();
          let currentItemEl = childrenItemEl.filter("." + activeClassSetting).removeClass(activeClassSetting);
          let nextItemEl = currentItemEl.next();
          if (nextItemEl.length === 0) nextItemEl = childrenItemEl.first();
          nextItemEl.addClass(activeClassSetting);
        });
      });
    });
  });


  //search script
  $("[tr-search-element='component']").each(function (index) {
    let componentEl = $(this),
        inputEl = componentEl.find("[tr-search-element='input']"),
        clearButtonEl = componentEl.find("[tr-search-element='clear']"),
        resultsWrapperEl = componentEl.find("[tr-search-element='results-wrapper']");
    // while user types on search input field
    inputEl.on("input", function () {
      // get field value
      let fieldValue = $(this).val();
      // if field value contains at least 1 character
      if (fieldValue.length) {
        // open component
        componentEl.addClass("is-open");
        // fetch content dynamically
        $.ajax({
          // go to search page with query that matches field value
          url: "/search?query=" + fieldValue.replaceAll(" ", "+"),
          success: function (response) {
            // find search results wrapper inside search page
            let results = $(response).find("[tr-search-element='search-page-results']");
            // empty component's results wrapper
            resultsWrapperEl.empty();
            // fill it with content from search page
            resultsWrapperEl.append(results);
          }
        });
      } else {
        // close component if field is empty
        componentEl.removeClass("is-open");
      }
    });
    // clear field value on click of clear button
    clearButtonEl.on("click", function () {
      inputEl.val("");
      componentEl.removeClass("is-open");
    });
  });

  function checkVideoDisplay() {
    // Select all elements with the 'video' class
    var videos = document.querySelectorAll('.content_img_video');

    // Iterate through each video element
    videos.forEach(function(video) {
      var displayStyle = window.getComputedStyle(video).display;

      if (displayStyle === 'flex') {
        // If video element is visible (display: flex), add 'has-video' class to parent
        video.parentElement.classList.add('has-video');
      }
    });
  }

  // Initial check on page load
  checkVideoDisplay();

document.addEventListener("DOMContentLoaded", function () {

  // Function to stop the video inside a specific modal
  function stopVideo(event) {
    // Find the modal that triggered the event
    const modal = event.currentTarget.closest(".video_modal");
    if (!modal) return;

    // Find the iframe inside this modal
    const iframe = modal.querySelector("iframe.embedly-embed");
    if (!iframe) {
      console.warn("No Embedly iframe found in this modal");
      return;
    }

    // Stop the video by removing and restoring the iframe
    const wrapper = iframe.parentElement;
    const html = wrapper.innerHTML;
    wrapper.innerHTML = "";  // Remove iframe to stop video
    setTimeout(() => {
      wrapper.innerHTML = html; // Restore iframe so modal can be reopened
    }, 50);
  }

  // Attach event listeners to all close buttons
  const closeBtns = document.querySelectorAll(".video_modal_close");
  closeBtns.forEach(btn => btn.addEventListener("click", stopVideo));

  // Attach event listeners to all modal backgrounds
  const modalBgs = document.querySelectorAll(".video_modal_bg");
  modalBgs.forEach(bg => bg.addEventListener("click", stopVideo));

});
