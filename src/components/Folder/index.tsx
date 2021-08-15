/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTS } from '../../../constants/theme';

interface PropsButton extends TouchableOpacityProps{
    name: string;
    type: boolean;
    create?: boolean;
    id: string;
    idFolderSelect?: string;
}

export const Folder = ({name, type, create, id, idFolderSelect, ...rest}: PropsButton) => {
    return (
        name ? (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.content, {
                    borderColor: idFolderSelect ? id === idFolderSelect ? COLORS.secondary : COLORS.blue_1 : COLORS.blue_1,
                }]} {...rest}>
                    {create ? (
                        <Icon name="folder-plus" size={25} color={COLORS.blue_1} />
                        ) : (
                        <Icon name={type ? 'folder' : 'file'} size={25} color={COLORS.blue_1} />
                    )}
                </TouchableOpacity>
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>{name}</Text>
            </View>
        ) : (
            null
        )
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    content: {
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: COLORS.blue_transparent,
        borderWidth: 1,
        borderColor: COLORS.blue_1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...FONTS.h3,
        color: COLORS.blue_1,
        textAlign: 'center',
        maxWidth: 80,
    },
});
