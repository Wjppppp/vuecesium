<template>
  <div class="container" ref="myContainer" id="myContainer">
    
    <div >
      <router-view id="acContainer" v-show="isShowAirCity"></router-view>
    </div>
    <div id="tdtContainer" v-show="isShowCesium"></div>

    <!-- <div class="myButton"> -->
    <div id="buttonGroup">
      <button class="myButton" id="backHome" @click="backHome">Home</button>
      <button class="myButton" id="zoomIn" @click="zoomIn">+</button>
      <button class="myButton" id="zoomOut" @click="zoomOut">-</button>
      <button class="myButton" id="airCity" @click="airCity">Air</button>
    </div>
    <div>
      <button class="webShot" id="shotPage" @click="shotPage" >Shot</button>
    </div>
    <div>
      <!-- <WebShot></WebShot> -->
    </div>

    <div class="myBasemap">
      <input
        type="checkbox"
        v-model="picked"
        id="天地图影像图"
        value="tdtYX"
        @click="yxClc"
      />
      <label for="tdtYX">Img</label>
      <br />
      <input
        type="checkbox"
        v-model="picked"
        id="天地图矢量图"
        value="tdtSL"
        @click="slCLc"
      />
      <label for="tdtSL">Vec</label>
      <br />
      <input
        type="checkbox"
        v-model="picked"
        id="天地图地形图"
        value="tdtDX"
        @click="dxClc"
      />
      <label for="tdtDX">Terr</label>
      <br />
      <input
        type="checkbox"
        v-model="gzKml"
        id="gzKml"
        value="gzKml"
        @click="kmlClc"
      />
      <label for="kml">Kml</label>
      <br />
      <!-- <input
        type="checkbox"
        v-model="nhzd"
        id="nhzd"
        value="nhzd"
        @click="nhzdClc"
      />
      <label for="nhzd">Nhzd</label>
      <br /> -->
    </div>
    <!-- </div> -->
  </div>
</template>
 
<script>
import * as Cesium from "cesium/Cesium";
//import kmlDataSource from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
// import WebShot from "./WebShot"
// import Canvas2Image from "canvas2image";
// import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

