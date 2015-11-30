package com.forward.forwardDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import utils.BaseDao;

import com.bean.Forward;

@Repository
public class ForwardDaoImpl extends BaseDao implements ForwardDao {
	@Override
	public List<Forward> getAllForwardList() {
		String sql = "select * from forward";
		return this.jdbcTemplate.query(sql, maps);
	}


	@Override
	public List<Forward> getForwardListByTopic(String topic,int size) {
		String sql = "select * from forward3 f where f.topic='" + topic + "'"
				+ (size > 0 ?(" limit " + size) : "");

		return this.jdbcTemplate.query(sql,maps);
	}

	@Override
	public List<Forward> getForwardListByFatherName(String fatherName) {
		String sql = "select * from forward3 where fathername = '" + fatherName + "'";
		return this.jdbcTemplate.query(sql,maps);
	}

	private ParameterizedRowMapper<Forward> maps = new ParameterizedRowMapper<Forward>() {
		@Override
		public Forward mapRow(ResultSet rs, int arg1) throws SQLException {
			Forward forward = new Forward();
			forward.setUname(rs.getString("uname"));
			forward.setFathername(rs.getString("fathername"));
			forward.setForwardnum(rs.getInt("forwardnum"));
			forward.setForwardtime(rs.getString("forwardtime"));
			forward.setAspect(rs.getInt("aspect"));
			return forward;
		}
	};
}
