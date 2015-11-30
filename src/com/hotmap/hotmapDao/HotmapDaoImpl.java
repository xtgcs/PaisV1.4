package com.hotmap.hotmapDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import utils.BaseDao;

import com.bean.Hotmap;
import com.bean.User;
@Repository
public class HotmapDaoImpl extends BaseDao implements HotmapDao {

	@Override
	public List<Hotmap> getHotdegreeList(String topic) {
		// TODO Auto-generated method stub
		String sql = "select * from hotmapdegree where topic = '"+topic+"'";
		return this.jdbcTemplate.query(sql, maps);
	}
	
	private ParameterizedRowMapper<Hotmap> maps = new ParameterizedRowMapper<Hotmap>() {
		@Override
		public Hotmap mapRow(ResultSet rs,int args1) throws SQLException
		{
			Hotmap hotmap = new Hotmap();
			hotmap.setTopic(rs.getString("topic"));
			hotmap.setHotdegree(rs.getFloat("hotdegree"));
			hotmap.setArea(rs.getString("area"));
			
			return hotmap;
		}
	};

}
