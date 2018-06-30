import React from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'semantic-ui-react'
import shMap from './shMap'

export class BottomMiddleMap2 extends React.Component {
	state = {
		activeItem: 'home'
	}
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	getOption = () => {
        
		let option = {  
            // title: {  
            //     text: '15年地暖用户年用气量地理分布',  
            //     x: 'center', 
            //     textStyle: {
	        //         color: '#ffe211'
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
                    name: '犯罪数量',  
                    type: 'map',  
                    mapType: 'shanghai',
                    mapLocation: {  
                        y: 60, 
                        x: 450
                    },  
                    itemSytle: {  
                        emphasis: {label: {show: true}}  
                    },  
                    data: [  
                        {name: '普陀区', value: 3353152},  
                        {name: '嘉定区', value: 6410}, 
                        {name: '宝山区', value: 2407291},
                        {name: '杨浦区', value: 3443571}, 
                        {name: '浦东新区', value: 17698123}, 
                        {name: '虹口区', value: 1173566}, 
                        {name: '金山区', value: 1927}, 
                        {name: '静安北', value: 1573402}
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
					<Card.Header>15年地暖用户年用气量地理分布</Card.Header>
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