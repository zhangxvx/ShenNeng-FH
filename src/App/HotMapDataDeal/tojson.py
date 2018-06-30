import json

path='D:/Workspaces/Nodejs/ShenNeng/sheNeng/src/App/FloorHeatingData/point.json'

pointlist=list()

with open(path,'r',encoding='utf-8') as f:
	#ss=f.read()
	ss=json.load(f)
	arr=ss['points']
	#print(arr[0])
	for t in arr:
		point=dict()
		point['lng']=t[0]
		point['lat']=t[1]
		point['count']=1
		pointlist.append(point)
		
	f.close()
		
with open('points1.json','w') as f2:
	json.dump(pointlist,f2)
	
	f2.close()

