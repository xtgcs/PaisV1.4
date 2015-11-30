package com.trend.trendAction;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.StringUtils;

import com.bean.Forward;
import com.forward.forwardService.ForwardService;
import com.trend.trendService.TrendService;

@Controller
public class TrendAction {
	@Resource
	TrendService trendService;

	@Resource
	ForwardService forwardService;

	@RequestMapping("/getTrendList.do")
	@ResponseBody
	public Map<String,Object[]> getTrendList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		List<Forward> forwards = forwardService.getForwardListByTopic(topic,-1);
		Map<String,Integer> map = new HashMap<String,Integer>();
		String format = "yyyy-MM-dd hh:mm";
		boolean inSameDay = true;
		int dayOfYear = 0;
		for (Forward forward : forwards) {
			Calendar calendar = StringUtils.getCalendar(forward.getForwardtime(), format);
			if(dayOfYear == 0) {
				dayOfYear = calendar.get(Calendar.DAY_OF_YEAR);
			}else if(calendar.get(Calendar.DAY_OF_YEAR) != dayOfYear){
				inSameDay = false;
			}
		}
		for(Forward forward : forwards) {
			Calendar calendar = StringUtils.getCalendar(forward.getForwardtime(),format);
			String key;
			if(inSameDay) {
				int splitHour = (int) (Math.ceil((calendar.get(Calendar.HOUR_OF_DAY) + 1) / 2) * 2);
				key = splitHour + "~" + (splitHour +2);
			}else{
				key = getDayOfWeekName(calendar.get(Calendar.DAY_OF_WEEK));
			}
			map.put(key + "",(map.containsKey(key) ? map.get(key) : 0) + forward.getForwardnum());
		}

		Map<String,Object[]> data = new HashMap<String,Object[]>();
		data.put("forwardtime", map.keySet().toArray());
		data.put("data",map.values().toArray());
		return data;
	}
	@RequestMapping("/getAspectList.do")
	@ResponseBody
	public Map<String,Object[]> getAspectList(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		List<Forward> forwards = forwardService.getForwardListByTopic(topic,-1);
		Map<String,Integer> map1 = new HashMap<String,Integer>();
		Map<String,Integer> map2 = new HashMap<String,Integer>();
		Map<String,Integer> map3 = new HashMap<String,Integer>();
		String format = "yyyy-MM-dd hh:mm";
		boolean inSameDay	 = true;
		int dayOfYear = 0;
		for (Forward forward : forwards) {
			Calendar calendar = StringUtils.getCalendar(forward.getForwardtime(), format);
			if(dayOfYear == 0) {
				dayOfYear = calendar.get(Calendar.DAY_OF_YEAR);
			}else if(calendar.get(Calendar.DAY_OF_YEAR) != dayOfYear){
				inSameDay = false;
			}
		}
		for(Forward forward : forwards) {
			Calendar calendar = StringUtils.getCalendar(forward.getForwardtime(),format);
			String key;
			if(inSameDay) {
				int splitHour = (int) (Math.ceil((calendar.get(Calendar.HOUR_OF_DAY) + 1) / 2) * 2);
				key = splitHour + "~" + (splitHour +2);
			}else{
				key = getDayOfWeekName(calendar.get(Calendar.DAY_OF_WEEK));
			}
			if(forward.getAspect()==1){
				map1.put(key + "",(map1.containsKey(key) ? map1.get(key) : 0) + forward.getForwardnum());
				map2.put(key + "",(map2.containsKey(key) ? map2.get(key) : 0));
				map3.put(key + "",(map3.containsKey(key) ? map3.get(key) : 0));
			}
			if(forward.getAspect()==2){
				map1.put(key + "",(map1.containsKey(key) ? map1.get(key) : 0));
				map2.put(key + "",(map2.containsKey(key) ? map2.get(key) : 0) + forward.getForwardnum());
				map3.put(key + "",(map3.containsKey(key) ? map3.get(key) : 0));
			}
			if(forward.getAspect()==3){
				map1.put(key + "",(map1.containsKey(key) ? map1.get(key) : 0));
				map2.put(key + "",(map2.containsKey(key) ? map2.get(key) : 0));
				map3.put(key + "",(map3.containsKey(key) ? map3.get(key) : 0) + forward.getForwardnum());
			}
		}

		Map<String,Object[]> data = new HashMap<String,Object[]>();
		data.put("forwardtime", map1.keySet().toArray());
		data.put("data1",map1.values().toArray());
		data.put("data2",map2.values().toArray());
		data.put("data3",map3.values().toArray());
		return data;
	}
	private String getDayOfWeekName(int dayOfWeek) {
		String[] names = new String[]{"SUN","MON","TUE","WED","THU","FRI","SAT"};
		return names[dayOfWeek - 1];
	}

}
