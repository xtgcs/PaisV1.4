package com.UCL.UCLAciton;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bean.Topic;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.UCL.UCLService.UCLService;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class UCLAction {
	@Resource
	UCLService uclService;

	@RequestMapping("/getUCLList.do")
	@ResponseBody
	public List<Topic> getUCLList(HttpServletRequest request, HttpServletResponse response, Model model)
			throws Exception {
		return  uclService.getUCLList();
	}

}
