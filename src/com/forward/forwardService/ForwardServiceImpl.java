package com.forward.forwardService;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bean.Forward;
import com.forward.forwardDao.ForwardDao;

@Service
public class ForwardServiceImpl implements ForwardService{

	@Resource ForwardDao forwardDao;
	@Override
	public List<Forward> getAllForwardList() {
		
		return forwardDao.getAllForwardList();
	}
	@Override
	public List<Forward> getForwardListByTopic(String topic,int size) {
		if(size < 0){
			return forwardDao.getForwardListByTopic(topic,size);
		}
		List<Forward> returnList = new ArrayList<Forward>();

		List<Forward> firstLevel = forwardDao.getForwardListByFatherName(topic);
		returnList.addAll(firstLevel);
		if(returnList.size() >= size || firstLevel.size() == 0) return returnList;

		int perLoad = (int) Math.ceil((size - firstLevel.size()) / firstLevel.size());
		for(Forward forward : firstLevel) {
			List<Forward> secondLevel = forwardDao.getForwardListByFatherName(forward.getUname());
			for (int i = 0; i < Math.min(perLoad,secondLevel.size()); i++) {
				returnList.add(secondLevel.get(i));
			}
		}

		return returnList;
	}

}
