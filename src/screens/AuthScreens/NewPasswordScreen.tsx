import { Auth } from "aws-amplify";
import { Alert, ScrollView, View, Text, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackParamList } from "../../navigation/index";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { ToastType, useToast } from "react-native-toast-notifications";

type SignInProp = StackNavigationProp<NativeStackParamList, "SignIn">;

type FormValues = {
    username: string;
    password: string;
    code: string;
    repeatedpassword: string;
};

type RouteParams = {
    NewPasswordScreen: {
        username: string;
    };
};

const NewPasswordScreen: React.FC = () => {
    const navigation = useNavigation<SignInProp>();
    const route = useRoute<RouteProp<RouteParams, "NewPasswordScreen">>();
    const { control, handleSubmit, watch } = useForm<FormValues>({
        defaultValues: { username: route?.params?.username }
    });
    const password: string = watch("password");
    const toast: ToastType = useToast();

    const onSubmitPressed = async ({
        username,
        code,
        password
    }: FormValues): Promise<void> => {
        try {
            await Auth.forgotPasswordSubmit(username, code, password);
            navigation.navigate("SignIn");
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
                <Text style={styles.title}>Reset Your Password</Text>
                <CustomInput
                    name="code"
                    placeholder="Code"
                    control={control}
                    rules={{
                        required: "Confirmation code is required",
                        minLength: {
                            value: 6,
                            message: "Code should be 6 characters long"
                        },
                        maxLength: {
                            value: 6,
                            message: "Code should be 6 characters long"
                        },
                        validate: (value: string) =>
                            parseInt(value) > 0 || "Invalid Code"
                    }}
                />
                <CustomInput
                    name="password"
                    placeholder="Enter Your New Password"
                    control={control}
                    rules={{
                        required: "New password is required",
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
                    placeholder="Repeat New Password"
                    control={control}
                    secureTextEntry
                    rules={{
                        validate: (value: string) =>
                            value === password || "Passwords do not match"
                    }}
                />
                <CustomButton
                    text="Submit"
                    onPress={handleSubmit(onSubmitPressed)}
                    type="primary"
                />
                <CustomButton
                    text="Back to Sign In"
                    onPress={onSignInPressed}
                    type="tertiary"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3700b3",
        margin: 10
    }
});

export default NewPasswordScreen;