export default {
  name: "earth",
  data() {
    return {
      // tdtYXpicked : "",
      // tdtDXpicked : "",
      // tdtSLpicked : "",
      isShowCesium: true,
      isShowAirCity: false,
      picked: ["tdtYX", "tdtDX"],
      gzKml: [""],
      // nhzd:[""],
    };
  },
  components: {
    // 'WebShot': WebShot,
    // Canvas2Image: Canvas2Image,
    // html2canvas: html2canvas,
  },
  created() {
    // this.initEarth();
  },
  mounted() {
    this.initEarth();
  }, //mounted(){}

  methods: {
    backHome: function () {
      this.backHome();
    },
    zoomIn: function () {
      this.zoom("In");
    },
    zoomOut: function () {
      this.zoom("Out");
    },
    airCity: function () {
      this.goAirCity();
    },

    yxClc: function () {
      //console.log(this.picked[0], this.picked[1], this.picked[2]);
      if (this.picked.includes("tdtYX")) {
        //this.viewer.imageryLayers.get(0).show = true;
        this.closeBasemap(0);
      } else if (!this.picked.includes("tdtYX")) {
        //this.viewer.imageryLayers.get(0).show = false;
        this.openBasemap(0);
      }
    },
    slCLc: function () {
      //console.log(this.picked[0], this.picked[1], this.picked[2]);
      if (this.picked.includes("tdtSL")) {
        //this.viewer.imageryLayers.get(1).show = true;
        this.closeBasemap(1);
      } else if (!this.picked.includes("tdtSL")) {
        //this.viewer.imageryLayers.get(1).show = false;
        this.openBasemap(1);
      }
    },

    dxClc: function () {
      //console.log(this.picked[0], this.picked[1], this.picked[2]);
      if (this.picked.includes("tdtDX")) {
        //this.viewer.imageryLayers.get(2).show = true;
        this.closeTerr();
      } else {
        //this.viewer.imageryLayers.get(2).show = false;
        this.openTerr();
      }
    },

    kmlClc: function () {
      //console.log("Kml yes");
      //this.openKml();
      if (this.gzKml.includes("gzKml")) {
        //this.viewer.imageryLayers.get(2).show = true;
        this.closeKml();
      } else {
        //this.viewer.imageryLayers.get(2).show = false;
        this.openKml();
      }
    },

    shotPage: function () {
      this.shotWebPage();

      //   var loadImg = document.createElement('a')
    },

    initEarth() {
      setTimeout(() => {
        var viewer = this.viewer;
        var tdtTk = "9d507b03bb629e0c40c2848fb2d18ab4";
        // 服务域名
        var tdtUrl = "https://t{s}.tianditu.gov.cn/";
        // 服务负载子域
        var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
        //let viewer = new Cesium.Viewer("cesiumContainer");
        viewer = new Cesium.Viewer("tdtContainer", {
          animation: false, //动画
          homeButton: false, //home键
          geocoder: false, //地址编码
          baseLayerPicker: false, //图层选择控件
          timeline: false, //时间轴
          fullscreenButton: true, //全屏显示
          infoBox: true, //点击要素之后浮窗
          sceneModePicker: false, //投影方式  三维/二维
          navigationInstructionsInitiallyVisible: false, //导航指令
          navigationHelpButton: false, //帮助信息
          selectionIndicator: false, // 选择
          contextOptions: {
            //截图所需初始化
            webgl: {
              alpha: true,
              depth: true,
              stencil: true,
              antialias: true,
              premultipliedAlpha: true,
              //通过canvas.toDataURL()实现截图需要将该项设置为true
              preserveDrawingBuffer: true,
              failIfMajorPerformanceCaveat: true,
            },
          },

          imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            //影像底图
            url:
              "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
              tdtTk,
            subdomains: subdomains,
            layer: "tdtImgLayer",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible", //使用谷歌的瓦片切片方式
            show: true,
          }),
          //添加地形
          terrainProvider: new Cesium.CesiumTerrainProvider({
            url: "https://lab.earthsdk.com/terrain/577fd5b0ac1f11e99dbd8fd044883638",
            requestWaterMask: true,
            requestVertexNormals: true,
          }),
        });

        // 相机缩放范围
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 270; //相机的高度的最小值
        viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000; //相机高度的最大值
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏cesium ion
        //添加矢量
        viewer.imageryLayers.addImageryProvider(
          new Cesium.UrlTemplateImageryProvider({
            url: tdtUrl + "DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" + tdtTk,
            subdomains: subdomains,
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            layer: "tdtImgLayer",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible", //使用谷歌的瓦片切片方式
            show: true,
          })
        );
        // console.log(viewer);
        viewer.imageryLayers.get(1).show = false;

        viewer.imageryLayers.addImageryProvider(
          new Cesium.WebMapTileServiceImageryProvider({
            //影像注记
            url:
              "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
              tdtTk,
            subdomains: subdomains,
            layer: "tdtCiaLayer",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible",
            show: true,
          })
        );
        // 叠加国界服务
        var iboMap = new Cesium.UrlTemplateImageryProvider({
          url: tdtUrl + "DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=" + tdtTk,
          subdomains: subdomains,
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          maximumLevel: 10,
        });
        viewer.imageryLayers.addImageryProvider(iboMap);

        //定位到北京
        var beijingCam = {
          //destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
          destination: Cesium.Cartesian3.fromDegrees(
            116.41667,
            39.91667,
            200000
          ),
          orientation: {
            heading: Cesium.Math.toRadians(348.4202942851978),
            pitch: Cesium.Math.toRadians(-89.74026687972041),
            roll: Cesium.Math.toRadians(0),
          },
          duration: 2.5,
        };
        //定位到广州
        var gzCam = {
          //destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
          destination: Cesium.Cartesian3.fromDegrees(
            113.2592945,
            23.130196,
            100000
          ),
          orientation: {
            heading: Cesium.Math.toRadians(348.4202942851978),
            pitch: Cesium.Math.toRadians(-89.74026687972041),
            roll: Cesium.Math.toRadians(0),
          },
          duration: 2.5,
        };
        var homeCam = gzCam;
        viewer.camera.setView(homeCam);

        //二次视角跳跃
        //viewer.camera.flyTo(beijingCam);
        // chinaCam.complete = function () {
        //     setTimeout(function(){
        //         viewer.camera.flyTo(gouQiCam);
        //     });
        // }
        // viewer.camera.flyTo(chinaCam);

        //console.log(scene);

        //Home按钮
        this.backHome = function () {
          var gzCam = {
            //destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
            destination: Cesium.Cartesian3.fromDegrees(
              113.2592945,
              23.130196,
              100000
            ),
            orientation: {
              heading: Cesium.Math.toRadians(348.4202942851978),
              pitch: Cesium.Math.toRadians(-89.74026687972041),
              roll: Cesium.Math.toRadians(0),
            },
            duration: 2.5,
          };
          var homeCam = gzCam;
          viewer.camera.flyTo(homeCam);
          //console.log(viewer);
        };
        //放缩按钮
        this.zoom = function (a) {
          //获取相机笛卡尔坐标
          let cameraPos = viewer.camera.position;
          //获取场景椭球模型
          let ellipsoid = viewer.scene.globe.ellipsoid,
            //笛卡尔坐标转经纬度坐标
            cartographic = ellipsoid.cartesianToCartographic(cameraPos),
            height = cartographic.height,
            centerLon = parseFloat(
              Cesium.Math.toDegrees(cartographic.longitude).toFixed(8)
            ),
            centerLat = parseFloat(
              Cesium.Math.toDegrees(cartographic.latitude).toFixed(8)
            );
          if (a === "In") {
            viewer.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(
                centerLon,
                centerLat,
                height / 1.8
              ),
              duration: 1.0,
            });
          } else if (a === "Out") {
            viewer.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(
                centerLon,
                centerLat,
                height * 1.8
              ),
              duration: 1.0,
            });
          }
        };

        // 切换地图API
        this.goAirCity = function () {
          console.log("go aircity");
          this.isShowCesium = !this.isShowCesium;
          this.isShowAirCity = !this.isShowAirCity;
          if(this.isShowAirCity){
            document.getElementsByClassName("myBasemap")[0].style.display = "none";
            //this.$refs.isButtonShow.style.display = "none";
          }else{
            document.getElementsByClassName("myBasemap")[0].style.display = "";
            //this.$refs.isButtonShow.style.display = "";
          }          
          this.$router.push({ path: "aircity" });
        };

        //打开关闭影像图层
        // let closeAllBasemap = function(){
        //   viewer.imageryLayers.get(0).show = false;
        //   viewer.imageryLayers.get(1).show = false;
        //   viewer.imageryLayers.get(2).show = false;
        // }
        this.openBasemap = function (i) {
          //closeAllBasemap();
          viewer.imageryLayers.get(i).show = true;
          viewer.imageryLayers.get(2).show = true;
          //viewer.imageryLayers.get(2).show = true;
        };
        this.closeBasemap = function (i) {
          //closeAllBasemap();
          viewer.imageryLayers.get(i).show = false;
          if (
            !viewer.imageryLayers.get(0).show &&
            !viewer.imageryLayers.get(1).show
          ) {
            //console.log("none");
            viewer.imageryLayers.get(2).show = false;
          }
        };
        this.openTerr = function () {
          viewer.scene.terrainProvider = new Cesium.CesiumTerrainProvider({
            url: "https://lab.earthsdk.com/terrain/577fd5b0ac1f11e99dbd8fd044883638",
            requestWaterMask: true,
            requestVertexNormals: true,
          });
        };
        this.closeTerr = function () {
          viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider(
            {}
          );
          //console.log(scene);
        };

        function kmlShowLabel(entity, property = entity.name) {
          if (Cesium.defined(property)) {
            entity.position = polygonCenter(entity);
            entity.label = {
              text: property,
              //showBackground: true, // 文字后是否显示背景
              fillColor: Cesium.Color.WHITE, // 字体颜色
              outlineWidth: 2,
              outlineColor: Cesium.Color.DARKORANGE,

              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              // backgroundColor:Cesium.Color.AQUA, // 背景颜色
              //scale: 0.4,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.TOP,
            };
            entity.label.scaleByDistance = new Cesium.NearFarScalar(
              1.5e2,
              0.6,
              8.0e6,
              0
            );

            return true;
          } else {
            console.log("Label error!");
            return false;
          }
        }

        //加载kml
        this.openKml = function () {
          //读取kml文件路径
          var kmlSource = "./static/广州.kml";
          var kmlOptions = {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
            clampToGround: true,
          };
          var geocachePromise = Cesium.KmlDataSource.load(
            kmlSource,
            kmlOptions
          );
          geocachePromise.then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            // console.log(dataSource);

            let entities = dataSource.entities.values;

            for (let i = 0; i < entities.length; i++) {
              let entity = entities[i];
              entity.kmlEntity = true;
              //console.log(entity);
              if (Cesium.defined(entity.polygon)) {
                //  console.log(entity.ExtendedData);
                if (
                  !Cesium.defined(entity.polygon.fill) ||
                  entity.polygon.fill == 0
                ) {
                  entity.polygon.fill = 1;
                  entity.polygon.material = new Cesium.Color(
                    0.0,
                    0.0,
                    0.0,
                    0.0
                  );
                }
                //设置轮廓线
                let lineWidth, lineColor;
                if (Cesium.defined(entity.polygon.outlineWidth)) {
                  lineWidth = entity.polygon.outlineWidth.getValue(
                    Cesium.JulianDate.now()
                  );
                } else {
                  lineWidth = 1;
                }
                //console.log(entity.polygon.outlineColor)
                if (Cesium.defined(entity.polygon.outlineColor)) {
                  lineColor = entity.polygon.outlineColor.getValue(
                    Cesium.JulianDate.now()
                  );
                } else {
                  lineColor = Cesium.Color.WHITE;
                }
                // console.log(lineWidth);
                // console.log(lineColor);
                entity.polyline = {
                  positions: entity.polygon.hierarchy._value.positions,
                  width: lineWidth,
                  material: lineColor,
                };
                //显示指定字段的标签 kmlShowLabel(entity, property = entity.name)
                kmlShowLabel(entity, entity.name);
              }
            }

            //鼠标移动事件
            let pickedEntity, oldEntity, oldEntityMaterial;
            let labelEntity = viewer.entities.add({
              label: {
                show: false,
                showBackground: true,
                font: "30px monospace",
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, 0),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.6, 8.0e6, 0),
                //eyeOffset : new Cartesian3(0.0, 800.0, 0.0),
              },
            });
            labelEntity.kmlLabelEntity = true;

            viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
              movement
            ) {
              let newPicked;
              //let labelEntity;

              //选中后的颜色属性
              let pickedColor = new Cesium.Color(1.0, 1.0, 0.0, 0.2);
              //鼠标位置
              newPicked = viewer.scene.pick(movement.endPosition);

              if (!Cesium.defined(newPicked)) {
                //未选中
                //console.log("2")
                if (Cesium.defined(oldEntity)) {
                  //从实体移出
                  pickedEntity.polygon.material = oldEntityMaterial;
                  //console.log("just move out")
                }
                oldEntity = undefined;
                pickedEntity = undefined;
                labelEntity.label.show = false;
                // viewer.entities.remove(labelEntity);
                return;
              } else {
                //选中
                if (
                  Cesium.defined(newPicked.id.polygon) &&
                  Cesium.defined(newPicked.id.kmlEntity)
                ) {
                  //如果选中为多边形Entity
                  if (!Cesium.defined(oldEntity)) {
                    //第一次选中
                    //高亮polygon
                    pickedEntity = newPicked.id;
                    oldEntity = newPicked.id;
                    oldEntityMaterial = oldEntity.polygon.material;
                    pickedEntity.polygon.material = pickedColor;
                    console.log("new picked:", pickedEntity);

                    // let labelPosition = viewer.scene.pickPosition(
                    //   movement.endPosition
                    // );
                    //弹出标签
                    let labelPosition = polygonCenter(pickedEntity);
                    labelEntity.position = labelPosition;
                    if(Cesium.defined(pickedEntity.name))
                    {
                      labelEntity.label.text = "name: " + pickedEntity.name;
                    }else{
                      labelEntity.label.text = "";
                    }                    
                    
                    if((Object.keys(pickedEntity.kml.extendedData).length))
                    {
                      labelEntity.label.text += "\n";
                      console.log(pickedEntity.kml.extendedData);
                      // console.log(pickedEntity.kml.extendedData);
                      for(let key in pickedEntity.kml.extendedData){
                        console.log(key);
                        console.log(pickedEntity.kml.extendedData[key].value);
                        labelEntity.label.text += key + ": " + pickedEntity.kml.extendedData[key].value +"\n";
                      }
                    } else if (labelEntity.label.text == "") {
                       labelEntity.label.text += "no infomation";
                    }
                        
                    labelEntity.label.show = true;
                    //labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, -cartographic.height * (viewer.scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : 1.0));
                  } else if (newPicked.id == oldEntity) {
                    //在同一实体中移动
                    //console.log("same");
                    return;
                  } else {
                    //移入其他kml实体
                    //高亮polygon
                    pickedEntity.polygon.material = oldEntityMaterial;
                    pickedEntity = newPicked.id;
                    oldEntity = newPicked.id;
                    oldEntityMaterial = oldEntity.polygon.material;
                    pickedEntity.polygon.material = pickedColor;
                    //弹出标签
                    //labelEntity.label.show = false;
                    let labelPosition = polygonCenter(pickedEntity);
                    labelEntity.position = labelPosition;

                    if(Cesium.defined(pickedEntity.name))
                    {
                      labelEntity.label.text = "name: " + pickedEntity.name;
                    }else{
                      labelEntity.label.text = "";
                    }                    
                    
                    if((Object.keys(pickedEntity.kml.extendedData).length))
                    {
                      labelEntity.label.text += "\n";
                      console.log(pickedEntity.kml.extendedData);
                      // console.log(pickedEntity.kml.extendedData);
                      for(let key in pickedEntity.kml.extendedData){
                        console.log(key);
                        console.log(pickedEntity.kml.extendedData[key].value);
                        labelEntity.label.text += key + ": " + pickedEntity.kml.extendedData[key].value + "\n";
                      }
                    } else if (labelEntity.label.text == "") {
                       labelEntity.label.text += "no infomation";
                    }
                    //labelEntity.label.text = pickedEntity.name + "\n123";
                    //labelEntity.label.show = true;

                    console.log("change picked:", pickedEntity);
                  }
                } else if (Cesium.defined(newPicked.id.kmlLabelEntity)) {
                  //移入标签
                  return;
                } else if (Cesium.defined(pickedEntity)) {
                  // 移出kml实体
                  pickedEntity.polygon.material = oldEntityMaterial;
                  oldEntity = undefined;
                  pickedEntity = undefined;
                  labelEntity.label.show = false;
                  return;
                } else {
                  return;
                }
              }
            },
            Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          });
        };

        function polygonCenter(pickedEntity) {
          let polyPositions = pickedEntity.polygon.hierarchy.getValue(
            Cesium.JulianDate.now()
          ).positions;
          // console.log(polyPositions);
          let sumX = 0,
            sumY = 0,
            sumZ = 0;
          for (let i = 0; i < polyPositions.length; i++) {
            sumX += polyPositions[i].x;
            sumY += polyPositions[i].y;
            sumZ += polyPositions[i].z;
          }
          let polyCenter = new Cesium.Cartesian3(
            sumX / polyPositions.length,
            sumY / polyPositions.length,
            sumZ / polyPositions.length
          );
          return polyCenter;
        }

        this.closeKml = function () {
          //console.log("closeKml, yes");
          viewer.dataSources.removeAll();
        };

        //截图
        this.shotWebPage = function () {
          //var mycanvas;
          //截取带有图例的影像
          console.log(this);
          // let canvasID = this.$refs.myContainer;
          let canvasID = document.getElementById("myContainer");
          console.log(canvasID);
          console.log(canvasID.offsetWidth, canvasID.offsetHeight);

          domtoimage
            .toPng(canvasID)
            .then(function (dataUrl) {
              var testimg = new Image();
              testimg.src = dataUrl;
              //document.body.appendChild(testimg);
              var save_link = document.createElement("a");
              console.log(testimg.src);
              save_link.href = testimg.src;
              save_link.download = "testimg";
              var event = new MouseEvent("click");
              save_link.dispatchEvent(event);
              alert("save success!");
            })
            .catch(function (error) {
              console.error("oops, something went wrong!", error);
            });
        };
      }, 400);
    },
  },
};
</script>
 
