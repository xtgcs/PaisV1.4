package com.users.usersAction;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bean.User;
import com.users.usersService.UsersService;

@Controller
public class UsersAction {
	@Resource
	UsersService userService;

	@RequestMapping("/getUserList.do")
	@ResponseBody
	public List<User> getUserList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		int size = 20;
		return userService.getUserListByTopic(topic, size);
	}

	@RequestMapping("/getUserInfo.do")
	@ResponseBody
	public User getUserInfo(HttpServletRequest request) {
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		String uname = utils.StringUtils.getQueryParam(request.getParameter("uname"));
		System.out.println("topic:"+topic+",uanme:"+uname);
		return userService.getByUname(topic,uname);
	}
}
