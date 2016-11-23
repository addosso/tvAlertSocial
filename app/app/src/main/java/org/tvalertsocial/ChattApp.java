package org.tvalertsocial;

import android.app.Application;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;


/**
 * The Class ChattApp is the Main Application class of this app. The onCreate
 * method of this class initializes the Parse.
 */
public class ChattApp extends Application
{

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

    }


}
