import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackParamList } from "../../navigation/index";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useForm } from "react-hook-form";

type SignUpForgotPasswordProp = StackNavigationProp<
    NativeStackParamList,
    "ForgotPassword",
    "SignUp"
>;

type FormValues = {
    username: string;
    password: string;
};

const SignInScreen: React.FC = () => {
    const navigation = useNavigation<SignUpForgotPasswordProp>();
    const { height }: { height: number } = useWindowDimensions();
    const [loading, setLoading] = useState<boolean>(false);
    const { control, handleSubmit } = useForm<FormValues>();

    const onSignInPressed = async ({
        username,
        password
    }: FormValues): Promise<void> => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            await Auth.signIn(username, password);
        } catch (e: any) {
            Alert.alert("Oops", e.message);
        }
        setLoading(false);
    };

    const onForgotPasswordPressed = (): void => {
        navigation.navigate("ForgotPassword");
    };

    const onSignUpPressed = (): void => {
        navigation.navigate("SignUp");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={require("../../../assets/logo2.png")}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{ required: "Username field is required" }}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    rules={{
                        required: "Password field is required",
                        minLength: {
                            value: 8,
                            message:
                                "Password must contain at least 8 characters"
                        }
                    }}
                    secureTextEntry
                />
                <CustomButton
                    text={loading ? "Loading..." : "Sign In"}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text="Forgot Password?"
                    onPress={onForgotPasswordPressed}
                    type="tertiary"
                />
                <SocialSignInButtons />
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type="tertiary"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200,
        borderRadius: 25,
        marginBottom: 16
    },
    root: {
        alignItems: "center",
        padding: 20
    }
});

export default SignInScreen;
