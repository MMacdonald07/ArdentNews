import { Auth } from "aws-amplify";
import { Alert, View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackParamList } from "../../navigation";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";

type NewPasswordSignInProp = StackNavigationProp<
    NativeStackParamList,
    "NewPassword",
    "SignIn"
>;

type FormValues = {
    username: string;
};

const ForgotPasswordScreen: React.FC = () => {
    const navigation = useNavigation<NewPasswordSignInProp>();
    const { control, handleSubmit } = useForm<FormValues>();

    const onSendPressed = async ({ username }: FormValues): Promise<void> => {
        try {
            await Auth.forgotPassword(username);
            navigation.navigate("NewPassword", { username });
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
                <Text style={styles.title}>Reset Your Password</Text>
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
                <CustomButton
                    text="Send"
                    onPress={handleSubmit(onSendPressed)}
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
        color: "#051c60",
        margin: 10
    }
});

export default ForgotPasswordScreen;
