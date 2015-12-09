package com.blog.blogAction;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bean.Blog;
import com.blog.blogService.BlogService;

@Controller
public class BlogAction {
	@Resource
	BlogService blogService;
	@RequestMapping("/getWeibo.do")
	@ResponseBody
	public List<Blog> getWeiboList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		System.out.println(topic);
		List<Blog> bloglist = new ArrayList<Blog>();
		bloglist = blogService.getBlogListByTopic(topic);
//		System.out.println("weibo list:"+bloglist.get(0).getForwardnum());
		return bloglist;
	}

}
