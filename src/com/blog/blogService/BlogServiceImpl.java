package com.blog.blogService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bean.Blog;
import com.blog.blogDao.BlogDao;
@Service
public class BlogServiceImpl implements BlogService {
	@Resource BlogDao blogDao;

	@Override
	public List<Blog> getBlogListByTopic(String topic) {
		// TODO Auto-generated method stub
		return blogDao.getBlogListByTopic(topic);
	}

}
