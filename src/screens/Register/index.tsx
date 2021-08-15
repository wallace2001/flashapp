/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { Button } from '../../components/Button';
import { ModalRegister } from '../../components/ModalRegister';
import { registerCredentials } from '../../stores/action/authAction';

interface PropsHookForm{
    email: string;
    password: string;
    name: string;
    image: string;
    telphone: string;
}

export const Register = () => {
    const [openModalPhotos, setOpenModalPhotos] = useState<boolean>(false);

    const { control, handleSubmit, formState: {errors} } = useForm();

    const dispatch = useDispatch();
    const { credentials, error, loading } = useSelector((state: RootStateOrAny) => state.authReducer);

    const onSubmit = async(data: PropsHookForm) => {
        const config = {
            name: data.name,
            email: data.email,
            image: credentials.image ? credentials.image : 'https://cdn.pixabay.com/photo/2020/02/19/12/25/pug-4862083_960_720.png',
            telphone: data.telphone,
            password: data.password,
        };
        dispatch(registerCredentials(config));
        if (error === ''){
            navigation.navigate('Confirm');
        }
    };


    const handleModalPhotos = () => {
        setOpenModalPhotos(prevState => !prevState);
    };

    const navigation: any = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header_1}>
                    <TouchableOpacity onPress={handleModalPhotos} activeOpacity={0.7} style={styles.profile}>
                        {credentials.image ? (
                         <Image
                            source={{uri: credentials.image}}
                            resizeMode="contain"
                            style={styles.image}
                        />
                        ) : (
                            <>
                                <Icon name="camera" size={25} />
                                <Text style={styles.textProfile}>Escolha uma foto</Text>
                            </>
                        )}
                    </TouchableOpacity>
            </View>
            <ModalRegister
                open={openModalPhotos}
                handleCancel={handleModalPhotos}
            />
            <View style={styles.content}>
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
                        placeholder="Nome"
                        keyboardType="default"
                        placeholderTextColor={COLORS.blue_1}
                        value={value}
                    />
                    )}
                    name="name"
                    defaultValue=""
                />
                {errors.password && <Text style={styles.textWrong}>Digite seu nome</Text>}
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
                        keyboardType="default"
                        placeholderTextColor={COLORS.blue_1}
                        value={value}
                    />
                    )}
                    name="email"
                    defaultValue=""
                />
                {errors.email && <Text style={styles.textWrong}>Digite seu email</Text>}
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
                        placeholder="Telefone"
                        keyboardType="phone-pad"
                        placeholderTextColor={COLORS.blue_1}
                        value={value}
                    />
                    )}
                    name="telphone"
                    defaultValue=""
                />
                {errors.telphone && <Text style={styles.textWrong}>Digite um número de telefone</Text>}
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
                {errors.password && <Text style={styles.textWrong}>Digite uma senha</Text>}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    type={true}
                    title="Cadastrar"
                    onPress={handleSubmit(onSubmit)}
                    loading={loading}
                />
            </View>

            <View style={styles.register}>
                <Button
                    type={false}
                    title="Fazer login"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header_1: {
        height: 140,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.pink_1,
        justifyContent: 'center',
    },
    profile: {
        width: 110,
        height: 110,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,

        position: 'absolute',
        bottom: -40,
    },
    image: {
        width: '90%',
        height: '90%',
    },
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
        paddingHorizontal: SIZES.padding,
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
    textProfile: {
        ...FONTS.h4,
        color: COLORS.black,
        textAlign: 'center',
    },
    textWrong: {
        ...FONTS.h4,
        color: COLORS.red_1,
        marginTop: 10,
    },
});
