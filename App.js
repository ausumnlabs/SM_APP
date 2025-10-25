import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
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
import CommunityScreen from './screens/CommunityScreen';
import DevicesScreen from './screens/DevicesScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import SocialScreen from './screens/SocialScreen';
import CreatePostScreen from './screens/CreatePostScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Common header options for all stack screens
const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: '#FF9800',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerBackTitleVisible: false,
};

function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={commonHeaderOptions}
      initialRouteName="Dashboard"
    >
      <Stack.Screen 
        name="Dashboard" 
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'SM_APP',
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('Profile')}
            >
              <Ionicons name="person-circle-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Stack.Screen 
        name="QuickActions" 
        component={QuickActionsScreen}
        options={{ 
          title: 'Quick Actions',
          headerShown: true
        }}
      />
      <Stack.Screen 
        name="Household" 
        component={HouseholdScreen}
        options={{ title: 'Household' }}
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
      <Stack.Screen 
        name="Amenities" 
        component={AmenitiesScreen}
        options={{ 
          title: 'Amenities',
          headerShown: true
        }}
      />
    </Stack.Navigator>
  );
}

function VisitorsStack() {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen 
        name="Visitors" 
        component={VisitorsScreen}
        options={({ navigation }) => ({
          title: 'Visitor Management',
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('AddVisitor')}
            >
              <Ionicons name="add-circle" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        })}
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
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen 
        name="Helpdesk" 
        component={HelpdeskScreen}
        options={({ navigation }) => ({
          title: 'Helpdesk',
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('AddComplaint')}
            >
              <Ionicons name="add-circle" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="AddComplaint" 
        component={AddComplaintScreen}
        options={{ title: 'Raise Complaint' }}
      />
    </Stack.Navigator>
  );
}

function SocialStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        ...commonHeaderOptions,
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="SocialHome" 
        component={SocialScreen}
        options={{ 
          title: 'Community',
          headerShown: true
        }}
      />
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePostScreen}
        options={{ 
          title: 'Create Post',
          headerShown: true
        }}
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
          } else if (route.name === 'Community') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          } else if (route.name === 'Devices') {
            iconName = focused ? 'phone-portrait' : 'phone-portrait-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Social') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF9800',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          position: 'relative',
          borderRadius: 15,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          marginHorizontal: 10,
          marginBottom: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 2,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{ title: 'Community' }}
      />
      <Tab.Screen 
        name="Devices" 
        component={DevicesScreen}
        options={{ title: 'Devices' }}
      />
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen}
        options={{ title: 'Marketplace' }}
      />
      <Tab.Screen 
        name="Social" 
        component={SocialStack}
        options={{ title: 'Social' }}
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
