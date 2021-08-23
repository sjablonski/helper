const fallDetectAlert = {
  title: "Wykryto upadek ",
  body:
    "UWAGA! Aplikacja wykryła upadek w ciągu 30 sek zostanie wysłane zgłoszenie.",
  categoryId: "fallDetectorAlert",
  android: {
    channelId: "fallDetectorChannelAndroid",
    color: "#FF0000"
  },
  ios: {
    sound: true,
    _displayInForeground: true
  }
};

const sentEntryAlert = {
  title: "Alert",
  body: "Zgłoszenie zostało wysłane",
  android: {
    channelId: "fallDetectorChannelAndroid",
    color: "#FF0000"
  },
  ios: {
    sound: true
  }
};

export {fallDetectAlert, sentEntryAlert};
