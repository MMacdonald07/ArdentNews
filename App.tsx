import { StatusBar as ExpoBar } from "expo-status-bar";
import {
    Button,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Amplify } from "aws-amplify";
// @ts-ignore
import { AmplifyTheme, withAuthenticator } from "aws-amplify-react-native";

import awsconfig from "./src/aws-exports";

Amplify.configure({
    ...awsconfig,
    Auth: { mandatorySignIn: false },
    Analytics: { disabled: true }
});

const signUpConfig = {
    hiddenDefaults: ["phone_number"]
};

function App() {
    return (
        <View style={styles.container}>
            <ExpoBar style="auto" />
            <Text>Hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 20
    }
});

const MyTheme = {
    ...AmplifyTheme,
    button: {
        ...AmplifyTheme.button,
        backgroundColor: "red"
    },
    signInButtonIcon: { display: "none" }
};

export default withAuthenticator(App, {
    includeGreetings: true,
    authenticatorComponents: [],
    federated: null,
    theme: MyTheme,
    signUpConfig
});
