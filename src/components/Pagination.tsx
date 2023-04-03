import { StyleSheet, Animated, View, Dimensions } from 'react-native';
import React, { FC } from 'react';

interface Props {
    data: Array<any>;
    scrollX: Animated.Value;
    index: number;
}

const Pagination: FC<Props> = ({ data, scrollX, index }) => {
    const { width } = Dimensions.get('screen');
    return (
        <View style={styles.container}>
            {data.map((_, idx) => {
                const inputRange = [
                    (idx - 1) * width,
                    idx * width,
                    (idx + 1) * width
                ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp'
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.1],
                    extrapolate: 'clamp'
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#ccc', '#002A57', '#ccc'],
                    extrapolate: 'clamp'
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            styles.dot,
                            { width: dotWidth, backgroundColor }
                            // idx === index && styles.dotActive,
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc'
    },
    dotActive: {
        backgroundColor: '#000'
    }
});
