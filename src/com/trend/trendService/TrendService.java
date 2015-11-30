package com.trend.trendService;

import java.util.List;

import com.bean.Trend;


public interface TrendService {

	public List<Trend> getAllTrendList();
	public List<Trend> getTrendList(String taskid);
}

