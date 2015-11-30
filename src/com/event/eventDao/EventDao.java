package com.event.eventDao;

import java.util.List;

import com.bean.Event;

public interface EventDao {

	public List<Event> getEventListByTopic(String topic);
}
