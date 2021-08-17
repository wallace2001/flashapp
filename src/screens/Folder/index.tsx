/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MiniLogo from '../../../assets/images/minilogo.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTS } from '../../../constants/theme';
import { Folder } from '../../components/Folder';
import { ModalCreateFolder } from '../../components/ModalCreateFolder';
import { ModalDeleteFolder } from '../../components/ModalDeleteFolder';
import { Button } from '../../components/Button';

interface PropsFolder{
    route: any;
    navigation: any;
}

interface SubFolderProps{
    id: '',
    name: '',
    project_id: '',
    file_id: [],
};

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
        },
    ],
}

export const FolderContent = ({ route, navigation }: PropsFolder) => {
    const [openCreateFolder, setOpenCreateFolder] = useState<boolean>(false);
    const [openDeleteFolder, setOpenDeleteFolder] = useState<boolean>(false);
    const [subFolderDelete, setSubFolderDelete] = useState({
        name: '',
        id: '',
        fileId: '',
    });

    const {data, id, files} = route.params;

    const handleOpenCreateFolder = () => {
        setOpenCreateFolder(prevState => !prevState);
    };

    const handleDeleteFolder = () => {
        setOpenDeleteFolder(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            <ModalCreateFolder
                open={openCreateFolder}
                handleCancel={handleOpenCreateFolder}
                idFolder={id}
                navigation={navigation}
            />
            <ModalDeleteFolder
                open={openDeleteFolder}
                handleCancel={handleDeleteFolder}
                navigation={navigation}
                name={subFolderDelete.name}
                idFolder={subFolderDelete.id}
                folderId={id}
                fileDelete={subFolderDelete.fileId}
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
            <ScrollView>
                <View style={styles.content}>
                    <Folder
                        name="Criar"
                        type={true}
                        create={true}
                        onPress={handleOpenCreateFolder}
                    />
                    {data.map((item: SubFolderProps, index: number) => {
                        return (
                            item !== null &&
                                <Folder
                                key={index}
                                name={item?.name}
                                type={true}
                                onPress={() => navigation.navigate('SubFolder', {
                                    id: item.id,
                                    data: item.file_id,
                                })}
                                onLongPress={() => {
                                    setSubFolderDelete({
                                        name: item.name,
                                        id: item.id,
                                        fileId: '',
                                    });
                                    handleDeleteFolder();
                                }}
                            />
                            );
                        })}
                        {files?.map((item: any, index: number) => {
                            return (
                                <Folder
                                    key={index}
                                    name={item?.id}
                                    type={false}
                                    onLongPress={() => {
                                        setSubFolderDelete({
                                            name: item.id,
                                            id: item.id,
                                            fileId: item.id,
                                        });
                                        handleDeleteFolder();
                                    }}
                                />
                            );
                        })}
                </View>
            </ScrollView>
            <Button
                title="Estudar"
                type={true}
            />
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
});
