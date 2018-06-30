import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {Card, Icon, Input, Button } from 'semantic-ui-react'
import { getColor, getmapStyle, getBackgroundColor } from './CssConfig'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';

const opts = {
  // width: 200,     // 信息窗口宽度  
  // height: 200,     // 信息窗口高度  
  backgroundColor: getBackgroundColor(),
  title: "设备信息", // 信息窗口标题  
}

export class PipeReactMap extends React.Component {
  constructor() {
    super()
    
    this.handleClick.bind(this)
    this.handleSearchChange.bind(this)
    this.state={
      queryid:"003T1001"
    }
  }

  componentDidMount(){
    fetch("http://192.168.50.58/data/zx/管道/device_need_with_lat.json")
      .then(res => res.json())
      .then((json) => {
        this.setMap(json)
        this.setState({deviceData:json})
      })
      .catch(error =>this.setState({error:"fetch error"}))
    
  }
  setMap =(deviceData)=>{
    var BMap = window.BMap;
    // 百度地图API功能
    window.map = new BMap.Map("allmap", { enableMapClick: false });   // 创建Map实例
    window.map.centerAndZoom(new BMap.Point(121.47, 31.23), 14);  // 初始化地图,设置中心点坐标和地图级别

    window.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    window.map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    window.map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
    window.map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
    // 地图自定义样式
    window.map.setMapStyle({
      styleJson: [
        {
          "featureType": "poilabel",
          "elementType": "all",
          "stylers": {
            "visibility": "on"
          }
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }
      ]
    });
    
    for (let i in deviceData) {
      this.addMapMaker(deviceData[i])
    }
  }
  addMapMaker = (deviceDatai) => {
    // 编写自定义函数,创建标注
    let point = new BMap.Point(deviceDatai.lng, deviceDatai.lat);
    // var myIcon = new BMap.Icon(doticon, new BMap.Size(20,20));
    let marker = new BMap.Marker(point);
    window.map.addOverlay(marker);

    let DeviceInf = "设备号：" + deviceDatai.device_id + "<br>设备名：" + deviceDatai.name + "<br>设备地址：" +
                    deviceDatai.address + "<br>经纬度：(" + deviceDatai.lng + "," + deviceDatai.lat + ")";
    let infoWindow = new BMap.InfoWindow(DeviceInf, opts);  // 创建信息窗口对象  

    marker.addEventListener("mouseover", function () {
      window.map.openInfoWindow(infoWindow, point); //开启信息窗口  
    });
    marker.addEventListener("mouseout", function () {
      window.map.closeInfoWindow(infoWindow, point); //开启信息窗口  
    });
  }

  handleSearchChange = (event) => {
    var value = event.target.value.replace(/(^\s+)|(\s+$)/g, "")
    this.setState({
      queryid: value,
    })
  }

  handleClick = () => {
    let deviceData=this.state.deviceData

    var queryflag = 0
    for (var i in deviceData) {
      if (deviceData[i].device_id == this.state.queryid) {
        queryflag = 1
        var map = window.map;
        var MapDataI = deviceData[i]
        // 用经纬度设置地图中心点
        var new_point = new BMap.Point(MapDataI.lng, MapDataI.lat);
        map.centerAndZoom(new_point, 18);
        var DeviceInf = "设备号：" + MapDataI.device_id + "<br>设备名：" + MapDataI.name + "<br>设备地址：" +
          MapDataI.address + "<br>经纬度：(" + MapDataI.lng + "," + MapDataI.lat + ")"
        var infoWindow = new BMap.InfoWindow(DeviceInf, opts);  // 创建信息窗口对象  
        window.map.openInfoWindow(infoWindow, new_point); //开启信息窗口  
      }
    }
    if (queryflag == 0) {
      alert("请检查输入ID是否正确！")
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <Card fluid >
        <Card.Content>
          <Card.Header>设备查询</Card.Header>
        </Card.Content>
        <Card.Content>
          <div >
            <Input fluid type='text' placeholder='请输入设备ID' defaultValue='003T1001' onChange={this.handleSearchChange} action>
              <input style={{ borderColor: '#DCDCDC' }} pattern='[0-9]' />
              <Button style={{ backgroundColor: '#F5F5F5' }} onClick={this.handleClick} icon={<Icon name='search' circular link />}></Button>
            </Input>
          </div>
          <div id='allmap' style={getmapStyle()}></div>
        </Card.Content>
      </Card>
    )
  }
}
