package com.forward.forwardService;

import java.util.List;

import com.bean.Forward;


public interface ForwardService {

	public List<Forward> getAllForwardList();
	public List<Forward> getForwardListByTopic(String topic,int size);
}

