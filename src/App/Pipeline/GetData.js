export const getData1 = (i,ChartData) => {
    let datat = new Array()
    let datap = new Array()
    let datax = new Array()
    let data1 =new Array()

    for (var j=i;j<i+100;j++) {
        datat.push(ChartData[j].vlaue_pressure1)
        datap.push(ChartData[j].pred)
        datax.push(ChartData[j].index)
        // console.log(i)
    }
    data1.push(datat)
    data1.push(datap)
    data1.push(datax)
    return data1
}
export const getData1one = (i,ChartData) => {
    let data1 =new Array()
    data1.push(ChartData[i].vlaue_pressure1)
    data1.push(ChartData[i].pred)
    data1.push(ChartData[i].index)
    return data1
}

export const getData2 = (i,ChartData2) => {
    let datat = new Array()
    let datap = new Array()
    let datax = new Array()
    let data1 =new Array()

    for (var j=i;j<i+100;j++) {
        datat.push(ChartData2[j].vlaue_pressure1)
        datap.push(ChartData2[j].pred2)
        datax.push(ChartData2[j].index)
    }
    data1.push(datat)
    data1.push(datap)
    data1.push(datax)
    // console.log(data1)
    return data1
}
export const getData2one = (i,ChartData2) => {
    let data1 =new Array()
    data1.push(ChartData2[i].vlaue_pressure1)
    data1.push(ChartData2[i].pred2)
    data1.push(ChartData2[i].index)
    return data1
}
export const getData3 = (i,ChartData3) => {
    let datat = new Array()
    let datap = new Array()
    let datax = new Array()
    let data1 =new Array()
    for (var j=i;j<i+100;j++) {
        datat.push(ChartData3[j].vlaue_pressure1)
        datap.push(ChartData3[j].pred3)
        datax.push(ChartData3[j].index)
    }
    data1.push(datat)
    data1.push(datap)
    data1.push(datax)
    // console.log(data1)
    return data1
}
export const getData3one = (i,ChartData3) => {
    let data1 =new Array()
    data1.push(ChartData3[i].vlaue_pressure1)
    data1.push(ChartData3[i].pred2)
    data1.push(ChartData3[i].index)
    return data1
}