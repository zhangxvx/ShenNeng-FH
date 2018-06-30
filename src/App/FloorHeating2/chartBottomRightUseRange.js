import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'

export class BottomRightUseRange extends React.Component {
	state = {
		activeItem: 'home'
	}
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	getOption = () => {
		let option = {
			// title: {
			// 	text: '地暖用户年用气量分布比', 
			// 	left: 'center', 
			// 	textStyle: {
			// 		color: '#ffe211'
			// 	}
			// }, 
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['2014年', '2015年', '2016年'],
				top: '30px',
				textStyle: {
					color: '#000'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '100px',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01],
				axisLine: {
					lineStyle: {
						color: '#000',
						width: 1, //这里是为了突出显示加上的
					}
				},
				splitLine: {
					show: false
				}
			},
			yAxis: {
				type: 'category',
				data: ['0-200', '200-400', '400-600', '600-800', '800-1000'],
				axisLine: {
					lineStyle: {
						color: '#000',
						width: 1, //这里是为了突出显示加上的
					}
				},
				splitLine: {
					show: false
				}
			},
			series: [
				{
					name: '2014年',
					type: 'bar',
					data: [34100, 16368, 13128, 10312, 46304]
				},
				{
					name: '2015年',
					type: 'bar',
					data: [31488, 19832, 15912, 12904, 54960]
				},
				{
					name: '2016年',
					type: 'bar',
					data: [36332, 23236, 19004, 15912, 59300]
				}
			],
			color: ['#ED2A24', '#2D4B57', '#46B1B4', '#F98762', '#8ADDBC', '#6EAE8A', '#46B1B4', '#EF8D19', '#D9B0A1']
		};

		return option
	}
	render() {
		const { activeItem } = this.state
		return (
			<Card fluid >
				<Card.Content>
					<Card.Header>地暖用户年用气量分布比</Card.Header>
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

