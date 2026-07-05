import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EventProvider } from './src/context/EventContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  EventList  from './src/screens/EventList';
import  AddEvent  from './src/screens/AddEvent';
import MyEvents from './src/screens/MyEvents';
import EditEvent from './src/screens/EditEvent';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyEvents" component={MyEvents} />
    <Stack.Screen name="EditEvent" component={EditEvent} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <EventProvider>
      <NavigationContainer>
        <Tab.Navigator
         screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'Discover') {
                        iconName = focused ? 'home' : 'home-outline';
                      } else if (route.name === 'AddEvent') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                      } else if (route.name === 'My Events') {
                        iconName = focused ? 'list' : 'list-outline';
                      }

                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                        TabBarActiveTintColor: 'tomato',
                        TabBarInactiveTintColor: 'gray',
                  })}



                >
          <Tab.Screen name="Discover" component={EventList} />
          <Tab.Screen name="AddEvent" component={AddEvent} />
          <Tab.Screen name="My Events" component={EventStack}/>
        </Tab.Navigator>
      </NavigationContainer>
    </EventProvider>
  );
};

export default App;

