package com.UCL.UCLService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.UCL.UCLDao.UCLDao;
import com.bean.Topic;

@Service
public class UCLServiceImpl implements UCLService{

	@Resource UCLDao uclDao;
	@Override
	public List<Topic> getUCLList() {
		
		return uclDao.getUCLList();
	}

}
