import CustomButton from "./CustomButton";
import { Alert, Linking, Platform } from "react-native";
import { Auth, Amplify } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import {
    WebBrowserAuthSessionResult,
    openAuthSessionAsync,
    dismissBrowser
} from "expo-web-browser";
import awsconfig from "../../src/aws-exports";

const urlOpener = async (url: string, redirectUrl: string) => {
    const response: WebBrowserAuthSessionResult = await openAuthSessionAsync(
        url,
        redirectUrl
    );

    if (response.type === "success" && Platform.OS === "ios") {
        dismissBrowser();
        return Linking.openURL(response.url);
    }
};

Amplify.configure({
    ...awsconfig,
    oauth: {
        ...awsconfig.oauth,
        urlOpener
    }
});

const SocialSignInButtons: React.FC = () => {
    const onSignInFacebook = async (): Promise<void> => {
        try {
            await Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook
            });
        } catch (e: any) {
            Alert.alert("Oops", e.message);
        }
    };

    const onSignInGoogle = async (): Promise<void> => {
        try {
            await Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google
            });
        } catch (e: any) {
            Alert.alert("Oops", e.message);
        }
    };

    const onSignInApple = () => {
        console.warn("Sign in with Apple");
    };

    return (
        <>
            <CustomButton
                text="Sign In With Facebook"
                onPress={onSignInFacebook}
                bgColor="#e7eaf4"
                fgColor="#4765a9"
            />
            <CustomButton
                text="Sign In With Google"
                onPress={onSignInGoogle}
                bgColor="#fae9cf"
                fgColor="#dd4d44"
            />
            <CustomButton
                text="Sign In With Apple"
                onPress={onSignInApple}
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
        </>
    );
};

export default SocialSignInButtons;
