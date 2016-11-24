package org.tvalertsocial.model;

import java.util.List;

/**
 * Created by mel on 24/11/16.
 */

public class Room {

	private String title;
	private List<TvAlertSocialUser> users;

	public Room(String title, List<TvAlertSocialUser> users) {
		this.users = users;
		this.title = title;

	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<TvAlertSocialUser> getUsers() {
		return users;
	}

	public void setUsers(List<TvAlertSocialUser> users) {
		this.users = users;
	}
}
