import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    
                },
                tabBarLabelStyle:{
                    fontSize: 13,
                    marginBottom: 5,
                },
                tabBarIconStyle: {
                    width: 40,
                    height: 40,
                },
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Domiciliarios',
                    tabBarIcon: () => (
                        <TabBarIcon
                            name="delivery-dining"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="products"
                options={{
                    title: 'Productos',
                    tabBarIcon: () => (
                        <TabBarIcon
                            name="shopping-cart"
                        />
                    ),
                }}
                
            />
            <Tabs.Screen
                name="metrics"
                options={{
                    title: 'Métricas',
                    tabBarIcon: () => (
                        <TabBarIcon
                            name="dashboard"
                        />
                    ),
                }}
            />


        </Tabs>
    );
}

