document.addEventListener("DOMContentLoaded",function(){
  const e=document.querySelector(".case_study_wrapper"),
    t=new MutationObserver(()=>{
      e.querySelectorAll(".w-dyn-item").length>0&&(e.style.opacity="1",t.disconnect())
    });
  t.observe(e,{childList:!0,subtree:!0})
});

const currentYear=new Date().getFullYear();
$("[data-year]").html(currentYear);

const toggleMenuButton=document.querySelector(".navbar_menu-button");
toggleMenuButton.addEventListener("click",function(){
  document.body.classList.toggle("menu-open")
});

const parentElement=document.querySelector(".navbar_wrap"),
  childElements=document.querySelectorAll(".navbar_menu-dropdown");

childElements.forEach(function(e){
  e.addEventListener("mouseenter",function(){
    parentElement.classList.add("menu-active")
  }),
  e.addEventListener("mouseleave",function(){
    parentElement.classList.remove("menu-active")
  })
});

document.addEventListener("DOMContentLoaded",function(){
  const e=$("body"),
    t=$(window),
    n=t.scrollTop();

  n>100&&e.addClass("collapse_header scrolled-header");

  let o=n;

  function r(e,t){
    let n;
    return function(){
      const o=arguments,r=this;
      n||(e.apply(r,o),n=!0,setTimeout(()=>n=!1,t))
    }
  }

  function c(){
    const n=t.scrollTop();
    n>o&&n>800?e.addClass("hidden-header"):e.removeClass("hidden-header"),
    n>150?e.addClass("scrolled-header"):e.removeClass("scrolled-header"),
    o=Math.max(n,0)
  }

  t.on("scroll",r(c,150))
});

document.addEventListener("DOMContentLoaded",function(){
  setTimeout(()=>{
    if("undefined"!=typeof gsap&&"undefined"!=typeof ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger),

      document.querySelectorAll("[parallax-wrapper]").forEach(e=>{
        e.querySelectorAll('[parallax-image="true"]').forEach(t=>{
          gsap.set(t,{yPercent:0}),
          gsap.to(t,{
            yPercent:12,
            ease:"none",
            scrollTrigger:{
              trigger:e,
              start:"top bottom",
              end:"bottom top",
              scrub:!0
            }
          })
        })
      }),

      document.querySelectorAll("[parallax-tint-section]").forEach(e=>{
        e.querySelectorAll("[parallax-tint]").forEach(t=>{
          gsap.set(t,{yPercent:50,opacity:.75}),
          gsap.to(t,{
            yPercent:0,
            ease:"none",
            scrollTrigger:{
              trigger:e,
              start:"top 80%",
              end:"bottom top",
              scrub:!0
            }
          })
        }),

        e.querySelectorAll("[parallax-tint-alt]").forEach(t=>{
          gsap.set(t,{yPercent:-20,opacity:.75}),
          gsap.to(t,{
            yPercent:-60,
            ease:"none",
            scrollTrigger:{
              trigger:e,
              start:"top 80%",
              end:"bottom top",
              scrub:!0
            }
          })
        })
      }),

      document.querySelectorAll("[parallax-hero-section]").forEach(e=>{
        const t=e.querySelectorAll("[hero-tint]");
        console.log(t),
        t.forEach(t=>{
          gsap.set(t,{y:64,opacity:.75}),
          gsap.to(t,{
            y:-104,
            ease:"none",
            scrollTrigger:{
              trigger:e,
              start:"top top",
              end:"bottom top",
              scrub:!0,
              stagger:1
            }
          })
        })
      });

      const e=document.querySelectorAll("[scale-image]");
      e&&e.forEach(e=>{
        gsap.set(e,{scale:.9}),
        gsap.to(e,{
          scale:1,
          ease:"none",
          scrollTrigger:{
            trigger:e,
            start:"top center",
            end:"top 10%",
            scrub:!0
          }
        })
      })
    }else{
      console.error("GSAP or ScrollTrigger is not available")
    }
  },1600)
});

window.addEventListener("DOMContentLoaded",()=>{
  function e(e,t){
    const n=typeof e;
    return "string"!=typeof t||""===t.trim()
      ?e
      :"true"===t&&"boolean"===n
      ?!0
      :"false"===t&&"boolean"===n
      ?!1
      :isNaN(t)&&"string"===n
      ?t
      :!isNaN(t)&&"number"===n
      ?+t
      :e
  }

  $("[tr-listsync-element='component']").each(function(){
    let t=$(this),
      n=t.find("[tr-listsync-element='list']"),
      o=n.children(),
      r=t.find("[tr-listsync-element='button-prev']"),
      c=t.find("[tr-listsync-element='button-next']"),
      i=e(!1,t.attr("tr-listsync-onload")),
      l=e(0,t.attr("tr-listsync-activeindex")),
      a=e("is-active",t.attr("tr-listsync-activeclass"));

    function s(e){
      o.removeClass(a);
      let t=e.index();
      n.each(function(){
        $(this).children().eq(t).addClass(a)
      })
    }

    i&&s(o.eq(l));

    n.each(function(){
      let t=$(this).children(),
        n=e(!0,$(this).attr("tr-listsync-click")),
        r=e(!1,$(this).attr("tr-listsync-hoverin")),
        c=e(!1,$(this).attr("tr-listsync-hoverout"));

      n&&t.on("click",function(){s($(this))}),
      r&&t.on("mouseenter",function(){s($(this))}),
      c&&t.on("mouseleave",function(){o.removeClass(a)})
    }),

    r.on("click",function(){
      n.each(function(){
        let e=$(this).children(),
          t=e.filter("."+a).removeClass(a),
          n=t.prev();
        0===n.length&&(n=e.last()),
        n.addClass(a)
      })
    }),

    c.on("click",function(){
      n.each(function(){
        let e=$(this).children(),
          t=e.filter("."+a).removeClass(a),
          n=t.next();
        0===n.length&&(n=e.first()),
        n.addClass(a)
      })
    })
  })
});

$("[tr-search-element='component']").each(function(){
  let e=$(this),
    t=e.find("[tr-search-element='input']"),
    n=e.find("[tr-search-element='clear']"),
    o=e.find("[tr-search-element='results-wrapper']");

  t.on("input",function(){
    let n=$(this).val();
    n.length
      ?(
        e.addClass("is-open"),
        $.ajax({
          url:"/search?query="+n.replaceAll(" ","+"),
          success:function(e){
            let t=$(e).find("[tr-search-element='search-page-results']");
            o.empty(),
            o.append(t)
          }
        })
      )
      :e.removeClass("is-open")
  }),

  n.on("click",function(){
    t.val(""),
    e.removeClass("is-open")
  })
});

function checkVideoDisplay(){
  document.querySelectorAll(".content_img_video").forEach(function(e){
    "flex"===window.getComputedStyle(e).display&&
      e.parentElement.classList.add("has-video")
  })
}

checkVideoDisplay();

document.addEventListener("DOMContentLoaded",function(){
  function e(e){
    const t=e.currentTarget.closest(".video_modal");
    if(!t)return;

    const n=t.querySelector("iframe.embedly-embed");
    if(!n)return void console.warn("No Embedly iframe found in this modal");

    const o=n.parentElement,
      r=o.innerHTML;

    o.innerHTML="",
    setTimeout(()=>{
      o.innerHTML=r
    },50)
  }

  document.querySelectorAll(".video_modal_close").forEach(t=>
    t.addEventListener("click",e)
  );

  document.querySelectorAll(".video_modal_bg").forEach(t=>
    t.addEventListener("click",e)
  )
});
