let filtersWrap = document.querySelector('.inline_filters_layout');

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmscombine',
  (combineInstances) => {
    console.log('CMS Combine Initialized:', combineInstances);

    window.fsAttributes.push([
      'cmsload',
      (loadInstances) => {
        console.log('CMS Load Initialized:', loadInstances);

        window.fsAttributes.push([
          'cmssort',
          () => {
            const sortButton = document.querySelector('.fs_cmssort_button');
            if (sortButton) sortButton.click();
          }
        ]);

        window.fsAttributes.push([
          'cmsfilter',
          (filterInstances) => {
            console.log('CMS Filter Initialized:', filterInstances);

            filterInstances.forEach((filterInstance) => {
              function hideEmptyFilters() {
                const filtersData = filterInstance.filtersData;
                let resultsArray = [];

                filtersData.forEach(function (element) {
                  const elements = element.elements;
                  elements.forEach(function (element) {
                    let filterValue = element.value;
                    let resultsNumber = element.resultsCount;
                    resultsArray.push({
                      filterName: filterValue,
                      filterResults: resultsNumber
                    });
                  });
                });

                resultsArray.forEach(function (filter) {
                  let elements = Array.from(
                    document.querySelectorAll('[fs-cmsfilter-field]')
                  ).filter(function (element) {
                    return element.textContent.trim() === filter.filterName;
                  });

                  elements.forEach(function (element) {
                    let parentElement = element.parentElement;

                    if (parentElement && parentElement.tagName.toLowerCase() !== 'div') {
                      if (filter.filterResults === 0) {
                        parentElement.style.display = 'none';
                      } else {
                        parentElement.style.display = 'block';
                        parentElement.style.opacity = 1;
                        if (filtersWrap) filtersWrap.style.opacity = 1;
                      }
                    }
                  });
                });
              }

              hideEmptyFilters();
            });
          },
        ]);
      },
    ]);
  },
]);

document.addEventListener('DOMContentLoaded', function() {
  var contentDiv = document.getElementById('maxContent');
  var toggleButton = document.getElementById('toggleButton');
  var toggleText = document.getElementById('toggleText');
  var maxHeight = 200;

  if (contentDiv && toggleButton && toggleText && contentDiv.scrollHeight > maxHeight) {
    contentDiv.style.maxHeight = maxHeight + 'px';
    contentDiv.style.overflow = 'hidden';
    toggleButton.style.display = 'inline-block';

    var isExpanded = false;

    toggleButton.addEventListener('click', function() {
      if (isExpanded) {
        contentDiv.style.maxHeight = maxHeight + 'px';
        toggleText.textContent = 'Show More';
        toggleButton.classList.remove('open');
      } else {
        contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
        toggleText.textContent = 'Show Less';
        toggleButton.classList.add('open');
      }
      isExpanded = !isExpanded;
    });
  }
});

(function () {
  const BREAKPOINT = 991;

  function isMobile() {
    return window.innerWidth <= BREAKPOINT;
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.specialism_team_popup');
    const closeBtn = e.target.closest('.specialism_team_popup_close');

    if (trigger && isMobile()) {
      e.preventDefault();

      const card = trigger.closest('.specialism_team_card');
      if (!card) return;

      const tooltip = card.querySelector('.specialism_team_popup');
      if (!tooltip) return;

      tooltip.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    if (closeBtn && isMobile()) {
      e.preventDefault();

      const tooltip = closeBtn.closest('.specialism_team_popup');
      const card = closeBtn.closest('.specialism_team_card');
      if (!tooltip || !card) return;

      const triggerEl = card.querySelector('.specialism_team_popup');
      tooltip.classList.remove('is-open');

      if (triggerEl) {
        triggerEl.setAttribute('aria-expanded', 'false');
      }
    }
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      document.querySelectorAll('.specialism_team_popup.is-open').forEach(el => {
        el.classList.remove('is-open');
      });

      document.querySelectorAll('.specialism_team_popup').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();

document.addEventListener("DOMContentLoaded", function() {
  const containers = document.querySelectorAll('#hubspotFormContainer, #hubspotFormContainer2');
  const fallbacks  = document.querySelectorAll('#hubspotFormFallback, #hubspotFormFallback2');

  containers.forEach((container, index) => {
    const fallback = fallbacks[index];
    if (!fallback) return;

    const timeout = setTimeout(() => {
      const iframe = container.querySelector('iframe');
      if (!iframe) {
        fallback.style.display = 'block';
      }
    }, 3000);

    window.addEventListener('message', (event) => {
      if (
        event.data &&
        event.data.type === 'hsFormCallback' &&
        event.data.eventName === 'onFormReady'
      ) {
        clearTimeout(timeout);
        fallback.style.display = 'none';
      }
    });
  });
});
