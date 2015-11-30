package com.hotmap.hotmapDao;

import java.util.List;

import com.bean.Hotmap;

public interface HotmapDao {
	List<Hotmap> getHotdegreeList(String topic);

}
