package com.event.eventAction;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bean.Event;
import com.event.eventService.EventService;

@Controller
public class EventAction {
	@Resource
	EventService eventService;

	@RequestMapping("/getEventList.do")
	@ResponseBody
	public List<Event> getEventList(HttpServletRequest request, HttpServletResponse response, Model model)
			throws Exception {
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		return  eventService.getEventListByTopic(topic);
	}

}
