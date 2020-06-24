import React,{useState, useEffect} from 'react';
import { ScrollView, View, StyleSheet, Platform,FlatList,Image, Text } from 'react-native';
import { Spinner } from 'native-base';
import { format,parseISO } from "date-fns";
import Icon from "react-native-vector-icons/Feather";

import { PricingCard, Button} from 'react-native-elements';
import pt from 'date-fns/locale/pt';
import logo from './../../../assets/logo.png';

import styles from './styles';


import service from "../../../services/service";

const ListagemDespesa = ({navigation}) => {

  const [despesas,setDespesas] = useState([]);
  const [page , setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [spinner, setSpinner] = useState(true);



  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      carregarDespesas();
    });
    return unsubscribe;  
  },[navigation]);

  async function carregarDespesas() {
    
    if(loading){
      return;
    }

    if(despesas.length == total && total > 0){ 
      return;
    }
    
    setLoading(true);
    const user_id = await service.getIdUsuario();
    const response = await service.buscarDespesas(Number(user_id),page);
    const resposta = response.data.map((despesa)=>{
      const dataFormatada = format(parseISO(despesa.dataCompra), "dd 'de' MMMM 'de' yyyy'", { locale: pt });
       return {...despesa, dataCompraFormatada: dataFormatada}
    })
    
    setDespesas([... despesas, ...resposta]);
    setSpinner(false);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);

  }



  const navigationToLogin = () =>{
    navigation.goBack();
  }

  const navigationToCadastrarDespesa = () =>{
    navigation.navigate('CadastroDespesa');
  }
 
    return (

      <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.logo}>
           <Image source={logo} />
          <Text style={styles.textLogo}>Minhas Despesas</Text>
        </View>
        <Icon name="log-out" size={40} color="#E02041" onPress={navigationToLogin}/>
      </View>

      <Button
        title="CADASTRAR DESPESA"
        titleStyle={{ fontWeight: "900" }}
        onPress={navigationToCadastrarDespesa}
        buttonStyle={{
          backgroundColor: "#E02041",
          borderWidth: 0,
          borderRadius: 5,
          height: 50,
        }}
        containerStyle={{ marginTop: 30,paddingHorizontal: 24}}
      />
      {spinner ? (
      <Spinner color='red' />
      ) : ( 
      <FlatList 
                data={despesas}
                style={styles.listagem}
                keyExtractor={despesa => String(despesa.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={carregarDespesas}
                onEndReachedThreshold={0.2}
                renderItem={({ item: despesa }) => (
                    
                    <PricingCard
                        color='#E02041'
                        title={despesa.item}
                        price={Intl.NumberFormat('pt-BR', { 
                          style: 'currency',  
                          currency: 'BRL'
                          }).format(despesa.valor)}
                        info={['Dados da Compra',`Parcelas: ${despesa.parcelas}`, `Data: ${despesa.dataCompraFormatada}`]}
                        button={{ title: 'PAGAR', icon: 'attach-money' }}
                      />        

                )}
        />
        )}
      </View>  
    );
  
}




export default ListagemDespesa;
