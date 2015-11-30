package com.UCL.UCLDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import utils.BaseDao;

import com.bean.Topic;

@Repository
public class UCLDaoImpl extends BaseDao implements UCLDao {
	@Override
	public List<Topic> getUCLList() {
		List<Topic> list = new ArrayList<Topic>();
		String sql = "select * from topic";

		ParameterizedRowMapper<Topic> maps = new ParameterizedRowMapper<Topic>() {
			@Override
			public Topic mapRow(ResultSet rs, int arg1) throws SQLException {
				Topic topic = new Topic();
				topic.setId(rs.getInt("id"));
				topic.setTopic(rs.getString("topic"));
				return topic;
			}
		};
		list = this.jdbcTemplate.query(sql, maps);
		return list;
	}

}
