import { useDelivererStore } from '@/store/delivererStore';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
interface DelivererFormProps {
    visible: boolean;
    onClose: () => void;
}

const DelivererForm = ({ visible, onClose }: DelivererFormProps) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const addDeliverer = useDelivererStore((state) => state.addDeliverer);

    const handleCreateDeliverer = () => {
        if (name && email && phoneNumber) {
            const newDeliverer = {
                id,
                email,
                name,
                phone: Number(phoneNumber),
                status: 'active',
            };
            addDeliverer(newDeliverer);
            onClose(); // Close the modal after adding
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={styles.container}
        >
            <View style={styles.ModalView}>
                <Text style={styles.title}>Crear Domiciliario</Text>
                {/* Form fields go here */}
                <Text style={styles.label}>Nombre Completo</Text>
                <TextInput style={styles.input} placeholder='Ingrese el nombre completo' onChangeText={setName}>
                </TextInput>
                {/* Form fields go here */}
                <Text style={styles.label}>Cédula</Text>
                <TextInput style={styles.input} placeholder='Ingrese la cédula' onChangeText={setId}>
                </TextInput>
                <Text style={styles.label}>Correo</Text>
                <TextInput style={styles.input} placeholder='Ingrese el correo electrónico' onChangeText={setEmail}>
                </TextInput>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput style={styles.input} placeholder='Ingrese el número de teléfono' onChangeText={setPhoneNumber}>
                </TextInput>
                <Pressable style={styles.button} onPress={handleCreateDeliverer}>
                    <Text style={styles.buttonText}>Crear</Text>
                </Pressable>
                
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    ModalView: {
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 25,
        marginInline: 20,
        borderRadius: 10,

    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",
        color: "#0067F6",

    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 6,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#0067F6",
        padding: 8,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
        color: 'blue',
    },
});


export default DelivererForm;