package com.hotmap.hotmapAction;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bean.Hotmap;
import com.hotmap.hotmapService.HotmapService;

@Controller
public class HotmapAction {
	@Resource HotmapService hotmapService;
	@RequestMapping("/getHotmap.do")
	@ResponseBody
	public List<Hotmap> getHotmap(HttpServletRequest request,HttpServletResponse response,Model model)throws Exception
	{
		String topic = utils.StringUtils.getQueryParam(request.getParameter("topic"));
		List<Hotmap> list = new ArrayList<Hotmap>();
		list = hotmapService.getHotmapList(topic);
		return list;
	}

}
