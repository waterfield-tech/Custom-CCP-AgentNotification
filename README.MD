# Custom CCP Agent Notification Add On

This add on allows you to use a custom ringtone and set its audio output source. The use case is when an agent uses a headset but goes away from their computer and will not hear the ringing in their headset or see any browser notifications. They can use this to set a different ringtone that will play through their computer's speakers instead of the headset to alert them to an incoming call. Each agent could have a unique ringtone to differentiate themselves from each other.

This is a simple Node Express app that demonstrates the changing audio settings for the audio file with and without a CCP. This functionality does not change the default ringtone the CCP will play. This is a secondary ringtone that will play in addition to the default on an incoming call, but on a different source.

## Getting Started

### Simple Demo

1. Clone the repo
2. Change to repo directory and enter `npm install`.
3. To run, enter `node server.js`.
4. Open a browser and navigate to `localhost:4200`.
5. There are two audio files provided. You can change them in the 'Select Notification Ringtone'.
6. Next, click the 'Set Audio Output' button to cycle through the available audio sources. The current audio source will be listed underneath the button.
7. Play the audio file to test with different sources.

### CCP Demo

1. Follow steps above to clone repo and install dependencies.
2. Open the `ccp.js` file in the `static` directory.
3. Change the first line `var ccpUrl = "https://{{your connect instance}}.awsapps.com/connect/ccp#/";` to the url of your connect instance.
4. On the console page for your Connect instance, go to 'Application integration' and add origin `http:localhost:4200`.
5. To run, enter `node server.js`.
6. Open a browser and navigate to `localhost:4200/ccp`.
7. Login to the CCP and click the 'Set Audio Output' button to cycle through the available audio sources. The current audio source will be listed underneath the button.
8. Make a call to your Connect instance. You should here the CCP ringtone play through your headset and the secondary ringtone through your selected audio source.

## Agent Notification

**initializeAgentNotification()** - Gets all the possible audio output devices that can be used to play the audio element from.

**changeAudioDevice()** - Cycles through the possible audio output sources and sets that device to the audio element.

**playNotificationAudio()** - Sets the audio element to the beggining of the file and plays the audio.

**stopNotificationAudio()** - Pauses the aduio element and resets to the beggining of the file.

**setRingtone()** - This is an example function to select the different ringtones. This would need to be edited depending on how you want to implement changing ringtones and setting the source audio file.

## CCP Integration

There are many ways this could be implemented with a custom CCP so that will be left up to the developer. You will need to use the [Connect Streams API](https://github.com/aws/amazon-connect-streams) as this provides access to CCP related functions and data.

You'll need to add a call to `playNotificationAudio()` in the event subscription method.

```javascript
connect.contact(subscribeToContactEvents);

function subscribeToContactEvents(contact) {
  playNotificationAudio();
}
```

The audio loops automatically as defined in the audio element in the html.

Next, on the event `contact.onAccepted()`, add a call to `stopNotificationAudio()`. This stops the audio and resets it back to the beginning. It's a good idea to add `stopNotificationAudio()` to the `contact.onConnected` and `contact.onEnded()`, as this will cover the case of missed call status.

That's all the needs to be done to get the CCP to play the audio while it's ringing.

## Notes

- A good feature to add on top of this is to allow the agent to toggle this notification on and off, otherwise it will always play the additional ringtone. It only needs to be enabled if they need the extra notification method.

- In `setRingtone()`, the audio file sources are hard coded just for example purposes. A better way would be to set up a way for the agent to upload or reference their own ringtones. Since this could be in so many other ways, that's up to the developer to implement.

- In this example, the audio element is shown on the page but it should be hidden from view.

- You may encounter the error `Uncaught (in promise) DOMException` when trying to play the audio file. There is a feature of the browser meant to prevent auto-playing of audio and video in new tabs and pop-ups. The user must click or interact with the page first before the call to `audio.play()` is invoked. Check out [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) for more information. This could be solved by including the toggle notification on and off feature mentioned above.
