import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'
// import * as areaData from '../FloorHeatingData/area.json'
// import Css from '../Css'
// console.log(pieColor)

export class Area extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount = () => {
    fetch("http://192.168.50.58/data/zx/地暖/area.json")
      .then(res => res.json())
      .then(json => this.setState({ areaData: json }))
      .catch(error => this.setState({ error: "fetch error" }))
  }

  getOption = () => {
    let area_name = new Array()
    let area_data = new Array()
    let areaData = this.state.areaData
    for (var i in areaData) {
      if (i >= 9) break
      area_data.push(areaData[i])
    }
    area_data = area_data.sort(function (a, b) { return b.value - a.value; })
    // area_data = area_data.sort(function (a, b) { return a.value - b.value; })
    for (var j in area_data) {
      area_name.push(area_data[j].name)
    }
    let option = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      // title: {
      //   text: '总计57793人',
      //   left: 'right',
      //   //top: 10,
      //   textStyle: {
      //     color: '#000'
      //   }
      // },

      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        //orient: 'vertical',
        //left: 10,
        top: 30,
        //bottom: 20,
        x: 'center',
        data: area_name,
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
          name: '上海市区域分布',
          type: 'pie',
          radius: '60%',
          center: ['50%', '55%'],
          data: area_data,

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ],
      color: ['#ED2A24', '#2D4B57', '#46B1B4', '#F98762', '#8ADDBC', '#6EAE8A', '#EF8D19', '#D9B0A1']
    };
    return option
  }
  render() {
    const { activeItem } = this.state
    return (
      <Card fluid >
        <Card.Content>
          <Card.Header>地暖用户上海市区域分布</Card.Header>
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