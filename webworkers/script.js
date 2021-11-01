"use strict";
/*
 * MTD280 Online Multimedia
 * http://www.fh-ooe.at/mtd
 *
 * Simple Vue.js 3 Application Template
 *
 */
const KEY = "mtd280.vueExample1.2021"

Vue.createApp({
    data: function () {
        return {}
    },

    methods: {
        startDraw: function () {
            let r, g, b;

            r = ~~(Math.random() * 255); // ~~ == more efficient Math.floor()
            g = ~~(Math.random() * 255);
            b = ~~(Math.random() * 255);

            this.ctx.fillStyle = this.ctx.strokeStyle = 'rgb(' + [r, g, b].join(',') + ')'; // e.g rgb(20,49,123)

            this.drawing = true;

        },

        stopDraw: function () {
            this.drawing = false;
        },

        doDraw: function (e) {
            if (this.drawing) {
                this.ctx.beginPath();
                this.ctx.arc(
                    e.clientX - this.ctx.canvas.offsetLeft,
                    e.clientY - this.ctx.canvas.offsetTop,
                    5,
                    0, Math.PI * 2, true);
                this.ctx.fill();
                this.ctx.closePath();
                console.log("reached");
            }
        },

        buttonClick: function () {

            if (this.$refs.startStopButton.innerHTML === "Start") {
                this.worker.postMessage("start");
            } else if (this.$refs.startStopButton.innerHTML === "Stop") {
                this.worker.postMessage("stop");
            }

            this.$refs.startStopButton.innerHTML = this.$refs.startStopButton.innerHTML === "Start" ? "Stop" : "Start";
        },

        resetClick: function () {
            this.worker.postMessage("reset");
        },

        workerResponse: function (e) {
            if (e.data !== "noPrime") {
                this.primeSpan.innerHTML = e.data;
            }

            if (this.$refs.startStopButton.innerHTML === "Stop") {
                this.worker.postMessage("start");
            }
        }
    },

    mounted: function () {
        this.ctx = this.$refs.draw.getContext('2d');
        this.drawing = false;

        this.primeSpan = this.$refs.prime;

        this.worker = new Worker("theWorker.js"); // SOP!!!
        this.worker.onmessage = this.workerResponse;
        console.log("mounted");
    }
}).mount('#app'); // element is added to the html element with the id 'app'
