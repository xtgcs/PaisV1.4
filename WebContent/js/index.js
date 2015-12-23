$(function(){
	var weiboContent;
    var uclListUrl = "getUCLList.do",
        forwardListUrl = "getForwardList.do",
        userListUrl = "getUserList.do",
        trendListUrl = "getTrendList.do",
        userInfoUrl = "getUserInfo.do",
        weiboListUrl = "getWeibo.do",
        eventListUrl = "getEventList.do",
        aspectListUrl = "getAspectList.do";
    $(document.documentElement).click(function(event){
        if(event.target.nodeName.toLowerCase()!="canvas"){
            $('.tip-wrap').addClass('hide');
        }
    });
    //列表切换
    $('dl#tabs1,dl#tabs2,dl#tabs3,dl#tabs4,dl#tabs5').addClass('enabled').timetabs({
        defaultIndex: 0,
        interval: 2000,
        continueOnMouseLeave: false,
        animated: 'fade',
        animationSpeed: 300
    });
    // 路径配置
    require.config({
        paths: {
            echarts: 'dist/echarts'
        }
    });
    // 使用
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/force',
            'echarts/chart/bar'
        ],
        function (ec) {
            var ecConfig = require('echarts/config');
            //UCL标签
             $.getJSON(uclListUrl, function (data) {
                var template = $('#uclTpl').html();
                var html = Mustache.to_html(template, {'ucl': data});
                var storeTopic = localStorage.getItem("topic");
                var topic = $('#ucl').html(html).find("a").click(function () {
                        $("#ucl a").attr("class", "");
                        $(this).attr("class", "active");
                        switchUCL($.trim($(this).text()));
                    }).filter(storeTopic ?  $('#ucl a:contains('+storeTopic+')') : ":first").attr("class", "active").text();
                switchUCL($.trim(topic));
            });
         
            function switchUCL(topic){
                genForwardChart(topic);
                genTrendChart(topic);
                genUserList(topic);
                genWeiboList(topic);
                genEventList(topic);
                genaspect(topic);
                localStorage.setItem("topic",topic);
            }

            //传播路径
            function genForwardChart(topic){
                var constMaxRadius = 10;
                var constMinRadius = 5;
                $.ajax({
                    url: forwardListUrl,
                    data: {topic:topic},
                    // type: 'post',
                    dataType: 'json',
                    success: function(data){
                        var nodesAndLinks = getNodesAndLinks(data);
                        var nodes = nodesAndLinks.nodes;
                        if(nodes.length > 0) {
                            nodes.push({
                                name: topic,
                                value: 10,
                                topic:topic,
                                symbolSize: [20, 20],
                                category: 1,
                                draggable:true
                            });
                        }
                        var pathOption = {
                            //animation: false,
                            //tooltip : {
                            //    trigger: 'item',
                            //    show : false,
                            //    formatter: '{a} : {b}'
                            //    // formatter: function (params,ticket,callback){
                            //    //     console.log(params)
                            //    //     console.log(ticket)
                            //    // }
                            //},
                            series : [
                                {
                                    type:'force',
                                    name : "topic",
                                    ribbonType: false,
                                    draggable: false,
                                    categories:[
                                        {name:"转发"},
                                        {
                                            name:"话题",
                                            itemStyle: {
                                                normal: {
                                                    //label:{
                                                    // show:false,
                                                    //    textStyle: {
                                                    //        color: '#333',
                                                    //        fontSize:'12px'
                                                    //    }
                                                    //},
                                                    color: "white",
                                                    borderColor: "rgba(0,180,255,1)",
                                                    borderWidth: 6
                                                }
                                            }
                                        }
                                    ],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            nodeStyle : {
                                                brushType : 'both',
                                                borderColor : 'rgba(91,207,255,1)',
                                                borderWidth : 1,
                                                color: 'rgba(0,180,255,1)'
                                            }
                                        },
                                        emphasis: {
                                            label: {
                                                show: false
                                            },
                                            nodeStyle : {
                                                brushType : 'both',
                                                borderColor : 'rgba(255,240,0,1)',
                                                borderWidth : 2,
                                                color: 'rgba(255,168,0,1)'
                                            }
                                        }
                                    },
                                    minRadius : constMinRadius,
                                    maxRadius : constMaxRadius,
                                    linkSymbol: 'arrow',
                                    coolDown: 0.995,
                                    nodes : nodes,
                                    links : nodesAndLinks.links,
                                    steps: 1
                                }
                            ]
                        };
                        var myChartPath = ec.init(document.getElementById('path'), 'blue');
                        myChartPath.setOption(pathOption);
                        myChartPath.on(ecConfig.EVENT.CLICK, eConsole);
                    }
                });
            }
            //影响力排名
            function genUserList(topic){
                $.ajax({
                    url: userListUrl,
                    data: {topic:topic},
                    // type: 'post',
                    dataType: 'json',
                    success: function(data) {
                    	weiboContent = data;
                        var template = $('#effectTpl').html();
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            item.topiceffect = getStar(item.topiceffect);
                            item.socialeffect = getStar(item.socialeffect);
                            item.aspect = getAspect(item.aspect);
                          }
                        var html = Mustache.to_html(template, {'effects': data});
                       var t =  $('#effectList').html(html);

                        for(var j=0;j<data.length;j++){
                           var id =data[j].id;
                           var h = "#"+id;
                            var a = $("#effectList li a");
                            var str = a[j];
                            $(str).attr("href",h);
                       }
                    }
                });
            }
            //用户列表
            function genWeiboList(topic) {
                $.ajax({
                    url: weiboListUrl,
                    data: {topic:topic},
                    // type: 'post',
                    dataType: 'json',
                    success: function(data) {
                        for ( var i = 0; i < data.length; i++) {
                            var item = data[i];
                            item.aspect = getAspect(item.aspect);
                        }
                        var template = $('#weiboTpl').html();
                        var html = Mustache.to_html(template, {'weibo': data});
                       $('#weiboList').html(html);
                        //查看全文
                        for (var j = 0; j < data.length; j++) {
                            var item1 = data[j];
                            var d = item1.id;
                            add(d);
                        }
                        function add(d){
                            var slideHeight = 47; // px
                            var text=$("#"+d);
                            var defHeight = text.height();
                            console.log(defHeight);
                            if (defHeight >= slideHeight) {
                                text.css('height', slideHeight + 'px');
                                var p =text.next();
                                var a = p.addClass("ad");
                                p.append('<a href="#">点击查看更多。。。</a>');
                                var btn = text.next(".ad");
                                btn.click(function () {
                                    var curHeight = text.height();
                                    if (curHeight == slideHeight) {
                                        text.animate({
                                            height: defHeight
                                        }, "normal");
                                        btn.html('点击收起');
                                    } else {
                                        text.animate({
                                            height: slideHeight
                                        }, "normal");
                                        btn.html('点击查看更多。。。');
                                    }
                                });
                            }
                        }
                    }
                });
            }
            function getAspect(aspect) {
                var strs = ["中性","正面","负面"];
                return strs[aspect];
            }
            //话题传播数量趋势
            function genTrendChart(topic){
                $.ajax({
                    url: trendListUrl,
                    data: {topic:topic},
                    // type: 'post',
                    dataType: 'json',
                    success: function(data){
                        var trendData = data.data;
                        if(trendData){
                            for(var i = 0,len = trendData.length;i<len;i++) {
                                trendData[i] = (Math.log(trendData[i])/Math.log(10)).toFixed(2);
                            }
                        }
                        var spreadOption = {
                            title:{
                                show:true,
                                x:'center',
                                text:'话题微博转发量'
                            },

                            tooltip : {
                                trigger: 'axis',
                                show:true,
                                showContent:true
                            },
                            calculable : false,
                            xAxis : [
                                {
                                    type : 'category',
                                    boundaryGap : false,
                                    data : data.forwardtime
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    axisLabel : {
                                        formatter: '{value}'
                                    }
                                }
                            ],
                            series : [
                                {
                                    name:'话题传播最高值',
                                    type:'line',
                                    data: data.data,
                                    markPoint : {
                                        data : [
                                            {type : 'max', name: '转发数'}
                                        ]
                                    },
                                    markLine : {
                                        data : [
                                            {type : 'average', name: '平均值'}
                                        ]
                                    }
                                }
                            ]
                        };
                        // 为echarts对象加载数据
                        ec.init(document.getElementById('number'), 'macarons').setOption(spreadOption);
                    }
                });
            }
            //话题舆论你走势
            function genaspect(topic){
                //话题舆论走势
                $.ajax({
                    url: aspectListUrl,
                    data: {topic:topic},
                    asny:false,
                    dataType: 'json',
                    success: function(data){
                        var data1 = data.data1;
                        var data2 = data.data2;
                        var data3 = data.data3;
                        if(data1){
                            for(var i = 0;i< data1.length;i++) {
                                data1[i] = (Math.log(data1[i])/Math.log(10)).toFixed(2);
                            }
                        }
                        if(data2){
                            for(var i = 0;i< data2.length;i++) {
                                data2[i] = (Math.log(data2[i])/Math.log(10)).toFixed(2);
                            }
                        }
                        if(data3){
                            for(var i = 0;i< data3.length;i++) {
                                data3[i] = (Math.log(data3[i])/Math.log(10)).toFixed(2);
                            }
                        }
                        var spreadOption = {
                            title:{
                                show:true,
                                x:'center',
                                text:'话题舆论走势'
                            },
                            tooltip : {
                                trigger: 'axis',
                                show:true,
                                showContent:true
                            },
                            legend:{
                                orient: 'vertical',
                                x: 'right',
                                y: 'top',
                                borderColor: 'rgba(255,140,0,1)',
                                borderWidth: 1,
                                itemWidth: 15,
                                itemHeight:8,
                                itemGap: 5,
                                padding:5,
                                textStyle:{
                                    fontSize: 8,
                                    color:'auto'
                                },
                                data:[
                                    {
                                        name:"正面支持"
                                    },
                                    {
                                        name:"中性中立"
                                    },
                                    {
                                        name:"负面否定"
                                    }
                                ]
                            },
                            calculable : false,
                            xAxis : [
                                {
                                    type : 'category',
                                    boundaryGap : false,
                                    data : data.forwardtime
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    axisLabel : {
                                        formatter: '{value}'
                                    }
                                }
                            ],
                            series : [
                                {
                                    name:"正面支持",
                                    type:"line",
                                    data:data3,
                                    itemStyle: {
                                        normal: {
                                          color:'rgba(255,140,0,1)'
                                    }
                                 }
                                }, {
                                    name: "中性中立",
                                    type: "line",
                                    data: data1,
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(130,130,130,1)'
                                        }
                                    }
                                },
                                {
                                    name: "负面否定",
                                    type: "line",
                                    data: data2,
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(0,180,255,1)'

                                        }
                                    }
                                }
                            ]
                        };
                        // 为echarts对象加载数据
                        ec.init(document.getElementById('number3'), 'macarons').setOption(spreadOption);
                    }
                });
            }
            var timeArray ;
            var eventCountArray;
            var eventArray;
            function generatData(data){
            	timeArray = new Array();
            	eventCountArray = new Array();
            	eventArray = new Array();
            	for(var i = 0;i < data.length;i++){
            		timeArray[i] = data[i].eventtime;
            		eventCountArray[i] = data[i].eventcount;
            		eventArray[i] = data[i].event;
            	}
            }
            //话题车厢
            function genEventList(topic){
                //话题车厢
                $.ajax({
                    url: eventListUrl,
                    data: {topic:topic},
                    // type: 'post',
                    dataType: 'json',
                    success: function(data){
                        generatData(data);
                           for(var i = 0,len = data.length;i<len;i++) {
                               var item = data[i];
                        }
                        var spreadOption = {
                            title:{
                                show:true,
                                x:'center',
                                text:'话题车厢'
                            },
                            tooltip : {
                                show:true,
                                formatter: '{a}:{c}'
                            },

                            calculable : false,
                            xAxis : [
                                {
                                    type : 'category',
                                    boundaryGap : false,
                                    data : timeArray,
                                    axisLabel:{
                                        show:false,
                                        interval:function(index){
                                            var d = data[index].flag;
                                           if(d==1){
                                               return true;
                                           }
                                            return false;
                                        }

                                    },
                                    axisLine:{
                                        show:false
                                    },
                                    axisTick:{
                                        show:false
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    axisLabel : {
                                        formatter: '{value}',
                                        show:true
                                    },
                                    axisLine:{
                                        show:false
                                    }
                                }
                            ],
                            series : [

                                {
                                    name:'数量',
                                    type:'line',
                                    data: eventCountArray,
                                    symbolSize:0,
                                    itemStyle:{
                                        normal:{
                                            lineStyle:{
                                                color:'#ee0000'
                                            }
                                        }
                                    }
                                },
                                {
                                    name:'话题事件',
                                    type:'line',
                                    data:eventArray,
                                    symbolSize:0,
                                    itemStyle: {
                                        normal: {
                                            lineStyle:{
                                              color:'#ee0000'
                                            },
                                            label: {
                                                formatter:function (params){
                                                    if (params.data!= ''){
                                                        return  params.name + '\n' + params.data;
                                                    }
                                                    return '';
                                                },
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    color:'#27408B',
                                                    fontSize: '8',
                                                    fontFamily: '微软雅黑',
                                                    fontWeight:'bolder'
                                                }
                                             }
                                        }
                                      }
                                    //markPoint:{
                                    //    symbol:'pin',
                                    //    symbolSize:10|12,
                                    //    itemStyle:{
                                    //        normal:{
                                    //            color:'red',
                                    //            borderColor:'green',
                                    //            borderWidth:2,
                                    //            label:{
                                    //                show:true,
                                    //                textStyle:{
                                    //                    color:'red',
                                    //                    fontSize:12
                                    //                }
                                    //            }
                                    //        }
                                    //    }
                                    //}

                                }

                            ]
                        };

                        // 为echarts对象加载数据
                        var myCharPath =  ec.init(document.getElementById('number1'), 'macarons');
                        myCharPath.setOption(spreadOption);
                        //myCharPath.on(ecConfig.EVENT.HOVER, event);

                    }
                });
            }
            //function event(param) {
            //            //generatData(data);
            //            if (param) {
            //                $('.box').css({
            //                    top: (param.event.pageY - 120) + 'px',
            //                    left: (param.event.pageX + 30 ) + 'px'
            //                }).removeClass('hide');
            //                var template = $('#boxTpl').html();
            //                var html = Mustache.to_html(template, {'box': [{'event': param}]});  //{'tooltip': data}
            //                $('#box').html(html);
            //            }
            //
            //}
            function getStar(data){
                data = parseInt(data);
                switch(data){
                    case 0:
                        return 'nostar';
                    case 1:
                        return 'one';
                    case 2:
                        return'two';
                    case 3:
                        return 'three';
                    case 4:
                        return 'four';
                    case 5:
                        return 'five';
                    default:
                        return null;
                }
            }
            function getColorByItem(item){
                //负面
                var color = " rgba(0,180,255,1)";
                //中立
                if(item.aspect == 0)
                	color = "rgba(130,130,130,1)";
                //正面
                else if(item.aspect == 1)
                	color = "rgba(255,140,0,1)";
                return color;
            }
            function eConsole(param) {
                $.ajax({
                    url : userInfoUrl,
                    data: {
                        uname:param.data.name,
                        topic:param.data.topic
                    },
                    dataType : 'json',
                    success: function(data){
                        //console.log(param.data.fathername);
                        //console.log(data.topic);
                        if(data) {
                            $('.tip-wrap').css({
                                top: (param.event.pageY - 120) + 'px',
                                left: (param.event.pageX + 30 ) + 'px'
                            }).removeClass('hide');
                            //tooltip
                            var template = $('#tooltipTpl').html();
                            var item = data;
                            item.topiceffect = getStar(item.topiceffect);
                            item.socialeffect = getStar(item.socialeffect);
                            var html = Mustache.to_html(template, {'tooltip': [{user: data}]});  //{'tooltip': data}
                            $('#tipWrap').html(html);
                            if(param.data.fathername != data.topic){
                                $(".weibo-box").addClass('hide');
                            }
                        }
                    }
                });
            }
            function getNodesAndLinks(data) {
                var nodes = [], links = [];
                for(var i = 0,len = data.length;i < len;i++){
                    var item = data[i];
                    var color = getColorByItem(item);
                    //var content = getContentByItem(item);
                    nodes.push({
                    	name : item.uname,
                        topic:item.topic,
                        fathername:item.fathername,
                        category: 0,
                        itemStyle: {
                            normal: {
                            	 brushType : 'both',
                                 borderColor : color,
                                 borderWidth : 1,
                                 color:color
                            },
                            emphasis: {

                                     brushType : 'both',
                                     borderColor :color,
                                     borderWidth : 2,
                                     color: color
                            }
                        }
                    });
                    links.push({
                        source: item.fathername,
                        target: item.uname,
                        weight: item.forwardnum,
                        name: "转发"
                    });
                }
                return {
                    nodes: nodes,
                    links: links
                }
            }
        }
    );
    });
