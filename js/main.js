/**
 * Gallery carousel – Spojená škola Nižná
 * Vanilla JS, no dependencies. Loaded with `defer`.
 *
 * The track is a scroll-snap container, so it already works by swipe and
 * keyboard alone; the buttons just page it one slide at a time.
 */
(function () {
    "use strict";

    document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
        var track = gallery.querySelector("[data-gallery-track]");
        var prev = gallery.querySelector("[data-gallery-prev]");
        var next = gallery.querySelector("[data-gallery-next]");

        if (!track || !prev || !next) {
            return;
        }

        function step() {
            var first = track.firstElementChild;
            if (!first) {
                return track.clientWidth;
            }
            var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            return first.getBoundingClientRect().width + gap;
        }

        function syncButtons() {
            // 1px tolerance: fractional scroll widths never land exactly on the end.
            var maxScroll = track.scrollWidth - track.clientWidth;
            prev.disabled = track.scrollLeft <= 1;
            next.disabled = track.scrollLeft >= maxScroll - 1;
        }

        prev.addEventListener("click", function () {
            track.scrollBy({ left: -step(), behavior: "smooth" });
        });

        next.addEventListener("click", function () {
            track.scrollBy({ left: step(), behavior: "smooth" });
        });

        track.addEventListener("scroll", syncButtons, { passive: true });
        window.addEventListener("resize", syncButtons);
        syncButtons();
    });
})();
