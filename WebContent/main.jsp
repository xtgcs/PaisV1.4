    <%@ page language="java" contentType="text/html; utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>社交网络分析系统 Pais </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Le styles -->
    <link href="css/index.css" rel="Stylesheet"/>

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="js/lib/html5shiv.js"></script>
    <![endif]-->
</head>

<body>
<div class="system-wrap">
    <div class="title-wrap"><h2>基于UCL标签社交网络分析系统 Pais </h2></div>
    <h2 class="title">基于UCL标签新闻传播分析</h2>
    <div class="content-wrap">
        <!-- left -->
        <div class="left-wrap">
            <!-- 左侧-上方内容 -->
            <div class="top-wrap">
                <div class="top-left-cont">
                    <dl class="tabs enabled" id="tabs1">
                        <dt class="active">UCL标签<!--<i></i>--></dt>
                        <dd class="active" id="scrollWrap" style="z-index: 1;">
                            <ul id="ucl"  style="overflow-y:auto">
                                <script id="uclTpl" type="text/template">
                                    {{#ucl}}
                                    <li><a href="javascript:;" class="{{active}}"><i></i>{{topic}}</a></li>
                                    {{/ucl}}
                                </script>
                            </ul>
                        </dd>
                        <%--<dt>话题车厢</dt>--%>
                            <%--<dd class="active" style="z-index: 1;">--%>
                                 <%--<ul id="event"  style="overflow-y:auto">--%>
                                    <%--<script id="eventTpl" type="text/template">--%>
                                     <%--{{#ucl}}--%>
                                         <%--<li><a href="javascript:;" class="{{active}}"><i></i>{{topic}}</a></li>--%>
                                     <%--{{/ucl}}--%>
                                     <%--</script>--%>
                                    <%--</ul>--%>
                             <%--</dd>--%>
                    </dl>
                </div>
                <!-- 人际关系网 -->
                <div class="top-right-cont" style="position:relative;">
                    <dl class="tabs enabled" id="tabs2">
                        <dt class="active">传播路径<!--<i></i>--></dt>
                        <dd class="active">
                            <div id="path" style="z-index: 1;width:600px;height:320px;"></div>
                            <a href="javascript:;" class="path-btn path hide"><span>显示关键路径</span></a>
                            <a href="javascript:;" class="path-btn dom hide"><span>显示关键节点</span></a>
                        </dd>
                        <dt>话题微博</dt>
                        <dd>
                            <div id="weiboList" style="z-index: 1;width:600px;height:320px;overflow-y: auto;"></div>
                            <script id="weiboTpl" type="text/template">
                            {{#weibo}}
                            <div class="WB_cardwrap WB_feed_type S_bg2" >
                                <div class="WB_feed_detail clearfix">
                                    <div class="WB_face W_fl">
                                         <div class="face">
                                            <img title="{{uname}}" alt="" width="50" height="50" src="{{headpicsrc}}" class="W_face_radius"></div>
                                         </div>
                                    <div class="WB_detail">
                                        <div class="WB_info">
                                            <a target="_blank" class="W_f14 W_fb S_txt1" title="{{uname}}">
                                            {{uname}}</a>
                                        </div>
                                        <div id="text" class="WB_text W_f14">{{blog}}</div>
                                            <span class="W-f14-btn" id="WB-text"  onclick="gettext()">查看全文</span>

                                        <div class="WB_from S_txt2">
                                            <span>{{forwardtime}}</span> &nbsp; &nbsp;<i>{{aspect}}</i></div>
                                         </div>
                                </div>
                                <div class="WB_feed_handle">
                                    <div class="WB_handle">
                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
                                            <li>
                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1">转发 {{forwardnum}}</span></span></a>
                                            </li>
                                            <li>
                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1">评论 {{commentnum}}</span></span></a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"><span><i class="W_icon icon_praised_b"></i> <em>{{praisenum}}</em></span></span></span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>

                                </div>
                            </div>
                            {{/weibo}}
                        </script>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="bottom-wrap">
                <dl class="tabs enabled" id="tabs3">
                    <dt class="active">话题传播数量趋势<!--<i></i>--></dt>
                    <dd class="active" id="number" style="z-index: 1;height:213px"></dd>
                     <dt class="active">话题舆论走势<!--<i></i>--></dt>
                    <dd class="active" id="number3" style="z-index: 1;height:213px;width:980px"></dd>
                    <dt>话题车厢</dt>
                     <dd class="active" id="number1" style="z-index: 1;height:213px;width:980px"></dd>
                </dl>
            </div>
        </div>
        <!-- right -->
        <div class="right-wrap">
            <div class="top-wrap">
                <dl class="tabs enabled" id="tabs4">
                    <dt class="active">影响力排名</dt>
                    <dd class="active" id="number2" style="z-index: 1;height:1px"></dd>
                </dl>
                <ul id="effectList" style="height:526px;overflow-y:auto">

                </ul>
                <script id="effectTpl" type="text/template">
                    {{#effects}}
                    <li class ="{{grey}}">
                        <div class="photo-wrap">
                            <img src="{{headpicsrc}}" width="48" height="48">
                            <span>{{uname}}</span>
                        </div>
                        <div class="effect-wrap">
                            <div class="effect-cont">
                                <div class="grid">
                                    <span>粉丝</span>
                                    <b>{{fansnum}}</b>
                                </div>
                                <div class="grid">
                                    <span>关注</span>
                                    <b>{{friendsnum}}</b>
                                </div>
                                <div class="grid">
                                    <span>微博</span>
                                    <b>{{blogsnum}}</b>
                                </div>
                            </div>
                            <div class="effect-star">
                                <span>话题影响力</span>
                                <div class="rating">
                                    <div class="star {{topiceffect}}"></div>
                                </div>
                            </div>
                            <div class="effect-star">
                                <div class="attitude">
                                <span>用户态度 &nbsp;{{aspect}}</span>
                                </div>
                                <div class="attitude">
                                 <span>
                                 <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1">转发数量 &nbsp;{{forwardnum}}</span></span></a>
                                 </span>
                                </div>
                             </div>
                          </div>
                    </li>
                    {{/effects}}
                </script>
            </div>
            <div class="btn-wrap">
                <a href="javascript:;" class="green-btn"><span>帮助</span></a>
                <a href="javascript:;" class="blue-btn"><span>返回</span></a>
            </div>
        </div>
    </div>
</div>

<div class="tip-wrap hide" id="tipWrap">
</div>
<script id="tooltipTpl" type="text/template">
    {{#tooltip}}
    {{#user}}
    <div class="tip-header">
        <img src="{{headpicsrc}}" width="48" height="48">
        <p title="{{uname}}">{{uname}}</p>
    </div>
    <div class="effect-cont">
        <div class="grid">
            <span>粉丝</span>
            <b>{{fansnum}}</b>
        </div>
        <div class="grid">
            <span>关注</span>
            <b>{{friendsnum}}</b>
        </div>
        <div class="grid">
            <span>微博</span>
            <b>{{blogsnum}}</b>
        </div>
    </div>
    <div class="effect-star">
        <span>话题影响力</span>
        <div class="rating">
            <div class="star {{topiceffect}}"></div>
        </div>
    </div>
    <div class="effect-star">
        <span>社会影响力</span>
        <div class="rating">
            <div class="star {{socialeffect}}"></div>
        </div>
    </div>
    <div class="effect-star">
        <span>话题态度</span>
        <div class="rating">
            <div class="star nostar"></div>
        </div>
    </div>
    {{/user}}
    {{/tooltip}}
</script>
<script type="text/javascript" src="js/lib/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="js/lib/iscroll.js"></script>
<script type="text/javascript" src="js/lib/jquery.timetabs.min.js"></script>
<script type="text/javascript" src="js/lib/mustache.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/dist/echarts.js"></script>
    <script type="text/javascript" src="js/dist/line.js"></script>
    <script type="text/javascript" src="js/dist/force.js"></script>
    <script type="text/javascript" src="js/dist/bar.js"></script>
    <script type="text/javascript">
        function gettext(){
          $("#text").css("height","auto");
          $("#WB-text").text("收起");
        }
        </script>
</body>
</html>