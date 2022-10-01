import { useEffect, useState, createContext } from "react";
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
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { MaterialIcons } from "@expo/vector-icons";

export type NativeStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ConfirmEmail: { username: string };
    ForgotPassword: undefined;
    NewPassword: { username: string };
};

const Stack = createNativeStackNavigator<NativeStackParamList>();

export const UserContext = createContext<CognitoUser | undefined>(undefined);

const Navigation: React.FC = () => {
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
        <ToastProvider
            placement="bottom"
            duration={3000}
            animationType="slide-in"
            swipeEnabled={true}
            renderType={{
                error: (toast) => (
                    <View style={styles.root}>
                        <View style={styles.toast}>
                            <MaterialIcons
                                name="error"
                                size={20}
                                color="#fff"
                                style={{ paddingRight: 8 }}
                            />
                            <Text style={styles.text}>{toast.message}</Text>
                        </View>
                    </View>
                )
            }}
        >
            <UserContext.Provider value={user ? user : undefined}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            animation: "slide_from_right"
                        }}
                    >
                        {user ? (
                            <Stack.Screen name="Home" component={HomeScreen} />
                        ) : (
                            <>
                                <Stack.Screen
                                    name="SignIn"
                                    component={SignInScreen}
                                />
                                <Stack.Screen
                                    name="SignUp"
                                    component={SignUpScreen}
                                />
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
            </UserContext.Provider>
        </ToastProvider>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column-reverse"
    },
    toast: {
        elevation: 2,
        flexDirection: "row",
        height: 40,
        margin: 16,
        borderRadius: 20,
        backgroundColor: "#d50000",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16
    },
    text: {
        color: "white",
        fontSize: 16,
        flexWrap: "wrap",
        paddingHorizontal: 10
    }
});

export default Navigation;
