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

import utils.StringUtils;

import com.bean.Blog;
import com.blog.blogService.BlogService;

@Controller
public class BlogAction {
	@Resource
	BlogService blogService;int size=3;
	@RequestMapping("/getWeibo.do")
	@ResponseBody
	public List<Blog> getWeiboList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		int page=Integer.parseInt(request.getParameter("page"));
		List<Blog> bloglist = new ArrayList<Blog>();
		bloglist = blogService.getBlogListByTopic(topic,page,size);
//		System.out.println("weibo list:"+bloglist.get(0).getForwardnum());
		for(Blog blog:bloglist){
			
			System.out.println("=========blog============="+blog);
		}
		return bloglist;
	}
	@RequestMapping("/getTotalWeiboPage.do")
	@ResponseBody
	public int getTotalPage(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception
	{
	  request.setCharacterEncoding("UTF-8");
	  String topic = StringUtils.getQueryParam(request.getParameter("topic"));
	  return blogService.getTotalPageByTopic(topic,size);
	}
}
