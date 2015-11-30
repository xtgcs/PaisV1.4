package com.blog.blogDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import utils.BaseDao;

import com.bean.Blog;
@Repository
public class BlogDaoImpl extends BaseDao implements BlogDao {

	@Override
	public List<Blog> getBlogListByTopic(String topic) {
		// TODO Auto-generated method stub
		String sql = "select * from forward3 f,user3 u,effect e where f.fathername = '"+topic+"' and  e.uid = u.uid and f.uname = u.uname";
		return this.jdbcTemplate.query(sql, maps);
	}
	private ParameterizedRowMapper<Blog> maps = new ParameterizedRowMapper<Blog>() {
		@Override
		public Blog mapRow(ResultSet rs,int args1) throws SQLException
		{
			Blog blog = new Blog();
			blog.setTopic(rs.getString("topic"));
			blog.setUname(rs.getString("uname"));
			blog.setBlog(rs.getString("forwardtext"));
			blog.setAspect(rs.getInt("aspect"));
			blog.setHeadpicsrc(rs.getString("headpicsrc"));
			blog.setHeadpic(rs.getBytes("headpic"));
			blog.setForwardnum(rs.getInt("forwardnum"));
			blog.setPraisenum(rs.getInt("praisenum"));
			blog.setCommentnum(rs.getInt("commentnum"));
			blog.setForwardtime(rs.getString("forwardtime"));
			return blog;
		}
	};
	
	

}
