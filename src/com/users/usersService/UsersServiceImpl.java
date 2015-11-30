package com.users.usersService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bean.User;
import com.users.usersDao.UsersDao;

@Service
public class UsersServiceImpl implements UsersService{

	@Resource UsersDao userDao;

	@Override
	public List<User> getUserListByTopic(String topic,int size) {
		List<User> userList = userDao.getUserListByTopic(topic, size);
		double[] minAndMax = userDao.getMinAndMaxTopicEffect(topic);
		double min = minAndMax[0],max = minAndMax[1];
		for (User user : userList) {
			int topicEffect = getUserListTopicEffect(min, max, user.getTopiceffect());
			user.setTopiceffect(topicEffect);
		}
		return userList;
	}

	@Override
	public User getByUname(String topic, String uname) {
		User user = userDao.getByUname(topic,uname);
		if(user!=null) {
			int topicEffect = getUserTopicEffect(user.getTopic(),user.getTopiceffect());
			user.setTopiceffect(topicEffect);
		}
		return user;
	}

	//todo: ���ץȡ������Ѿ����������Ͳ���Ҫ��
	private int getUserTopicEffect(String topic,double effect) {
		double[] minAndMax = userDao.getMinAndMaxTopicEffect(topic);
		double min = minAndMax[0],max = minAndMax[1];
		int score = (int) Math.ceil( (effect - min) / (max-min) * 100 );
		if(score > 80) return 5;
		if(score > 60) return 4;
		if(score > 40) return 3;
		if(score > 20) return 2;
		return 1;
	}
	private int getUserListTopicEffect(double min,double max,double effect) {
		int score = (int) Math.ceil( (effect - min) / (max-min) * 100 );
		if(score > 80) return 5;
		if(score > 60) return 4;
		if(score > 40) return 3;
		if(score > 20) return 2;
		return 1;
	}
}
