import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home-screen';
import CartScreen from '../screens/cart-screen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const CartStack = createNativeStackNavigator();

function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <CartStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </CartStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function tabBarIcon({route, focused, color, size}) {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused
      ? 'ios-information-circle'
      : 'ios-information-circle-outline';
  } else if (route.name === 'Cart') {
    iconName = focused ? 'ios-list' : 'ios-list-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export function RootStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) =>
            tabBarIcon({route, focused, color, size}),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Cart"
          component={CartStackScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
