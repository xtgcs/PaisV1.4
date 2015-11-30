package com.trend.trendDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import utils.BaseDao;

import com.bean.Trend;

@Repository
public class TrendDaoImpl extends BaseDao implements TrendDao {
	@Override
	public List<Trend> getAllTrendList() {
		List<Trend> list = new ArrayList<Trend>();
		String sql = "select * from forward";

		ParameterizedRowMapper<Trend> maps = new ParameterizedRowMapper<Trend>() {
			@Override
			public Trend mapRow(ResultSet rs, int arg1) throws SQLException {
				Trend trend = new Trend();
				trend.setTime(rs.getString("forwardtime"));
				return trend;
			}
		};
		list = this.jdbcTemplate.query(sql, maps);
		return list;
	}

	@Override
	public List<Trend> getTrendList(String taskid) {
		List<Trend> list = new ArrayList<Trend>();
		String sql = "SELECT forwardtime FROM forward where taskid='"+taskid+"'";

		ParameterizedRowMapper<Trend> maps = new ParameterizedRowMapper<Trend>() {
			@Override
			public Trend mapRow(ResultSet rs, int arg1) throws SQLException {
				Trend trend = new Trend();
				trend.setTime(rs.getString("forwardtime"));
				return trend;
			}
		};
		list = this.jdbcTemplate.query(sql, maps);
		return list;
	}

}
