package com.blog.blogDao;

import java.util.List;

import com.bean.Blog;

public interface BlogDao{
	List<Blog> getBlogListByTopic(String topic);
 
}
