/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { View, Animated, StyleSheet, Modal, TouchableOpacity, Image, TouchableWithoutFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { COLORS, FONTS, PROFILEIMAGES, SIZES } from '../../../constants/theme';
import { saveImage } from '../../stores/action/authAction';

interface PropsModal{
    open: boolean;
    handleCancel: () => void;
}

export const ModalRegister = ({open, handleCancel}: PropsModal) => {
    const modalAnimatedValue = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {});
        }
    }, [open]);

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 500],
    });

    const handleSelectImage = (image: string) => {
        dispatch(saveImage({image: image}));
        handleCancel();
    };

    return (
        <Modal
            animationType="fade"
            visible={open}
            transparent={true}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handleCancel}>
                    <View style={styles.contentTransparent} />
                </TouchableWithoutFeedback>
                <Animated.ScrollView style={[styles.content, {top: modalY}]}>
                    <TouchableOpacity onPress={handleCancel} style={styles.header}>
                        <Icon name="times" size={30} color={COLORS.blue_1} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Escolha uma foto</Text>
                    <View style={styles.imagesBox}>
                        {PROFILEIMAGES.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => handleSelectImage(item.url)} style={styles.imagesButton} key={index}>
                                    <Image style={styles.image} source={{uri: item.url}} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Animated.ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.transparentBlack1,
    },
    contentTransparent: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    content: {
        flex: 1,
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '80%',
        padding: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    title: {
        ...FONTS.h3,
        color: COLORS.blue_1,
        marginBottom: 30,
    },
    imagesBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 50,
    },
    imagesButton: {
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor: COLORS.pink_1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    image: {
        width: '75%',
        height: '75%',
        resizeMode: 'contain',
    },
});
