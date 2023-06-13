import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";
import {dayTime, nightTime} from './HomeScreen';


const ResultScreen = () => {
    return(
        <View style={styles.flexAll}>
        <View style={styles.buttonFlex}>
        <Text h1> Päev </Text>
        </View>
        <View style={styles.buttonFlex}>
            <Text h3>{ dayTime + (dayTime === 1 ? ' tund' : ' tundi') }</Text>
        </View>
        <View style={{ marginTop: 70}}></View>
        <View style={styles.buttonFlex}>
        <Text h1> Öö </Text>
        </View>
        <View style={styles.buttonFlex}>
            <Text h3>{ nightTime + (nightTime === 1 ? ' tund' : ' tundi') }</Text>
        </View>
        <View style={{ marginTop: 70}}></View>
    </View>
    )
}

const styles = StyleSheet.create({
    flexAll: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        height: 70,

    },
    buttonContainer: {
        
        width: '70%',
        marginTop: 20,
        marginBottom: 80,
    },
    buttonText: {
        fontSize: 30,
    },
    buttonFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    }
});

export default ResultScreen;