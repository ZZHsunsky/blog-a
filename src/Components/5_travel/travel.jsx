import React from 'react'
import echarts from 'echarts'
import 'echarts/map/js/china'
import geoJson from 'echarts/map/json/china.json'
import {geoCoordMap,provienceData} from "./geo"


export default class TravelContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.initalECharts();
    }
    initalECharts() {
        // const data = [
        //     {name: '上海', area: '华东大区', type: 'areaCenterCity'},
        //     {name: '深圳', area: '华南大区', type: 'areaCenterCity'},
        //     {name: '成都', area: '华西大区', type: 'areaCenterCity'},
        //     {name: '北京', area: '华北大区', type: 'areaCenterCity'},
        //     {name: '武汉', area: '华中大区', type: 'areaCenterCity'},
        //     {name: '沈阳', area: '东北大区', type: 'areaCenterCity'},
        // ];
        echarts.registerMap('zhongguo', geoJson);
        for(let item of provienceData){
            if(item.area === '东北大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#3CA2FC",
                    },
                    emphasis: {
                        areaColor: "#3CA2FC",
                    }
                }
            }else if(item.area === '华北大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#6CAFBE",
                    },
                    emphasis: {
                        areaColor: "#6CAFBE",
                    }
                }
            }else if(item.area === '华中大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#ADD03C",
                    },
                    emphasis: {
                        areaColor: "#ADD03C",
                    }
                }
            }else if(item.area === '华东大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#A13614",
                    },
                    emphasis: {
                        areaColor: "#A13614",
                    }
                }
            }else if(item.area === '华西大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#FFBA00",
                    },
                    emphasis: {
                        areaColor: "#FFBA00",
                    }
                }
            }else if(item.area === '华南大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#FFD300",
                    },
                    emphasis: {
                        areaColor: "#FFD300",
                    }
                }
                }else if(item.area === '南海诸岛'){
                  item.itemStyle = {
                    normal: {
                      borderColor: '#fff',//区域边框颜色
                      areaColor:"#fff",//区域颜色
                    },
                    emphasis: {
                      show: false,
                      // borderColor: '#fff',
                      // areaColor:"#fff",
                    }
                  }
            }else{
                item.itemStyle = {
                    normal: {
                        areaColor: "#D9D9D9",
                    },
                    emphasis: {
                        areaColor: "#D9D9D9",
                    }
                }
            }
        }
        const myChart = echarts.init(document.getElementById('mainMap'));
        myChart.setOption({
            title : {
                text: 'iphone销量',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['iphone3','iphone4','iphone5']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true
            },
            toolbox: {
                show: true,
                orient : 'vertical',
                left: 'right',
                top: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name: 'iphone3',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '河南',value: Math.round(Math.random()*1000)},
                        {name: '云南',value: Math.round(Math.random()*1000)},
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        {name: '黑龙江',value: Math.round(Math.random()*1000)},
                        {name: '湖南',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '山东',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '江苏',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '湖北',value: Math.round(Math.random()*1000)},
                        {name: '广西',value: Math.round(Math.random()*1000)},
                        {name: '甘肃',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '陕西',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '贵州',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '青海',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '海南',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'iphone4',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'iphone5',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                }
            ]
        })
    }
    convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].area),
                    area: data[i].area,
                    type: data[i].type,
                });
            }
        }
        console.log(res);
        return res;
    }
    render() {
        return (
            <div className="App">
                <div id="mainMap" style={{width:'100vm',height:'100vh'}}></div>
            </div>
        );
    }
}