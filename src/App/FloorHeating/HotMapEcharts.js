import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'
import bmap from 'echarts/extension/bmap/bmap'
// import * as pointsData from '../FloorHeatingData/points.json'

// const points = new Array()
// for (let t in pointsData) {
//     let temp = new Array()
//     temp.push(pointsData[t].lng)
//     temp.push(pointsData[t].lat)
//     temp.push(pointsData[t].count)
//     points.push(temp)
// }

export class HotMapEcharts extends React.Component {
    constructor() {
        super()
        this.state = {
            // points: allpoints.points
            points: []
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount = () => {
        fetch("http://192.168.50.58/data/zx/地暖/points.json")
            .then(res => res.json())
            .then((json) => {
                let points = new Array()
                for (let t in json) {
                    let temp = new Array()
                    temp.push(json[t].lng)
                    temp.push(json[t].lat)
                    temp.push(json[t].count)
                    points.push(temp)
                }
                this.setState({ points: points })
                // console.log(points)
            }) //要转换成数组格式
            .catch(error => this.setState({ error: "fetch error" }))
    }

    handleChartReady = (chart) => {
        let bmap = chart.getModel().getComponent('bmap').getBMap();
        let district = this.adddistrict()
        this.getBoundary(bmap, district)
        bmap.addControl(new BMap.MapTypeControl());
        bmap.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
        bmap.addControl(new BMap.ScaleControl());
        // bmap.addControl(new BMap.OverviewMapControl());          //添加默认缩略地图控件
    }
    mouseover = (evt) => {
        evt.target.label.setZIndex(99);
        evt.target.label.setPosition(evt.point);
        evt.target.label.show();
    }

    mousemove = (evt) => {
        evt.target.label.setPosition(evt.point);
    }

    mouseout = (evt) => {
        evt.target.label.hide();
    }

    adddistrict = () => {
        let district = new Array()
        district.push("黄浦区");
        district.push("徐汇区");
        district.push("长宁区");
        district.push("静安区");
        district.push("普陀区");
        district.push("虹口区");
        district.push("杨浦区");
        district.push("闵行区");
        district.push("宝山区");
        district.push("嘉定区");
        district.push("浦东新区");
        district.push("金山区");
        district.push("松江区");
        district.push("青浦区");
        district.push("奉贤区");
        district.push("崇明区");
        return district
    }

    getBoundary = (bmap, district) => {
        var bdary = new BMap.Boundary();
        for (let i in district) {
            let namedis = district[i];
            bdary.get(namedis, (rs) => { //获取行政区域   
                let count = rs.boundaries.length; //行政区域的点有多少个
                if (count == 0) {
                    // alert('未能获取当前输入行政区域');
                    console.log("未能获取当前输入行政区域: " + namedis)
                    return;
                }
                // let point1 = new BMap.Point(121.21, 31.57)
                let label = new BMap.Label(namedis, { offset: new BMap.Size(20, -10) });
                label.hide();
                // console.log(namedis)
                bmap.addOverlay(label);
                for (let i = 0; i < count; i++) {
                    //添加显示用标签
                    let ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: "#ff0000" }); //建立多边形覆盖物
                    ply.name = namedis;
                    ply.label = label;
                    ply.addEventListener("mouseover", this.mouseover);
                    ply.addEventListener("mouseout", this.mouseout);
                    ply.addEventListener("mousemove", this.mousemove);
                    bmap.addOverlay(ply);  //添加覆盖物
                    // pointArray = pointArray.concat(ply.getPath());

                    // 将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
                    // pArray = pArray.concat(ply.getPath());
                    // pArray.push(pArray[0]);
                    // 添加遮蔽层

                }
                // 限定显示区域，需要引用api库  
                // var boundply = new BMap.Polygon(pointArray);
                // BMapLib.AreaRestriction.setBounds(bmap, boundply.getBounds());
                // bmap.setViewport(pointArray);    //调整视野   
                // var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.0000001, strokeColor: "#000000", strokeWeight: 0.00001, fillColor: "#ffffff", fillOpacity: 1 }); //建立多边形覆盖物
                // bmap.addOverlay(plyall);
            });

        }
        // bmap.setViewport(pointArray);    //调整视野

    }

    handleRef = (ref) => {
        this.chart = ref
    }

    getOption = () => {
        let points = this.state.points
        let option = {
            animation: false,
            bmap: {
                center: [121.47, 31.23],
                zoom: 13,
                roam: true,
                mapStyle: {
                    styleJson: [
                        {//不显示点信息
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": {
                                "color": "#ffffff",
                                "visibility": "off"
                            }
                        }
                    ]
                }
            },
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['blue', 'green', 'yellow', 'red']
                }
            },
            series: [{
                type: 'heatmap',
                coordinateSystem: 'bmap',
                data: points,
                pointSize: 5,
                blurSize: 6
            }]
        }

        return option
    }
    render() {
        return (
            <Card fluid >
                <Card.Content>
                    <Card.Header>地暖热力图</Card.Header>
                </Card.Content>
                <Card.Content>
                    <ReactEcharts
                        option={this.getOption()}
                        style={{ height: 600 }}
                        // ref={this.handleRef}
                        onChartReady={this.handleChartReady}
                    // lazyUpdate
                    // loadingOption={this.getLoadingOption()}
                    // showLoading={true} 
                    />
                </Card.Content>
            </Card>
        )
    }
}