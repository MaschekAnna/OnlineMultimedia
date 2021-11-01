"use strict";
/*
 * MTD280 Online Multimedia
 * http://www.fh-ooe.at/mtd
 *
 * Simple Vue.js 3 Application Template
 *
 */

Vue.createApp({
    data() { // simplified object syntax data() statt data: function()
        return {
            text: "",
            messages: [],
            username: "",
            userRegistered: false,
        }
	},

    methods: {
        clickHandler(){
            this.socket.send(this.username + ": " + this.text);
            this.text="";
        },

        joinHandler(){

            this.socket = io.connect("http://localhost:9992");
            this.socket.emit('join', this.username);

            this.socket.on('message', (data) => {
                this.messages.push(data); // this verwendbar wegen lexical binding
            });

            this.user.innerHTML = "You are writing as " + this.username;
            this.userRegistered = true;
        },

        leaveHandler(){
            this.socket.emit('leave', this.username);
            this.socket.disconnect();
            this.userRegistered = false;
            //this.username="";
            this.user.innerHTML = "";
        }
    },

    mounted() {
        this.user = this.$refs.user;

    }
}).mount('#app');
