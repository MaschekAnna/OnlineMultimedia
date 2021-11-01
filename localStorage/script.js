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
    data: function() {
        return {
		    notesData: [],
            contents: "", // value of the textarea
        }
	},

    methods: {
        saveData: function () {
            this.notesData.push({
                date: new Date().toLocaleString(),
                content: this.contents
            });
            this.contents = "";

            localStorage.setItem(KEY, JSON.stringify(this.notesData));
        },
        clearData: function (){
            localStorage.removeItem(KEY);
            this.notesData = [];
        },
        deleteElement: function (index) {
            this.notesData.splice(index, 1);
            localStorage.setItem(KEY, JSON.stringify(this.notesData));
        }
    },

    // as soon as app gets created, this is called
    created: function() {
        let data = localStorage.getItem(KEY);

        if(data){
            this.notesData = JSON.parse(data);
        }
    }
}).mount('#app'); // element is added to the html element with the id 'app'
