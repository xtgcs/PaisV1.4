package com.blog.blogService;

import java.util.List;

import com.bean.Blog;

public interface BlogService {
	List<Blog> getBlogListByTopic(String topic);

}
