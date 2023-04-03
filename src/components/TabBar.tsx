import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Route } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native/Libraries/Components/Pressable/Pressable';

const TabBar: FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {props.state.routes.map((route: Route<string>, index: number) => {
                const { options } = props.descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = props.state.index === index;

                const onPress = () => {
                    const event = props.navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        props.navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    props.navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    });
                };

                return (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            sdada
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};
export default TabBar;
