package com.trend.trendService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bean.Trend;
import com.trend.trendDao.TrendDao;

@Service
public class TrendServiceImpl implements TrendService{

	@Resource TrendDao trendDao;
	@Override
	public List<Trend> getAllTrendList() {
		
		return trendDao.getAllTrendList();
	}
	@Override
	public List<Trend> getTrendList(String taskid) {
		// TODO Auto-generated method stub
		return trendDao.getTrendList(taskid);
	}

}
