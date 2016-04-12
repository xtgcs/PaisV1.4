package com.forward.forwardAction;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.StringUtils;

import com.bean.Forward;
import com.forward.forwardService.ForwardService;
import com.trend.trendService.TrendService;
import com.users.usersService.UsersService;

@Controller
public class ForwardAction {
	@Resource
	ForwardService forwardService;
	@Resource
	UsersService userService;
	@Resource
	TrendService trendService;int size=10;

	@RequestMapping("/getForwardList.do")
	@ResponseBody
	public List<Forward> getForwardList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String topic = StringUtils.getQueryParam(request.getParameter("topic"));
		int page=Integer.parseInt(request.getParameter("page"));
		
        return forwardService.getForwardListByTopic(topic,page,size);
		//return forwardService.getForwardListByTopic(topic,400);
	}
	@RequestMapping("/getTotalPage.do")
	@ResponseBody
	public int getTotalPage(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception
	{
	  request.setCharacterEncoding("UTF-8");
	  String topic = StringUtils.getQueryParam(request.getParameter("topic"));
	  return forwardService.getTotalPageByTopic(topic,size);
	}

}
