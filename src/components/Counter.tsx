import React, { FC } from 'react';
import { Button, StyleSheet, Text } from 'react-native';

type Props = {
    props: {
        counter: number;
        handleOnClick: any;
    };
};

const Counter: FC<Props> = ({ props }) => {
    return (
        <>
            <Text style={styles.counter}>{props.counter}</Text>
            <Button onPress={props.handleOnClick} title="Add" />
        </>
    );
};
export default Counter;

const styles = StyleSheet.create({
    counter: {
        margin: 10,
        fontSize: 24
    }
});
