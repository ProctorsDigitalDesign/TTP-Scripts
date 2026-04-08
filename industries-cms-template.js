let filtersWrap=document.querySelector(".inline_filters_layout");
window.fsAttributes=window.fsAttributes||[],
window.fsAttributes.push(["cmscombine",e=>{
  console.log("CMS Combine Initialized:",e),
  window.fsAttributes.push(["cmsload",e=>{
    console.log("CMS Load Initialized:",e),
    window.fsAttributes.push(["cmssort",()=>{
      const e=document.querySelector(".fs_cmssort_button");
      e&&e.click()
    }]),
    window.fsAttributes.push(["cmsfilter",e=>{
      console.log("CMS Filter Initialized:",e),
      e.forEach(e=>{
        !function(){
          const t=e.filtersData;
          let o=[];
          t.forEach(function(e){
            e.elements.forEach(function(e){
              let t=e.value,s=e.resultsCount;
              o.push({filterName:t,filterResults:s})
            })
          }),
          o.forEach(function(e){
            Array.from(document.querySelectorAll("[fs-cmsfilter-field]"))
              .filter(function(t){return t.textContent.trim()===e.filterName})
              .forEach(function(t){
                let o=t.parentElement;
                o&&"div"!==o.tagName.toLowerCase()&&(
                  0===e.filterResults
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
  var e=document.getElementById("maxContent"),
      t=document.getElementById("toggleButton"),
      o=document.getElementById("toggleText");
  if(e&&t&&o&&e.scrollHeight>200){
    e.style.maxHeight="200px",
    e.style.overflow="hidden",
    t.style.display="inline-block";
    var s=!1;
    t.addEventListener("click",function(){
      s
        ?(e.style.maxHeight="200px",o.textContent="Show More",t.classList.remove("open"))
        :(e.style.maxHeight=e.scrollHeight+"px",o.textContent="Show Less",t.classList.add("open"));
      s=!s
    })
  }
});

!function(){
  function e(){return window.innerWidth<=991}
  document.addEventListener("click",function(t){
    const o=t.target.closest(".specialism_team_popup"),
          s=t.target.closest(".specialism_team_popup_close");
    if(o&&e()){
      t.preventDefault();
      const e=o.closest(".specialism_team_card");
      if(!e)return;
      const s=e.querySelector(".specialism_team_popup");
      if(!s)return;
      s.classList.add("is-open"),
      o.setAttribute("aria-expanded","true")
    }
    if(s&&e()){
      t.preventDefault();
      const e=s.closest(".specialism_team_popup"),
            o=s.closest(".specialism_team_card");
      if(!e||!o)return;
      const n=o.querySelector(".specialism_team_popup");
      e.classList.remove("is-open"),
      n&&n.setAttribute("aria-expanded","false")
    }
  }),
  window.addEventListener("resize",function(){
    e()||(
      document.querySelectorAll(".specialism_team_popup.is-open")
        .forEach(e=>{e.classList.remove("is-open")}),
      document.querySelectorAll(".specialism_team_popup")
        .forEach(e=>{e.setAttribute("aria-expanded","false")})
    )
  })
}();

document.addEventListener("DOMContentLoaded",function(){
  const e=document.querySelectorAll("#hubspotFormContainer, #hubspotFormContainer2"),
        t=document.querySelectorAll("#hubspotFormFallback, #hubspotFormFallback2");
  e.forEach((e,o)=>{
    const s=t[o];
    if(!s)return;
    const n=setTimeout(()=>{
      e.querySelector("iframe")||(s.style.display="block")
    },3e3);
    window.addEventListener("message",e=>{
      e.data&&"hsFormCallback"===e.data.type&&"onFormReady"===e.data.eventName
        &&(clearTimeout(n),s.style.display="none")
    })
  })
});
