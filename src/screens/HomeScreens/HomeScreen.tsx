import { Auth } from "aws-amplify";
import { Text, View, Button } from "react-native";

const HomeScreen: React.FC = () => {
    const signOut = (): void => {
        Auth.signOut();
    };

    const deleteAccount = (): void => {
        Auth.deleteUser();
    };

    return (
        <View>
            <Text>Welcome to the Providence of Media</Text>

            <Button title="Sign Out" onPress={signOut} />
            <Button title="Delete Account" onPress={deleteAccount} />
        </View>
    );
};

export default HomeScreen;
