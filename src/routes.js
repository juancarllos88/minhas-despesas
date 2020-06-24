import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Root } from "native-base";


const AppStack = createStackNavigator();

import Login from './pages/Login'; 
import CadastroUsuario from './pages/Usuario/Cadastro';
import Exemplo from './pages/Exemplo';

import CadastroDespesa from './pages/Despesas/Cadastro';
import ListagemDespesa from './pages/Despesas/Listagem';

 export default function Routes() {
   return(
    <Root> 
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        <AppStack.Screen name="CadastroUsuario" component={CadastroUsuario}/>
        <AppStack.Screen name="Exemplo" component={Exemplo}/>
        <AppStack.Screen name="Login" component={Login}/>
        <AppStack.Screen name="ListagemDespesa" component={ListagemDespesa}/>
        <AppStack.Screen name="CadastroDespesa" component={CadastroDespesa}/>
      </AppStack.Navigator>
    </NavigationContainer>
    </Root>
   )
 }  