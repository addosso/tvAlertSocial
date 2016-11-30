package org.tvalertsocial;

import android.app.ActionBar;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.AbsListView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;

import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.tweetcomposer.TweetComposer;
import com.twitter.sdk.android.tweetui.SearchTimeline;
import com.twitter.sdk.android.tweetui.TweetTimelineListAdapter;

import org.tvalertsocial.custom.CustomActivity;
import org.tvalertsocial.model.Conversation;
import org.tvalertsocial.model.TvAlertSocialUser;

import java.util.ArrayList;
import java.util.Date;


/**
 * The Class Chat is the Activity class that holds main chat screen. It shows
 * all the conversation messages between two users and also allows the user to
 * send and receive messages.
 */
public class Chat extends CustomActivity {

    /**
     * The Conversation list.
     */
    private ArrayList<Conversation> convList;

 /*   *//**
	 * The chat adapter.
	 *//*
	private ChatAdapter adp;*/

    /**
     * The Editext to compose the message.
     */
    private EditText txt;

    /**
	 * The user name of user .
	 */
	private TvAlertSocialUser user;

    /**
     * The date of last message in conversation.
     */
    private Date lastMsgDate;

	private TwitterSession twitterSession = null;

	private String hashtag;

	private ListView tweetList;

	/* (non-Javadoc)
	 * @see android.support.v4.app.FragmentActivity#onCreate(android.os.Bundle)
	 */
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.chat);

		convList = new ArrayList<>();
		tweetList = (ListView) findViewById(R.id.list);
		final ArrayAdapter<Conversation> conversationsAdapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, convList);
		tweetList.setAdapter(conversationsAdapter);
		tweetList.setTranscriptMode(AbsListView.TRANSCRIPT_MODE_ALWAYS_SCROLL);
		tweetList.setStackFromBottom(true);

        /*txt = (EditText) findViewById(R.id.txt);
		txt.setInputType(InputType.TYPE_CLASS_TEXT
                | InputType.TYPE_TEXT_FLAG_MULTI_LINE);*/

        setTouchNClick(R.id.btnSend);

		//getting Intents
		Bundle extras = getIntent().getExtras();
		user = (TvAlertSocialUser) extras.get("user");
		hashtag = (String) extras.get("hashtag");
		String room_name = (String) extras.get("item_show_title");

		//getting twitter session
		twitterSession = Twitter.getSessionManager().getActiveSession();

		ActionBar actionBar = getActionBar();
		if(actionBar != null)
			actionBar.setTitle(room_name);

		updateTweetListBySearch();

    }

    /* (non-Javadoc)
     * @see android.support.v4.app.FragmentActivity#onResume()
     */
    @Override
    protected void onResume() {
        super.onResume();
        loadConversationList();
    }

    /* (non-Javadoc)
     * @see android.support.v4.app.FragmentActivity#onPause()
     */
    @Override
    protected void onPause() {
        super.onPause();
    }

    /* (non-Javadoc)
     * @see com.socialshare.custom.CustomFragment#onClick(android.view.View)
     */
    @Override
    public void onClick(View v) {
        super.onClick(v);
        if (v.getId() == R.id.btnSend) {
			sendMessageByTweet();
		}

    }

	private void updateTweetListBySearch() {
		final SearchTimeline searchTimeline = new SearchTimeline.Builder().query(hashtag).build();
		final TweetTimelineListAdapter adapter = new TweetTimelineListAdapter(this, searchTimeline);
		tweetList.setAdapter(adapter);
		/*
		ArrayList<Tweet> tweets = new ArrayList<> ();
		for(int i= 0; i<adapter.getCount();i++)
			tweets.add(adapter.getItem(i));
		*/

	}

	private void sendMessageByTweet() {
/*		if (txt.length() == 0)
			return;*/

/*		InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
		imm.hideSoftInputFromWindow(txt.getWindowToken(), 0);*/

//		String message = txt.getText().toString();

		if (user != null && user.isOnTwitter() && twitterSession != null) {
			TweetComposer.Builder builder = new TweetComposer.Builder(this)
					.text(hashtag + " ");
			builder.show();
//			com.twitter.sdk.android.core.services.StatusesService statusesService = Twitter.getApiClient(twitterSession).getStatusesService();


		}


//		txt.setText(null);
	}

    /**
     * Call this method to Send message to opponent. It does nothing if the text
     * is empty otherwise it creates a Parse object for Chat message and send it
     * to Parse server.
     */
	private void sendMessage() {/*
		if (txt.length() == 0)
            return;

        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(txt.getWindowToken(), 0);

        String s = txt.getText().toString();

        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if(user != null) {
            final Conversation conversation = new Conversation(s,
                    Calendar.getInstance().getTime(),
                    user.getUid(),
                    buddy.getId() + "",
                    "");
            conversation.setStatus(Conversation.STATUS_SENDING);
            convList.add(conversation);
            final String key = FirebaseDatabase.getInstance()
                    .getReference("messages")
                    .push().getKey();
            FirebaseDatabase.getInstance().getReference("messages").child(key)
                    .setValue(conversation)
                    .addOnCompleteListener(new OnCompleteListener<Void>() {
                                               @Override
                                               public void onComplete(@NonNull Task<Void> task) {
                                                   if (task.isSuccessful()) {
                                                       convList.get(convList.indexOf(conversation)).setStatus(Conversation.STATUS_SENT);
                                                   } else {
                                                       convList.get(convList.indexOf(conversation)).setStatus(Conversation.STATUS_FAILED);
                                                   }
                                                   FirebaseDatabase.getInstance()
                                                           .getReference("messages")
                                                           .child(key).setValue(convList.get(convList.indexOf(conversation)))
                                                           .addOnCompleteListener(new
                                                                                          OnCompleteListener<Void>() {
                                                                                              @Override
                                                                                              public void onComplete(@NonNull Task<Void> task) {
                                                                                                  adp.notifyDataSetChanged();
                                                                                              }
                                                                                          });

                                               }
                                           }
                    );
        }
        adp.notifyDataSetChanged();
        txt.setText(null);*/
	}

    /**
     * Load the conversation list from Parse server and save the date of last
     * message that will be used to load only recent new messages
     */
	private void loadConversationList() {/*

        FirebaseDatabase.getInstance().getReference("messages").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                if(user != null) {
                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
                        Conversation conversation = ds.getValue(Conversation.class);
                        if (conversation.getReceiver().contentEquals(user.getUid()) || conversation.getSender().contentEquals(user.getUid())) {
                            convList.add(conversation);
                            if (lastMsgDate == null
                                    || lastMsgDate.before(conversation.getDate()))
                                lastMsgDate = conversation.getDate();

                            adp.notifyDataSetChanged();

                        }
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

  */
	}

    /**
     * The Class ChatAdapter is the adapter class for Chat ListView. This
     * adapter shows the Sent or Receieved Chat message in each list item.
	 *//*
	private class ChatAdapter extends BaseAdapter {

        *//* (non-Javadoc)
		 * @see android.widget.Adapter#getCount()
         *//*
		@Override
        public int getCount() {
            return convList.size();
        }

        *//* (non-Javadoc)
		 * @see android.widget.Adapter#getItem(int)
         *//*
		@Override
        public Conversation getItem(int arg0) {
            return convList.get(arg0);
        }

        *//* (non-Javadoc)
		 * @see android.widget.Adapter#getItemId(int)
         *//*
		@Override
        public long getItemId(int arg0) {
            return arg0;
        }

        *//* (non-Javadoc)
		 * @see android.widget.Adapter#getView(int, android.view.View, android.view.ViewGroup)
         *//*
		@SuppressLint("InflateParams")
        @Override
        public View getView(int pos, View v, ViewGroup arg2) {
            Conversation c = getItem(pos);
            if (c.isSent())
                v = getLayoutInflater().inflate(R.layout.chat_item_sent, null);
            else
                v = getLayoutInflater().inflate(R.layout.chat_item_rcv, null);

            TextView lbl = (TextView) v.findViewById(R.id.lbl1);
            lbl.setText(DateUtils.getRelativeDateTimeString(Chat.this, c
                            .getDate().getTime(), DateUtils.SECOND_IN_MILLIS,
                    DateUtils.DAY_IN_MILLIS, 0));

            lbl = (TextView) v.findViewById(R.id.lbl2);
            lbl.setText(c.getMsg());

            lbl = (TextView) v.findViewById(R.id.lbl3);
            if (c.isSent()) {
                if (c.getStatus() == Conversation.STATUS_SENT)
                    lbl.setText(R.string.delivered_text);
                else {
                    if (c.getStatus() == Conversation.STATUS_SENDING)
                        lbl.setText(R.string.sending_text);
                    else {
                        lbl.setText(R.string.failed_text);
                    }
                }
            } else
                lbl.setText("");

            return v;
        }

    }*/

    /* (non-Javadoc)
     * @see android.app.Activity#onOptionsItemSelected(android.view.MenuItem)
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }
}
