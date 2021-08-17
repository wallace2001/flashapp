/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, ScrollView, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { RNCamera } from 'react-native-camera';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import MiniLogo from '../../../assets/images/minilogo.png';
import { COLORS } from '../../../constants/theme';
import { styles } from './styles';
import { Button } from '../../components/Button';
import { Folder } from '../../components/Folder';
import { ProgressFlashCard } from '../../components/ProgressFlashCard';
import { changeProgress, createFlashCard } from '../../stores/action/flashAction';
import { searchFolder } from '../../stores/action/folderAction';
import { useEffect } from 'react';
import { useState } from 'react';
import { FlashCard } from '../../components/FlashCard';

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
            folders_id: '',
        },
    ],
}

interface PropsSubFolder{
    id: '',
    name: '',
    project_id: '',
    file_id: [],
    folders_id: '',
}

interface PropsFlashCard{
    question: string;
    response: string;
}

interface PropsPhotos{
    front: Asset[],
    back: Asset[],
}

export const CreateFlashCard = () => {

    const { flashDetails, progress } = useSelector((state: RootStateOrAny) => state.flashReducer);

    const [subFolder, setSubFolder] = useState<PropsSubFolder[] | undefined>([]);
    const [screenSubFolder, setScreenSubFolder] = useState<boolean>(false);
    const [idFolderSelect, setIdFolderSelect] = useState<string>(flashDetails?.folder_id ? flashDetails?.folder_id : '');
    const [idSubFolderSelect, setIdSubFolderSelect] = useState<string>(flashDetails?.sub_folder_id ? flashDetails?.sub_folder_id : '');
    const [flashCard, setFlashCard] = useState<PropsFlashCard>({
        question: flashDetails?.question ? flashDetails?.question : '',
        response: flashDetails?.response ? flashDetails?.response : '',
    });
    const [sideFlash, setSideFlash] = useState(false);
    const [photos, setPhotos] = useState<PropsPhotos | any>({
        front: [],
        back: [],
    });

    const subFolderTruth = subFolder?.length === 0 ? false : true;

    const navigation = useNavigation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchFolder(''));
    }, []);

    const { foldersSearch, loading } = useSelector((state: RootStateOrAny) => state.folderReducer);
    const { account } = useSelector((state: RootStateOrAny) => state.authReducer);

    const handleChangeProgress = (progressScreen: number) => {
        dispatch(changeProgress(progressScreen));
    };

    const handleChangeSide = () => {
        setSideFlash(prevState => !prevState);
    };

    const handleClickFolder = (idFolder: string, folders?: PropsSubFolder[]) => {
        setIdSubFolderSelect('');
        setScreenSubFolder(true);
        folders ? setSubFolder(folders) : null;
        setIdFolderSelect(idFolder);
    };

    const handleCancelSub = () => {
        setScreenSubFolder(false);
        setSubFolder([]);
    };

    const handleNext = () => {
        if (progress === 1){
            const config = {
                ...flashDetails,
                folder_id: idFolderSelect,
                sub_folder_id: idSubFolderSelect,
            };
            dispatch(createFlashCard({...config}, account.project_id));
            dispatch(changeProgress(2));
        } else if (progress === 2){
            const config = {
                ...flashDetails,
                question: flashCard.question,
                response: flashCard.response,
            };
            dispatch(createFlashCard({...config}, account.project_id));
            dispatch(changeProgress(3));
        } else {
            let array = [];
            for (let i = 0; i < photos.front.length; i++) {
                const photosObject = {
                    uri: photos.front[i].uri,
                    name: `frt${photos.front[i].fileName}`,
                    type: photos.front[i].type,
                };

                array.push(photosObject);
            }
            for (let i = 0; i < photos.back.length; i++) {
                const photosObject = {
                    uri: photos.back[i].uri,
                    name: `bck${photos.back[i].fileName}`,
                    type: photos.back[i].type,
                };

                array.push(photosObject);
            }

            dispatch(createFlashCard({
                ...flashDetails,
                photos: [...array],
                progress: 3,
                navigation: navigation,
            }, account.project_id));
        }

        // const buttonNext = Number(progress) + 1;
        // if (buttonNext <= 3){
        //     dispatch(changeProgress(buttonNext));
        // }
    };

    const handleDeleteImage = (fileName: string) => {

        const filtered = sideFlash ? photos.front.filter((item: Asset) => {
            return item.fileName !== fileName;
        }) : photos.back.filter((item: Asset) => {
            return item.fileName !== fileName;
        });

        sideFlash ? setPhotos({
            ...photos,
            front: filtered,
        }) : setPhotos({
            ...photos,
            back: filtered,
        });
    };

    const options: any = {
        skipBackup: true,
        path: 'images',
      };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={30} color={COLORS.blue_1} />
                </TouchableOpacity>
                <Image source={MiniLogo} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Criar um novo FlashCard</Text>
                <View>
                    <ProgressFlashCard
                        progress={progress}
                        handleChangeProgress={handleChangeProgress}
                    />
                </View>
                {progress === 1 ? (
                    <View>
                        <Text style={[styles.title, {marginTop: 30}]}>Escolha a pasta</Text>

                        <TextInput
                            placeholder="Pesquisar pasta"
                            style={styles.input}
                            placeholderTextColor={COLORS.blue_1}
                            onChangeText={(text: string) => dispatch(searchFolder(text))}
                        />

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                                <TouchableOpacity
                                    onPress={handleCancelSub}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.title}>Pastas {'>'} </Text>
                                </TouchableOpacity>
                                {subFolderTruth && (
                                        <Text style={styles.title}>sub Pastas</Text>
                                )}
                            </View>
                            <View style={styles.boxFolder}>
                                {loading ? (
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                    }}>
                                        <ActivityIndicator color={COLORS.secondary} size="large" />
                                    </View>
                                ) : (
                                    <>
                                        {foldersSearch.length === 0 || screenSubFolder && !subFolderTruth && (
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={styles.title}>Sem Arquivos</Text>
                                            </View>
                                        )}
                                        {!screenSubFolder && !subFolderTruth ? (
                                            foldersSearch.map((item: PropsFolders, index: number) => {
                                                return (
                                                    <Folder
                                                        key={index}
                                                        name={item.name}
                                                        id={item?.id}
                                                        type={true}
                                                        onPress={() => handleClickFolder(item.id, item.folders)}
                                                        idFolderSelect={idSubFolderSelect ? '2' : idFolderSelect}
                                                    />
                                                );
                                            })
                                        ) : (
                                            subFolder?.map((item: PropsSubFolder, index: number) => {
                                                return (
                                                    <Folder
                                                        key={index}
                                                        id={item?.id}
                                                        name={item?.name}
                                                        type={true}
                                                        onPress={() => setIdSubFolderSelect(item?.id)}
                                                        idFolderSelect={idSubFolderSelect}
                                                    />
                                                );
                                            })
                                        )}
                                    </>
                                )}

                            </View>
                        </ScrollView>
                    </View>
                ) : progress === 2 ? (
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 30,
                        }}>
                            <Text style={styles.title}>
                                FlashCard
                            </Text>
                            <Text style={styles.subTitle}>
                                (Toque para alterar o lado)
                            </Text>
                        </View>

                        <Text style={[styles.title, {
                            marginTop: 10,
                        }]}>{sideFlash ? 'Frente' : 'Verso'}</Text>

                        <FlashCard
                            handleChangeSide={handleChangeSide}
                            sideFlash={sideFlash}
                            flashCard={flashCard}
                            photos={photos}
                        />

                        <TextInput
                            placeholder="Pergunta"
                            style={styles.input}
                            placeholderTextColor={COLORS.blue_1}
                            onChangeText={(text: string) => setFlashCard({...flashCard, question: text})}
                            value={flashCard.question}
                        />

                        <TextInput
                            placeholder="Resposta"
                            style={[styles.input, {
                                minHeight: 100,
                            }]}
                            placeholderTextColor={COLORS.blue_1}
                            onChangeText={(text: string) => setFlashCard({...flashCard, response: text})}
                            value={flashCard.response}
                        />
                    </View>
                ) : (
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 30,
                        }}>
                            <Text style={styles.title}>
                                FlashCard
                            </Text>
                            <Text style={styles.subTitle}>
                                (Toque para alterar o lado)
                            </Text>
                        </View>

                        <Text style={styles.title}>{sideFlash ? 'Frente' : 'Verso'}</Text>

                        <FlashCard
                            handleChangeSide={handleChangeSide}
                            sideFlash={sideFlash}
                            flashCard={flashCard}
                            photos={photos}
                        />

                        <Text style={[styles.title, {marginTop: 15}]}>Adicionar foto</Text>
                        <TouchableOpacity
                            onPress={() => launchImageLibrary(options, (res: any) => {
                                let photoResponse;

                                if (sideFlash){
                                    photoResponse = photos.front === undefined ? res.assets : [...photos.front, ...res.assets];
                                } else {
                                    photoResponse = photos.back === undefined ? res.assets : [...photos.back, ...res.assets];
                                }

                                sideFlash ? setPhotos({
                                    ...photos,
                                    front: photoResponse,
                                }) : setPhotos({
                                    ...photos,
                                    back: photoResponse,
                                });
                            })}
                            style={styles.addPhoto}>
                            <Icon name="plus" size={30} color={COLORS.blue_1} />
                        </TouchableOpacity>
                        {/* <RNCamera
                            ref={camera => setCamera(camera)}
                            style={styles.camera}
                            type={RNCamera.Constants.Type.back}
                            autoFocus={RNCamera.Constants.AutoFocus.on}
                            flashMode={RNCamera.Constants.FlashMode.off}
                            androidCameraPermissionOptions={{
                                title: 'Permissão para a camera',
                                message: 'Precisamos da sua permissão para usar a camera',
                            }}
                        /> */}

                        <Text style={[styles.title, {marginTop: 15}]}>Fotos Frente</Text>
                        <FlatList
                            data={photos.front}
                            keyExtractor={(photos: any) => photos.fileName}
                            renderItem={({item}) => {
                                return (
                                    <ImageBackground source={{uri: item?.uri}} style={styles.photoBox}>
                                        <TouchableOpacity onPress={() => handleDeleteImage(item?.fileName)} style={styles.trash}>
                                            <Icon name="trash" color={COLORS.red_1} size={10} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                );
                            }
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{marginLeft: 20}} />
                                );
                            }}
                        />

                        <Text style={[styles.title, {marginTop: 15}]}>Fotos Verso</Text>
                        <FlatList
                            data={photos.back}
                            keyExtractor={(photos: any) => photos.fileName}
                            renderItem={({item}) => {
                                return (
                                    <ImageBackground source={{uri: item?.uri}} style={styles.photoBox}>
                                        <TouchableOpacity onPress={() => handleDeleteImage(item?.fileName)} style={styles.trash}>
                                            <Icon name="trash" color={COLORS.red_1} size={10} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                );
                            }
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{marginLeft: 20}} />
                                );
                            }}
                        />
                    </View>
                )}

                <Button
                    title={progress >= 3 ? 'Finalizar' : 'Prosseguir'}
                    type={true}
                    style={{
                        marginBottom: 50,
                    }}
                    onPress={handleNext}
                />
            </View>
        </ScrollView>
    );
};
