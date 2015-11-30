package com.bean;


public class Forward {

	private int id;
	private String taskid;
	private String uname;
	private String fathername;
	private int forwardnum;
	private String forwardtime;
	private int praisenum;
	private int aspect;
	private User user;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getTaskid() {
		return taskid;
	}
	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getFathername() {
		return fathername;
	}
	public void setFathername(String fathername) {
		this.fathername = fathername;
	}
	public int getForwardnum() {
		return forwardnum;
	}
	public void setForwardnum(int forwardnum) {
		this.forwardnum = forwardnum;
	}
	public String getForwardtime() {
		return forwardtime;
	}
	public void setForwardtime(String forwardtime) {
		this.forwardtime = forwardtime;
	}
	public int getPraisenum() {
		return praisenum;
	}
	public void setPraisenum(int praisenum) {
		this.praisenum = praisenum;
	}
	
	public int getAspect() {
		return aspect;
	}
	public void setAspect(int aspect) {
		this.aspect = aspect;
	}
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
