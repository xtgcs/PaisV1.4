package com.trend.trendDao;

import java.util.List;

import com.bean.Trend;

public interface TrendDao {
	public List<Trend> getAllTrendList();
	public List<Trend> getTrendList(String taskid);
}
