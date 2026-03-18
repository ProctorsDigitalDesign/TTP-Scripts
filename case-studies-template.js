window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsnest',
  (listInstances) => {
    console.log('cmsload Successfully loaded!');

    const [listInstance] = listInstances;

    listInstance.on('renderitems', (renderedItems) => {
      console.log(renderedItems);
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require('ix2').init();
      document.dispatchEvent(new Event('readystatechange'));
    });
  },
]);

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
