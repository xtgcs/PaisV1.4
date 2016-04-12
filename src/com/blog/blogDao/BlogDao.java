package com.blog.blogDao;

import java.util.List;

import com.bean.Blog;

public interface BlogDao{
	List<Blog> getBlogListByTopic(String topic);
	List<Blog> getBlogListByTopic(String topic,int page,int size);
	int getTotalPageByTopic(String topic,int size);
}
