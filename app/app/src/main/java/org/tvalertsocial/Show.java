package org.tvalertsocial;

/**
 * Created by mel on 28/11/16.
 */

public class Show {

	private String title;
	private String starttime;
	private String endtime;
	private String hashtag;

	public Show(String title, String hashtag, String startTime, String endTime) {
		this.title = title;
		this.hashtag = hashtag;
		this.starttime = startTime;
		this.endtime = endTime;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getHashtag() {
		return hashtag;
	}

	public void setHashtag(String hashtag) {
		this.hashtag = hashtag;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
}
