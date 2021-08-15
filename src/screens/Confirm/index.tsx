/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import MiniLogo from '../../../assets/images/minilogo.png';
import { COLORS, FONTS } from '../../../constants/theme';
import { Button } from '../../components/Button';
import { confirmAccount } from '../../stores/action/authAction';

export const Confirm = () => {

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const { idCreate, success } = useSelector((state: RootStateOrAny) => state.authReducer);

    const navigation: any = useNavigation();
    const dispatch = useDispatch();

    const handleConfirmAccount = () => {
        dispatch(confirmAccount(value, idCreate));

        if (success){
            navigation.navigate('Congratulations');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image source={MiniLogo} />
                <Text style={styles.title}>FlashApp</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.text}>Verifique o código que enviamos para o seu telefone</Text>
                <View style={styles.inputs}>
                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    )}
                />
                </View>
                <Text style={styles.link}>Reenviar o código</Text>

                <View>
                    <Button
                        title="Confirmar"
                        type={true}
                        onPress={() => handleConfirmAccount()}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        ...FONTS.h3,
        color: COLORS.blue_1,
    },
    bottom: {
    },
    text: {
        fontSize: 21,
        color: COLORS.blue_1,
        marginTop: 50,
        fontFamily: 'Ubuntu-Bold',
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
    },
    input: {
        width: 50,
        height: 50,
        borderRadius: 7,
        backgroundColor: COLORS.white,
        fontSize: 20,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.black,
    },
    link: {
        marginTop: 20,
        color: COLORS.blue_1,
        fontSize: 17,
        fontFamily: 'Ubuntu-Regular',
    },
    button: {
        height: 50,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        borderRadius: 20,
    },
    textButton: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 16,
    },
    root: {
        flex: 1,
        padding: 20,
    },
    titleInput: {
        textAlign: 'center',
        fontSize: 30,
    },
    codeFieldRoot: {
        marginTop: 20,
    },
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: COLORS.primary,
      textAlign: 'center',
    },
    focusCell: {
      borderColor: COLORS.secondary,
    },
});
