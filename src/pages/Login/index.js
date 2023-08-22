
import  { useNavigation } from '@react-navigation/native';

import React, { useContext, useState, useEffect} from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Platform } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { BackgroundCustom, ButtonAcessar, ContainerCustom, ContainerImage, FormularioLogin, LinkCustom, LinkText, LogoCustom, TitleCustom } from './styled';

export default function Login(/* {navigation} */) {

  const { signIn, loadingAuth, user } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const [description, setDescription] = useState('');

  async function entrar() {
        if(email != '' && password != '') {
          signIn(email, password);
        } else {
          alert("Informe os dados para logar!");
        }
  }

  function newAccount() {
    navigation.navigate("Nova Conta");
  }

  return (
      <BackgroundCustom>

       <ContainerCustom
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
       >
        <ContainerImage> 
          <LogoCustom source={require('../../assets/Logo.png')} />
          {/* <TitleCustom>Acessar Sistema</TitleCustom>    */}
        </ContainerImage>  
        <FormularioLogin>
          
          <TextInput 
           style={styles.textForm} 
           placeholder="Informe o E-mail" 
           onChangeText={setEmail}
           value={email} 
          />

          {/* passar textForm para styled */}
          <TextInput 
           style={styles.textForm} 
           placeholder="Informe a senha" 
           onChangeText={setPassword}
           value={password} 
           secureTextEntry={true}
           autoCorrect={false}
           autoCapitalize="none"
          />

        </FormularioLogin>


        { (loadingAuth == false) ? 
     
        <ButtonAcessar style={{ opacity: 0.8 }} onPress={() => { entrar() }}> 
        
        {/* passar textButton para styled */}
          <Text style={styles.textButton}>ENTRAR</Text>
        </ButtonAcessar>
     
        : <ActivityIndicator size={36} color="#4169E1" /> 
        
        }

        <LinkCustom onPress={() => { newAccount() }}>
         <LinkText>Criar uma Conta!</LinkText>
        </LinkCustom>

       </ContainerCustom>
      </BackgroundCustom>
  );
}

const styles = StyleSheet.create({
 

  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 8
  },
 
  textForm: {
    color: "black",
    fontSize: 18,
    fontWeight: '700',
    //paddingLeft: 8,
    //paddingRight: 8,
    borderColor: '#1E90FF',
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 18,
    width: "90%",
    height: 50,
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 26,
    backgroundColor: "white"
  },
  
});
