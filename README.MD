# Custom CCP Agent Notification Add On

This add on allows you to use a custom ringtone and set its audio output source. The use case is when an agent uses a headset but goes away from their computer and will not hear the ringing in their headset or see any browser notifications. They can use this to set a different ringtone that will play through their computer's speakers instead of the headset to alert them to an incoming call. Each agent could have a unique ringtone to differentiate themselves from each other.

This is a simple Node Express app that only demonstrates the changing audio settings for the audio file. It does not include a ccp. This also does not change the default ringtone the ccp will play. This is a secondary ringtone that will play in addition to the default on an incoming call, but on a different source.

## Getting Started

1. Clone the repo
2. Change to repo directory and enter `npm install`
3. To run, enter `node server.js`
4. Open a browser and navigate to `localhost:4200`
5. There are two audio files provided. You can change them in the 'Select Notification Ringtone'
6. Next, click the 'Set Audio Output' button to cycle through the available audio sources. The current audio source will be listed underneath the button.
7. Play the audio file to test with different sources.

## CCP Integration

There are many ways this could be implemented with a custom ccp so that will be left up to the developer. You will need to use the [Connect Streams API](https://github.com/aws/amazon-connect-streams) as this provides access to ccp related functions and data.

You'll need to add a call to `playNotificationAudio()` in the event subscription method `contact.onIncoming()`. The audio loops automatically as defined in the audio element in the html.

Next, on the event `contact.onAccepted()`, add a call to `stopNotificationAudio()`. This stops the audio and resets it back to the beginning.

That's all the needs to be done to get the CCP to play the audio while it's ringing.

## Notes

- A good feature to add on top of this is to allow the agent to toggle this notification on and off, otherwise it will always play the additional ringtone. It only needs to be enabled if they need the extra notification method.

- In `setRingtone()`, the audio file sources are hard coded just for example purposes. A better way would be to set up a way for the agent to upload or reference their own ringtones. Since this could be in so many other ways, that's up to the developer to implement.

- In this example, the audio element is shown on the page but it should be hidden from view.
