let filtersWrap=document.querySelector(".inline_filters_layout");

window.fsAttributes=window.fsAttributes||[],
window.fsAttributes.push([
  "cmscombine",
  e=>{
    console.log("CMS Combine Initialized:",e),

    window.fsAttributes.push([
      "cmsload",
      e=>{
        console.log("CMS Load Initialized:",e),

        window.fsAttributes.push([
          "cmssort",
          e=>{
            const t=document.querySelector(".fs_cmssort_button");
            t&&t.click()
          }
        ]),

        window.fsAttributes.push([
          "cmsfilter",
          e=>{
            console.log("CMS Filter Initialized:",e),

            e.forEach(e=>{
              function t(){
                const t=e.filtersData;
                let n=[];

                t.forEach(function(e){
                  const t=e.elements;
                  t.forEach(function(e){
                    let t=e.value,o=e.resultsCount;
                    n.push({
                      filterName:t,
                      filterResults:o
                    })
                  })
                }),

                n.forEach(function(e){
                  let t=Array.from(
                    document.querySelectorAll("[fs-cmsfilter-field]")
                  ).filter(function(t){
                    return t.textContent.trim()===e.filterName
                  });

                  t.forEach(function(t){
                    let n=t.parentElement;

                    n&&"div"!==n.tagName.toLowerCase()&&(
                      0===e.filterResults
                        ?n.style.display="none"
                        :(n.style.display="block",
                          n.style.opacity=1,
                          filtersWrap&&(filtersWrap.style.opacity=1))
                    )
                  })
                })
              }

              t()
            })
          }
        ])
      }
    ])
  }
]);

document.addEventListener("DOMContentLoaded",function(){
  var e=document.getElementById("maxContent"),
    t=document.getElementById("toggleButton"),
    n=document.getElementById("toggleText"),
    o=200;

  if(e&&t&&n&&e.scrollHeight>o){
    e.style.maxHeight=o+"px",
    e.style.overflow="hidden",
    t.style.display="inline-block";

    var i=!1;

    t.addEventListener("click",function(){
      i
        ?(e.style.maxHeight=o+"px",
          n.textContent="Show More",
          t.classList.remove("open"))
        :(e.style.maxHeight=e.scrollHeight+"px",
          n.textContent="Show Less",
          t.classList.add("open")),
      i=!i
    })
  }

  const l=document.getElementById("anchor-bar");
  l&&l.classList.contains("w-condition-invisible")&&
    document.body.classList.add("anchor-hidden");

  const c=document.querySelectorAll(
      "#hubspotFormContainer, #hubspotFormContainer2"
    ),
    r=document.querySelectorAll(
      "#hubspotFormFallback, #hubspotFormFallback2"
    );

  c.forEach((e,t)=>{
    const n=r[t];
    if(!n)return;

    const o=setTimeout(()=>{
      e.querySelector("iframe")||(n.style.display="block")
    },3e3);

    window.addEventListener("message",e=>{
      e.data&&
      "hsFormCallback"===e.data.type&&
      "onFormReady"===e.data.eventName&&(
        clearTimeout(o),
        n.style.display="none"
      )
    })
  })
});
