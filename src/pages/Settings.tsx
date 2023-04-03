import React, { FC, useEffect, useState } from 'react';
import {
    Modal,
    TouchableOpacity,
    StyleSheet,
    Text,
    Pressable,
    View,
    TextInput
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const handleChange = async (text: string) => {
        setText(text);
        await AsyncStorage.setItem('history', text);
    };

    useEffect(() => {
        AsyncStorage.getItem('key').then((value) => {
            if (value != null) {
                console.log(value);
                setText(value);
            }
        });
    }, []);

    return (
        <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
            {/* <View style={{ backgroundColor: 'white' }}>
                <View style={styles.textInput}>
                    <TextInput
                        onChangeText={handleChange}
                        value={text}
                        style={{ paddingLeft: 20 }}
                        placeholder="Напишите Ваше Ф.И.О."
                    />
                </View>
                <Text>{text}</Text>
            </View> */}
            <Pressable onPress={() => auth().signOut()}>
                <View>
                    <Text style={{ color: '#001B36', fontSize: 20, fontFamily: 'Montserrat-Medium', left: 10, top: 30, alignItems: 'center'}}> <Feather name="log-out" color="#001B36" size={25} /> Выйти</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: '90%',
        marginTop: '10%',
        alignSelf: 'center'
    }
});

export default Settings;
