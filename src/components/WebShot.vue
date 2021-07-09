<template>
  <div>
      <button class="webShot" id="shotPage" @click="shotPage">Shot</button>
  </div>
</template>

<script>
import Canvas2Image from "../../node_modules/canvas2image/canvas2image.js";
export default {
    name: "WebShot",
    components:{
        "Canvas2Image": Canvas2Image,
    },
    methods:{

    }
}
</script>

<style>
.webShot {
  border-radius: 5px;
  height: 32px;
  width: 50px;
  position: fixed;
  right: 15px;
  top: 20px;
  color: aliceblue;
  background: #303336;
  border: 1px solid #303336;
  background-size: cover;
  z-index: 6;
  cursor: pointer;
  background-size: 20px;
  text-align: center;
}
</style>