<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
#tdtContainer {
  width: 100%;
  height: 100vh;
}
#acContainer {
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  width: auto;
  height: 100vh;
}
/* .myButtonList{
    
  } */
.myBasemap {
  border-radius: 5px;

  width: 50px;
  position: absolute;
  left: 15px;
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
.myButton {
  border-radius: 5px;
  height: 32px;
  width: 50px;
  position: absolute;
  left: 15px;
  bottom: 200px;
  color: aliceblue;
  background: #303336;
  border: 1px solid #303336;
  background-size: cover;
  z-index: 6;
  cursor: pointer;
  background-size: 20px;
  text-align: center;
}
.myButton#zoomIn {
  position: absolute;
  left: 15px;
  bottom: 150px;
}
.myButton#zoomOut {
  position: absolute;
  left: 15px;
  bottom: 100px;
}
.myButton#airCity {
  position: absolute;
  left: 15px;
  bottom: 50px;
}
.myButton:hover {
  color: rgb(0, 0, 0);
  background: #ffffff;
  box-shadow: 0 20px 24px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.webShot {
  border-radius: 5px;
  height: 32px;
  width: 50px;
  position: absolute;
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
.webShot:hover {
  color: rgb(0, 0, 0);
  background: #ffffff;
  box-shadow: 0 20px 24px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>