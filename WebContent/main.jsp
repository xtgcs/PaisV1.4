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
                                    <li><a href="javascript:;" class="{{active}}"><i></i><span class="topic">{{topic}}</span></a></li>
                                    {{/ucl}}
                                </script>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <!-- 人际关系网 -->
                <div class="top-right-cont" style="position:relative;">
                    <dl class="tabs" id="tabs2">
                        <dt class="active" id="pass">传播路径<i></i></dt>
                        <dd class="active" id="pass1">
                            <div id="path" style="z-index: 1;width:600px;height:340px;">
                            </div>
                            <a href="javascript:;" class="path-btn path hide"><span>显示关键路径</span></a>
                            <a href="javascript:;" class="path-btn dom hide"><span>显示关键节点</span></a>
                        </dd>
                        <dt id="show">话题微博</dt>
                        <dd id="show1">
                            <div id="weiboList" style="z-index: 1;width:600px;height:340px;overflow-y: auto;"></div>
                            <script id="weiboTpl" type="text/template">
                            {{#weibo}}
                            <div class="WB_cardwrap WB_feed_type S_bg2" >
                                <div class="WB_feed_detail clearfix">
                                    <div class="WB_face W_fl">
                                         <div class="face">
                                            <img title="{{uname}}" alt="" width="50" height="50" src="{{headpicsrc}}" class="W_face_radius">
                                        </div>
                                    </div>
                                    <div class="WB_detail">
                                        <div class="WB_info">
                                            <a target="_blank" class="W_f14 W_fb S_txt1" id="name"  name="{{id}}" title="{{uname}}">
                                            {{uname}}
                                            </a>
                                        </div>

                                        <a  class="WB_text W_f14"   id="{{id}}">{{blog}}</a>
                                            <span class="W-f14-btn"></span>

                                        <div class="WB_from S_txt2">
                                            <span>{{forwardtime}}</span> &nbsp; &nbsp;<i>{{aspect}}</i>
                                        </div>
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
                        
                        <dt id="news_code">新闻编码</dt>
                        <dd id="news_code_show">
                        	<div id="list_show" style="z-index: 1;width:600px;height:340px;overflow-y: auto;">
                        		<div class="list_show_main list_show1">


	                        		<div class="center_main">
	                        			<div class="list_show_top">
	                        				<img src="http://tp4.sinaimg.cn/1649173367/50/5725261480/1" title="每日经济新闻" class="head_pic">
		                        			<div class="list_from">每日经济新闻</div>
		                        			<div class="list_time">3月7日11:00</div>
	                        			</div>
	                        			<div class="list_main">
	                        			【五大重点绘出“十三五”清晰路线图】2016年的中国两会承载着“十三五”开好局的使命，也肩负着2020年全面小康的重任。所以李克强总理今年的政府工作报告就显得特别重要，因为“十三五”这五年怎么干，很大程度上就看报告给出的路线图。那么，今年两会政府工作报告的重点是什么。
	                        			</div>

	                        			<div class="news_main_pic" style="overflow:hidden">
			                        		<img src="http://ww1.sinaimg.cn/bmiddle/7198dd2fgw1f0ajiqvg6oj20hr0dotc2.jpg" width="563px" height="240px">
			                        	</div>


	                        			<!--页面下方评论/点赞-->
	                        			<div class="WB_feed_handle">
		                                    <div class="WB_handle">
		                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
		                                            <li>
		                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1">转发 :300</span></span></a>
		                                            </li>
		                                            <li>
		                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1">评论 590</span></span></a>
		                                            </li>
		                                            <li>
		                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"><span><i class="W_icon icon_praised_b"></i> <em>615</em></span></span></span></a>
		                                            </li>
		                                        </ul>
		                                    </div>
		                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
		                                </div>

		                                
	                        		</div>

                        			<div class="list_show_bottom">
                        				<div class="bottom_left">
                        					梳理相关政策，请展开阅读
                        				</div>
                        				<div class="bottom_left_close">全部收起</div>
                        				<div class="bottom_right">
                        					<div class="right_push">查看全文</div>
                        					<div class="right_pop">收起</div>
                        				</div>
                        			</div>

                        			<div class="link_news_time">
                        				<div class="time_output">
	                        				<div class="time_main time_main_01">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot1" title="每日经济新闻">


	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年3月12日</div>
	                        						<div class="top_event">“十三五”清晰路线图</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">

			                        				<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp4.sinaimg.cn/1649173367/50/5725261480/1" title="每日经济新闻" class="head_pic">
			                        						<div class="time_list_from">每日经济新闻</div>
				                        					<div class="timre_list_time">3月12日11:00</div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						【五大重点绘出“十三五”清晰路线图】2016年的中国两会承载着“十三五”开好局的使命，也肩负着2020年全面小康的重任。所以李克强总理今年的政府工作报告就显得特别重要，因为“十三五”这五年怎么干，很大程度上就看报告给出的路线图。那么，今年两会政府工作报告的重点是什么？
			                        					</div>



			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle" >
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#ccc;">转发 :280</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#ccc">评论 550</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1" style="color:#ccc"><span><i class="W_icon icon_praised_b"></i> <em >610</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>


			                        				</div>

		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
		                        			</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_02">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot2" title="中国日报">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年3月12日</div>
	                        						<div class="top_event">四川省委书记王东明</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">

		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp4.sinaimg.cn/1663072851/50/5734998612/1" title="中国日报" class="head_pic">
			                        						<div class="time_list_from">中国日报</div>
				                        					<div class="timre_list_time">3月11日11:00</div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						#微博观两会#【四川省委书记王东明：坚决惩贪治腐 巩固良好政治生态】全国人大代表、四川省委书记王东明今天表示：要巩固发展来之不易的良好政治生态，营造更加公平公正的发展环境，为经济持续健康发展提供根本保证。四川省委要坚决打一场惩贪治腐、刷新吏治的攻坚战持久战，为决胜全面小康、建设经济强省提供坚强保证。（记者 李洋）
			                        					</div>

			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :240</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 500</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"style="color:#fff"><span><i class="W_icon icon_praised_b"></i> <em >591</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>


			                        				</div>

		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_03">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot3" title="CCTV焦点访谈">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年3月10日</div>
	                        						<div class="top_event">“实施精准扶贫、精准脱贫”</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">

		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp4.sinaimg.cn/1911484643/50/5661674049/1" title="CCTV焦点访谈" class="head_pic">
			                        						<div class="time_list_from">CCTV焦点访谈</div>
				                        					<div class="timre_list_time">3月10号19:30 </div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						今日节目：实现全面脱贫，是全面建成小康社会重要任务。政府报告就“实施精准扶贫、精准脱贫”、“扩大贫困地区基础设施覆盖面”、“实行脱贫工作责任制”、“提高贫困地区基础教育质量和医疗服务水平”，做出了重要的战略部署。代表委员反响热烈，纷纷结合自己的工作实际建言献策。
			                        					</div>



			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :200</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 491</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"style="color:#fff"><span><i class="W_icon icon_praised_b"></i> <em >580</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>

						                                
			                        				</div>

		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_04">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot4" title="海口苏">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年3月10日</div>
	                        						<div class="top_event">石评大财经</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">

		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp1.sinaimg.cn/1394616724/50/5746189998/1" title="海口苏" class="head_pic">
			                        						<div class="time_list_from">海口苏</div>
				                        					<div class="timre_list_time">3月10日21:13 </div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						#凤凰视频客户端视频推荐# 2016-03-10石评大财经 汇市楼市是打断全面建成小康的两大风险 |2016-03-10... （分享自@凤凰视频客户端）
			                        					</div>

			                        					<!--页面视频插入和播放的位置-->

			                        					<div class="icos_play" style="display:block" alt="播放"></div>

			                        					<div class="video_play_block" style="display:none">

			                        						<div class="video_play_close">关闭</div>
			                        						<div class="embed_box"></div>
			                        						<!--   embed_main1的位置

			                        						<embed class="video_play"  src="http://v.ifeng.com/include/exterior.swf?guid=01728f5d-6f49-477e-8e6b-400f5109e378&fromweb=sinaLinkCard&AutoPlay=true"   autostart=false style="border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, .5); "/>
			                        						-->
			                        					</div>



			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :187</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 475</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"style="color:#fff"><span><i class="W_icon icon_praised_b"></i> <em >540</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>

						                                
			                        				</div>



		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_05">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot5" title="新华视点">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年3月8日</div>
	                        						<div class="top_event">新华社评论员</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">
		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp3.sinaimg.cn/1699432410/50/5734996770/1" title="新华视点" class="head_pic">
			                        						<div class="time_list_from">新华视点</div>
				                        					<div class="timre_list_time">3月8日09:42</div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						【新华社评论员：脱贫攻坚，民族地区不能掉队】全面建成小康社会，一个民族都不能少。全国14个连片特困地区有680个县，民族自治地方占54.6%。民族地区是短板中的短板，脱贫攻坚主战场。只有做到精准扶贫、精准脱贫，精准到户、精准到人，严格保护生态，发展特色产业，发挥民族团结优势，才能共筑全面小康。
			                        					</div>



			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :174</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 442</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"style="color:#fff"><span><i class="W_icon icon_praised_b"></i> <em >498</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>

						                                
			                        				</div>

		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_06">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot6" title="石评大财经">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年3月6日</div>
	                        						<div class="top_event">石評大財經完整視頻</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">

		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp2.sinaimg.cn/1971925837/50/1297828585/0" title="石评大财经" class="head_pic">
			                        						<div class="time_list_from">石评大财经</div>
				                        					<div class="timre_list_time">3月6日12:47</div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						石評大財經完整視頻 :汇市楼市是打断全面建成小康的两大风险本保证。四川省委要坚决打一场惩贪治腐、刷新吏治的攻坚战持久战，为决胜全面小康、建设经济强省提供坚强保证
			                        					</div>

			                        					<!--页面视频插入和播放的位置-->

			                        					<div class="icos_play" style="display:block"></div>

			                        					<div class="video_play_block" style="display:none">
			                        						
			                        						<div class="video_play_close">关闭</div>
			                        						<div class="embed_box"></div>
			                        						<!-- embed_main2 的位置
			                        						<embed class="video_play"  src="http://v.ifeng.com/include/exterior.swf?guid=01728f5d-6f49-477e-8e6b-400f5109e378&fromweb=sinaLinkCard&AutoPlay=true"   autostart=false allowFullScreen=ture type="application/x-shockwave-flash"/>
			                        						-->
			                        					</div>


			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :155</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 410</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1" style="color:#fff"><span><i class="W_icon icon_praised_b"></i> <em >400</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>

						                                
			                        				</div>



		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_07">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot7" title="上七下">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年2月29日</div>
	                        						<div class="top_event">定向扶贫</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">

		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp3.sinaimg.cn/2243055350/180/5616354872/1" title="上七下" class="head_pic">
			                        						<div class="time_list_from">上七下</div>
				                        					<div class="timre_list_time">2月29日10:55</div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						房产两个部分可以立竿见影，短痛是贫富差距的协调，但在全面小康的主旨下，有望定向扶贫。两个部分，一是别墅群和限高层的高端公寓的放开，二是REITs，目前只有184801，去年目标分红约6%，实际实现达3%的回报。目前只有万科一家，问题是长远呢，体量很大的市场。
			                        					</div>

			                        					<!--页面图片插入和播放的位置-->

			                        					<div class="main_pic" style="overflow:hidden">
			                        						<img src="http://ww1.sinaimg.cn/bmiddle/85b24ef6gw1f0cpml4oeuj20h90b0abf.jpg">
			                        					</div>


			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :115</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 389</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"><span><i class="W_icon icon_praised_b"></i> <em style="color:#fff">378</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>

						                                
			                        				</div>


		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_08">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot8" alt="四川发布">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年2月22日</div>
	                        						<div class="top_event">遂宁：决战决胜全面小康</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">

		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp4.sinaimg.cn/1905843503/50/40041977201/1" title="四川发布" class="head_pic">
			                        						<div class="time_list_from">四川发布</div>
				                        					<div class="timre_list_time">2月22日10:35</div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						【遂宁：决战决胜全面小康，建设绿色经济强市[给力]】#我与四川的五年之约# 到2018年农村贫困人口全部脱贫、累计新增就业16.5万人、重点培育品牌组织500个……新出炉的民生大礼包你都收到了吗？未来五年，你和遂宁，约吗[嘻嘻]？@遂宁发布
			                        					</div>

			                        					<!--页面图片插入和播放的位置-->

			                        					<div class="main_pic" style="overflow:hidden">
			                        						<img src="http://ww1.sinaimg.cn/bmiddle/7198dd2fgw1f0ajiqvg6oj20hr0dotc2.jpg">
			                        						<img src="http://ww4.sinaimg.cn/bmiddle/7198dd2fgw1f0ajitw38yj20hs0p1wkf.jpg">
			                        					</div>


			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :110</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 357</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"><span><i class="W_icon icon_praised_b"></i> <em style="color:#fff">364</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>

						                                
			                        				</div>

		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>

	                        			<div class="time_output">
	                        				<div class="time_main time_main_09">
	                        				<img src="images/shijiandian.png"  class="time_dot time_dot9" alt="鄂托克旗共青团">

	                        				<!--收拉框-->
	                        					<div class="top_fix">
	                        						<div class="top_time">2016年2月19日</div>
	                        						<div class="top_event">鄂尔多斯市共青团</div>
	                        						<div class="top_close time_close" style="display:none">收起</div>
	                        						<div class="top_open" style="display:block">展开</div>
	                        					</div>

	                        					<div class="time_select_right" style="display:none">
		                        					<div class="list_center_main">
			                        					<div class="time_main_tilte">
			                        						<img src="http://tp4.sinaimg.cn/1905843503/50/40041977201/1" title="鄂托克旗共青团" class="head_pic">
			                        						<div class="time_list_from">鄂托克旗共青团</div>
				                        					<div class="timre_list_time">2月19日09:32</div>
			                        					</div>
			                        					<div class="time_main_neirong">
			                        						#青年看两会# 政府工作报告既是一份报告书也是一份计划案；既是一份责任状也是一份动员令。需要全体党员干部以求真务实的态度深入贯彻落实，更需要全国各族人民精诚团结，齐心协力，共同为决胜全面小康贡献出自己的力量。@共青团中央 @内蒙古自治区团委 @鄂尔多斯市共青团
			                        					</div>

			                        					<!--页面下方评论/点赞-->
					                        			<div class="WB_feed_handle">
						                                    <div class="WB_handle">
						                                        <ul class="WB_row_line WB_row_r4 clearfix S_line2">
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1"  style="color:#fff">转发 :100</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a class="S_txt2"  href="javascript:void(0);"><span class="pos"><span class="line S_line1" style="color:#fff">评论 332</span></span></a>
						                                            </li>
						                                            <li>
						                                                <a href="javascript:void(0);" class="S_txt2" title="赞"><span class="pos"><span class="line S_line1"><span><i class="W_icon icon_praised_b"></i> <em style="color:#fff">315</em></span></span></span></a>
						                                            </li>
						                                        </ul>
						                                    </div>
						                                    <div node-type="feed_list_repeat" class="WB_feed_repeat S_bg1" style="display:none;"></div>
						                                </div>

						                                
			                        				</div>

		                        					<div class="time_main_bottom">
		                        						
		                        						<div class="time_main_all">查看全文</div>
		                        					</div>
		                        				</div>
	                        				</div>
	                        			</div>
	                        		</div>
                        		</div>



                        	</div>


                        	<!--用于弹幕显示的内容-->
                        	<div id="dialog_bottom"></div>
                        	<div id="dialog_show" style="z-index: 10;width:580px;max-height:600px;overflow-y: auto;">

                        		<div class="dialog_clost"></div>  <!--关闭按钮-->
                        		<!-- <img src="images/close_black.png" width="30px" height="30px" style="float:right;display:block; cursor:pointer;" class="dialog_clost"> -->
                        		<div class="showIn" style="float:left;display:block;margin-bottom:20px;"></div>

                        	</div>
                        </dd>
                        <!--TODO:需要更改的map标签名-->
                        <dt id="map">地图影响力</dt>
                        <dd id="map1">
                         <div id="mapList" style="z-index: 1;width:600px;height:340px;"></div>
                        </dd>
                     </dl>
                 </div>
              </div>
            <div class="bottom-wrap">
                <dl class="tabs enabled" id="tabs3">
                    <dt class="active">话题传播数量趋势<i></i></dt>
                    <dd class="active" id="number" style="z-index: 1;height:213px;width:980px"></dd>
                     <dt class="active">话题舆论走势<i></i></dt>
                    <dd class="active" id="number3" style="z-index: 1;height:213px;width:980px"></dd>
                    <dt>话题脉搏</dt>
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
                      <a href="#" class="btn" onclick="getID()">
                        <div class="photo-wrap">
                            <img src="{{headpicsrc}}" width="48" height="48">
                            <span>{{uname}}</span>
                        </div>
                        <div class="effect-wrap">
                         <input type="hidden" value="{{id}}" id="iptID">
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
                                <span> 话题影响力</span>
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
                                 <div class="S_txt2"><span class="pos"><span class="line S_line1">转发数量 &nbsp;{{forwardnum}}</span></span></div>
                                 </span>
                                </div>
                             </div>
                          </div>
                          </a>
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
    <div class="weibo-box">
        <span>微博摘要</span>
        <div class="weibo-content-wrap">
         <div class="weibo-content">{{forwardText}}</div>
        <input type="hidden" value="{{id}}" id="ID">
        <a  href="" class="btn" onclick="get()" id="findAll">查看全文</a>
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
        <script type="text/javascript" src="js/dist/map.js"></script>
</body>
</html>