import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'

import { getData3,getData3one } from './GetData'
import { getColor } from './CssConfig'

export class PipeChart3 extends React.Component {
  constructor() {
    super()
    this.count = 99
    this.getdata=[]

    this.state = {
      activeItem: 'home',
      option: this.getOption()
    }
  }

  componentWillMount(){
    fetch("http://192.168.50.58/data/zx/管道/003T1114_pred3.json")
        .then(res =>res.json())
        .then((json) => {
          this.getdata=getData3(0,json)
          this.setState({chartdata:json})
        })
        .catch((error) =>{this.setState({error:"fetch error"})})
  }

  componentDidMount() {
    this.int = setInterval(this.update, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.int)
  }

  update = () => {
    let chartdata=this.state.chartdata

    let option = null;
    let getdatatemp = getData3one(this.count,chartdata)

    for (var i = 0; i < 3; i++) {
      this.getdata[i].shift()
      this.getdata[i].push(getdatatemp[i])
    }
    option = this.getOption()
    this.setState({ option: option })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getOption = () => {
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['真实值', '预测值']
      },

      xAxis: {
        name: '时间',
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: getColor()
          }
        },
        data: this.getdata[2],
      },
      yAxis: {
        name: '压力',
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '真实值',
          type: 'line',
          data: this.getdata[0],

          markLine: {
            data: [
              {
                name: '高压',
                yAxis: 2500
              },
            ]
          }
        },
        {
          name: '预测值',
          type: 'line',
          data: this.getdata[1],

          markLine: {
            data: [
              {
                name: '低压',
                yAxis: 1000
              },
            ]
          }
        }
      ],
      color: getColor()
    };
    if (this.count < 2000) {
      this.count += 1
    }
    else {
      this.count = 0
    }
    return option
  }
  render() {
    const { activeItem } = this.state
    return (
      <Card fluid >
        <Card.Content>
          <Card.Header>设备003T1114动态压力序列（预测3）</Card.Header>
        </Card.Content>
        <Card.Content>
          <ReactEcharts
            option={this.state.option}
            style={{ height: 600 }}
            lazyUpdate />
        </Card.Content>
      </Card>

    )

  }
}