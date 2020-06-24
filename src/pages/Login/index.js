import React,{useState,useEffect} from 'react';
import { View,Image,Text,Alert } from 'react-native';
import { Button,Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import { Toast} from 'native-base';

import styles from './styles';
import logo from '../../assets/logo.png'

import service from "../../services/service";


const Login = ({navigation}) => {


  const defaultValues ={
    login: "",
    senha: ""
  }

 const {register, handleSubmit,setValue, errors, watch, reset} = useForm({defaultValues});
 
 const values = watch();

 const [errorMessages, setErrorMessages] = useState({});

 const onSubmit = async(data) => {
   try {

     const schema = validacaoCampos();
     
     await schema.validate(data, {
       abortEarly: false,
      });
      setErrorMessages({});
      
      const response = await service.login(data.login,data.senha);
      reset(defaultValues);
      if(response.data.length === 0 ){
        Toast.show({
          text: "Credenciais inválidas",
          type: "danger"
        })   
      }else{
        service.setIdUsuario(response.data[0].id);
        navigation.navigate('ListagemDespesa'); 
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
 }

 const validacaoCampos = () =>{
  return Yup.object().shape({
    login: Yup.string().min(3,'Mínimo de 3 caracteres')
                      .required("O Nome é obrigatório"),
    senha: Yup.string().required("A senha é obrigatório"),
  });
}



 useEffect(()=>{
   register("login");
   register("senha");
 },[register]);
 
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
           <Image source={logo} />
          <Text style={styles.textLogo}>Minhas Despesas</Text>
        </View>
        <Text style={styles.headerText}>
          
        </Text>
      </View>


      <Input
        label="Login"
        value={values.login}
        placeholder="Login"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={(text) => {
          setValue("login", text);
        }}
        errorStyle={{ color: "red" }}
        errorMessage={errorMessages["login"]}
        labelStyle={{ marginTop: 50 }}
      />

      <Input
        label="Senha"
        value={values.senha}
        placeholder="Senha"
        leftIcon={<Icon name="user-secret" size={24} color="black" />}
        secureTextEntry={true}
        onChangeText={(text) => {
          setValue("senha", text);
        }}
        errorStyle={{ color: "red" }}
        errorMessage={errorMessages["senha"]}
        labelStyle={{ marginTop: 10 }}
      />

      <Button
        title="LOG IN"
        titleStyle={{ fontWeight: "900" }}
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{
          backgroundColor: "#E02041",
          borderWidth: 0,
          borderRadius: 5,
          height: 50,
        }}
        containerStyle={{ marginTop: 20 }}
      />
      <Button
        title="SIGN UP"
        titleStyle={{ fontWeight: "900" }}
        buttonStyle={{
          backgroundColor: "#E02041",
          borderWidth: 0,
          borderRadius: 5,
          height: 50,
        }}
        containerStyle={{ marginTop: 20 }}
        onPress={() => {
          navigation.navigate("CadastroUsuario");
        }}
      />
    </View>
  );
}

export default Login;