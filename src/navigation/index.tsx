import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfirmEmail from "../screens/AuthScreens/ConfirmEmailScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import ForgotPassword from "../screens/AuthScreens/ForgotPasswordScreen";
import NewPassword from "../screens/AuthScreens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreens/HomeScreen";
import { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { ActivityIndicator, View, Text } from "react-native";

export type NativeStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ConfirmEmail: { username: string };
    ForgotPassword: undefined;
    NewPassword: { username: string };
};

const Stack = createNativeStackNavigator<NativeStackParamList>();

const Navigation = () => {
    const [user, setUser] = useState<CognitoUser | undefined | null>(undefined);

    useEffect(() => {
        const listener = (data: any) => {
            if (
                data.payload.event === "signIn" ||
                data.payload.event === "signOut"
            ) {
                checkUser();
            }
        };

        Hub.listen("auth", listener);
        return () => Hub.remove("auth", listener);
    }, []);
    const checkUser = async () => {
        try {
            const authUser: CognitoUser = await Auth.currentAuthenticatedUser({
                bypassCache: true
            });
            setUser(authUser);
        } catch (e: any) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    });

    if (user === undefined) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                        <Stack.Screen
                            name="ConfirmEmail"
                            component={ConfirmEmail}
                        />
                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPassword}
                        />
                        <Stack.Screen
                            name="NewPassword"
                            component={NewPassword}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
