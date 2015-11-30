package com.hotmap.hotmapService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bean.Hotmap;
import com.hotmap.hotmapDao.HotmapDao;
@Service
public class HotmapServiceImpl implements HotmapService {

	@Resource HotmapDao hotmapDao;
	@Override
	public List<Hotmap> getHotmapList(String topic) {
		// TODO Auto-generated method stub
		return hotmapDao.getHotdegreeList(topic);
	}

}
