import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Icon, Input, Button } from 'semantic-ui-react'

import { getmapStyle } from './CssConfig'
import { HotMap } from './HotMap'


export class HotMapReact extends React.Component {

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount = () => {
        var BMap = window.BMap;

        window.map = new BMap.Map("map");
        var map=window.map
        var point = new BMap.Point(121.43, 31.18);
        map.centerAndZoom(point, 19);             // 初始化地图，设置中心点坐标和地图级别
        window.map.enableDragging();//允许拖动
        window.map.disableDoubleClickZoom();//禁止双击缩放
        window.map.enableScrollWheelZoom();
        window.map.addControl(new BMap.NavigationControl());
        // map.addControl(new BMap.ScaleControl());
        window.map.addControl(new BMap.OverviewMapControl());
        window.map.addControl(new BMap.MapTypeControl());
        //设置样式
        window.map.setMapStyle({
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
        });

        // HotMap('./floorheating_new_result_house_area_address_info.csv')
    }

    render() {
        return (
            <Card fluid >
                <Card.Content>
                    <Card.Header>设备查询</Card.Header>
                </Card.Content>
                <Card.Content>
                    <div id='map' style={getmapStyle()}></div>
                </Card.Content>
            </Card>
        )
    }
}
