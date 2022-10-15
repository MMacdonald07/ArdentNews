import { useEffect, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import BusinessScreen from "../screens/HomeScreens/BusinessScreen";
import HealthScreen from "../screens/HomeScreens/HealthScreen";
import SportScreen from "../screens/HomeScreens/SportScreen";
import TechScreen from "../screens/HomeScreens/TechScreen";

export type NativeStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ConfirmEmail: { username: string };
    ForgotPassword: undefined;
    NewPassword: { username: string };
};

export type BottomTabParamList = {
    Home: undefined;
    Business: undefined;
    Health: undefined;
    Sports: undefined;
    Tech: undefined;
};

const Stack = createNativeStackNavigator<NativeStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

export const UserContext = createContext<CognitoUser | undefined>(undefined);

// For dark/light themes: https://reactnavigation.org/docs/themes/

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
                            <Tab.Navigator>
                                <Tab.Screen
                                    name="Home"
                                    component={HomeScreen}
                                    options={{
                                        tabBarIcon: (props) => (
                                            <Feather
                                                name="home"
                                                color={props.color}
                                            />
                                        )
                                    }}
                                />
                                <Tab.Screen
                                    name="Business"
                                    component={BusinessScreen}
                                    options={{
                                        tabBarIcon: (props) => (
                                            <Feather
                                                name="dollar-sign"
                                                color={props.color}
                                            />
                                        )
                                    }}
                                />
                                <Tab.Screen
                                    name="Health"
                                    component={HealthScreen}
                                    options={{
                                        tabBarIcon: (props) => (
                                            <Feather
                                                name="heart"
                                                color={props.color}
                                            />
                                        )
                                    }}
                                />
                                <Tab.Screen
                                    name="Sports"
                                    component={SportScreen}
                                    options={{
                                        tabBarIcon: (props) => (
                                            <Ionicons
                                                name="tennisball-outline"
                                                color={props.color}
                                            />
                                        )
                                    }}
                                />
                                <Tab.Screen
                                    name="Tech"
                                    component={TechScreen}
                                    options={{
                                        tabBarIcon: (props) => (
                                            <Ionicons
                                                name="hardware-chip-outline"
                                                color={props.color}
                                            />
                                        )
                                    }}
                                />
                            </Tab.Navigator>
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
