import React from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'
import shMap from './shMap'

export class BottomMiddleMap1 extends React.Component {
    constructor() {
        super()
        this.state = {
            activeItem: 'home',
        }
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    getOption = () => {
        // echarts.registerMap('shanghai', shMap);
        let option = {
            // title: {
            //     text: '16年地暖用户年用气量地理分布',
            //     x: 'center',
            //     textStyle: {
            //         color: '#bad4f4'
            //     }
            // },
            dataRange: {
                x: 420,
                min: 0,
                max: 10000000,
                text: ['高', '低'],
                realtime: true,
                calculable: true,
                color: ['#e24f5f', 'yellow', '#12ed8b'], 
                textStyle: {
                    color: '#ffe211'
                }
            },
            series: [
                {
                    name: '用气量',
                    type: 'map',
                    mapType: 'shanghai',
                    mapLocation: {
                        y: 60,
                        x: 450
                    },
                    itemStyle: {
                        // normal: {
                        //     areaColor: '#003159'
                        // },
                        emphasis: { label: { show: true } }
                    },
                    data: [
                        { name: '普陀区', value: 4208029 },
                        { name: '嘉定区', value: 6410 },
                        { name: '宝山区', value: 2899882 },
                        { name: '崇明县', value: 6322 },
                        { name: '杨浦区', value: 4808945 },
                        { name: '浦东新区', value: 17277878 },
                        { name: '虹口区', value: 1272136 },
                        { name: '金山区', value: 4389 },
                        { name: '静安北', value: 1656879 }
                    ]
                }
            ],
        };
        return option
    }

    render() {
        const { activeItem } = this.state
        return (
            <Card fluid >
                <Card.Content>
                    <Card.Header>16年地暖用户年用气量地理分布</Card.Header>
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