"use strict";

onmessage = function (e) {
    if (e.data === "start") {
        run();
    } else if (e.data === "stop") {
    } else if (e.data === "reset") {
        n = 1;
        p = 0;
        postMessage("");
    }

}

const X = 100; // send only every Xth prime
let p = 0; // number of primes found
let n = 1; // number to check

function run() {

    let i, isPrime;
    n += 1;
    i = 2;
    isPrime = true;
    while (isPrime && i * i <= n) {
        isPrime = (n % i++ !== 0)
    }

    if (isPrime && ++p % X === 0) {
        postMessage(n);
    } else {
        postMessage("noPrime");
    }

}