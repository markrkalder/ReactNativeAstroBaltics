import {StyleSheet, TextInput, View, ScrollView} from "react-native";
import {Button, Text} from "@rneui/themed";
import React, {useState} from "react";

// Not optimal, but I didn't figure out another way to make the app / screen changes behave the way I wanted.
var nightTime = 0;
var dayTime = 0;

const HomeScreen = ({ navigation, setSelectedIndex }) => {

    const [beginningTime, beginningOnChangeTime] = useState('');
    const [endTime, endOnChangeTime] = useState('');
    const [validInputStart, setValidInputStart] = useState(true);
    const [validInputEnd, setValidInputEnd] = useState(true);

    const validateInput = (input) => {
        const regex = /^(0[0-9]|1[0-9]|2[0-3]):(00|15|30|45)$/;
        return regex.test(input);
      };

    const calculate = () => {
        const beginningTimeHours = Number(beginningTime.split(':')[0]);
        const beginningTimeMins = Number(beginningTime.split(':')[1]);
        const endTimeHours = Number(endTime.split(':')[0]);
        const endTimeMins = Number(endTime.split(':')[1]);

        let nightTimeMins = 0;
        let dayTimeMins = 0;
        let hourCounter = beginningTimeHours;
        let minuteCounter = beginningTimeMins;

        while (!(hourCounter === endTimeHours && minuteCounter === endTimeMins)){
            if (hourCounter < 6 || hourCounter >= 22) {
                nightTimeMins += 15;
            }
            else {
                dayTimeMins += 15;
            }

            minuteCounter += 15;
            if (minuteCounter === 60){
                hourCounter += 1;
                minuteCounter = 0;
            }
            if (hourCounter === 24) {
                hourCounter = 0;
            }
        }

        nightTime = nightTimeMins / 60;
        dayTime = (dayTimeMins / 60);

        setSelectedIndex(1);
        navigation.navigate('Tulemus', { nightTime, dayTime });
    }

    const errorAlert = () => {
        alert("Sisend ei ole sobilik! Sisend peab olema formaadis HH:MM," +
         " kus tunnid jäävad vahemikku 00-23 ning minutid saavad olla ainult 15 minutiliste intervallidega (00, 15, 30, 45)");
    }

    const validateStartInput = (input) => {
        beginningOnChangeTime(input);
        setValidInputStart(validateInput(input));
      };
    
      const validateEndInput = (input) => {
        endOnChangeTime(input);
        setValidInputEnd(validateInput(input));
      };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text h3 style={styles.textStyle}> Algus </Text>
            <View style={styles.buttonFlex}>
                <TextInput
                    style={[styles.input, !validInputStart && styles.invalidInput]}
                    onChangeText={validateStartInput}
                    value={beginningTime}
                    placeholder='00:00'
                />
            </View>
            <Text h3 style={styles.textStyle}> Lõpp </Text>
            <View style={styles.buttonFlex}>
                <TextInput
                    style={[styles.input, !validInputEnd && styles.invalidInput]}
                    onChangeText={validateEndInput}
                    value={endTime}
                    placeholder='00:00'
                />
            </View>
            <View style={styles.buttonFlex}>
                <Button
                    onPress={(validInputStart && validInputEnd) ? calculate : errorAlert}
                    title="Arvuta"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    containerStyle={styles.buttonContainer}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
      },
    input: {
        height: 70,
        width: '65%',
        margin: 10,
        borderWidth: 2,
        paddingLeft: 20,
        borderRadius: 15,
        fontSize: 25,
    },
    invalidInput: {
        borderColor: 'rgba(255, 0, 0, .5)',
      },
    inputText: {
        fontSize: 30,
    },
    button: {
        backgroundColor: 'rgb(30, 99, 247)',
        borderWidth: 2,
        borderColor: 'rgb(30, 99, 247)',
        borderRadius: 15,
        height: 70,

    },
    buttonContainer: {
        width: '65%',
        marginBottom: 40,
        marginTop: 15,
    },
    buttonText: {
        fontSize: 25,
    },
    buttonFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    textStyle: {
        paddingLeft: 60,
        paddingTop: 25,
    },
});

export {nightTime};
export {dayTime};
export default HomeScreen;
