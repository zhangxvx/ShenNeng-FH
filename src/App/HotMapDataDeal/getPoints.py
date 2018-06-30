import json
from urllib.request import urlopen, quote
import requests,csv
#import pandas as pd #导入这些库后边都要用到

def getlnglat(address):
    url = 'http://api.map.baidu.com/geocoder/v2/'
    output = 'json'
    ak = 'EAO2KODQKRjnjgi9K0eiEgRzMsghB5a6'
    add = quote(address) #由于本文城市变量为中文，为防止乱码，先用quote进行编码
    uri = url + '?' + 'address=' + add  + '&output=' + output + '&ak=' + ak
    req = urlopen(uri)
    res = req.read().decode() #将其他编码的字符串解码成unicode
    temp = json.loads(res) #对json数据进行解析
    #print(temp)
    return temp
    
file = open(r'D:\\Workspaces\\Nodejs\\ShenNeng\\sheNeng\\src\\App\\HotMap\\point.json','w') #建立json数据文件
with open(r'D:\\Workspaces\\Nodejs\\ShenNeng\\sheNeng\\src\\App\\HotMap\\floorheating_new_result_house_area_address_info.csv', 'r') as csvfile: #打开csv
    reader = csv.reader(csvfile)
    dcount=0
    for line in reader: #读取csv里的数据
        # 忽略第一行
        if reader.line_num == 1: #由于第一行为变量名称，故忽略掉
            continue
        d=line[1].strip() 
        if(d=='-1'):    #如果非地暖用户则忽略
            continue
        #print(d)
        b = line[2].strip() #将第3列city读取出来并清除不需要字符
        c = line[3].strip() #将第4列city读取出来并清除不需要字符
        s='上海市'
        address=s+c+'区'+b
        #print(address)
        #if(dcount==100):
        #    print('1')
        #    break
        dpoint=getlnglat(address)
        if(dpoint['status']):
            print(" no lat")
            print(reader.line_num)
            continue
        else:
            lng = dpoint['result']['location']['lng'] #采用构造的函数来获取经度
            lat = dpoint['result']['location']['lat'] #获取纬度
            str_temp = '{"lat":' + str(lat) + ',"lng":' + str(lng) +'},'
            #print(str_temp) #也可以通过打印出来，把数据copy到百度热力地图api的相应位置上
            file.write(str_temp) #写入文档
            dcount+=1
            print(dcount)
            
file.close() #保存
print('finsh')
