<template>
  <div>
      <button class="myButton" id= "backHome" @click = "backHome()">{{clcMsg}}</button>
  </div>
</template>

<script>
// import * as Cesium from 'cesium/Cesium'
// import MyEarth from "./components/MyEarth"
export default {
    data: function(){
        return {
            clcMsg: "Home"
        };
    },
    methods:{
            backHome(duration = 2.5) {
            var viewer = MyEarth.viewer;
            var beijingCam = {
            //destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
            destination: Cesium.Cartesian3.fromDegrees(116.41667,39.91667, 200000),
            orientation: {
                heading :  Cesium.Math.toRadians(348.4202942851978),
                pitch : Cesium.Math.toRadians(-89.74026687972041),
                roll : Cesium.Math.toRadians(0)
                },
            duration: duration,
            };
            viewer.camera.flyTo(beijingCam);
        },
    }  

}
</script>

<style>
.myButton{
    border-radius: 5px;
    height: 32px;
    width: 32px;
    position: absolute;
    left: 15px;
    bottom: 6px;
    background: #303336 ;
    border: 1px solid #303336;
    background-size: cover;
    z-index:6;
    cursor:pointer;
  }
</style>