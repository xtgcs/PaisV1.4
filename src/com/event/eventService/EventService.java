package com.event.eventService;

import java.util.List;

import com.bean.Event;


public interface EventService {


	public List<Event> getEventListByTopic(String topic);
}

