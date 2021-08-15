/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MiniLogo from '../../../assets/images/minilogo.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTS } from '../../../constants/theme';
import { Folder } from '../../components/Folder';
import { ModalCreateFolder } from '../../components/ModalCreateFolder';

interface PropsFolder{
    route: any;
    navigation: any;
}

interface SubFolderProps{
    id: '',
    name: '',
    project_id: '',
    file_id: [],
}

export const SubFolderContent = ({ route, navigation }: PropsFolder) => {
    const [openCreateFolder, setOpenCreateFolder] = useState<boolean>(false);

    const {data, id} = route.params;
    console.log(data);

    const handleOpenCreateFolder = () => {
        setOpenCreateFolder(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            <ModalCreateFolder
                open={openCreateFolder}
                handleCancel={handleOpenCreateFolder}
                idFolder={id}
                navigation={navigation}
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={30} color={COLORS.blue_1} />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image source={MiniLogo} />
                    <Text style={styles.title}>FlashApp</Text>
                </View>
            </View>
            <View style={styles.content}>
                {data === null ? (
                    <View style={styles.empty}>
                        <Text style={styles.title}>Nenhum arquivo</Text>
                    </View>
                ) : (
                    data !== null && data.map((item: SubFolderProps, index: number) => {
                        return (
                            item !== null &&
                            <Folder
                                key={index}
                                name={item?.name}
                                id={item?.id}
                                type={true}
                            />
                        );
                    })
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        ...FONTS.h3,
        color: COLORS.blue_1,
        marginLeft: 10,
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
