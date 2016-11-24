package org.tvalertsocial.model;

import com.google.firebase.database.IgnoreExtraProperties;

import java.io.Serializable;

/**
 * The Class ChatUse is a Java Bean class that represents a single user.
 */
@IgnoreExtraProperties
public class TvAlertSocialUser implements Serializable {

    public long id;
    public String username;
    private boolean onTwitter;
    public Boolean online;
    public Room room;

    public TvAlertSocialUser() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public TvAlertSocialUser(long id, String username, Boolean online, boolean onTwitter) {
        this.id = id;
        this.username = username;
        this.onTwitter = onTwitter;
        this.online = online;
        this.room = null;   //ancora non è entrato in nessuna room, si è solo loggato
    }

    public String getUsername() {
        return username;
    }

    public long getId() {
        return id;
    }


    public Boolean isOnline() {
        return online;
    }

    public Room getRoom() {
        return room;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public boolean isOnTwitter() {
        return onTwitter;
    }

    public void setOnTwitter(boolean onTwitter) {
        this.onTwitter = onTwitter;
    }
}