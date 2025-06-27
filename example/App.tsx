import ExpoTiktokEvent from "expo-tiktok-event";
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function App() {
  const tikTokAppid = Platform.select({
    android: "7511853962595303431",
    ios: "7512251190466347016",
  });
  const appid = Platform.select({
    android: "kr.carlab.www",
    ios: "1557822254",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Constants">
          <Text>{ExpoTiktokEvent.TIKTOK_INIT_STATUS.SUCCESS}</Text>
          <Text>{ExpoTiktokEvent.TIKTOK_INIT_STATUS.FAIL}</Text>
        </Group>

        <Group name="Async functions">
          <Button
            title="Set value"
            onPress={async () => {
              const { status, error } = await ExpoTiktokEvent.initTikTokSdk(
                appid!,
                tikTokAppid!
              );
              if (error) {
                console.log(status, ":", error);
              } else {
                console.log(status);
                ExpoTiktokEvent.startTrack();
                ExpoTiktokEvent.identifyUser(
                  "testId",
                  "testName",
                  "testPhone",
                  "testEmail"
                );
              }
            }}
          />

          <Button
            title="events"
            onPress={async () => {
              ExpoTiktokEvent.trackRegisterEvent();
              ExpoTiktokEvent.trackLoginEvent();
            }}
          />
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
