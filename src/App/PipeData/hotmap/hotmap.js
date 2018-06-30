function hotMap(path){
	    var blist = [];
      var districtLoading = 0;

      function getBoundary() { 
	     //addDistrict("卢湾区");
         addDistrict("黄浦区");
         addDistrict("徐汇区");
         addDistrict("长宁区");
         addDistrict("静安区");
	     addDistrict("普陀区");	     
	     addDistrict("虹口区");
	     addDistrict("杨浦区");
	     addDistrict("闵行区");
	     addDistrict("宝山区");
	     addDistrict("嘉定区");
	     addDistrict("浦东新区");
	     addDistrict("金山区");
	     addDistrict("松江区");
	     addDistrict("青浦区");
	     addDistrict("奉贤区");
		// addDistrict("南汇区");
	     addDistrict("崇明区"); 
		// addDistrict("闸北区");
       }

/** 
 * 添加行政区划
 * @param {} districtName 行政区划名
 * @returns  无返回值
 */
    function addDistrict(districtName) {
      //使用计数器来控制加载过程
       districtLoading++;
       var bdary = new BMap.Boundary();
       bdary.get(districtName, function (rs) {       //获取行政区域
             var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return;
            }
            for (var i = 0; i < count; i++) {
                  blist.push({ points: rs.boundaries[i], name: districtName });
             };
         //加载完成区域点后计数器-1
             districtLoading--;
             if (districtLoading == 0) {
            //全加载完成后画端点
                drawBoundary();
             }
          });
        }


/**
 * 各种鼠标事件绑定
 */
     function click(evt) {
         alert(evt.target.name);
     }

     function mouseover(evt) {
         evt.target.label.setZIndex(99);
         evt.target.label.setPosition(evt.point);
         evt.target.label.show();
     }

     function mousemove(evt) {
         evt.target.label.setPosition(evt.point);
     }

     function mouseout(evt) {
         evt.target.label.hide();
     }

     function drawBoundary() {
    //包含所有区域的点数组
        var pointArray = [];

    /*画遮蔽层的相关方法
    *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，
	并全部连到西北角。
    * 这样就做出了一个经过多次西北角的闭合多边形*/
    //定义中国东南西北端点，作为第一层
       var pNW = { lat: 59.0, lng: 73.0 }
       var pNE = { lat: 59.0, lng: 136.0 }
       var pSE = { lat: 3.0, lng: 136.0 }
       var pSW = { lat: 3.0, lng: 73.0 }
    //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
       var pArray = [];
       pArray.push(pNW);
       pArray.push(pSW);
       pArray.push(pSE);
       pArray.push(pNE);
       pArray.push(pNW);
    //循环添加各闭合区域
       for (var i = 0; i < blist.length; i++) {
        //添加显示用标签层
            var label = new BMap.Label(blist[i].name, { offset: new BMap.Size(20, -10) });
            label.hide();
            map.addOverlay(label);

        //添加多边形层并显示
            var ply = new BMap.Polygon(blist[i].points, { strokeWeight: 2, strokeColor: "#FF0000", fillOpacity: 0.01, fillColor: " #FFFFFF" }); //建立多边形覆盖物
            ply.name = blist[i].name;
            ply.label = label;
           // ply.addEventListener("click", click);
            ply.addEventListener("mouseover", mouseover);
            ply.addEventListener("mouseout", mouseout);
           ply.addEventListener("mousemove", mousemove);
            map.addOverlay(ply);

        //添加名称标签层
           /* var centerlabel = new BMap.Label(blist[i].name, { offset: new BMap.Size(0, 0) });
            centerlabel.setPosition(ply.getBounds().getCenter());
            map.addOverlay(centerlabel);*/

        //将点增加到视野范围内
            var path = ply.getPath();
            pointArray = pointArray.concat(path);
        //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
            pArray = pArray.concat(path);
            pArray.push(pArray[0]);
        }

    //限定显示区域，需要引用api库
        var boundply = new BMap.Polygon(pointArray);
        BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());
        map.setViewport(pointArray);    //调整视野 

    //添加遮蔽层
       var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.0000001, strokeColor: "#000000", strokeWeight: 0.00001, fillColor: "#ffffff", fillOpacity: 1}); //建立多边形覆盖物
       map.addOverlay(plyall);
   }

   setTimeout(function () {
       getBoundary();
	   map.setZoom(40);
       }, 1000);
	   

//setInterval(function() {dynamic();}, 1000);

var points = [];
d3.csv(path, function(error,number) {
	var lat,lng,count;
	for(var i=0; i<number.length; i++){
			 lat = number[i].lat;
			 lng = number[i].lng;
			 count=number[i].count;
			 points.push({"lng":lng,"lat":lat,"count":count});	
		}
	  console.log(points);
    if(!isSupportCanvas()){
    	alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
    }
	
	heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
	map.addOverlay(heatmapOverlay);
	heatmapOverlay.setDataSet({data:points,max:100});

    function setGradient(){
     	/*格式如下所示:
		{
	  		0:'rgb(102, 255, 0)',
	 	 	.5:'rgb(255, 170, 0)',
		  	1:'rgb(255, 0, 0)'
		}*/
     	var gradient = {};
     	var colors = document.querySelectorAll("input[type='color']");
     	colors = [].slice.call(colors,0);
     	colors.forEach(function(ele){
			gradient[ele.getAttribute("data-key")] = ele.value; 
     	});
        heatmapOverlay.setOptions({"gradient":gradient});
    }
	//判断浏览区是否支持canvas
    function isSupportCanvas(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
	
})
/*function choose(jumpMenu){
     var obj=document.getElementById("jumpMenu");
   var value=obj.options[obj.selectedIndex].value;
   switch(value){
   case 2015: dynamic("csv/ad16.csv");
   break;
   case 2016: dynamic("csv/ad16.csv");
   break;
   case 2017: dynamic("csv/ad17.csv");
   break;
   }	   
   

}*/
}