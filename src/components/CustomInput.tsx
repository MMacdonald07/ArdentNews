import { View, TextInput, StyleSheet, Text } from "react-native";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
    placeholder: string;
    secureTextEntry?: boolean;
}

const CustomInput = <T extends FieldValues>({
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry
}: InputProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error }
            }) => (
                <>
                    <View
                        style={[
                            styles.container,
                            error && { borderColor: "red" }
                        ]}
                    >
                        <TextInput
                            placeholder={placeholder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.input}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={{ color: "red", alignSelf: "stretch" }}>
                            {error.message || "Error"}
                        </Text>
                    )}
                </>
            )}
        />
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5
    },
    input: {}
});
