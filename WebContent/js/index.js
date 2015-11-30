$(function(){

    var uclListUrl = "getUCLList.do",
        forwardListUrl = "getForwardList.do",
        userListUrl = "getUserList.do",
        trendListUrl = "getTrendList.do",
        userInfoUrl = "getUserInfo.do",
        weiboListUrl = "getWeibo.do";

    $(document.documentElement).click(function(event){
        if(event.target.nodeName.toLowerCase()!="canvas"){
            $('.tip-wrap').addClass('hide');
        }
    });

    //列表切换
    $('dl#tabs1,dl#tabs2,dl#tabs3,dl#tabs4').addClass('enabled').timetabs({
        defaultIndex: 0,
        interval: 2000,
        continueOnMouseLeave: false,
        animated: 'fade',
        animationSpeed: 300
    });

    // 路径配置
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });

    // 使用
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/force'
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

            //切换ucl
            function switchUCL(topic){
                genForwardChart(topic);
                genTrendChart(topic);
                genUserList(topic);
                genWeiboList(topic);
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
                                symbolSize: [20, 20],
                                category: 1,
                                draggable:true
                            });
                        }
                        var pathOption = {
                            animation: false,
                            tooltip : {
                                trigger: 'item',
                                show : false,
                                formatter: '{a} : {b}'
                                // formatter: function (params,ticket,callback){
                                //     console.log(params)
                                //     console.log(ticket)
                                // }
                            },
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
                                                    color: "white",
                                                    borderColor: "rgba(0,180,255,1)",
                                                    borderWidth: 6
                                                    //color:"lightgreen",
                                                    //borderColor: "green"
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
                        var template = $('#effectTpl').html();
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            item.topiceffect = getStar(item.topiceffect);
                        }
                        var html = Mustache.to_html(template, {'effects': data});
                        $('#effectList').html(html);
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
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            item.aspect = getAspect(item.aspect);
                        }
                        var template = $('#weiboTpl').html();
                        var html = Mustache.to_html(template, {'weibo': data});
                        $('#weiboList').html(html);
                    }
                });
            }

            function getAspect(aspect) {
                var strs = ["负面","中性","正面"];
                return strs[aspect + 1];
            }

            //话题传播数量趋势
            function genTrendChart(topic){
                //话题传播数量趋势
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
                            tooltip : {
                                trigger: 'axis'
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

            function eConsole(param) {
                $.ajax({
                    url : userInfoUrl,
                    data: {uname: param.data.name},
                    dataType : 'json',
                    success: function(data){
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
                        }
                    }
                });
            }

            function getNodesAndLinks(data) {
                var nodes = [], links = [];
                for(var i = 0,len = data.length;i < len;i++){
                    var item = data[i];
                    nodes.push({
                        category: 0,
                        name : item.uname
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
