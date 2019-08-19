var ccpUrl = "https://{{your connect instance}}.awsapps.com/connect/ccp#/";

window.ccp = window.ccp || {};

connect.core.initCCP(containerDiv, {
  ccpUrl: ccpUrl,
  loginPopup: true,
  softphone: {
    allowFramedSoftphone: true
  }
});

connect.contact(subscribeToContactEvents);
connect.agent(subscribeToAgentEvents);

// Contact Events
function subscribeToContactEvents(contact) {
  window.ccp.contact = contact;
  playNotificationAudio();
  console.log("[Connnect Init] Subscribing to events for contact");
  if (
    window.ccp.contact.getActiveInitialConnection() &&
    window.ccp.contact.getActiveInitialConnection().getEndpoint()
  ) {
    console.log(
      "[Connect Init] New contact is from " +
        window.ccp.contact.getActiveInitialConnection().getEndpoint()
          .phoneNumber
    );
  } else {
    console.log("[Connect Init] This is an existing contact for this agent");
  }
  console.log(
    "[Connect Init] Contact is from queue " + window.ccp.contact.getQueue().name
  );
  console.log(
    "[Connect Init] Contact attributes are " +
      JSON.stringify(window.ccp.contact.getAttributes())
  );

  window.ccp.contact.onIncoming(handleContactIncoming);
  window.ccp.contact.onAccepted(handleContactAccepted);
  window.ccp.contact.onConnected(handleContactConnected);
  window.ccp.contact.onEnded(handleContactEnded);
}

function handleContactIncoming(contact) {
  if (window.ccp.contact) {
    console.log(
      "[contact.onIncoming] Contact is incoming. Contact state is " +
        window.ccp.contact.getStatus().type
    );
  } else {
    console.log("[contact.onIncoming] Contact is incoming. Null contact");
  }
}

function handleContactAccepted(contact) {
  stopNotificationAudio();
  if (window.ccp.contact) {
    console.log(
      "[contact.onAccepted] Contact accepted by agent. Contact state is " +
        window.ccp.contact.getStatus().type
    );
  } else {
    console.log(
      "[contact.onAccepted] Contact accepted by agent. Null contact passed to event handler"
    );
  }
}

function handleContactConnected(contact) {
  stopNotificationAudio();
  if (window.ccp.contact) {
    console.log(
      "[contact.onConnected] Contact connected to agent. Contact state is " +
        window.ccp.contact.getStatus().type
    );
  } else {
    console.log(
      "[contact.onConnected] Contact connected to agent. Null contact passed to event handler"
    );
  }
}

function handleContactEnded(contact) {
  stopNotificationAudio();
  if (window.ccp.contact) {
    console.log(
      "[contact.onEnded] Contact has ended. Contact state is " +
        window.ccp.contact.getStatus().type
    );
  } else {
    console.log(
      "[contact.onEnded] Contact has ended. Null contact passed to event handler"
    );
  }
}

// Agent Events
function subscribeToAgentEvents(agent) {
  window.ccp.agent = agent;
  console.log(
    "[Connect Init] Subscribing to events for agent " +
      window.ccp.agent.getName()
  );
  console.log(
    "[Connect Init] Agent is currently in status of " +
      window.ccp.agent.getStatus().name
  );
  window.ccp.agent.onRefresh(handleAgentRefresh);
  window.ccp.agent.onRoutable(handleAgentRoutable);
  window.ccp.agent.onNotRoutable(handleAgentNotRoutable);
  window.ccp.agent.onOffline(handleAgentOffline);
}

function handleAgentRefresh(agent) {
  console.log(
    "[agent.onRefresh] Agent data refreshed. Agent status is " +
      window.ccp.agent.getStatus().name
  );
}

function handleAgentRoutable(agent) {
  console.log(
    "[agent.onRoutable] Agent is routable. Agent status is " +
      window.ccp.agent.getStatus().name
  );
}

function handleAgentNotRoutable(agent) {
  console.log(
    "[agent.onNotRoutable] Agent is online, but not routable. Agent status is " +
      window.ccp.agent.getStatus().name
  );
}

function handleAgentOffline(agent) {
  console.log(
    "[agent.onOffline] Agent is offline. Agent status is " +
      window.ccp.agent.getStatus().name
  );
}
