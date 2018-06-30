import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'
// import * as ageData from '../FloorHeatingData/age.json'
import {getPieColor} from './CssConfig'

const pieColor=getPieColor()
export class Age extends React.Component {
    state = {
        activeItem: 'home'
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount = () => {   
        fetch("http://192.168.50.58/data/zx/地暖/age.json")
            .then(res => res.json())
            .then(json => this.setState({ageData:json}))
            .catch(error =>this.setState({error:"fetch error"}))
    }

    getOption = () => {
        let age_name = new Array()
        let age_data = new Array()
        let ageData=this.state.ageData
        
        for (var i in ageData) {
            if (i >= 9) break
            age_data.push(ageData[i])
        }
        // age_data = age_data.sort(function (a, b) { return b.value - a.value; })
        for (var j in age_data) {
            age_name.push(age_data[j].name)
        }
        // age_data = age_data.sort(function (a, b) { return a.value - b.value; })
        let option = {
            backgroundColor: 'rgba(0, 0, 0, 0)',

            // title: {
            //     text: '总计57793人',
            //     left: 'right',
            //     //top: 10,
            //     textStyle: {
            //         color: '#000'
            //     }
            // },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            legend: {
                //left: 10,
                top: 30,
                //bottom: 20,
                x: 'center',
                data: age_name,
                textStyle: {
                    color: '#000'
                }
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0.3, 0.6]
                }
            },
            series: [
                {
                    name: '年龄分布',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '55%'],
                    data: age_data,
                    
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ],
            color: pieColor
        };
        return option
    }
    render() {
        const { activeItem } = this.state
        return (
            <Card fluid >
                <Card.Content>
                    <Card.Header>地暖用户年龄分布</Card.Header>
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