package com.users.usersDao;

import java.util.List;

import com.bean.User;

public interface UsersDao {
	public List<User> getUserListByTopic(String topic,int size);
	User getByUname(String topic,String uname);
	double[] getMinAndMaxTopicEffect(String topic);
}
