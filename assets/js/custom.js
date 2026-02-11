/*-----------------------------------------------------------------------------------

    Template Name: Boltx

    Note: This is Custom Js file

-----------------------------------------------------------------------------------

    [Table of contents]

      01. mobile-nav
      02. search-box-outer
      03. countTo
      04. accordion-item 
      05. progress
      06. scrollTop
      07. #desktop-menu
      08. c-slider
      09. hero-one-slider
      10. clients-slider
      11. project-slider
      12. latest-projects-slider
      13. hero-three-slider
      14. hero-two-slider
      15. client-reviews-slider
      16. progressbar
      17. progress_bar 

-----------------------------------------------------------------------------------*/

/*-------------------- 01. section selector ----------------------------*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {
      e.preventDefault();

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      // Update URL hash without reload
      history.pushState(null, null, targetId);

      // Smooth scroll
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      document.getElementById("mobile-nav")?.classList.remove("open");
    }
  });
});

jQuery(document).ready(function ($) {
  /*-------------------- 02. mobile-nav ----------------------------*/
  jQuery(".mobile-nav .menu-item-has-children").on("click", function (e) {
    if (jQuery(this).hasClass("active")) {
      jQuery(this).removeClass("active");
    } else {
      jQuery(".mobile-nav .menu-item-has-children").removeClass("active");
      jQuery(this).addClass("active");
    }
  });
  jQuery("#nav-icon4").click(function ($) {
    jQuery("#mobile-nav").toggleClass("open");
  });
  jQuery("#res-cross").click(function ($) {
    jQuery("#mobile-nav").removeClass("open");
  });
  jQuery(".bar-menu").click(function ($) {
    jQuery("#mobile-nav").toggleClass("open");
    jQuery("#mobile-nav").toggleClass("hmburger-menu");
    jQuery("#mobile-nav").show();
  });
  jQuery("#res-cross").click(function ($) {
    jQuery("#mobile-nav").removeClass("open");
  });
});

/*-------------------- 03. countTo ----------------------------*/
$.fn.countTo = function (options) {
  options = options || {};

  return $(this).each(function () {
    var settings = $.extend(
      {},
      $.fn.countTo.defaults,
      {
        from: $(this).data("from"),
        to: $(this).data("to"),
        speed: $(this).data("speed"),
        refreshInterval: $(this).data("refresh-interval"),
        decimals: $(this).data("decimals"),
      },
      options,
    );
    var loops = Math.ceil(settings.speed / settings.refreshInterval),
      increment = (settings.to - settings.from) / loops;

    var self = this,
      $self = $(this),
      loopCount = 0,
      value = settings.from,
      data = $self.data("countTo") || {};

    $self.data("countTo", data);

    if (data.interval) {
      clearInterval(data.interval);
    }
    data.interval = setInterval(updateTimer, settings.refreshInterval);

    render(value);

    function updateTimer() {
      value += increment;
      loopCount++;

      render(value);

      if (typeof settings.onUpdate === "function") {
        settings.onUpdate.call(self, value);
      }

      if (loopCount >= loops) {
        $self.removeData("countTo");
        clearInterval(data.interval);
        value = settings.to;

        if (typeof settings.onComplete === "function") {
          settings.onComplete.call(self, value);
        }
      }
    }

    function render(value) {
      var formattedValue = settings.formatter.call(self, value, settings);
      $self.html(formattedValue);
    }
  });
};

$.fn.countTo.defaults = {
  from: 0,
  to: 0,
  speed: 1000,
  refreshInterval: 100,
  decimals: 0,
  formatter: formatter,
  onUpdate: null,
  onComplete: null,
};

function formatter(value, settings) {
  return value.toFixed(settings.decimals);
}

jQuery(function ($) {
  $(".count-number").data("countToOptions", {
    formatter: function (value, options) {
      return value
        .toFixed(options.decimals)
        .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    },
  });

  $(".timer").each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }
});

/*-------------------- 04. sticky navbar ----------------------------*/
const header = document.querySelector(".sticky");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("fixed");
    document.body.classList.add("header-fixed");
  } else {
    header.classList.remove("fixed");
    document.body.classList.remove("header-fixed");
  }
});

/*-------------------- 05. accordion-item ----------------------------*/

$(".accordion-item .heading").on("click", function (e) {
  e.preventDefault();

  if ($(this).closest(".accordion-item").hasClass("active")) {
    $(".accordion-item").removeClass("active");
  } else {
    $(".accordion-item").removeClass("active");

    $(this).closest(".accordion-item").addClass("active");
  }
  var $content = $(this).next();
  $content.slideToggle(100);
  $(".accordion-item .content").not($content).slideUp("fast");
});

