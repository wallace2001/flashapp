/* eslint-disable prettier/prettier */

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#319CFF', //orange
    secondary: '#FF45CB',
    pink_1: '#DB00FF',
    pink_transparent: '#FFDCFE',
    blue_1: '#235AAD',
    blue_2: '#0333AE',
    blue_3: '#0066FF',
    blue_4: '#0047FF',
    blue_transparent: 'rgba(0, 133, 255, .05)',
    blue1_transparent: 'rgba(35, 90, 173, .7)',
    green_1: '#03A600',
    red_1: '#FF0000',
    white: '#FFFFFF',
    black: '#000000',
    GRAY: '#cccccc',

    transparent: 'transparent',
    transparentBlack1: 'rgba(0, 0, 0, 0.3)',
    transparentBlack7: 'rgba(0, 0, 0, 0.7)',
    transparentWhite1: 'rgba(255, 255, 255, .8)',

};

export const PROFILEIMAGES = [
    {
        id: '1',
        url: 'https://cdn.pixabay.com/photo/2020/02/19/12/25/pug-4862083_960_720.png',
    },
    {
        id: '2',
        url: 'https://cdn.pixabay.com/photo/2015/02/13/16/40/doggy-635410_960_720.png',
    },
];

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 25,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
};
export const FONTS = {
    largeTitle: { fontFamily: 'Ubuntu-Bold', fontSize: SIZES.largeTitle },
    h1: { fontFamily: 'Ubuntu-Bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'Ubuntu-Bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'Ubuntu-Medium', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'Ubuntu-Medium', fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: 'Ubuntu-Medium', fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
