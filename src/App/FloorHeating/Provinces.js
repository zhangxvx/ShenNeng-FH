import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'
// import * as provincesData from '../FloorHeatingData/provinces.json'
import {getPieColor} from './CssConfig'

const pieColor=getPieColor()

export class Provinces extends React.Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount = () => {   
    fetch("http://192.168.50.58/data/zx/地暖/provinces.json")
        .then(res => res.json())
        .then(json => this.setState({provincesData:json}))
        .catch(error =>this.setState({error:"fetch error"}))
  }

  getOption = () => {
    let provinces_name = new Array()
    let provinces_data = new Array()
    let othertotal = 0
    let provincesData=this.state.provincesData
    // console.log(provincesData)

    for (var i in provincesData) {
      var value = provincesData[i].value
      if (value > 500 && value < 10000) {
        provinces_data.push(provincesData[i])
      }
      else if(i<35&&value < 10000){
        othertotal = othertotal + parseInt(value)
      }
    }
    var other = {
      "name": "其他地区",
      "value": parseInt(othertotal)
    }
    provinces_data = provinces_data.sort(function (a, b) { return b.value - a.value; })
    for (var j in provinces_data) {
      provinces_name.push(provinces_data[j].name)
    }
    provinces_data.push(other)
    provinces_name.push("其他地区")
    let option = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      title: {
        text: '上海市：41659人',
        left: 'right',
        //top: 10,
        textStyle: {
          color: '#000'
        },
        // subtext: '\n上海市：41659人',
        // subtextStyle: {
        //   color: '#000',
        //   top: 40
        // }
      },
      legend: {
        //left: 10,
        top: 30,
        //bottom: 20,
        x: 'center',
        //type: 'scroll',
        // orient: 'vertical',
        data: provinces_name,
        textStyle: {
          color: '#000'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0.4, 0.6]
        }
      },

      series: [
        {
          name: '行政区域分布',
          type: 'pie',
          radius: '60%',
          center: ['50%', '55%'],
          data: provinces_data,
          
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ],
      color:pieColor
    };
    return option
  }
  render() {
    const { activeItem } = this.state
    return (
      <Card fluid >
        <Card.Content>
          <Card.Header>地暖用户行政区域分布</Card.Header>
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