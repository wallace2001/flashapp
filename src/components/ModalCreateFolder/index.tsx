/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { View, Animated, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { createFolder } from '../../stores/action/folderAction';
import { Button } from '../Button';

interface PropsModal{
    open: boolean;
    handleCancel: () => void;
    idFolder?: string;
    navigation: any;
}

export const ModalCreateFolder = ({open, idFolder, navigation, handleCancel}: PropsModal) => {
    const [name, setName] = useState<string>('');

    const modalAnimatedValue = useRef(new Animated.Value(0)).current;

    const { account } = useSelector((state: RootStateOrAny) => state.authReducer);
    const { loading } = useSelector((state: RootStateOrAny) => state.folderReducer);
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
        outputRange: [SIZES.height, SIZES.height - 580],
    });

    const handleCreate = () => {
        dispatch(createFolder({
            name,
            project_id: account.project_id,
            folder_id: idFolder,
        }));
        navigation.navigate('Home');
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
                    <Text style={styles.title}>Escolha o nome da pasta</Text>
                    <TextInput
                        placeholder="Digite o nome da pasta"
                        onChangeText={(text: string) => setName(text)}
                        style={styles.input}
                    />
                    <Button
                        title="Criar"
                        type={true}
                        loading={loading}
                        onPress={handleCreate}
                    />
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
        position: 'absolute',
        left: (SIZES.width / 10),
        width: '80%',
        height: '50%',
        padding: 20,
        borderRadius: 10,
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
    input: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.GRAY,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
    },
});
