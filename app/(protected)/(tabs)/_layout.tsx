import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Domiciliarios'
                }}                
            />
            <Tabs.Screen
                name="products"
                options={{
                    title: 'Productos'
                }}                
            />
            <Tabs.Screen
                name="metrics"
                options={{
                    title: 'Métricas'
                }}                
            />


        </Tabs>
    );
}

