package org.tvalertsocial;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import com.twitter.sdk.android.core.TwitterAuthToken;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterLoginButton;

import org.tvalertsocial.custom.CustomActivity;
import org.tvalertsocial.model.TvAlertSocialUser;

import io.fabric.sdk.android.Fabric;


/**
 * The Class Login is an Activity class that shows the login screen to users.
 * The current implementation simply includes the options for Login and button
 * for Register. On login button click, it sends the Login details to Parse
 * server to verify user.
 */
public class Login extends CustomActivity
{

	/** The username edittext. */
	private EditText user;

	/** The password edittext. */
	private EditText pwd;

    /** Login progress dialog */
    private ProgressDialog loginProgressDlg;

	// Note: Your consumer key and secret should be obfuscated in your source code before shipping.
	private static final String TWITTER_KEY = "eAY5EkcwsGjLdaUUez0Zcv7Nb";
	private static final String TWITTER_SECRET = "ei3OZJn70B1DE6Bnwfeb6Ln28XGE9Xf2KDzHt3zWvhTXnLLqXq";

	private TwitterSession session;
	private String twitterToken;
	private String twitterSecret;
	private TwitterLoginButton loginButton;


	/* (non-Javadoc)
	 * @see com.chatt.custom.CustomActivity#onCreate(android.os.Bundle)
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);

		TwitterAuthConfig authConfig = new TwitterAuthConfig(TWITTER_KEY, TWITTER_SECRET);
		Fabric.with(this, new Twitter(authConfig));
		setContentView(R.layout.login);

		setTouchNClick(R.id.btnLogin);
		setTouchNClick(R.id.btnReg);
		setTouchNClick(R.id.login_button);

		user = (EditText) findViewById(R.id.user);
		pwd = (EditText) findViewById(R.id.pwd);

		loginButton = (TwitterLoginButton) findViewById(R.id.login_button);
		loginButton.setCallback(new Callback<TwitterSession>() {
			@Override
			public void success(Result<TwitterSession> result) {
				session = Twitter.getSessionManager().getActiveSession();
				TwitterAuthToken authToken = session.getAuthToken();
				twitterToken = authToken.token;
				twitterSecret = authToken.secret;
				TvAlertSocialUser user = new TvAlertSocialUser(session.getUserId(), session.getUserName(), true, true);
				Intent i = new Intent(Login.this, RoomList.class);
				i.putExtra("user", user);
				startActivity(i);
				finish();

			}

			@Override
			public void failure(TwitterException exception) {
				Toast.makeText(Login.this, "Twitter login error!", Toast.LENGTH_SHORT).show();
			}
		});


	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		//Adding the login result back to the button
		if (requestCode == 10 && resultCode == RESULT_OK)
			finish();
		loginButton.onActivityResult(requestCode, resultCode, data);
	}
	/* (non-Javadoc)
	 * @see com.chatt.custom.CustomActivity#onClick(android.view.View)
	 */

	@Override
	public void onClick(View v)
	{
		super.onClick(v);
		//if (v.getId() == R.id.login_button){
			/*loginProgressDlg = ProgressDialog.show(this, null,
					getString(R.string.alert_wait));*/

		//}

/*		if (v.getId() == R.id.btnReg)
		{
			startActivityForResult(new Intent(this, Register.class), 10);
		}
		else
		{
			// Extract form fields
			String user = this.user.getText().toString();
			String password = pwd.getText().toString();
			if (user.length() == 0 || password.length() == 0)
			{
				Utils.showDialog(this, R.string.err_fields_empty);
				return;
			}

			// Do the user authentication
            FirebaseAuth.getInstance().signInWithEmailAndPassword(user, password)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        Logger.getLogger(Login.class.getName()).log(Level.ALL, "signInWithEmail:onComplete:" + task.isSuccessful());
                        loginProgressDlg.dismiss();
                        if (!task.isSuccessful()) {

                            Logger.getLogger(Login.class.getName()).log(Level.ALL, "signInWithEmail", task.getException());
                            Toast.makeText(Login.this, "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();
                        }
                        else {
                            ArrayList<String> defaultRoom = new ArrayList<String>();
                            defaultRoom.add("home");
                            UserList.user = new TvAlertSocialUser(task.getResult().getUser().getUid(),task.getResult().getUser().getDisplayName(), task.getResult().getUser().getEmail(),true,defaultRoom);
                            startActivity(new Intent(Login.this, UserList.class));
                            finish();
                        }

                    }
                });

            loginProgressDlg = ProgressDialog.show(this, null,
                    getString(R.string.alert_wait));

		}*/

	}


}
