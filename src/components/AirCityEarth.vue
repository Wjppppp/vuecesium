<template>
  <div class="container" id="myContainer">
    <div id="acContainer"></div>
  </div>
</template>

<script>
import acapi from "../../static/ac.min";
export default {
  name: "Player",
  data() {
    return {
      api: null,
      player: null,
    };
  },
  mounted() {
    // console.log("yes, aircity");
    let instanceId = "3232235980-8891-8083-4325";
    this.player = new acapi.AirCityPlayer(instanceId, "acContainer");
    this.api = new acapi.AirCityAPI(
      instanceId,
      {
        onReady: () => {
          //此时可以调用接口了
          
          this.initEarth();
        },
      },
    );
    // let host = acapi.AirCityAPI.getHostFromInstanceId(instanceId);
    // console.log("host , ", host);
  },
  destroyed() {
    this.api.destroy();
    this.player.destroy();
  },

  methods: {
    initEarth() {
      
        this.api.misc.setMainUIVisibility(false);
     
      this.api.camera.get((r) => {
        console.log(`Camera: ${r.x}, ${r.y}, ${r.z}, ${r.pitch}, ${r.yaw}`);
      });

      //this.api.camera.set(-205.144257, -72.030304, 201.338928, -44.999981, 0, 0);
      this.api.camera.set(-94.173843, 45.435562, 93.603394, -33.381557, 12.407498, 0);

      this.api.settings.setMapMode(
        acapi.MapMode.Compass,
        {
          //地图模式相关的参数，具体请参考API帮助文档
          coordType: 0,
          mapPont: [0, 0],
          longitude: 0.0,
          latitude: 0.0,
          //'style': 'http://192.168.1.29:82/B34兴趣点_居名点',
          renderMode: 0,
        },
        () => {
          console.log("设置大地图模式完成");
        }
      );

      this.addTag();
    },
    addTag(){
      this.api.tag.clear();
      let tag1 = new acapi.TagData('tag1');
      tag1.coordinate = [-42.466621, 52.787571, 30];
      //tag1.imagePath = HostConfig.Path + '/images/tag.png';
      tag1.imageSize = [28, 28];
      tag1.text = 'tag1: ' + tag1.coordinate;
      tag1.showLine = true;      
      this.api.tag.add(tag1);
      console.log("tag1:",tag1);
    },
  },
};
</script>

<style scoped>
/* .container {
  width: 100%;
  height: 100vh;
}
#acContainer {
  width: 100%;
  height: 100vh;
} */
</style>