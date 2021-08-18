package com.cosog.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class AcquisitionItemColumnsMap {
	private static Map<String, List<String>> map;
	static {
		map = new HashMap<String, List<String>>();
	}

	public static Map<String, List<String>> getMapObject() {
		return map;
	}
	@SuppressWarnings("unused")
	private void addMapObject(final String name, final List<String> o) {
		map.put(name, o);
	}

}
