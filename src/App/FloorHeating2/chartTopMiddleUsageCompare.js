/**
 * Created by Edwin on 17/9/20.
 */
(function(){
    var usageCompare = echarts.init(document.getElementById('top-middle-1'));
    
    var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    title : {
	            text: '居民用气vs地暖用气',
	            left:'center',
	            textStyle:{
	                color:'white',
	            }
	        },
		    legend: {
		    	orient: 'vertical',
		    	y: '100',
        		x: '240',
		        data: ['地暖', '普通'],
		        textStyle:{
		            color:'#ffe211'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '40%',
		        bottom: '3%',
		        containLabel: true
		    },
		    yAxis:  {
		        type: 'value',
		        axisLine:{
                      lineStyle:{
                          color:'white',
                          width:1,//这里是为了突出显示加上的
                      }
                  },
                  
		    },
		    xAxis: {
		        type: 'category',
		        data: ['2014','2015','2016'],
		        axisLine:{
                      lineStyle:{
                          color:'white',
                          width:1,//这里是为了突出显示加上的
                      }
                  },
		    },
		    
		    
//		    var dataset = [
//		        { name: "地暖用户" , 
//				  sales: [	{ year:2014, usage: 50856812, count:337530 },
//							{ year:2015, usage: 59314786, count:389522 },
//							{ year:2016, usage: 64281740, count:432760 }] },
//				{name: "居民用户" , 
//				  sales: [	{ year:2014, usage: 681722667, count:3303302 },
//							{ year:2015, usage: 660576409, count:3405249},
//							{ year:2016, usage: 685193927, count:3508623 }] }
//		    ];

		    series: [
		        {
		            name: '地暖',
		            type: 'bar',
		            stack: '总量',
//		            label: {
//		                normal: {
//		                    show: true,
//		                    position: 'insideRight'
//		                }
//		            },
		            data: [50856812, 59314786, 64281740]
		        },
		        {
		            name: '普通',
		            type: 'bar',
		            stack: '总量',
		            
		            data: [681722667, 660576409, 685193927]
		        }
		    ],
		    color:['#12ed8b', '#4f53ff', '#961ae9', '#2ebdff', '#e24f5f']
		};
		
    usageCompare.setOption(option);
   
})();


