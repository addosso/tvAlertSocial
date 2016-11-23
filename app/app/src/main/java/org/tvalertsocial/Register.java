package org.tvalertsocial;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.view.View;
import android.widget.EditText;

import org.tvalertsocial.custom.CustomActivity;
import org.tvalertsocial.model.ChatUser;
import org.tvalertsocial.utils.Utils;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserProfileChangeRequest;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * The Class Register is the Activity class that shows user registration screen
 * that allows user to register itself on Parse server for this Chat app.
 */
public class Register extends CustomActivity
{

	/** The password EditText. */
	private EditText pwd;

	/** The email EditText. */
	private EditText email;

    /** The displayName EditText. */
    private EditText displayName;

    /** Register progress dialog */
    private ProgressDialog registerProgressDlg;

	/* (non-Javadoc)
	 * @see com.chatt.custom.CustomActivity#onCreate(android.os.Bundle)
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.register);

		setTouchNClick(R.id.btnReg);

		pwd = (EditText) findViewById(R.id.pwd);
		email = (EditText) findViewById(R.id.email);
        displayName = (EditText) findViewById(R.id.displayName);
 	}

	/* (non-Javadoc)
	 * @see com.chatt.custom.CustomActivity#onClick(android.view.View)
	 */
	@Override
	public void onClick(View v)
	{
		super.onClick(v);

        // Extract form fields
		final String password = pwd.getText().toString();
        final String email = this.email.getText().toString();
        final String displayName = this.displayName.getText().toString();

		if ( password.length() == 0 || email.length() == 0 || displayName.length() == 0)
		{
			Utils.showDialog(this, R.string.err_fields_empty);
			return;
		}

        // Register the user
        FirebaseAuth.getInstance().createUserWithEmailAndPassword(email, password) .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                Logger.getLogger(Login.class.getName()).log(Level.ALL, "createUserWithEmailAndPassword:onComplete:" + task.isSuccessful());
                registerProgressDlg.dismiss();
                if (!task.isSuccessful()) {
                    Logger.getLogger(Register.class.getName()).log(Level.ALL, "createUserWithEmailAndPassword", task.getException());
                    Utils.showDialog(
                            Register.this,
                            getString(R.string.err_singup));
                }
                else {
                    final ArrayList<String> defaultRoom = new ArrayList<String>();
                    defaultRoom.add("home");

                    // Update the user profile information
                    final FirebaseUser user = task.getResult().getUser();
                    UserProfileChangeRequest profileUpdates = new UserProfileChangeRequest.Builder()
                            .setDisplayName(displayName)
                            .setPhotoUri(Uri.parse("https://example.com/jane-q-user/profile.jpg"))
                            .build();
                    user.updateProfile(profileUpdates).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            if (task.isSuccessful()) {
                                Logger.getLogger(Register.class.getName()).log(Level.ALL, "User profile updated.");
                                // Construct the ChatUser
                                UserList.user = new ChatUser(user.getUid(),displayName, email,true,defaultRoom);
                                // Setup link to users database
                                FirebaseDatabase.getInstance().getReference("users").child(user.getUid()).setValue(UserList.user);
                                startActivity(new Intent(Register.this, UserList.class));
                                finish();
                            }
                        }
                    });

                }

            }
        });

        registerProgressDlg = ProgressDialog.show(this, null,
				getString(R.string.alert_wait));
	}
}
