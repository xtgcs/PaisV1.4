package com.blog.blogDao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
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
		System.out.println("get weiboList.do ============sql========="+sql);
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
			blog.setId(rs.getInt(1));
			return blog;
		}
	};
	@Override
	public List<Blog> getBlogListByTopic(String topic, int page, int size) {
		// TODO Auto-generated method stub
		String sql = "select * from forward3 f,user3 u,effect e where f.fathername = '"+topic+"' and  e.uid = u.uid and f.uname = u.uname"
		+ (size > 0 ?(" limit " + page*size+","+size) : "");
		return this.jdbcTemplate.query(sql, maps);
	}
	@Override
	public int getTotalPageByTopic(String topic,int size) {
		// TODO Auto-generated method stub
		String sql="select count(*) from forward3  f where f.fathername='"+topic+"'";
		int totalNum=this.jdbcTemplate.queryForInt(sql);
		if(totalNum%size==0)
		return totalNum/size;
		else
			return totalNum/size+1;
			
	}
	
	

}
