import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text
} from "react-native";

type ButtonProps = {
    onPress: (
        event: GestureResponderEvent
    ) => Promise<void> | void | null | undefined;
    text: string;
    type?: string;
    bgColor?: string;
    fgColor?: string;
    icon?: any;
};

const CustomButton = ({
    onPress,
    text,
    type = "primary",
    bgColor,
    fgColor,
    icon
}: ButtonProps) => {
    return (
        <Pressable
            style={[
                styles.container,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {}
            ]}
            onPress={onPress}
        >
            {icon ? (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}
                >
                    <MaterialCommunityIcons
                        name={icon}
                        size={18}
                        color={fgColor || "#000"}
                    />
                    <Text
                        style={[
                            styles.text,
                            styles[`text_${type}`],
                            fgColor ? { color: fgColor } : {},
                            {
                                flexGrow: 1,
                                textAlign: "center",
                                marginHorizontal: 15
                            }
                        ]}
                    >
                        {text}
                    </Text>
                </View>
            ) : (
                <>
                    <Text
                        style={[
                            styles.text,
                            styles[`text_${type}`],
                            fgColor ? { color: fgColor } : {}
                        ]}
                    >
                        {text}
                    </Text>
                </>
            )}
        </Pressable>
    );
};

const styles: any = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: "center"
    },
    container_primary: {
        backgroundColor: "#3700b3"
    },
    container_secondary: {
        borderColor: "#3700b3",
        borderWidth: 2
    },
    container_tertiary: {},
    text: {
        fontWeight: "bold",
        color: "#fff"
    },
    text_secondary: {
        color: "#3700b3"
    },
    text_tertiary: {
        color: "#018786"
    }
});

export default CustomButton;
