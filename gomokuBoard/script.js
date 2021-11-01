"use strict";
/*
 * MTD280 Online Multimedia
 * http://www.fh-ooe.at/mtd
 *
 * Simple Vue.js 3 Application Template
 *
 */
const DIMENSION = 9;

const app = Vue.createApp({
    data: function() {
        return {
            colorOnTurn : 'black',
            stoneType : 'drawn',
            stonesSet : [],
            message : "",
            gameFinished : false,
        }
	},

    methods: {
        drawBoard: function () {

            //let offsetX, offsetY;

            //let ctx = this.$refs.canvas.getContext('2d');

            // let colSize, rowSize;
            //colSize = this.$refs.canvas.width / DIMENSION;
            //rowSize = this.$refs.canvas.height / DIMENSION;

            //offsetX=this.colSize/2;
            //offsetY=this.rowSize/2;

            let image = new Image();

            image.addEventListener('load', function () {
                // draw bg image
                app.ctx.drawImage(image, 0, 0, app.$refs.canvas.width, app.$refs.canvas.height);

                // draw the lines on the board
                for(let i = 0; i < DIMENSION; i++){
                    // vertical lines
                    app.ctx.moveTo(app.offsetX + i * app.colSize, app.offsetY);
                    app.ctx.lineTo(app.offsetX + i * app.colSize, app.$refs.canvas.height - app.offsetY);

                    // horizontal lines
                    app.ctx.moveTo( app.offsetX, app.offsetY + i * app.rowSize);
                    app.ctx.lineTo( app.$refs.canvas.width - app.offsetX, app.offsetY + i * app.rowSize);
                }

                app.ctx.stroke();
                app.ctx.closePath();

                // if there are already stones on the board, they are drawn in the right stone type
                for(let i = 0; i<DIMENSION; i++){
                    for(let j = 0; j<DIMENSION; j++){
                        if(app.isSet(i,j)){
                            if(app.stoneType === 'drawn'){
                                app.drawnStone(i,j, app.stonesSet[i][j]);

                            } else if(app.stoneType === 'image'){
                                app.imageStone(i,j, app.stonesSet[i][j]);
                            }
                        }
                    }
                }

            }, false);

            image.src = "https://www.cabinetmakerwarehouse.com/wp-content/uploads/7928-castle-oak.jpg";

        },

        clickHandler: function(e) {
            if(!this.gameFinished){
                let x,y;
                x = e.clientX - this.$refs.canvas.offsetLeft;
                y = e.clientY - this.$refs.canvas.offsetTop;

                // console.log(Math.floor(x/this.colSize) + " " + Math.floor(y/this.rowSize));

                // check if there is a stone at this position
                if(!this.isSet(Math.floor(x/this.colSize), Math.floor(y/this.rowSize))){
                    this.message = "";

                    // note that a stone was placed at this position
                    this.setStone(Math.floor(x/this.colSize), Math.floor(y/this.rowSize));

                    if(this.stoneType === 'drawn'){
                        this.drawnStone(Math.floor(x/this.colSize), Math.floor(y/this.rowSize), this.colorOnTurn);

                    } else if(this.stoneType === 'image'){
                        this.imageStone(Math.floor(x/this.colSize), Math.floor(y/this.rowSize), this.colorOnTurn);
                    }


                    if(this.gameEnded()){
                        this.message = "Game ended, " + this.colorOnTurn +" won";
                        this.gameFinished = true;
                    }

                    this.colorOnTurn = this.colorOnTurn === 'black' ? 'white' : 'black';
                }else{
                    this.message = "There is already a stone at this position, try another one!";
                }
            }

        },

        // draws a Stone using the arc function
        drawnStone: function(x,y, color){
            // set the correct color
            this.ctx.fillStyle = color;

            let radius = this.colSize > this.rowSize ? this.rowSize/3 : this.colSize/3;
            let startAngle = 0;
            let endAngle = 2*Math.PI;
            this.ctx.beginPath();
            this.ctx.arc(x*this.colSize + this.offsetX,
                y*this.rowSize + this.offsetY, radius, startAngle, endAngle);
            this.ctx.fill();
        },

        // draws an image at the given position
        imageStone: function(x,y, color){

            let image = new Image();
            let radius = this.colSize > this.rowSize ? this.rowSize/3 : this.colSize/3;

            image.addEventListener('load', function () {
                // draw image
                app.ctx.drawImage(image, x*app.colSize + app.offsetX-radius,
                    y*app.rowSize + app.offsetY-radius, radius*2, radius*2);

            }, false);

            if(color==='black'){
                image.src = 'https://www.pinpng.com/pngs/m/225-2254642_mickeymouse-mickeymouse-face-sticker-cartoons-mickey-mouse-face.png'
            }else{
                image.src = "https://toppng.com/uploads/preview/oofy-head-png-goofy-mickey-mouse-face-11562972764ssdortzhug.png";
            }
        },

        changeStoneSet: function () {
            this.stoneType = this.stoneType === 'drawn' ? 'image' : 'drawn';

            this.drawBoard();


        },
        
        createStonesSetArray: function () {
            for (let i = 0; i < DIMENSION; i++) {
                this.stonesSet[i] = [];
                for (let j = 0; j < DIMENSION; j++) {
                    this.stonesSet[i][j] = false;
                }
            }
        },
        
        setStone: function (row, col) {
            this.stonesSet[row].splice(col, 1, this.colorOnTurn);
        },

        isSet: function(row, col) {
            return (this.stonesSet[row][col] === 'black' || this.stonesSet[row][col] === 'white');
        },

        gameEnded: function () {
            for(let i = 0; i<DIMENSION; i++){
                for(let j = 0; j<DIMENSION; j++){
                    if(app.isSet(i,j)){

                        // check horizontally

                        // count = 1 from the beginning, because the current stone has to be counted as well
                        let count = 1;

                        let k = 1;
                        let lastWasSame = true;
                        while(i+k !== DIMENSION && lastWasSame){
                            if(this.stonesSet[i][j] === this.stonesSet[i+k][j]){
                                count++;
                            }else{
                                lastWasSame = false;
                            }

                            if(count === 5){
                                return true;
                            }
                            k++;
                        }

                        // check vertically

                        count = 1;

                        k = 1;
                        lastWasSame = true;
                        while(j+k !== DIMENSION && lastWasSame){
                            if(this.stonesSet[i][j] === this.stonesSet[i][j+k]){
                                count++;
                            }else{
                                lastWasSame = false;
                            }

                            if(count === 5){
                                return true;
                            }
                            k++;
                        }

                        // check diagonal left top to right bottom

                        count = 1;

                        k = 1;
                        lastWasSame = true;
                        while(i+k !== DIMENSION && j+k !== DIMENSION && lastWasSame){
                            if(this.stonesSet[i][j] === this.stonesSet[i+k][j+k]){
                                count++;
                            }else{
                                lastWasSame = false;
                            }

                            if(count === 5){
                                return true;
                            }
                            k++;
                        }

                        // check diagonal right top to left bottom

                        count = 1;

                        k = 1;
                        lastWasSame = true;
                        while(i-k >= 0 && j+k !== DIMENSION && lastWasSame){
                            console.log(i + " " + k);
                            if(this.stonesSet[i][j] === this.stonesSet[i-k][j+k]){
                                count++;
                            }else{
                                lastWasSame = false;
                            }

                            if(count === 5){
                                return true;
                            }
                            k++;
                        }
                    }
                }
            }
        }

    },

    mounted: function () {

        // variables added here aren't part of the reactive system, can not be used in templates
        this.ctx = this.$refs.canvas.getContext('2d');
        this.colSize = this.$refs.canvas.width / DIMENSION;
        this.rowSize = this.$refs.canvas.height / DIMENSION;
        this.offsetX=this.colSize/2;
        this.offsetY=this.rowSize/2;

        this.drawBoard();
        this.createStonesSetArray();

        console.log(this.stonesSet);
    }
}).mount('#app');
