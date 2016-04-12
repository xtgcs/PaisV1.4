package com.forward.forwardDao;

import java.util.List;

import com.bean.Forward;

public interface ForwardDao {
	List<Forward> getAllForwardList();
	List<Forward> getForwardListByTopic(String topic,int size);
	List<Forward> getForwardListByTopic(String topic,int page,int size);
	List<Forward> getForwardListByFatherName(String fatherName);
	int getTotalPageByTopic(String topic,int size);
}
