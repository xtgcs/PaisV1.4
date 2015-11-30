package com.event.eventService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bean.Event;
import com.event.eventDao.EventDao;

@Service
public class EventServiceImpl implements EventService{

	@Resource EventDao eventDao;

	@Override
	public List<Event> getEventListByTopic(String topic) {
		// TODO Auto-generated method stub
		return eventDao.getEventListByTopic(topic);
	}

}
