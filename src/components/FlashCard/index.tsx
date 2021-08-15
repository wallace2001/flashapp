/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import MiniLogo from '../../../assets/images/minilogo.png';
import { COLORS } from '../../../constants/theme';
import { styles } from '../../screens/CreateFile/styles';
import { Asset } from 'react-native-image-picker';

interface PropsButton extends TouchableOpacityProps{
    flashCard: {
        question: string;
        response: string;
    },
    handleChangeSide: () => void;
    sideFlash: boolean;
    photos: {
        front: Asset[],
        back: Asset[],
    },
}

export const FlashCard = ({ flashCard, sideFlash, handleChangeSide, photos, ...rest}: PropsButton) => {

    return (
        <TouchableOpacity
            onPress={handleChangeSide}
            activeOpacity={0.7}
            style={stylesFlash.container}
            {...rest}
        >
            <View style={styles.headerFlashCard}>
                <Image source={MiniLogo} />
            </View>
            <View
                style={[styles.middleFlashCard, {
                display: sideFlash ? 'flex' : 'none',
            }]}
            >
                <Text style={styles.question}>{flashCard.question}</Text>
                <View style={styles.footerFlashCard}>
                    {photos.front !== undefined && photos.front.map(item => {
                            return (
                                <Image
                                    key={item.fileName}
                                    style={styles.image}
                                    source={{uri: item.uri}}
                                />
                            );
                    })}
                </View>
            </View>
            <View
                style={[styles.middleFlashCard, {
                    display: !sideFlash ? 'flex' : 'none',
            }]}>
                <Text style={styles.question}>{flashCard.response}</Text>
                    {photos.back !== undefined && photos.back.map(item => {
                            return (
                                <Image
                                    key={item.fileName}
                                    style={styles.image}
                                    source={{uri: item.uri}}
                                />
                            );
                    })}
            </View>
        </TouchableOpacity>
    );
};

const stylesFlash = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: COLORS.blue_1,
        borderStyle: 'dashed',
        borderRadius: 1,
        padding: 10,
        minHeight: 130,
    },
});
