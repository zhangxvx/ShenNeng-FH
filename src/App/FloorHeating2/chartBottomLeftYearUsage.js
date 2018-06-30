import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'

export class BottomLeftYearUsage extends React.Component {
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
			// 		color: '#bad4f4'
			// 	}
			// },
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['0-200', '200-400', '400-600', '600-800', '800-1000'],
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
			yAxis: {
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
			xAxis: {
				type: 'category',
				data: ['2014年', '2015年', '2016年'],
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
					name: '0-200',
					type: 'bar',
					data: [34100, 31488, 36332]
				},
				{
					name: '200-400',
					type: 'bar',
					data: [16368, 19832, 23236]
				},
				{
					name: '400-600',
					type: 'bar',
					data: [13128, 15912, 19004]
				},
				{
					name: '600-800',
					type: 'bar',
					data: [10312, 12904, 15912]
				},
				{
					name: '800-1000',
					type: 'bar',
					data: [46304, 54960, 59300]
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