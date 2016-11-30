package org.tvalertsocial;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.widget.SwipeRefreshLayout;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.gson.Gson;

import org.apache.commons.io.IOUtils;
import org.tvalertsocial.custom.CustomActivity;
import org.tvalertsocial.model.Room;
import org.tvalertsocial.model.TvAlertSocialUser;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by mel on 25/11/16.
 */

public class RoomList extends CustomActivity {

	public static TvAlertSocialUser user;
	private List<Room> rooms = new ArrayList<>();
	private SwipeRefreshLayout mSwipeRefreshLayout;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.room_list);
		final ListView roomsListView = (ListView) findViewById(R.id.room_list);
		Intent i = getIntent();
		Bundle extras = i.getExtras();
		user = (TvAlertSocialUser) extras.get("user");

		String oraInOnda = getOnAirShows();
		updateRoomListFromJson(oraInOnda);
		final ArrayAdapter<Room> roomsAdapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, rooms);
		roomsListView.setAdapter(roomsAdapter);

		//getting layout for swipe down refresh action
		mSwipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swiperefresh);
		mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {

			@Override
			public void onRefresh() {
				String oraInOnda = getOnAirShows();
				updateRoomListFromJson(oraInOnda);
				mSwipeRefreshLayout.setRefreshing(false);
			}
		});

		//setting onClickListener for items in ListView
		roomsListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				Intent i = new Intent(RoomList.this, Chat.class);
				i.putExtra("user", user);
				i.putExtra("item_show_title", rooms.get(position).getChannel().getShow().getTitle());
				i.putExtra("hashtag", rooms.get(position).getChannel().getShow().getHashtag());
				/*i.putExtra("item", roomsListView.getItemIdAtPosition(position));
				i.putExtra("item_show_title", rooms.get(position).getChannel().getShow().getTitle());
				*/
				startActivity(i);
			}
		});

		getActionBar().setDisplayHomeAsUpEnabled(false);  // ??
	}


	private void updateRoomListFromJson(String onAirShows) {
		Gson gson = new Gson();
		List<Channel> channels = Arrays.asList(gson.fromJson(onAirShows, Channel[].class));
		rooms.clear();
		for (Channel channel : channels) {
			rooms.add(new Room(channel));
		}
	}

	private String getOnAirShows() {
		//recupero le rooms (dirette)
		/*String oraInOnda = null;
		try {
			 oraInOnda = new OnAirRetriever().execute().get();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}*/
		InputStream inp = null;
		inp = getResources().openRawResource(R.raw.response);


		String oraInOnda = null;
		try {
			oraInOnda = IOUtils.toString(inp, StandardCharsets.UTF_8);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return oraInOnda;
	}

	/*@Override
	public boolean onCreateOptionsMenu(Menu menu){
		MenuInflater menuInflater = getMenuInflater();
		menuInflater.inflate(R.menu.menu_refresh, menu);
		return true;
	}*/

}
