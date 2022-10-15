import { Auth } from "aws-amplify";
import { Text, View, Button } from "react-native";
import { useContext } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { UserContext } from "../../navigation";

const HealthScreen: React.FC = () => {
    const user = useContext<CognitoUser | undefined>(UserContext);
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
            <Text>Welcome to Health {user?.getUsername()}</Text>

            <Button title="Sign Out" onPress={signOut} />
            <Button title="Delete Account" onPress={deleteAccount} />
        </View>
    );
};

export default HealthScreen;
