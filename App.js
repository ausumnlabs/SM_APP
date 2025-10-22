import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import VisitorsScreen from './screens/VisitorsScreen';
import AddVisitorScreen from './screens/AddVisitorScreen';
import DailyHelpScreen from './screens/DailyHelpScreen';
import AmenitiesScreen from './screens/AmenitiesScreen';
import NoticeboardScreen from './screens/NoticeboardScreen';
import HelpdeskScreen from './screens/HelpdeskScreen';
import AddComplaintScreen from './screens/AddComplaintScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function VisitorsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Visitors" 
        component={VisitorsScreen}
        options={{ title: 'Visitor Management' }}
      />
      <Stack.Screen 
        name="AddVisitor" 
        component={AddVisitorScreen}
        options={{ title: 'Add Visitor' }}
      />
    </Stack.Navigator>
  );
}

function HelpdeskStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Helpdesk" 
        component={HelpdeskScreen}
        options={{ title: 'Helpdesk' }}
      />
      <Stack.Screen 
        name="AddComplaint" 
        component={AddComplaintScreen}
        options={{ title: 'Raise Complaint' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'VisitorsTab') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Services') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'HelpdeskTab') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack}
          options={{ title: 'Home' }}
        />
        <Tab.Screen 
          name="VisitorsTab" 
          component={VisitorsStack}
          options={{ title: 'Visitors' }}
        />
        <Tab.Screen 
          name="Services" 
          component={AmenitiesScreen}
          options={{ title: 'Services', headerShown: true }}
        />
        <Tab.Screen 
          name="HelpdeskTab" 
          component={HelpdeskStack}
          options={{ title: 'Helpdesk' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Profile', headerShown: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
