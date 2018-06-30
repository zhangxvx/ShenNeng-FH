import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'

export class TopRightUsageChange extends React.Component {
	state = {
		activeItem: 'home'
	}
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	getOption = () => {
		let option = {
			// title: {
			// 	left:'center',
			// 	text: '上海近年地暖用气随月变化趋势图',
			// 	textStyle:{
			// 		color:'#000',
			// 	}
			// },
			legend: {
				y: '30',
				x: 'center',
				data: ['2014', '2015', '2016'],
				textStyle: {
					color: '#000',
					fontSize: '20px',
					fontWeight: 'bold'
				}
			},
			grid: {
				left: '1%',
				right: '7%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				name: '月份',
				boundaryGap: false,
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
				axisLine: {
					lineStyle: {
						color: '#000',
						width: 1,//这里是为了突出显示加上的
					}
				},
			},
			yAxis: {
				type: 'value',
				// axisLabel: {
				//     formatter: '{value} °C'
				// }
				name: '用气量（m³）',
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: '#000',
						width: 1,//这里是为了突出显示加上的
					}
				},
			},
			series: [
				{
					name: '2014',
					type: 'line',
					data: [3525218, 3786939, 4665041, 2919874, 2198662, 1217513, 1304009, 868367, 1115303, 799607, 1212895, 1814978]
				},
				{
					name: '2015',
					type: 'line',
					data: [4500189, 4505228, 5520457, 3498941, 2606859, 1349790, 1371423, 892478, 1080509, 896140, 1357132, 2078247]
				},
				{
					name: '2016',
					type: 'line',
					data: [4917747, 5196646, 6154029, 3489018, 2761408, 1437433, 1507590, 933608, 1128832, 959271, 1523424, 2131864],
					markPoint: {
						data: [
							{ type: 'max', name: '最大值' },
							{ type: 'min', name: '最小值' }
						]
					}
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
					<Card.Header>上海近年地暖用气随月变化趋势图</Card.Header>
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