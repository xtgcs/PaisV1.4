$(function(){

    /*外部自定义函数*/
    dian_close();
    news_code();
    news_close();
    dialog_show();


	var weiboContent;
    var uclListUrl = "getUCLList.do",
        forwardListUrl = "getForwardList.do",
        userListUrl = "getUserList.do",
        trendListUrl = "getTrendList.do",
        userInfoUrl = "getUserInfo.do",
        weiboListUrl = "getWeibo.do",
        eventListUrl = "getEventList.do",
        aspectListUrl = "getAspectList.do";
        hotMapUrl = "getHotmap.do";
    $(document.documentElement).click(function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
        $('.tip-wrap').addClass('hide');
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
            'echarts/chart/bar',
            'echarts/chart/map'
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
                genMapList(topic);
                localStorage.setItem("topic",topic);
            }
            //话题微博
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

                    }
                });
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
                                legend:{
                                    x:'right',
                                    data: [
                                        {
                                            icon: 'image://images/positive.png',
                                            name: '正面支持',
                                            textStyle:{color:'rgba(255,140,0,1)'}
                                        },
                                        {

                                            icon: 'image://images/neutral.png',
                                            name: '中性中立',
                                            textStyle:{color:'rgba(130,130,130,1)'}
                                        },
                                        {

                                            icon: 'image://images/negative.png',
                                            name: '负面否定',
                                            textStyle:{color:'rgba(0,180,255,1)'}
                                        }

                                    ],
                                    orient: 'vertical',
                                    selectedMode:false,
                                    selected:{
                                        "正面支持":true,"中性中立":true,"负面否定":true
                                    }
                                },

                            series : [
                                {
                                    type:'force',
                                    name : "topic",
                                    ribbonType: false,
                                    draggable: false,
                                    scaling: 2.5,
                                    size:'75%',
                                    gravity: 3,
                                    categories:[
                                        {name:"话题"},
                                        {
                                            name:"转发",
                                            itemStyle: {
                                                normal: {
                                                    color: "white",
                                                    borderColor: " rgba(0,180,255,1)",
                                                    borderWidth: 6
                                                }
                                            }
                                        },
                                        {name: '正面支持'},
                                        {name: '中性中立'},
                                        {name: '负面否定'}


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
                                    //当支持web Worker的时候会有效
                                    steps: 30,
                                    large: true,
                                    useWorker: true

                                }
                            ]
                        };
                        var myChartPath = ec.init(document.getElementById('path'), 'blue');
                        myChartPath.setOption(pathOption);
                        myChartPath.on(ecConfig.EVENT.CLICK, eConsole);
                    }
                });
            }
            //map
            function genMapList(topic){
                $.ajax({
                    url:hotMapUrl,
                    data:{topic:topic},
                    dataType:'json',
                    success:function(data){
                        var mapData = [];
                        for(var i = 0; i< data.length; i++){
                            var key = data[i].area;
                            var areaData = {};
                            areaData.name = key;
                            areaData.value = data[i].hotdegree;
                            mapData.push(areaData);
                        }
                        var mapOption = {
                            title: {
                                text: '热度',
                                x: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            dataRange: {
                                x: 'left',
                                y: 'bottom',
                                splitList: [
                                    {start: 71},
                                    {start: 41, end: 70},
                                    {start: 21, end: 40},
                                    {start: 11, end: 20},
                                    {start: 5, end: 10},
                                    {start: 1, end: 5},
                                    {end: 0}
                                ],
                                color: ['#E0022B', '#E09107', '#4f99d8']
                            },
                            series: [
                                {
                                    name: '热度',
                                    type: 'map',
                                    mapType: 'china',
                                    roam: false,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                textStyle: {
                                                    color: "#000"
                                                }
                                            }
                                        },
                                        emphasis: {label: {show: true}}
                                    },
                                    data: mapData
                                }
                            ]
                        };
                        var mapList = ec.init(document.getElementById('mapList'), 'sakura');
                        mapList.setOption(mapOption);
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
                        $('#effectList').html(html);
                        for(var j=0;j<data.length;j++){
                            var d =data[j].id;
                            var h = "#"+d;
                            var a = $("#effectList li a");
                            var str = a[j];
                            $(str).attr("href",h);
                            add(d);
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
                                x:'right',
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
                                    symbol:'none',
                                    itemStyle: {
                                        normal: {
                                          color:'rgba(255,140,0,1)'
                                        }
                                 }
                                }, {
                                    name: "中性中立",
                                    type: "line",
                                    data: data1,
                                    symbol:'none',
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
                                    symbol:'none',
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
            	timeArray =[];
            	eventCountArray = [];
            	eventArray = [];
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
                                text:'话题脉搏'
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
                                    symbolSize :0,
                                    itemStyle: {
                                        normal: {
                                            lineStyle:{
                                              color:'#fff'
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
                                                    fontSize: '12',
                                                    fontFamily: '微软雅黑',
                                                    fontWeight:'bolder'
                                                }
                                             }
                                        }
                                      }

                                }

                            ]
                        };

                        // 为echarts对象加载数据
                        var myCharPath =  ec.init(document.getElementById('number1'), 'macarons');
                        myCharPath.setOption(spreadOption);

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
//查看全文
    function add(d) {
        var slideHeight = 47; // px
        var text = $("#" + d);
        var defHeight = text.height();
        console.log(defHeight);
        if (defHeight >= slideHeight) {
            text.css('height', slideHeight + 'px');
            var p = text.next();
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

function get(){
    var id = $("#ID").val();
    var data = "#"+id;
    $("#findAll").attr("href",data);
    change();
}
function getID(){
    change();
}
function change(){
    var show=$("#show");
    var pass=$("#pass");
    var map=$("#map");
    show.addClass("active");
    pass.removeClass();
    map.removeClass();
    $("#pass1").removeClass().attr("style","z-index:0").attr("style","display:none");
    $("#show1").addClass("active").attr("style","z-index:1;display:block");
    $("#map1").removeClass().attr("style","z-index:0").attr("style","display:none");
    $("#weiboList").scrollTop(-300);
    pass.click(function(){
        $(this).addClass("active");
        $("#show").removeClass();
        $("#show1").removeClass().attr("style","z-index:0").attr("style","display:none");
        $("#pass1").addClass("active").attr("style","z-index:1;display:block");
    })
}







function news_code(){

    $(".bottom_left").click(function(){
        var news_block_num = $(".bottom_left").index(this);
        $('.link_news_time').eq(news_block_num).slideDown("slow",function(){
            
        });
        $(".bottom_left").eq(news_block_num).css("display","none");
        $(".bottom_left_close").eq(news_block_num).fadeIn("slow");
    });
    
    
}

function news_close(){
    $(".bottom_left_close").click(function(){
        var news_block_num = $(".bottom_left_close").index(this);
        $('.link_news_time').eq(news_block_num).slideUp("slow");
        $(".bottom_left_close").eq(news_block_num).css("display","none");
        $(".bottom_left").eq(news_block_num).fadeIn("slow");
    });
    
    
}

function dian_close(){
    $(".top_close").click(function(){
        var num = $(".top_close").index(this);
        // var box_height = $(".time_output").eq(num).height();
        // $(".time_output").eq(num).css({
        //     "height":box_height,
        // });
        $(".time_select_right").eq(num).slideUp("slow");
        $(".top_close").eq(num).css("display","none");
        $(".top_open").eq(num).css("display","block");

        
        if(num == 3){
            $('.embed_box embed').eq(0).remove();
            $('.video_play_block').eq(0).hide();
            $('.icos_play').eq(0).show();
        }else if(num == 5){
            $('.embed_box embed').eq(1).remove();
            $('.video_play_block').eq(1).hide();
            $('.icos_play').eq(1).show();
        }

       
        
    });


    $(".top_open").click(function(){
        var num = $(".top_open").index(this);
        $(".time_select_right").eq(num).slideDown("slow");
        $(".top_open").eq(num).css("display","none");
        $(".top_close").eq(num).css("display","block");
        
    });
}



function dialog_show(){
    $('.right_push').click(function(){
        var text_num = $('.right_push').index(this);
        var text_main = $('.center_main').eq(text_num).html();
        $('#dialog_bottom').css("display","block");
        $('#dialog_show').css("display","block");
        $('#dialog_show .showIn').html(text_main);
    });

    $('.time_main_all').click(function(){
        var text_num = $('.time_main_all').index(this);
        var text_main = $('.list_center_main').eq(text_num).html();
        $('#dialog_bottom').css("display","block");
        $('#dialog_show').css("display","block");
        $('#dialog_show .showIn').append(text_main);
        

        if(text_num == 3){
            $('.embed_box embed').eq(0).remove();
            $('.video_play_block').eq(0).hide();
            $('.icos_play').eq(0).show();
        }else if(text_num == 5){
            $('.embed_box embed').eq(0).remove();
            $('.video_play_block').eq(1).hide();
            $('.icos_play').eq(1).show();
        }else{
            $('.embed_box embed').remove();
            $('.video_play_block').hide();
            $('.icos_play').show();
        }

         $('.video_play').css("width","510px");
         $('.line').css("color","#666");

    });


    $('.icos_play').click(function(){
        

        var play_num = $('.icos_play').index(this);
        var embed_main1 = "<embed class=\"video_play\"  src=\"http://v.ifeng.com/include/exterior.swf?guid=01728f5d-6f49-477e-8e6b-400f5109e378&fromweb=sinaLinkCard&AutoPlay=true\"   autostart=false allowFullScreen=ture type=\"application/x-shockwave-flash\" style=\"border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, .5); \"/>";
        var embed_main2 = "<embed class=\"video_play\"  src=\"http://v.ifeng.com/include/exterior.swf?guid=01728f5d-6f49-477e-8e6b-400f5109e378&fromweb=sinaLinkCard&AutoPlay=true\"   autostart=false allowFullScreen=ture type=\"application/x-shockwave-flash\" style=\"border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, .5); \"/>";
       


        $('.icos_play').eq(play_num).css("display","none");
        $('.video_play_block').eq(play_num).fadeIn("slow");


        if(play_num == 0){
            $('.embed_box').eq(0).append(embed_main1);
        }else if(play_num == 1){
            $('.embed_box').eq(1).append(embed_main2);
        }
        

        // var num = $(".icos_play").index(this);
        // var box_height = $(".time_output").eq(num).height();
        // $(".time_output").eq(num).css({
        //     "height":box_height,
        // });

        
    });

    $('.video_play_close').click(function(){
        
        var play_num = $('.video_play_close').index(this);

        if(play_num == 0){
            $('.embed_box embed').remove();
        }else if(play_num == 1){
            $('.embed_box embed').remove();
        }

        
        $('.video_play_block').eq(play_num).fadeOut();
        $('.icos_play').eq(play_num).fadeIn("slow");
        

    

        // var num = $(".video_play_close").index(this);
        // var box_height = $(".time_output").eq(num).height();
        // $(".time_output").eq(num).css({
        //     "height":box_height,
        // });
        
    });

    $('.dialog_clost').click(function(){
        $('#dialog_bottom').css("display","none");
        $('#dialog_show').css("display","none");
         $('#dialog_show .showIn div').remove();

         $('.video_play').css("width","390px");

         $('.line').css("color","#ccc");
    });
}