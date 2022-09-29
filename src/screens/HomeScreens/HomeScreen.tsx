import { Auth } from "aws-amplify";
import { Text, View, Button } from "react-native";

const HomeScreen: React.FC = () => {
    const signOut = (): void => {
        Auth.signOut();
    };

    return (
        <View>
            <Text>Welcome to the Providence of Media</Text>

            <Button title="Sign Out" onPress={signOut} />
        </View>
    );
};

export default HomeScreen;
