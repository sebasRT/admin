import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@react-navigation/elements";
import React from 'react';
import { Text, View } from 'react-native';
export default function Index() {
    const {logOut} = useAuth((state) => state);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Hola princeso</Text>
            <Button onPressIn={logOut}>
                Log out
            </Button>
        </View>
    );
}