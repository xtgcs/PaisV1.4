package com.event.eventDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import utils.BaseDao;

import com.bean.Event;

@Repository
public class EventDaoImpl extends BaseDao implements EventDao {

	@Override
	public List<Event> getEventListByTopic(String topic) {
		List<Event> list = new ArrayList<Event>();
		String sql = "select * from event where topic = '"+topic+"'";

		ParameterizedRowMapper<Event> maps = new ParameterizedRowMapper<Event>() {
			@Override
			public Event mapRow(ResultSet rs, int arg1) throws SQLException {
				Event event = new Event();
				event.setId(rs.getInt("id"));
				event.setTopic(rs.getString("topic"));
				event.setEvent(rs.getString("event"));
				event.setEventcount(rs.getInt("eventcount"));
				event.setEventtime(rs.getString("eventtime"));
				event.setFlag(rs.getInt("flag"));
				return event;
			}
		};
		list = this.jdbcTemplate.query(sql, maps);
		return list;
	}

}