/*-------------------- 06. progress ----------------------------*/
var bars = document.querySelectorAll(".meter > span");

setInterval(function () {
  bars.forEach(function (bar) {
    var getWidth = parseFloat(bar.dataset.progress);

    for (var i = 0; i < getWidth; i++) {
      bar.style.width = i + "%";
    }
  });
}, 700);

/*-------------------- 07. whatsapp button ----------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  var whatsappBtn = document.getElementById("whatsappBtn");

  whatsappBtn.style.opacity = "0";
  whatsappBtn.style.visibility = "hidden";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
      whatsappBtn.style.opacity = "1";
      whatsappBtn.style.visibility = "visible";
    } else {
      whatsappBtn.style.opacity = "0";
      whatsappBtn.style.visibility = "hidden";
    }
  });
});

/*-------------------- 08. scrollTop ----------------------------*/
function inVisible(element) {
  var WindowTop = $(window).scrollTop();
  var WindowBottom = WindowTop + $(window).height();
  var ElementTop = element.offset().top;
  var ElementBottom = ElementTop + element.height();
  if (ElementBottom <= WindowBottom && ElementTop >= WindowTop)
    animate(element);
}

function animate(element) {
  if (!element.hasClass("ms-animated")) {
    var maxval = element.data("max");
    var html = element.html();
    element.addClass("ms-animated");
    $({
      countNum: element.html(),
    }).animate(
      {
        countNum: maxval,
      },
      {
        duration: 5000,
        easing: "linear",
        step: function () {
          element.html(Math.floor(this.countNum) + html);
        },
        complete: function () {
          element.html(this.countNum + html);
        },
      },
    );
  }
}

/*-------------------- 09. #desktop-menu ----------------------------*/

$("#desktop-menu").click(function () {
  $(this).toggleClass("open");
  $(".desktop-menu").toggleClass("open");
});

$(function () {
  $(window).scroll(function () {
    $("h2[data-max]").each(function () {
      inVisible($(this));
    });
  });
});
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#009a4e ${scrollValue}%, #fff ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

/*-------------------- 10. hero-one-slider ----------------------------*/
if (typeof Swiper !== "undefined") {
  var swiper = new Swiper(".hero-one-slider", {
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    freeMode: true,
    effect: "fade",
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /*-------------------- 11. clients-slider ----------------------------*/
  var swiper = new Swiper(".clients-slider", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    freeMode: true,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      10: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });

  /*-------------------- 12. progressbar ----------------------------*/
  {
    function animateElements() {
      $(".progressbar").each(function () {
        var elementPos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        var percent = $(this).find(".circle").attr("data-percent");
        var percentage = parseInt(percent, 10) / parseInt(100, 10);
        var animate = $(this).data("animate");
        if (elementPos < topOfWindow + $(window).height() - 10 && !animate) {
          $(this).data("animate", true);
          $(this)
            .find(".circle")
            .circleProgress({
              startAngle: -Math.PI / 2,
              value: percent / 100,
              size: 180,
              thickness: 10,
              emptyFill: "rgba(250,250,250, .0)",
              fill: {
                color: "#009A4E",
              },
            })
            .on(
              "circle-animation-progress",
              function (event, progress, stepValue) {
                $(this)
                  .find("div")
                  .text((stepValue * 100).toFixed() + "%");
              },
            )
            .stop();
        }
      });
    }

    animateElements();
    $(window).scroll(animateElements);
  }

  /*-------------------- 13. progress_bar ----------------------------*/
  $(document).ready(function () {
    progress_bar();
  });

  function progress_bar() {
    var speed = 30;
    var items = $(".progress_bar").find(".progress_bar_item");

    items.each(function () {
      var item = $(this).find(".progress");
      var itemValue = item.data("progress");
      var i = 0;
      var value = $(this);

      var count = setInterval(function () {
        if (i <= itemValue) {
          var iStr = i.toString();
          item.css({
            width: iStr + "%",
          });
          value.find(".item_value").html(iStr + "%");
        } else {
          clearInterval(count);
        }
        i++;
      }, speed);
    });
  }

  /*-------------------- 14. active nav links ----------------------------*/
  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".bottom-bar");
    const headerHeight = header.offsetHeight;

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
      ".navbar-links a, .footer-menu a, .mobile-menu a",
    );

    function setActiveLink() {
      let scrollPos = window.scrollY + headerHeight + 10;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const headerOffset = document.querySelector(".bottom-bar").offsetHeight;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("mobile-nav").classList.remove("active");
    });
  });
}

