import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import CharacterList from './screens/CharacterList';
import Detail from './screens/Detail';
import Location from './screens/Location';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabBottom() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Character List':
                            iconName = 'list';
                            break;
                        case 'Detail':
                            iconName = 'user';
                            break;
                        default:
                            iconName = 'map';
                            break;
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'gold',
                tabBarInactiveTintColor: 'gray',
                tabBarInactiveBackgroundColor: "#000435",
                tabBarActiveBackgroundColor: "#000435",

            })}
        >
            <Tab.Screen name="Character List" component={CharacterList} options={{ headerShown: true }} />
            <Tab.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
            <Tab.Screen name="Location" component={Location} options={{ headerShown: false }} />

        </Tab.Navigator>
    );
}

export default function App() {


    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Character List" screenOptions={{
                    headerMode: 'screen',
                    headerTintColor: 'blue',
                    headerStyle: { backgroundColor: '#0047AB' },
                }}>
                    <>
                        {/* <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
                        {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                        <Stack.Screen name="TabBottom" component={TabBottom} options={{ headerShown: false }} />
                    </>
                </Stack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}
