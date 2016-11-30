package org.tvalertsocial;

import android.os.Parcel;
import android.os.Parcelable;

import com.twitter.sdk.android.core.TwitterSession;

/**
 * Created by mel on 30/11/16.
 */

public class TwitterContent implements Parcelable {

	private TwitterSession twitterSession;

	public TwitterSession getTwitterSession() {
		return twitterSession;
	}

	public void setTwitterSession(TwitterSession twitterSession) {
		this.twitterSession = twitterSession;
	}

	protected TwitterContent(Parcel in) {
	}

	public static final Creator<TwitterContent> CREATOR = new Creator<TwitterContent>() {
		@Override
		public TwitterContent createFromParcel(Parcel in) {
			return new TwitterContent(in);
		}

		@Override
		public TwitterContent[] newArray(int size) {
			return new TwitterContent[size];
		}
	};

	@Override
	public int describeContents() {
		return 0;
	}

	@Override
	public void writeToParcel(Parcel dest, int flags) {
	}
}
