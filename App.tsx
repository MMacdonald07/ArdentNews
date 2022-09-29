import { SafeAreaView } from "react-navigation";
import { StatusBar as ExpoBar } from "expo-status-bar";
import Navigation from "./src/navigation";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";

import awsconfig from "./src/aws-exports";

Amplify.configure(awsconfig);

function App() {
    return (
        <SafeAreaView style={styles.root}>
            <ExpoBar style="auto" />
            <Navigation />
        </SafeAreaView>
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
