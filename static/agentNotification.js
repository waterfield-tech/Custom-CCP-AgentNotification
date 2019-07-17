var devices;
var audioDevices;
var audio;
var deviceOption = 0;

async function intializeAgentNotifcation() {
  devices = await navigator.mediaDevices.enumerateDevices();
  audioDevices = devices.filter(device => device.kind === "audiooutput");
  audio = document.getElementById("notificationAudio");
  console.log("Audio Devices: ", audioDevices);
  audioOuputInfo.innerHTML = audioDevices[deviceOption].label;
}

async function changeAudioDevice() {
  deviceOption += 1;

  if (deviceOption > audioDevices.length - 1) {
    deviceOption = 0;
  }

  await audio.setSinkId(audioDevices[deviceOption].deviceId);

  console.log("Audio is being played on " + audio.sinkId);
  audioOuputInfo.innerHTML = audioDevices[deviceOption].label;
}

function playNotificationAudio() {
  console.log("Playing file");
  audio.currentTime = 0;
  audio.play();
}

function stopNotificationAudio() {
  console.log("Stopping file");
  audio.pause();
  audio.currentTime = 0;
}

function setRingtone() {
  let tone = document.getElementById("toneSelection").value;
  var source = document.getElementById("notificationAudioSource");

  if (tone == "normal") {
    source.src = "ring1.mp3";
  }
  if (tone == "user") {
    source.src = "ring2.mp3";
  }

  audio.load();
}

intializeAgentNotifcation();
