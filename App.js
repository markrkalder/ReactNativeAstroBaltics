import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {ButtonGroup} from '@rneui/themed';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import ResultScreen from "./ResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
        <AppContent/>
        </NavigationContainer>
        );
    }
    
    const AppContent = () => {
        const [selectedIndex, setSelectedIndex] = useState(0);
        const navigation = useNavigation();
        
        const navigate = (value) => {
            setSelectedIndex(value);
            
            navigation.navigate(!value ? 'Arvutus' : 'Tulemus');
        }
        
        return (
            <View style={styles.container}>
            <StatusBar style="auto"/>
            
            <Stack.Navigator screenOptions={{headerBackVisible:false, headerTitleAlign:'center'}}>
            <Stack.Screen name='Arvutus'>
            {(props) => (
                <HomeScreen {...props} setSelectedIndex={setSelectedIndex} />
                )}                    
                </Stack.Screen>
                <Stack.Screen name='Tulemus' component={ResultScreen}/>
                </Stack.Navigator>
                
                <ButtonGroup
                containerStyle={styles.footer}
                textStyle={styles.footerText}
                selectedButtonStyle={styles.buttonGroup}
                buttons={['Andmete sisestus', 'Arvutuse tulemus']}
                selectedIndex={selectedIndex}
                onPress={navigate}
                />
                </View>
                )
            }
            
            const styles = StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#fff',
                },
                buttonGroup: {
                    backgroundColor: 'rgba(30, 99, 247, .75)',
                },
                footer: {
                    width: '100%',
                    borderWidth: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                    borderTopWidth: 1,
                    borderTopColor: "#eee",
                    borderRadius: 0,
                    paddingLeft: 0,
                    marginLeft: 0,
                    height: 60,
                    position: 'absolute',
                    bottom: 0,  
                },
                footerText: {
                    fontSize: 18,
                },
            });