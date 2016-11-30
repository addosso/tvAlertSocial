package org.tvalertsocial;

import android.os.AsyncTask;

import io.fabric.sdk.android.services.network.HttpRequest;

/**
 * Created by mel on 28/11/16.
 */

public class OnAirRetriever extends AsyncTask<Void, Void, String> {
	private final String SERVER_URL = "http://192.168.43.44:8083/oraInOnda";
	private String result = null;

	@Override
	protected String doInBackground(Void... params) {
		String oraInOnda = HttpRequest
				.get(SERVER_URL)
				.body();
		result = oraInOnda;
		return result;
	}

}
