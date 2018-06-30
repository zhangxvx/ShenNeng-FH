/**
 * Created by Edwin on 17/9/20.
 */
(function(){
    var user_usage = echarts.init(document.getElementById('top-left'));

    var count = [];
    var data3 = [];

    var option1 = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title : {
            text: '16年地暖用户用气量分布图',
            padding:[0,0,0,100],
            textStyle:{
                color:'#bad4f4',

            }
        },
		grid: {
			top: 50
		},
        legend: {
            // top:'30px',
            // padding:[10,0,0,0],
            left:400,
            data:['2016'],
            textStyle:{
                color:'#bad4f4',
                fontSize:'30px',
                fontWeight:'bold'
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                max: 100,
                interval: 25,
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine:{
                      lineStyle:{
                          color:'#bad4f4',
                          width:1,//这里是为了突出显示加上的
                      }
                  },
                splitLine:{
                    show:false
                }
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data:count,
                axisLine:{
                          lineStyle:{
                              color:'#bad4f4',
                              width:1,//这里是为了突出显示加上的
                          }
                      },
            }
        ],
        series: [//数据
            
            {
                name:'2016',
                type:'line',
                areaStyle: {
                    normal: {
                       color:'#2ebdff'
                    }
                },
                itemStyle:{
                    normal:{
                        color:'#2ebdff'
                    }
                },
                smooth:true,
                data:data3
            }
        ]
    };
    option1.legend.selected = {};

    user_usage.setOption(option1);

	
    if (usageJson != null && usageJson.length > 0) {
//      var resultData = $.parseJSON(usageJson);//json解析
		var resultData = usageJson;
        count = resultData[1];
        data3 = resultData[0][2];
        user_usage.setOption({
            xAxis:{
                data:count
            },
            series: [
                {
                    name: '2016',
                    data: data3
                }]
        });
        }

   
})();