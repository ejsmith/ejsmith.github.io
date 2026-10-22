(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hello, fellow nerd.
  if (window.console && console.log) {
    console.log(
      "%c// hey, fellow builder 👋%c\nYou're reading the console, so we'd probably get along.\nSource: https://github.com/ejsmith/ejsmith.github.io\nSay hi: the email link at the bottom of the page works.",
      "color:#ff7a4d;font:600 14px ui-monospace,monospace",
      "color:inherit;font:12px ui-monospace,monospace"
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Email addresses are stored encoded so scrapers reading raw HTML can't harvest them.
    document.querySelectorAll("[data-email]").forEach(function (el) {
      var address = el.dataset.email.replace(/[a-z]/gi, function (c) {
        var base = c <= "Z" ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
      }).split("").reverse().join("");
      el.href = "mailto:" + address;
      el.textContent = address;
    });

    // Header border once the page scrolls
    var header = document.querySelector(".site-header");
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal sections and the chart as they scroll into view
    // On small screens the chart's right-hand labels become unreadable, so crop them and show the HTML legend instead.
    var fanSvg = document.querySelector(".fan svg");
    if (fanSvg) {
      var narrow = window.matchMedia("(max-width: 600px)");
      var fitFan = function () { fanSvg.setAttribute("viewBox", narrow.matches ? "36 0 356 340" : "0 0 560 340"); };
      fitFan();
      if (narrow.addEventListener) narrow.addEventListener("change", fitFan);
    }

    var revealTargets = document.querySelectorAll(".section .wrap > *, .fan");
    revealTargets.forEach(function (el) {
      if (!el.classList.contains("fan")) el.classList.add("reveal");
    });

    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add("is-in"); });
    }

  });
})();
