import { StatusBar as ExpoBar } from "expo-status-bar";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";

import awsconfig from "./src/aws-exports";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";

Amplify.configure(awsconfig);

function App() {
    return (
        <SafeAreaProvider style={styles.root}>
            <ExpoBar style="light" />
            <Navigation />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#c5e0dd",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! : 10
    }
});

export default App;
