import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboard = () => {
    const [status, setKeyboardStatus] = useState('hidden');

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('shown');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('hidden');
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return {
        status,
        shown: status === 'shown',
        dismiss: Keyboard.dismiss,
        metrics: Keyboard.metrics
    };
}

export default useKeyboard;