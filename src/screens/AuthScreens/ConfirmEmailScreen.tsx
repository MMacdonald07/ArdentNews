import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Alert, ScrollView, View, Text, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackParamList } from "../../navigation/index";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";

type SignInProp = StackNavigationProp<NativeStackParamList, "SignIn">;

type FormValues = {
    username: string;
    code: string;
};

type RouteParams = {
    ConfirmEmailScreen: {
        username: string;
    };
};

const ConfirmEmailScreen: React.FC = () => {
    const navigation = useNavigation<SignInProp>();
    const route = useRoute<RouteProp<RouteParams, "ConfirmEmailScreen">>();
    const { control, handleSubmit, watch } = useForm<FormValues>({
        defaultValues: { username: route?.params?.username }
    });
    const username: string = watch("username");

    const onConfirmPressed = async ({
        username,
        code
    }: FormValues): Promise<void> => {
        try {
            await Auth.confirmSignUp(username, code);
            navigation.navigate("SignIn");
        } catch (e: any) {
            Alert.alert("Oops", e.message);
        }
    };

    const onResendPressed = async (): Promise<void> => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert("Success", "Code was resent to your email");
        } catch (e: any) {
            Alert.alert("Oops", e.message);
        }
    };

    const onSignInPressed = (): void => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm Your Email</Text>
                <CustomInput
                    name="code"
                    placeholder="Enter Your Confirmation Code"
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
                <CustomButton
                    text="Confirm Email"
                    onPress={handleSubmit(onConfirmPressed)}
                />
                <CustomButton
                    text="Resend Code"
                    onPress={onResendPressed}
                    type="secondary"
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
        color: "#051c60",
        margin: 10
    }
});

export default ConfirmEmailScreen;
