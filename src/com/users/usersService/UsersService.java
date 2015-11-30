package com.users.usersService;

import java.util.List;

import com.bean.User;


public interface UsersService {


	public List<User> getUserListByTopic(String topic,int size);
	User getByUname(String topic, String uname);
}

