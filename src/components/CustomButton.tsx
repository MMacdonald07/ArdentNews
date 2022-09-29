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
};

const CustomButton = ({
    onPress,
    text,
    type = "primary",
    bgColor,
    fgColor
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
            <Text
                style={[
                    styles.text,
                    styles[`text_${type}`],
                    fgColor ? { color: fgColor } : {}
                ]}
            >
                {text}
            </Text>
        </Pressable>
    );
};

const styles: any = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 5
    },
    container_primary: {
        backgroundColor: "#3B71F3"
    },
    container_secondary: {
        borderColor: "#3b71f3",
        borderWidth: 2
    },
    container_tertiary: {},
    text: {
        fontWeight: "bold",
        color: "#fff"
    },
    text_secondary: {
        color: "#3b71f3"
    },
    text_tertiary: {
        color: "gray"
    }
});

export default CustomButton;
