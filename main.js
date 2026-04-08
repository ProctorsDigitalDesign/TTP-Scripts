document.addEventListener("DOMContentLoaded",function(){
  const e=document.querySelector(".case_study_wrapper"),
        t=new MutationObserver(()=>{
          e.querySelectorAll(".w-dyn-item").length>0&&
            (e.style.opacity="1",t.disconnect())
        });
  t.observe(e,{childList:!0,subtree:!0})
});

const currentYear=(new Date).getFullYear();
$("[data-year]").html(currentYear);

const toggleMenuButton=document.querySelector(".navbar_menu-button");
toggleMenuButton.addEventListener("click",function(){
  document.body.classList.toggle("menu-open")
});

const parentElement=document.querySelector(".navbar_wrap"),
      childElements=document.querySelectorAll(".navbar_menu-dropdown");

function checkVideoDisplay(){
  document.querySelectorAll(".content_img_video").forEach(function(e){
    "flex"===window.getComputedStyle(e).display&&
      e.parentElement.classList.add("has-video")
  })
}

childElements.forEach(function(e){
  e.addEventListener("mouseenter",function(){parentElement.classList.add("menu-active")}),
  e.addEventListener("mouseleave",function(){parentElement.classList.remove("menu-active")})
}),

document.addEventListener("DOMContentLoaded",function(){
  const e=$("body"),t=$(window),n=t.scrollTop();
  n>100&&e.addClass("collapse_header scrolled-header");
  let o=n;
  t.on("scroll",function(e,t){
    let n;
    return function(){
      const o=arguments,r=this;
      n||(e.apply(r,o),n=!0,setTimeout(()=>n=!1,t))
    }
  }(function(){
    const n=t.scrollTop();
    n>o&&n>800?e.addClass("hidden-header"):e.removeClass("hidden-header"),
    n>150?e.addClass("scrolled-header"):e.removeClass("scrolled-header"),
    o=Math.max(n,0)
  },150))
}),

document.addEventListener("DOMContentLoaded",function(){
  setTimeout(()=>{
    if("undefined"!=typeof gsap&&"undefined"!=typeof ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("[parallax-wrapper]").forEach(e=>{
        e.querySelectorAll('[parallax-image="true"]').forEach(t=>{
          gsap.set(t,{yPercent:0}),
          gsap.to(t,{yPercent:12,ease:"none",scrollTrigger:{
            trigger:e,start:"top bottom",end:"bottom top",scrub:!0
          }})
        })
      });

      document.querySelectorAll("[parallax-tint-section]").forEach(e=>{
        const t=e.querySelectorAll("[parallax-tint]"),
              n=e.querySelectorAll("[parallax-tint-alt]");
        t.forEach(t=>{
          gsap.set(t,{yPercent:50,opacity:.75}),
          gsap.to(t,{yPercent:0,ease:"none",scrollTrigger:{
            trigger:e,start:"top 80%",end:"bottom top",scrub:!0
          }})
        }),
        n.forEach(t=>{
          gsap.set(t,{yPercent:-20,opacity:.75}),
          gsap.to(t,{yPercent:-60,ease:"none",scrollTrigger:{
            trigger:e,start:"top 80%",end:"bottom top",scrub:!0
          }})
        })
      });

      document.querySelectorAll("[parallax-hero-section]").forEach(e=>{
        const t=e.querySelectorAll("[hero-tint]");
        console.log(t),
        t.forEach(t=>{
          gsap.set(t,{y:64,opacity:.75}),
          gsap.to(t,{y:-104,ease:"none",scrollTrigger:{
            trigger:e,start:"top top",end:"bottom top",scrub:!0,stagger:1
          }})
        })
      });

      const e=document.querySelectorAll("[scale-image]");
      e&&e.forEach(e=>{
        gsap.set(e,{scale:.9}),
        gsap.to(e,{scale:1,ease:"none",scrollTrigger:{
          trigger:e,start:"top center",end:"top 10%",scrub:!0
        }})
      })
    } else console.error("GSAP or ScrollTrigger is not available")
  },"1600")
}),

window.addEventListener("DOMContentLoaded",e=>{
  function t(e,t){
    const n=typeof e;
    return"string"!=typeof t||""===t.trim()?e:
      "true"===t&&"boolean"===n||(
        "false"!==t||"boolean"!==n)&&(
          isNaN(t)&&"string"===n?t:
            isNaN(t)||"number"!==n?e:+t)
  }
  $("[tr-listsync-element='component']").each(function(e){
    let n=$(this),
        o=n.find("[tr-listsync-element='list']"),
        r=o.children(),
        l=n.find("[tr-listsync-element='button-prev']"),
        s=n.find("[tr-listsync-element='button-next']"),
        c=t(!1,n.attr("tr-listsync-onload")),
        a=t(0,n.attr("tr-listsync-activeindex")),
        i=t("is-active",n.attr("tr-listsync-activeclass"));
    function d(e){
      r.removeClass(i);
      let t=e.index();
      o.each(function(){$(this).children().eq(t).addClass(i)})
    }
    c&&d(r.eq(a)),
    o.each(function(){
      let e=$(this).children(),
          n=t(!0,$(this).attr("tr-listsync-click")),
          o=t(!1,$(this).attr("tr-listsync-hoverin")),
          l=t(!1,$(this).attr("tr-listsync-hoverout"));
      n&&e.on("click",function(){d($(this))}),
      o&&e.on("mouseenter",function(){d($(this))}),
      l&&e.on("mouseleave",function(){r.removeClass(i)})
    }),
    l.on("click",function(){
      o.each(function(e){
        let t=$(this).children(),
            n=t.filter("."+i).removeClass(i).prev();
        0===n.length&&(n=t.last()),n.addClass(i)
      })
    }),
    s.on("click",function(){
      o.each(function(e){
        let t=$(this).children(),
            n=t.filter("."+i).removeClass(i).next();
        0===n.length&&(n=t.first()),n.addClass(i)
      })
    })
  })
}),

$("[tr-search-element='component']").each(function(e){
  let t=$(this),
      n=t.find("[tr-search-element='input']"),
      o=t.find("[tr-search-element='clear']"),
      r=t.find("[tr-search-element='results-wrapper']");
  n.on("input",function(){
    let e=$(this).val();
    e.length
      ?(t.addClass("is-open"),$.ajax({
          url:"/search?query="+e.replaceAll(" ","+"),
          success:function(e){
            let t=$(e).find("[tr-search-element='search-page-results']");
            r.empty(),r.append(t)
          }
        }))
      :t.removeClass("is-open")
  }),
  o.on("click",function(){n.val(""),t.removeClass("is-open")})
}),

checkVideoDisplay(),

document.addEventListener("DOMContentLoaded",function(){
  function e(e){
    const t=e.currentTarget.closest(".video_modal");
    if(!t)return;
    const n=t.querySelector("iframe.embedly-embed");
    if(!n)return void console.warn("No Embedly iframe found in this modal");
    const o=n.parentElement,r=o.innerHTML;
    o.innerHTML="",
    setTimeout(()=>{o.innerHTML=r},50)
  }
  document.querySelectorAll(".video_modal_close").forEach(t=>t.addEventListener("click",e));
  document.querySelectorAll(".video_modal_bg").forEach(t=>t.addEventListener("click",e))
});
