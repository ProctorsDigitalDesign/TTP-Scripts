let filtersWrap=document.querySelector(".inline_filters_layout");
window.fsAttributes=window.fsAttributes||[],
window.fsAttributes.push(["cmscombine",t=>{
  console.log("CMS Combine Initialized:",t),
  window.fsAttributes.push(["cmsload",t=>{
    console.log("CMS Load Initialized:",t),
    window.fsAttributes.push(["cmssort",t=>{
      const e=document.querySelector(".fs_cmssort_button");
      e&&e.click()
    }]),
    window.fsAttributes.push(["cmsfilter",t=>{
      console.log("CMS Filter Initialized:",t),
      t.forEach(t=>{
        !function(){
          const e=t.filtersData;
          let o=[];
          e.forEach(function(t){
            t.elements.forEach(function(t){
              let e=t.value,n=t.resultsCount;
              o.push({filterName:e,filterResults:n})
            })
          }),
          o.forEach(function(t){
            Array.from(document.querySelectorAll("[fs-cmsfilter-field]"))
              .filter(function(e){return e.textContent.trim()===t.filterName})
              .forEach(function(e){
                let o=e.parentElement;
                o&&"div"!==o.tagName.toLowerCase()&&(
                  0===t.filterResults
                    ?o.style.display="none"
                    :(o.style.display="block",o.style.opacity=1,
                      filtersWrap&&(filtersWrap.style.opacity=1))
                )
              })
          })
        }()
      })
    }])
  }])
}]);

document.addEventListener("DOMContentLoaded",function(){
  var t=document.getElementById("maxContent"),
      e=document.getElementById("toggleButton"),
      o=document.getElementById("toggleText");
  if(t&&e&&o&&t.scrollHeight>200){
    t.style.maxHeight="200px",
    t.style.overflow="hidden",
    e.style.display="inline-block";
    var n=!1;
    e.addEventListener("click",function(){
      n
        ?(t.style.maxHeight="200px",o.textContent="Show More",e.classList.remove("open"))
        :(t.style.maxHeight=t.scrollHeight+"px",o.textContent="Show Less",e.classList.add("open"));
      n=!n
    })
  }
  const s=document.getElementById("anchor-bar");
  s&&s.classList.contains("w-condition-invisible")&&
    document.body.classList.add("anchor-hidden");
  const l=document.querySelectorAll("#hubspotFormContainer, #hubspotFormContainer2"),
        i=document.querySelectorAll("#hubspotFormFallback, #hubspotFormFallback2");
  l.forEach((t,e)=>{
    const o=i[e];
    if(!o)return;
    const n=setTimeout(()=>{
      t.querySelector("iframe")||(o.style.display="block")
    },3e3);
    window.addEventListener("message",t=>{
      t.data&&"hsFormCallback"===t.data.type&&"onFormReady"===t.data.eventName&&
        (clearTimeout(n),o.style.display="none")
    })
  })
});
