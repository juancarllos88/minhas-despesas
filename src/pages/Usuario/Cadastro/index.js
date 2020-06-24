import React, { useEffect, useState } from "react";
import { ScrollView, Image, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input, Avatar, Text } from "react-native-elements";

import Icon from "react-native-vector-icons/Feather";
import { Toast} from 'native-base';
import * as Yup from 'yup';

import { useForm } from "react-hook-form";
import logo from '../../../assets/logo.png';
import styles from "./styles";
import service from "../../../services/service";


import Constants from "expo-constants";
const { manifest } = Constants;



const CadastroUsuario = ({navigation}) => {

  const defaultValues ={
    nome: "",
    email: "",
    login: "",
    senha: ""
  }

  const { register, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues
  });
  const values = watch();

  const [errorMessages, setErrorMessages] = useState({});
  // const api = (typeof manifest.packagerOpts === 'object') && manifest.packagerOpts.dev
  // ? manifest.debuggerHost.split(':').shift().concat(':3000')
  // : 'api.example.com';
  // console.tron.log(api);

  useEffect(() => {
    register("nome");
    register("email");
    register("login");
    register("senha");
  }, [register]);

  const validacaoCampos = () =>{
    return Yup.object().shape({
      nome: Yup.string().required("O nome é obrigatório"),
      login: Yup.string().required("A login é obrigatório"),
      senha: Yup.string().min(4,'Mínimo 4 caracteres').required("A senha é obrigatório"),
      email: Yup.string().email("Digite um email válido")
                         .required("O email é obrigatório"),
    });
  }


  const onSubmit =  async (data) => {
    try{ 
    console.tron.log(data);
    const schema = validacaoCampos();
     
     await schema.validate(data, {
       abortEarly: false,
      });
      setErrorMessages({});
    const response = await service.salvarUsuario(data);
    if(response.status === 201 ){
      Toast.show({
        text: "Usuário Cadastrado!",
        type: "success"
        
      });
      reset(defaultValues);    
    }else{
      Toast.show({
        text: "Erro ao Cadastrar!",
        type: "danger"
      }); 
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errorMessages = {};
      error.inner.forEach((e) => {
        errorMessages[e.path] = e.message;
      });
      setErrorMessages(errorMessages);
    } 

  }
     
  };

  const navigationToLogin = () =>{
    navigation.goBack();
  }

  return (
    
    <ScrollView style={styles.container}>
    <KeyboardAwareScrollView>
      <View style={styles.header}>
        <View style={styles.logo}>
           <Image source={logo} />
          <Text style={styles.textLogo}>Minhas Despesas</Text>
        </View>
        <Icon name="arrow-left" size={40} color="#E02041" onPress={navigationToLogin}/>
      </View>



        
      <Input
        value={values.nome}
        placeholder="Nome"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={(text) => setValue("nome", text)}
        label="Usuário"
        labelStyle={{ marginTop: 45 }}
        errorStyle={{ color: 'red' }}
        errorMessage={errorMessages["nome"]}
      />


      <Input
        value={values.email}
        placeholder="alguem@gmail.com"
        onChangeText={(text) => setValue("email", text)}
        leftIcon={<Icon name="mail" size={24} color="black" />}
        label="Email"
        errorStyle={{ color: 'red' }}
        errorMessage={errorMessages["email"]}
      />

      <Input
        value={values.login}
        placeholder="alguem"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={(text) => {
          setValue("login", text);
        }}
        errorStyle={{ color: "red" }}
        errorMessage={errorMessages["login"]}
        label="Login"
      />

      <Input
        value={values.senha}
        placeholder="****"
        leftIcon={<Icon name="unlock" size={24} color="black" />}
        secureTextEntry={true}
        label="Senha"
        onChangeText={(text) => {
          setValue("senha", text);
        }}
        errorStyle={{ color: "red" }}
        errorMessage={errorMessages["senha"]}
      />


      <Button
        title="SALVAR"
        titleStyle={{ fontWeight: '900' }}
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{
          backgroundColor: '#E02041',
          borderWidth: 0,
          borderRadius: 5,
          height: 50
        }}
        style={styles.botao}
      />
    </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default CadastroUsuario;
