package org.tvalertsocial.model;

import org.tvalertsocial.Channel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mel on 24/11/16.
 */

public class Room {

	private Channel channel;
	private List<TvAlertSocialUser> users;

	public Room(Channel channel) {
		this.users = new ArrayList<>();
		this.channel = channel;

	}

	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}

	public List<TvAlertSocialUser> getUsers() {
		return users;
	}

	public void setUsers(List<TvAlertSocialUser> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return channel.getShow().getTitle();
	}
}
