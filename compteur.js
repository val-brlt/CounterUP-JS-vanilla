document.addEventListener("DOMContentLoaded", function () {
    //Start animation on screen
    window.addEventListener("scroll", (e) => {
        if (isScrolledIntoView(counters[0])) {
            countUp();
        }
    });

    var counters = document.getElementsByClassName("counter");

    //Check if an element was in a screen
    function isScrolledIntoView(elem) {
        var docViewTop = this.scrollY;
        var docViewBottom = docViewTop + window.innerHeight;
        var elempos = elem.getBoundingClientRect();
        var elemTop = elempos.top + docViewTop;
        var elemBottom = elemTop + elem.offsetHeight;
        return elemBottom <= docViewBottom;
    }

    //Count up
    function countUp() {
        for (let i = 0; i < counters.length; i++) {
            var ended = counters[i].getAttribute("ended");
            if (ended != "true" && isScrolledIntoView(counters[i])) {
                (function (i) {
                    var countTo = parseFloat(counters[i].getAttribute("data-count")).toFixed(2);
                    var speed = findSpeed(countTo);
                    var decimaleCountTo = String(countTo).split(".")[1];
                    let timer = setInterval(function () {
                        // if number is less than countTo
                        if (parseInt(counters[i].textContent) >= parseInt(countTo)) {
                            // If float, show final decimal
                            if (isFloat(countTo)) counters[i].textContent = parseInt(counters[i].textContent) + "." + decimaleCountTo;
                            clearInterval(timer);
                            counters[i].setAttribute("ended", "true");
                        } else {
                            if (isFloat(countTo)) {
                                // Decimal be in loop from 0 to 99
                                var entier = parseInt(counters[i].textContent) + 1;
                                // If first loop, add a decimal 0 to the number
                                var deci =
                                    counters[i].textContent.split(".")[1] != undefined
                                        ? parseInt(counters[i].textContent.split(".")[1]) + 1
                                        : 0;
                                counters[i].textContent = entier + "." + deci;

                            } else counters[i].textContent = parseFloat(counters[i].textContent) + 1; 
                        }
                    }, speed);
                })(i);
            }

        }
    }

    //Find speed
    function findSpeed(countTo) {
        var speed = 0;
        if (countTo > 100) speed = 1;
        else if (countTo > 10) speed = 50;
        else if (countTo > 1) speed = 60;
        else speed = 50;
        return speed;
    }


    function isFloat(n) {
        return n % 1 !== 0;
    }
});
