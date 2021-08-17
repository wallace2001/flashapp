/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Folder } from '../../components/Folder';
import MiniLogo from '../../../assets/images/minilogo.png';
import { COLORS, FONTS } from '../../../constants/theme';
import { ModalCreateFolder } from '../../components/ModalCreateFolder';
import { requestFolder } from '../../stores/action/folderAction';
import { ModalDeleteFolder } from '../../components/ModalDeleteFolder';

interface PropsFolders{
        id: '',
        name: '',
        project_id: '',
        file_id: [
            {
                id: '',
                question: '',
                response: '',
                images: [
                    {
                        id: '',
                        url: '',
                    },
                ],
            },
        ],
        folders: [
            {
                id: '',
                name: '',
                project_id: '',
                file_id: [],
                folders: [],
            },
        ],
}

export const Home = () => {
    const [openCreateFolder, setOpenCreateFolder] = useState<boolean>(false);
    const [openDeleteFolder, setOpenDeleteFolder] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [idFolder, setIdFolder] = useState<string>('');

    const containerOpacity = useSharedValue(0);
    const navigation: any = useNavigation();
    const dispatch = useDispatch();

    const { account } = useSelector((state: RootStateOrAny) => state.authReducer);
    const { folders } = useSelector((state: RootStateOrAny) => state.folderReducer);

    useEffect(() => {
        setTimeout(() => {
            containerOpacity.value = withTiming(1, {duration: 500});
        }, 0.5 * 1000);
    }, []);

    useEffect(() => {
        dispatch(requestFolder(account?.project_id));
    }, []);

    const containerStyles = useAnimatedStyle(() => {
        return {
            opacity: containerOpacity.value,
        };
    });

    const handleOpenCreateFolder = () => {
        setOpenCreateFolder(prevState => !prevState);
    };

    const handleDeleteFolder = () => {
        setOpenDeleteFolder(prevState => !prevState);
    };

    return (
        <Animated.ScrollView style={[styles.container, {...containerStyles}]}>
            <ModalCreateFolder
                open={openCreateFolder}
                handleCancel={handleOpenCreateFolder}
                navigation={navigation}
            />
            <ModalDeleteFolder
                open={openDeleteFolder}
                handleCancel={handleDeleteFolder}
                navigation={navigation}
                name={name}
                idFolder={idFolder}
            />
            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    {account.image ? (
                        <Image source={{uri: account.image}} resizeMode="cover" style={styles.profile} />
                        ) : (
                        <View style={styles.profile} />
                    )}
                    <View style={styles.info}>
                        <Text style={styles.text}>Bem vindo(a)</Text>
                        <Text style={styles.title}>{account.name}</Text>
                    </View>
                </View>
                <Image source={MiniLogo} style={styles.minilogo}/>
            </View>
            <View style={styles.content}>
                <View style={styles.addCard}>
                    <Text style={styles.textCard}>Adicionar um novo FlashCard</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Create')} style={styles.buttonAdd}>
                        <Icon name="plus" size={30} color={COLORS.blue_1} />
                    </TouchableOpacity>
                </View>
                <View style={styles.folders}>
                    <Text style={[styles.textCard, {marginTop: 20}]}>Suas Pastas</Text>
                    <View style={styles.boxFolder}>
                        <Folder
                            name="Criar"
                            type={true}
                            create={true}
                            id="1"
                            onPress={handleOpenCreateFolder}
                        />
                        {folders.map((item: PropsFolders, index: number) => {
                            return (
                                <Folder
                                    key={index}
                                    name={item.name}
                                    id={item?.id}
                                    type={true}
                                    onPress={() => navigation.navigate('Folder', {
                                        id: item.id,
                                        data: item.folders,
                                        files: item.file_id,
                                    })}
                                    onLongPress={() => {
                                        setName(item.name);
                                        setIdFolder(item.id);
                                        handleDeleteFolder();
                                    }}
                                />
                            );
                        })}
                    </View>
                </View>
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    info: {
        justifyContent: 'center',
        marginLeft: 15,
    },
    text: {
        fontSize: 17,
        color: COLORS.blue_1,
        fontFamily: 'Ubuntu-Regular',
    },
    title: {
        fontSize: 19,
        color: COLORS.blue_1,
        fontFamily: 'Ubuntu-Bold',
    },
    minilogo: {},
    content: {
        padding: 15,
    },
    addCard: {},
    textCard: {
        ...FONTS.h3,
        color: COLORS.blue_1,
    },
    buttonAdd: {
        width: 200,
        height: 100,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 1,
        borderColor: COLORS.blue_1,
        backgroundColor: COLORS.blue_transparent,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    folders: {},
    boxFolder: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
});
