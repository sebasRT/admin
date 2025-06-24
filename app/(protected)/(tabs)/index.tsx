import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@react-navigation/elements";
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const data = [
    { key: '1', name: 'Daniel Robayo', phoneNumber: '3212321231' },
    { key: '2', name: 'Pedrito Perez', phoneNumber: '3212321231' },
    { key: '3', name: 'Pepe Ganga', phoneNumber: '3212321231' },
    { key: '4', name: 'Juanito Alimaña', phoneNumber: '3212321231' },
    { key: '5', name: 'Maria la del Barrio', phoneNumber: '3212321231' },
    { key: '6', name: 'La Llorona', phoneNumber: '3212321231' },
    { key: '7', name: 'El Chavo del 8', phoneNumber: '3212321231' },

    { key: '9', name: 'Doña Florinda', phoneNumber: '3212321231' },
    { key: '10', name: 'Quico', phoneNumber: '3212321231' },
]


type ItemProps = {
    name: string;
    phoneNumber: string;
};

const Item = ({ name, phoneNumber }: ItemProps) => (
    <View style={styles.item}>

        <Image
            style={styles.delivererImage}
            source={require('@/assets/images/deliverer.png')}
        >
        </Image>

        <View style={styles.delivererDetails}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </View>
        <View style={styles.actionsContainer}>
            <View style={styles.qrContainer}>
                <Image
                    style={styles.qrImage}
                    source={require('@/assets/images/qr.png')}
                ></Image>
            </View>
            <View style={styles.changeContainer}>
                <Image
                    style={styles.editImage}
                    source={require('@/assets/images/edit.png')}
                ></Image>
                <Image
                    style={styles.deleteImage}
                    source={require('@/assets/images/trash.png')}
                ></Image>
            </View>
        </View>
    </View>
);

export default function Index() {
    const { logOut } = useAuth((state) => state);

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item name={item.name} phoneNumber={item.phoneNumber} />}
                >
                </FlatList>
                <Button onPressIn={logOut}>
                    Log out
                </Button>
            </SafeAreaView>

        </SafeAreaProvider>
    );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    item: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff', // Needed for shadow to show
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 20, // Android shadow
        borderRadius: 10, // Optional: rounded corners
        marginVertical: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    delivererImage: {
        width: 60,
        margin: 15,
        height: 60,
        resizeMode: 'contain',
    },
    qrImage: {
        margin: 15,
        resizeMode: 'contain',
    },
    delivererDetails: {
        justifyContent: 'center',
    },
    actionsContainer: {
        flex: 1,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    qrContainer: {
        justifyContent: 'center',
    },
    phoneNumber: {
        fontSize: 17,
    },

    changeContainer: {
        justifyContent: 'center',
        gap: 12,
    },
    editImage: {
        resizeMode: 'contain',
    },
    deleteImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    }

});