/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';

interface PropsProgressFlashCard{
    progress: number;
    handleChangeProgress: (progressScreen: number) => void;
}

export const ProgressFlashCard = ({progress, handleChangeProgress}: PropsProgressFlashCard) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={() => handleChangeProgress(1)}
                    activeOpacity={0.8}
                    style={[styles.ball, progress >= 1 ?
                            {backgroundColor: COLORS.secondary} :
                            {backgroundColor: COLORS.pink_transparent}]}
                    >
                    <Text style={styles.text}>1</Text>
                </TouchableOpacity>
                <View style={[styles.line, progress >= 2 ?
                    {backgroundColor: COLORS.secondary} :
                    {backgroundColor: COLORS.blue_1}]}
                />
                <TouchableOpacity
                    onPress={() => handleChangeProgress(2)}
                    activeOpacity={0.8}
                    style={[styles.ball, progress >= 2 ?
                        {backgroundColor: COLORS.secondary} :
                        {backgroundColor: COLORS.pink_transparent}]}
                    >
                    <Text style={styles.text}>2</Text>
                </TouchableOpacity>
                <View style={[styles.line, progress >= 3 ?
                    {backgroundColor: COLORS.secondary} :
                    {backgroundColor: COLORS.blue_1}]}
                />
                <TouchableOpacity
                    onPress={() => handleChangeProgress(3)}
                    activeOpacity={0.8}
                    style={[styles.ball, progress >= 3 ?
                        {backgroundColor: COLORS.secondary} :
                        {backgroundColor: COLORS.pink_transparent}]}
                >
                    <Text style={styles.text}>3</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: COLORS.white,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ball: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: COLORS.blue_1,
    },
    text: {
        ...FONTS.h1,
        color: COLORS.white,
    },
});
