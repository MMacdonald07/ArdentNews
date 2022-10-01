import { Auth, toast } from "aws-amplify";
import { Alert, View, ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackParamList } from "../../navigation/index";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { ToastType, useToast } from "react-native-toast-notifications";

type ConfirmEmailSignInProp = StackNavigationProp<
    NativeStackParamList,
    "ConfirmEmail",
    "SignIn"
>;

type FormValues = {
    username: string;
    password: string;
    email: string;
    repeatedpassword: string;
};

const EMAIL_REGEX: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const SignUpScreen: React.FC = () => {
    const navigation = useNavigation<ConfirmEmailSignInProp>();
    const { control, handleSubmit, watch } = useForm<FormValues>();
    const password: string = watch("password");
    const toast: ToastType = useToast();

    const onRegisterPressed = async ({
        username,
        password,
        email
    }: FormValues): Promise<void> => {
        try {
            await Auth.signUp({
                username,
                password,
                attributes: { email }
            });
            navigation.navigate("ConfirmEmail", { username });
        } catch (e: any) {
            toast.show(e.message, {
                type: "error"
            });
        }
    };

    const onSignInPressed = (): void => {
        navigation.popToTop();
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create An Account</Text>
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{
                        required: "Username field is required",
                        minLength: {
                            value: 3,
                            message:
                                "Username should be at least 3 characters long"
                        },
                        maxLength: {
                            value: 24,
                            message:
                                "Username should be at most 24 characters long"
                        }
                    }}
                />
                <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{
                        required: "Email field is required",
                        pattern: {
                            value: EMAIL_REGEX,
                            message: "Email is not of a valid format"
                        }
                    }}
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
                                "Password should be at least 8 characters long"
                        }
                    }}
                    secureTextEntry
                />
                <CustomInput
                    name="repeatedpassword"
                    placeholder="Repeat Password"
                    control={control}
                    secureTextEntry
                    rules={{
                        validate: (value: string) =>
                            value === password || "Passwords do not match"
                    }}
                />
                <CustomButton
                    text="Register"
                    onPress={handleSubmit(onRegisterPressed)}
                />
                <Text style={styles.text}>
                    By registering, you confirm that you accept our{" "}
                    <Text style={styles.link}>Terms of Use</Text> and{" "}
                    <Text style={styles.link}>Privacy Policy</Text>
                </Text>
                <SocialSignInButtons />
            </View>
            <CustomButton
                text="Already have an account? Sign in"
                onPress={onSignInPressed}
                type="tertiary"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    link: {
        color: "#a80"
    },
    root: {
        alignItems: "center",
        padding: 20
    },
    text: {
        color: "gray",
        marginVertical: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3700b3",
        margin: 10
    }
});

export default SignUpScreen;
