//https://www.youtube.com/watch?v=0AM6AXlFwxM&ab_channel=OneBitCode

import React, { useState, useContext} from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { BackgroundCustom, ButtonSalvar, ContainerCustom, FormularioLogin } from './styled';

export default function CreateAccount() {

 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   //trazer o AuthContext para ter acesso a informação
   //E o useContext 
   //Para obter a informação contida no provider
   const { signUp, loadingAuth } = useContext(AuthContext);
  
  // async function saveTask() {
    
    
  // }

  function handleSignUp() {
   
    if(name != '' && email != '' && password != '') {
     signUp(name, email, password);

     setEmail('');
     setName('');
     setPassword('');
     
    } else {
      alert("Informe todos os campos");
    }


    
  }

  return (
    <BackgroundCustom>

    <ContainerCustom
     behavior={Platform.OS === 'ios' ? 'padding' : ''}
     enabled
    >
     <FormularioLogin>

       <TextInput 
        style={styles.textForm} 
        placeholder="Digite seu Nome" 
        onChangeText={setName}
        value={name} 
       />
       
       <TextInput 
        style={styles.textFormEmail} 
        placeholder="Digite seu E-mail" 
        onChangeText={setEmail}
        value={email} 
       />

       {/* <TextInput 
        style={styles.textFormEmail} 
        placeholder="Confirme o E-mail" 
        onChangeText={setDescription}
        value={description} 
       /> */}

       {/* passar textForm para styled */}
       <TextInput 
        style={styles.textFormPassword} 
        placeholder="Digite sua Senha" 
        onChangeText={setPassword}
        value={password} 
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
       />

     </FormularioLogin>

     { (loadingAuth == false) ? 
     <ButtonSalvar onPress={ () => { handleSignUp() }}> 
     
     {/* passar textButton para styled */} 
       <Text style={styles.textButton}>CRIAR</Text>
     </ButtonSalvar>
     : <ActivityIndicator size={36} color="#4169E1" /> 
     }

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
    borderColor: 'green',
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
  textFormPassword: {
    color: "black",
    fontSize: 18,
    fontWeight: '700',
    //paddingLeft: 8,
    //paddingRight: 8,
    borderColor: 'green',
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
  textFormEmail: {
    color: "black",
    fontSize: 18,
    fontWeight: '700',
    //paddingLeft: 8,
    //paddingRight: 8,
    borderColor: 'green',
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
    backgroundColor: "white",
  },
});
