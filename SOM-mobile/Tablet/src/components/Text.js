import React from 'react'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { FONT_SIZE } from '../utility/enum';
import colors from '../utility/colors';

const TextLable = (props) => {
    let baseFont = styles.medium;

    if (props.style && props.style.fontWeight) {
        baseFont = props.style.fontWeight === 'bold' ? styles.bold : styles.medium;
        props.style.fontWeight = 'normal'
    }

    return (
        <Text {...props} style={[styles.text, { ...props.style }, baseFont]}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'THSarabunNew',
        fontSize: FONT_SIZE.TEXT,
        color: colors.black
    },
    italic: {
        fontFamily: 'THSarabunNew-Italic',
    },
    bold: {
        fontFamily: 'THSarabunNew-Bold',
    },
    boldItalic: {
        fontFamily: 'THSarabunNew-BoldItalic',
    },
    medium: {
        fontFamily: 'THSarabunNew',
    },
});

export default TextLable;

TextLable.propsTypes = {
    fontWeight: PropTypes.number,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    textAlign: PropTypes.string,
    numberOfLines: PropTypes.number
}