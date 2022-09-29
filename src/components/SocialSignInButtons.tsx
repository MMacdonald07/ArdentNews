import CustomButton from "./CustomButton";
import { View } from "react-native";

const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn("Sign in with Facebook");
    };

    const onSignInGoogle = () => {
        console.warn("Sign in with Google");
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
