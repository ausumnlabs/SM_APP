import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import SignupScreen from './screens/SignupScreen';
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
import SearchScreen from './screens/SearchScreen';
import QuickActionsScreen from './screens/QuickActionsScreen';
import HouseholdScreen from './screens/HouseholdScreen';

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
      <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="QuickActions" 
        component={QuickActionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Household" 
        component={HouseholdScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DailyHelp" 
        component={DailyHelpScreen}
        options={{ title: 'Daily Help' }}
      />
      <Stack.Screen 
        name="Noticeboard" 
        component={NoticeboardScreen}
        options={{ title: 'Noticeboard' }}
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

function MainApp() {
  return (
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
        tabBarActiveTintColor: '#FF9800',
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
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setIsAuthenticated(user.isAuthenticated || false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={MainApp} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
