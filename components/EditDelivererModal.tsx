import { Deliverer, useDelivererStore } from '@/store/delivererStore';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
interface EditDelivererModalProps {
    visible: boolean;
    onClose: () => void;
    deliverer: Deliverer;
}

const EditDelivererModal = ({ visible, onClose, deliverer }: EditDelivererModalProps) => {
    const [id, setId] = useState(deliverer.id);
    const [name, setName] = useState(deliverer.name);
    const [email, setEmail] = useState(deliverer.email);
    const [phoneNumber, setPhoneNumber] = useState(deliverer.phone.toString());
    const [status, setStatus] = useState(deliverer.status);
    const [hasChanges, setHasChanges] = useState(false);
    const updateDeliverer = useDelivererStore((state) => state.updateDeliverer);

    // Detectar cambios automáticamente
    useEffect(() => {
        const changes = 
            id !== deliverer.id ||
            name !== deliverer.name ||
            email !== deliverer.email ||
            phoneNumber !== deliverer.phone.toString() ||
            status !== deliverer.status;
        
        setHasChanges(changes);
    }, [id, name, email, phoneNumber, status, deliverer]);

    const handleEditDeliverer = () => {
        if (hasChanges) {
            const updatedDeliverer = {
                id,
                email,
                name,
                phone: Number(phoneNumber),
                status,
            };
            updateDeliverer(id, updatedDeliverer);
            onClose();
            alert("Domiciliario actualizado con éxito.");
        } else {
            alert("No se han realizado cambios.");
        }
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={styles.container}
        >
            <View style={styles.ModalView}>
                <Text style={styles.title}>Editar Domiciliario</Text>
                {/* Form fields go here */}
                <Text style={styles.label}>Nombre Completo</Text>
                <TextInput style={styles.input} placeholder='Ingrese el nombre completo' onChangeText={setName} value={name}>
                </TextInput>
                {/* Form fields go here */}
                <Text style={styles.label}>Cédula</Text>
                <TextInput style={styles.input} placeholder='Ingrese la cédula' onChangeText={setId} value={id}>
                </TextInput>
                <Text style={styles.label}>Correo</Text>
                <TextInput style={styles.input} placeholder='Ingrese el correo electrónico' onChangeText={setEmail} value={email}>
                </TextInput>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput style={styles.input} placeholder='Ingrese el número de teléfono' onChangeText={setPhoneNumber} value={phoneNumber}>
                </TextInput>
                <Text style={styles.label}>Estado</Text>
                <View style={styles.pickerContainer}>
                    <Picker 
                        selectedValue={status} 
                        onValueChange={setStatus}
                        style={styles.picker}
                    >
                        <Picker.Item label="Activo" value="active" />
                        <Picker.Item label="Inactivo" value="inactive" />
                    </Picker>
                </View>
                <Pressable 
                    style={[
                        styles.button, 
                        !hasChanges && styles.buttonDisabled
                    ]} 
                    onPress={handleEditDeliverer}
                    disabled={!hasChanges}
                >
                    <Text style={[
                        styles.buttonText,
                        !hasChanges && styles.buttonTextDisabled
                    ]}>
                        Editar
                    </Text>
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
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonTextDisabled: {
        color: "#666",
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
        color: 'blue',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
    },
});


export default EditDelivererModal;