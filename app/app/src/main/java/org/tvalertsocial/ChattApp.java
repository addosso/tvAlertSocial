package org.tvalertsocial;

import android.app.Application;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;
import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;

import io.fabric.sdk.android.Fabric;


/**
 * The Class ChattApp is the Main Application class of this app. The onCreate
 * method of this class initializes the Parse.
 */
public class ChattApp extends Application
{

	// Note: Your consumer key and secret should be obfuscated in your source code before shipping.
	private static final String TWITTER_KEY = "s93tHlfyEY4Ty9E6WgAqNozKG";
	private static final String TWITTER_SECRET = "7avnhufmzdDXMiiYS3Il1UK5Fnfg8u1aovq9hNDOQukDFqhgvp";


    /** The Firebase database */
	private FirebaseDatabase database;

    /** Firebase Authentication component */
    private FirebaseAuth firebaseAuth;

    /* (non-Javadoc)
	 * @see android.app.Application#onCreate()
	 */
	@Override
	public void onCreate()
	{
		super.onCreate();
		TwitterAuthConfig authConfig = new TwitterAuthConfig(TWITTER_KEY, TWITTER_SECRET);
		Fabric.with(this, new Twitter(authConfig));

    }


}
