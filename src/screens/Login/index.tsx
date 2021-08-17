/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import miniLogo from '../../../assets/images/minilogo.png';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { Button } from '../../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { authentication } from '../../stores/action/authAction';

interface PropsHookForm{
    email: string;
    password: string;
}

export const Login = () => {

    const { control, handleSubmit, formState: {errors} } = useForm();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootStateOrAny) => state.authReducer);

    console.log(error);

    const onSubmit = async(data: PropsHookForm) => {
        const credentials = {
            email: data.email,
            password: data.password,
        };

        dispatch(authentication(credentials));
    };

    const navigation: any = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.header_1}>
                    <Image style={styles.imageLogo} source={miniLogo} />
                    <Text style={styles.text}>FlashApp</Text>
                </View>
                <View style={styles.header_2}>
                    <Text style={styles.title}>Bem vindo ao FlashApp</Text>
                </View>
                <View style={styles.content}>
                    {error !== '' && <Text style={styles.textWrong}>{error}</Text>}
                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            placeholderTextColor={COLORS.blue_1}
                            value={value}
                        />
                        )}
                        name="email"
                        defaultValue=""
                    />
                    {errors.email && <Text style={styles.textWrong}>Digite o e-mail</Text>}
                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="Senha"
                            secureTextEntry={true}
                            placeholderTextColor={COLORS.blue_1}
                            value={value}
                        />
                        )}
                        name="password"
                        defaultValue=""
                    />
                    {errors.password && <Text style={styles.textWrong}>Digite a senha</Text>}
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        type={true}
                        title="Entrar"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        type={false}
                        icon="facebook"
                        title="Entrar com facebook" />
                </View>

                <View style={styles.register}>
                    <Button
                        type={false}
                        title="Registrar"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
    },
    header_1: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    header_2: {
        marginTop: 30,
    },
    imageLogo: {},
    text: {
        marginLeft: SIZES.base,
        ...FONTS.h2,
        color: COLORS.blue_1,
    },
    title: {
        ...FONTS.h2,
        color: COLORS.blue_1,
    },
    content: {
        marginTop: 30,
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.blue_1,
        borderRadius: 20,
        marginTop: SIZES.body1,
        paddingHorizontal: SIZES.radius,
        color: COLORS.blue_1,
        fontSize: SIZES.h3,
    },
    buttonContainer: {},
    register: {
        marginTop: 40,
        marginBottom: 40,
    },
    textWrong: {
        ...FONTS.h4,
        color: COLORS.red_1,
        marginTop: 10,
    },
});
