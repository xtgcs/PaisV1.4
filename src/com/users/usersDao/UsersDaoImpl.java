package com.users.usersDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import utils.BaseDao;

import com.bean.User;

@Repository
public class UsersDaoImpl extends BaseDao implements UsersDao {


	@Override
	public List<User> getUserListByTopic(String topic,int size) {
		String sql = "select * from user3 u,effect e,forward3 f where e.topic='"+topic+"' and e.uid = u.uid and f.uname = u.uname and f.fathername = '"+topic+"' order by e.topiceffect desc limit " + size;
		System.out.println("查询指定用户"+sql);
		return this.jdbcTemplate.query(sql,maps);
	}

	@Override
	public User getByUname(String topic, String uname) {
		String sql = "select * from user3 u,effect e,forward3 f where u.uname='" + uname + "' e.topic='"+topic+"' and e.uid = u.uid and f.uname = u.uname and f.fathername = '"+topic+"'";
		List<User> userList = this.jdbcTemplate.query(sql,maps);
		return userList.size() > 0 ? userList.get(0) : null;
	}

	@Override
	public double[] getMinAndMaxTopicEffect(String topic) {
		String sql = "select min(topiceffect) as min,max(topiceffect) as max from effect where topic = '" + topic + "'";
		List<double[]> list = this.jdbcTemplate.query(sql, new ParameterizedRowMapper<double[]>() {
			@Override
			public double[] mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new double[]{rs.getDouble("min"),rs.getDouble("max")};
			}
		});
		return list.get(0);
	}

	private ParameterizedRowMapper<User> maps = new ParameterizedRowMapper<User>() {
		@Override
		public User mapRow(ResultSet rs, int arg1) throws SQLException {
			User user = new User();
			user.setHeadpicsrc(rs.getString("headpicsrc"));
			user.setTopic(rs.getString("topic"));
			user.setUname(rs.getString("uname"));
			user.setFansnum(rs.getInt("fansnum"));
			user.setFriendsnum(rs.getInt("friendsnum"));
			user.setBlogsnum(rs.getInt("blogsnum"));
			user.setTopiceffect(rs.getDouble("topiceffect"));
			user.setSocialeffect(rs.getDouble("socialeffect"));
			user.setForwardnum(rs.getInt("forwardnum"));
			user.setAspect(rs.getInt("aspect"));
			return user;
		}
	};
}
