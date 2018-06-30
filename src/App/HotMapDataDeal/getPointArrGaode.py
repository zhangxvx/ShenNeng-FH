import requests
import json,csv
  
def geocode(address):
    parameters = {'address': address, 'key': '5aeecc3dbf86af141a48418bec87ac8e','batch':'true'}
    base = 'http://restapi.amap.com/v3/geocode/geo'
    response = requests.get(base, parameters)
    answer = response.json()
    #print(answer)
    #temp=answer['geocodes']
    #for i in temp:
    #    print(i['location'])
    dealcode(answer)
    #return temp
    
def dealcode(answers):
    file = open('point.js','a') #建立json数据文件
    nocount=0
    if(answers['status']):
        locations=answers['geocodes']
        for location in locations:
            point = location['location']
            str_temp = '[' +point+'],'
            print(str_temp) #也可以通过打印出来，把数据copy到百度热力地图api的相应位置上
            file.write(str_temp) #写入文档
        
    else:
        nocount+=1
        print(" no lat"+str(nocount))
    file.close() #保存


with open('floorheating_new_result_house_area_address_info.csv', 'r',encoding='gbk',errors='ignore') as csvfile: #打开csv
    reader = csv.reader(csvfile)
    allcount=0
    dcount=0
    address=''
    for line in reader: #读取csv里的数据
        allcount+=1
        # 忽略第一行
        if reader.line_num == 1:
            print('continue') #由于第一行为变量名称，故忽略掉
            continue
            
        d=line[1].strip() 
        if(d=='-1'):    #如果非地暖用户则忽略
            continue
                
        b = line[2].strip() #将第3列city读取出来并清除不需要字符
        c = line[3].strip() #将第4列city读取出来并清除不需要字符
        s='上海市'
        a=s+c+'区'+b+'|'
        address+=a
        dcount+=1
            
        if(dcount==10):
            geocode(address)
            #print(address)
            print(allcount)
            address=''
            dcount=0
print('finsh')

