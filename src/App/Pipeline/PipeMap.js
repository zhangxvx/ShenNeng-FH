import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Icon, Input, Button } from 'semantic-ui-react'
// import bmap from 'echarts/extension/bmap/bmap';

import { getDeviceID, getCoordinate, getMap } from './GetData'

const mapdata = getMap()
const opts = {
    // width: 200,     // 信息窗口宽度  
    // height: 200,     // 信息窗口高度  
    title: "设备信息", // 信息窗口标题  
}

export class PipeMap extends React.Component {
    constructor() {
        super()
        this.state = {
            mapcenter: [121.47, 31.23],
            mapsize: 14,
            queryid: '003T1001',
            idList: getDeviceID(),
        }
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleSearchChange = (event) => {
        var value = event.target.value.replace(/(^\s+)|(\s+$)/g, "")
        this.setState({
            queryid: value,
        })
    }

    handleClick = () => {
        var queryflag = 0
        for (var i in this.state.idList) {
            if (this.state.idList[i] == this.state.queryid) {
                queryflag = 1
                var MapDataI = getCoordinate(this.state.queryid)
                this.setState({
                    mapcenter: [MapDataI.lng, MapDataI.lat],
                    mapsize: 18
                })
            }
        }
        if (queryflag == 0) {
            alert("请检查输入ID是否正确！")
        }
    }

    getOption = () => {
        let option = {
            title: {
                text: '管道压力- 百度地图',
                subtext: 'data from 申能公司',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            bmap: {
                center: this.state.mapcenter,
                zoom: this.state.mapsize,
                roam: true,
                mapStyle: {
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
                }
            },
            series: [
                {
                    name: '设备信息',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: mapdata,
                    symbolSize: 15,
                    itemStyle: {
                        normal: {
                            color: 'DarkCyan',
                        },
                        emphasis: {
                            color: 'Aqua'
                        }
                    }
                }
            ]
        };
        return option
    }
    render() {
        const { activeItem } = this.state
        return (
            <Card fluid >
                <Card.Content>
                    <Card.Header>设备查询</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Input fluid type='text' placeholder='请输入设备ID' onChange={this.handleSearchChange} action>
                        <input style={{ borderColor: '#DCDCDC' }} pattern='[0-9]' />
                        <Button style={{ backgroundColor: '#F5F5F5' }} onClick={this.handleClick} icon={<Icon name='search' circular link />}></Button>
                    </Input>
                </Card.Content>
                <Card.Content>
                    <ReactEcharts
                        option={this.getOption()}
                        style={{ height: 600 }}
                        lazyUpdate />
                </Card.Content>
            </Card>
        )
    }
}