
import  { useNavigation } from '@react-navigation/native';

import React, { useContext, useState} from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { BackgroundCustom, ButtonAcessar } from './styled';


export default function Home() { 

    const { logoff, user } = useContext(AuthContext);

    return(
        <BackgroundCustom>
            <Text>Home</Text>
            <Text>ID: { user.id } </Text>
            <Text>Nome: { user.name } </Text>
            <Text>E-mail: { user.email } </Text>
            <Text>Balance: { user.balance } </Text>

            <ButtonAcessar onPress={() => logoff()}>
                <Text>Sair</Text>
            </ButtonAcessar>
        </BackgroundCustom>
    );

}