<template>

  <h2>{{ name }}</h2>
  <img :src="imgSrc" @load="onload"><br>
  <img :src="loadImgSrc"><br>

  <button @click="getRandomPerson" id="createButton">Create</button>

</template>

<script>
  export default {

    data(){
      return{
        name: "",
        tempName: "",
        imgSrc: "",
        loadImgSrc: ""
      }
    },

    methods:{
      getRandomPerson(){
        document.getElementById("createButton").disabled=true;
        this.name = "creating another random person";
        this.imgSrc= "";
        this.loadImgSrc = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";

          fetch("https://randomuser.me/api/?inc=name&gender=male&nat=de,fr,gb,dk&noinfo")
                  .then(response => response.json())
                  .then(data => {
                    this.tempName = data.results[0].name.first + " " + data.results[0].name.last;
                    this.imgSrc = `https://robohash.org/${this.tempName.replace(/\s+/g, '')}.png?set=set5&size=256x256&bgset=bg1`;
                  });

      },

      onload(){
        document.getElementById("createButton").disabled=false;
        this.name = this.tempName;
        this.loadImgSrc="";
      }
    }
  }
</script>