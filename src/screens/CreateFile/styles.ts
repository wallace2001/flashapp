/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        marginTop: 20,
    },
    title: {
        ...FONTS.h3,
        color: COLORS.blue_1,
    },
    question: {
        ...FONTS.h3,
        color: COLORS.blue_1,
    },
    subTitle: {
        ...FONTS.h4,
        color: COLORS.blue1_transparent,
        marginLeft: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.blue_1,
        borderRadius: 20,
        marginTop: 20,
        ...FONTS.h3,
        paddingHorizontal: 20,
        color: COLORS.blue_1,
    },
    boxFolder: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 20,
        minHeight: 200,
    },
    contentFlashCard: {
        borderWidth: 1,
        borderColor: COLORS.blue_1,
        borderStyle: 'dashed',
        borderRadius: 1,
        padding: 10,
        minHeight: 130,
    },
    headerFlashCard: {},
    middleFlashCard: {
        alignItems: 'center',
    },
    footerFlashCard: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    image: {
        width: 80,
        height: 80,
        paddingVertical: 10,
        marginTop: 20,
    },
    addPhoto: {
        width: 180,
        height: 70,
        borderWidth: 1,
        borderColor: COLORS.blue_1,
        borderStyle: 'dashed',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 10,
    },
    photoBox: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: COLORS.blue_transparent,
        marginTop: 20,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    trash: {
        width: 25,
        height: 25,
        borderRadius: 100,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        borderWidth: 1,
        borderColor: COLORS.blue_1,
        height: 30,
        marginTop: 10,
    },
});
