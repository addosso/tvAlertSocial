package org.tvalertsocial;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import org.tvalertsocial.custom.CustomActivity;
import org.tvalertsocial.model.TvAlertSocialUser;

import java.util.ArrayList;


/**
 * The Class UserList is the Activity class. It shows a list of all users of
 * this app. It also shows the Offline/Online status of users.
 */
public class UserList extends CustomActivity
{

	/** Users database reference */
	DatabaseReference database;
	/** The Chat list. */
	private ArrayList<TvAlertSocialUser> uList;

	/** The user. */
	public static TvAlertSocialUser user;

	/* (non-Javadoc)
	 * @see android.support.v4.app.FragmentActivity#onCreate(android.os.Bundle)
	 */
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.user_list);
		// Get reference to the Firebase database
		database  = FirebaseDatabase.getInstance().getReference();

		getActionBar().setDisplayHomeAsUpEnabled(false);

		updateUserStatus(true);
	}

	/* (non-Javadoc)
	 * @see android.support.v4.app.FragmentActivity#onDestroy()
	 */
	@Override
	protected void onDestroy()
	{
		super.onDestroy();
		updateUserStatus(false);
	}

	/* (non-Javadoc)
	 * @see android.support.v4.app.FragmentActivity#onResume()
	 */
	@Override
	protected void onResume()
	{
		super.onResume();
		loadUserList();

	}

	/**
	 * Update user status.
	 * 
	 * @param online
	 *            true if user is online
	 */
	private void updateUserStatus(boolean online)
	{
		// TODO: Add user status updates
    }

	/**
	 * Load list of users.
	 */
	private void loadUserList()
	{
		final ProgressDialog dia = ProgressDialog.show(this, null,
				getString(R.string.alert_loading));

        // Pull the users list once no sync required.
	   /* database.child("users").addListenerForSingleValueEvent(new ValueEventListener() {
			@Override
            public void onDataChange(DataSnapshot dataSnapshot) {dia.dismiss();
                long size  = dataSnapshot.getChildrenCount();
                if(size == 0) {
					Toast.makeText(UserList.this,
							R.string.msg_no_user_found,
							Toast.LENGTH_SHORT).show();
					return;
				}
                uList = new ArrayList<TvAlertSocialUser>();
                for(DataSnapshot ds : dataSnapshot.getChildren()) {
                    TvAlertSocialUser user = ds.getValue(TvAlertSocialUser.class);
                    Logger.getLogger(UserList.class.getName()).log(Level.ALL,user.getUsername());
                    if(!user.getId().contentEquals(FirebaseAuth.getInstance().getCurrentUser().getUid()))
                        uList.add(user);
                }
                ListView list = (ListView) findViewById(R.id.list);
                list.setAdapter(new UserAdapter());
                list.setOnItemClickListener(new OnItemClickListener() {

                    @Override
                    public void onItemClick(AdapterView<?> arg0,
                                            View arg1, int pos, long arg3)
                    {
                        startActivity(new Intent(UserList.this,
                                Chat.class).putExtra(
                                Const.EXTRA_DATA,  uList.get(pos)));
                    }
                });
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });*/
	}

	/**
	 * The Class UserAdapter is the adapter class for User ListView. This
	 * adapter shows the user name and it's only online status for each item.
	 */
	private class UserAdapter extends BaseAdapter
	{

		/* (non-Javadoc)
		 * @see android.widget.Adapter#getCount()
		 */
		@Override
		public int getCount()
		{
			return uList.size();
		}

		/* (non-Javadoc)
		 * @see android.widget.Adapter#getItem(int)
		 */
		@Override
		public TvAlertSocialUser getItem(int arg0)
		{
			return uList.get(arg0);
		}

		/* (non-Javadoc)
		 * @see android.widget.Adapter#getItemId(int)
		 */
		@Override
		public long getItemId(int arg0)
		{
			return arg0;
		}

		/* (non-Javadoc)
		 * @see android.widget.Adapter#getView(int, android.view.View, android.view.ViewGroup)
		 */
		@Override
		public View getView(int pos, View v, ViewGroup arg2)
		{
			if (v == null)
				v = getLayoutInflater().inflate(R.layout.chat_item, null);

			TvAlertSocialUser c = getItem(pos);
			TextView lbl = (TextView) v;
			lbl.setText(c.getUsername());
			lbl.setCompoundDrawablesWithIntrinsicBounds(
					c.isOnline() ? R.drawable.ic_online
							: R.drawable.ic_offline, 0, R.drawable.arrow, 0);

			return v;
		}

	}
}
