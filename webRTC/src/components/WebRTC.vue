<template>
    <video ref="myVideo" width="400" height="300" autoplay muted ></video>
    <div v-show="playing">
        <br>
        <!-- <button @click="sepia">Sepia</button>
        <button @click="grayscale">Grayscale</button>
        <button @click="blur">Blur</button> -->

        <input type="radio" id="sepia" name="filter" value="sepia" @change="sepia">
        <label for="sepia">Sepia</label><br>

        <input type="radio" id="grayscaled" name="filter" value="grayscaled" @change="grayscale">
        <label for="grayscaled">Grayscale</label><br>

        <input type="radio" id="blur" name="filter" value="blur" @change="blur">
        <label for="blur">Blur</label><br>

        <input type="radio" id="invert" name="filter" value="invert" @change="invert">
        <label for="invert">Invert</label><br>

        <input type="radio" id="hueRotate" name="filter" value="hueRotate" @change="hueRotate">
        <label for="hueRotate">Hue Rotate</label><br>

        <input type="range" min="1" max="100" class="slider" id="myRange" v-model="rangeVal" @change="changedVal">
        {{ rangeVal }}

        <br><button @click="snapshot">Snapshot</button><br><br>
        <canvas ref="myCanvas" width="400" height="300"></canvas>
    </div>
</template>

<script>
    export default {
        name: "WebRTC",

        data(){
            return{
                playing: false,
                rangeVal: 50,
                currentFilter: '',
            }
        },

        methods: {
            snapshot(){
                if(this.playing){
                  let videoRatio = this.$refs.myVideo.videoWidth/this.$refs.myVideo.videoHeight;
                  let x = 400;
                  let y = 300;
                  let offsetX = 0;
                  let offsetY = 0;
                  if(400/300 < videoRatio){
                    // breiter und weniger hoch
                    y = this.$refs.myVideo.videoHeight * x/this.$refs.myVideo.videoWidth;
                    console.log(y);
                    offsetY = (300 - y)/2;
                  }else{
                    // höher und weniger breit
                    x = this.$refs.myVideo.videoWidth * y/this.$refs.myVideo.videoHeight;
                    offsetX = (400 - x)/2;
                  }
                    this.$refs.myCanvas.getContext('2d').drawImage(this.$refs.myVideo, 0,0,this.$refs.myVideo.videoWidth,this.$refs.myVideo.videoHeight,offsetX, offsetY, x, y);
                    this.$refs.myCanvas.style.filter = this.$refs.myVideo.style.filter;
                }
            },

            grayscale(){
                document.getElementById("myRange").min='1';
                document.getElementById("myRange").max='100';
                document.getElementById("myRange").step = '1';
                this.$refs.myVideo.style.filter = `grayscale(${document.getElementById("myRange").value}%)`;
                this.currentFilter = 'grayscale';
                this.rangeVal = document.getElementById("myRange").value;
            },

            blur(){
                document.getElementById("myRange").min='0.1';
                document.getElementById("myRange").max='5';
                document.getElementById("myRange").step = '0.1';
                this.$refs.myVideo.style.filter = `blur(${document.getElementById("myRange").value}px`;
                this.currentFilter = 'blur';
                this.rangeVal = document.getElementById("myRange").value;
            },

            sepia(){
                document.getElementById("myRange").min='1';
                document.getElementById("myRange").max='100';
                document.getElementById("myRange").step = '1';
                //console.log(`sepia(${document.getElementById("myRange").value}%)`);
                this.$refs.myVideo.style.filter = `sepia(${document.getElementById("myRange").value}%)`;
                this.currentFilter = 'sepia';
                this.rangeVal = document.getElementById("myRange").value;
            },

            invert(){
                document.getElementById("myRange").min='1';
                document.getElementById("myRange").max='100';
                document.getElementById("myRange").step = '1';
                //console.log(`invert(${document.getElementById("myRange").value}%)`);
                this.$refs.myVideo.style.filter = `invert(${document.getElementById("myRange").value}%)`;
                this.currentFilter = 'invert';
                this.rangeVal = document.getElementById("myRange").value;
            },

            hueRotate(){
                document.getElementById("myRange").min='1';
                document.getElementById("myRange").max='360';
                document.getElementById("myRange").step = '1';
                console.log("reached");
                this.$refs.myVideo.style.filter = `hue-rotate(${document.getElementById("myRange").value}deg)`;
                this.currentFilter = 'hueRotate';
                this.rangeVal = document.getElementById("myRange").value;
            },

            changedVal(){
                var current = this.currentFilter;

                if(current === 'grayscale' || current === 'sepia' || current === 'invert') {
                    console.log(current);
                    this.$refs.myVideo.style.filter = `${current}(${document.getElementById("myRange").value}%)`;
                }
                else if(current === 'blur')
                    this.$refs.myVideo.style.filter = `${current}(${document.getElementById("myRange").value}px)`;
                else if(current === 'hueRotate'){
                    this.$refs.myVideo.style.filter = `hue-rotate(${document.getElementById("myRange").value}deg)`;
                }
            }
        },

        mounted(){
            /*navigator.getUserMedia({video: {width:400, height:300}},
                stream => {
                this.$refs.myVideo.srcObject = stream;
                this.playing = true;
                },
                //error => console.log('Camera not available', error)
                () => {
                this.$refs.myVideo.src = "./fallback1.mp4";
                this.$refs.myVideo.loop = true;
                    this.playing = true;
                }
            );*/

            navigator.mediaDevices.getUserMedia({video: {width:400, height:300}})
                .then(stream => {
                    console.log("success");
                    this.$refs.myVideo.srcObject = stream;
                    this.playing = true;
                })
                .catch(() => {
                    console.log("no success");
                    this.$refs.myVideo.src = "./fallback1.mp4";
                    this.$refs.myVideo.loop = true;
                    this.playing = true;
                });
        }
    }
</script>

<style scoped>
    .grayscaled {
        filter: grayscale(100%);
    }

    .sepia {
        filter: sepia(100%);
    }

    .blur {
        filter: blur(3px);
    }
</style>