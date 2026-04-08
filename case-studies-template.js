window.fsAttributes=window.fsAttributes||[],
window.fsAttributes.push([
  "cmsnest",
  e=>{
    console.log("cmsload Successfully loaded!");

    const[t]=e;

    t.on("renderitems",e=>{
      console.log(e),
      window.Webflow&&window.Webflow.destroy(),
      window.Webflow&&window.Webflow.ready(),
      window.Webflow&&window.Webflow.require("ix2").init(),
      document.dispatchEvent(new Event("readystatechange"))
    })
  }
]);

document.addEventListener("DOMContentLoaded",function(){
  const e=document.querySelectorAll(
      "#hubspotFormContainer, #hubspotFormContainer2"
    ),
    t=document.querySelectorAll(
      "#hubspotFormFallback, #hubspotFormFallback2"
    );

  e.forEach((e,n)=>{
    const o=t[n];
    if(!o)return;

    const d=setTimeout(()=>{
      e.querySelector("iframe")||(o.style.display="block")
    },3e3);

    window.addEventListener("message",e=>{
      e.data&&
      "hsFormCallback"===e.data.type&&
      "onFormReady"===e.data.eventName&&(
        clearTimeout(d),
        o.style.display="none"
      )
    })
  })
});
