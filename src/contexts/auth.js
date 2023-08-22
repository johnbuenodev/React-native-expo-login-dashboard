import { useNavigation } from "@react-navigation/native";

import AsyncStorage from  '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from "react";

import api from "../services/api";

//criando o contexto
export const AuthContext = createContext({});

//criando o Provider

export default function AuthProvider({ children }) {

    //ver se vai utilizar
    useEffect(() => {

      async function verifyUser() {
      
      setLoading(true);
      const tokenValue = await AsyncStorage.getItem('@tokenSystem');
      if(tokenValue) {
        api.defaults.headers['Authorization'] = `Bearer ${tokenValue}`;
        
        try {
          const response = await api.get("/me");   
          console.log(response);
          if(response.data.id || response.data.name) {
             //alert(`Usuario: ${response.data.name}`);
             

             api.defaults.headers['Authorization'] = `Bearer ${tokenValue}`;

             //passado direto porq o token é uma string, senão precisaria converter para um JSON.stringify
             //await AsyncStorage.setItem('@tokenSystem', tokenValue); //JSON.stringify(response.data.token)
             
             setTimeout(() => {
              setLoading(false);
              //Se precisar remover o balance do retorno da chamada /me , comentar o corpo do user  nos campos balance
              setUser({name: response.data.name, id:response.data.id, token: tokenValue, email: response.data.email, balance: response.data.balance});
             }, 2000);
             
          } else {
            //navigation.navigate("Login");
            setLoading(false);
            setUser(null);
          }
        
         } catch (error) {
            console.log(error);
            setLoading(false);
            //navigation.navigate("Login");
            setUser(null);
         }
      } 
      }

      verifyUser();
    },[]);

    const navigation = useNavigation();

    const [user, setUser] = useState(null); //{name: "john"}
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    async function signUp(name, email, password) {

      setLoadingAuth(true);

      // console.log(name, email, password);
      // console.log("Cadastrar usuario");
      try {
       const response = await api.post("/users", {name:name, email:email, password:password});   
      
       if(response.data.id) {
         // console.log("Retorno");
         // console.log(response.data);
         setTimeout(() => {
          setLoadingAuth(false);
          navigation.goBack();
         }, 1500)
       }
     
      } catch (error) {
         console.log(error);
         setLoadingAuth(false);
      }
    }

    async function signIn(email, password) {
      try {
        setLoadingAuth(true);
        const response = await api.post("/login", {email:email, password:password});   
       
        if(response.data.id && response.data.name) {
          
          setTimeout(async () => {
            setLoadingAuth(false);
          
            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

            //passado direto porq o token é uma string, senão precisaria converter para um JSON.stringify
            await AsyncStorage.setItem('@tokenSystem', response.data.token); //JSON.stringify(response.data.token)

            setUser({name: response.data.name, id:response.data.id, token: response.data.token});
          
          }, 1500)
        } else {
          setLoadingAuth(false);
          alert("Email ou Senha estão incorretos!");
        }
      
       } catch (error) {
          console.log(error);
          setLoadingAuth(false);
          alert("Email ou Senha estão incorretos!");
       }
    }

    async function logoff() {
      
      await AsyncStorage.removeItem('@tokenSystem').then(
        () => {
          api.defaults.headers['Authorization'] = '';
          setUser(null);
        });
      
    }

    //Dentro dele será passado os childrens / paginas|componentes da aplicação
    return( // {{ como um objeto, disponivel para as camadas q compartilharem acesso a esse provider }}
    /* signed: !!user  - pega e verifica se tem o valor dentro do objeto se tiver é VERDADEIRO | TRUE, se não tiver é FALSO | FALSE*/
     <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, logoff, loadingAuth, loading }}>
        { children }
     </AuthContext.Provider>
    );
}