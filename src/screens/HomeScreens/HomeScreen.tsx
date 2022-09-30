import { Auth } from "aws-amplify";
import { Text, View, Button } from "react-native";

const HomeScreen: React.FC = () => {
    const signOut = (): void => {
        setTimeout(() => {
            Auth.signOut();
        }, 100);
    };

    const deleteAccount = (): void => {
        setTimeout(() => {
            Auth.deleteUser();
        }, 100);
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
