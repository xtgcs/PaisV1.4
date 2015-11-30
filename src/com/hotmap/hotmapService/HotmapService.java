package com.hotmap.hotmapService;

import java.util.List;

import com.bean.Hotmap;

public interface HotmapService {
	List<Hotmap> getHotmapList(String topic);

}
