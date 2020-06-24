import React,{useEffect,useState} from 'react';
import { ScrollView,View,Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Toast} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text'
import * as Yup from 'yup';
import { useForm } from "react-hook-form";

import styles from "./styles";
import logo from './../../../assets/logo.png';
import service from "../../../services/service"; 

const CadastroDespesa = ({navigation}) => {

  const defaultValues ={
    item: "",
    valor: "",
    parcelas: ""
  }

  const { register, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues
  });
  const values = watch();  

  useEffect(() => {
    register("item");
    register("valor");
    register("parcelas");
  }, [register]);
  const [errorMessages, setErrorMessages] = useState({});

  const validacaoCampos = () =>{
    return Yup.object().shape({
      item: Yup.string().max(15,'Máximo 15 caracteres').required("O item é obrigatório"),
      valor: Yup.string().required("O valor é obrigatório"),
      parcelas: Yup.string().required("A parcela é obrigatória")
    });
  }

  const onSubmit =  async (data) => {

    try {

    const schema = validacaoCampos();
    await schema.validate(data, {
    abortEarly: false,
    });
    setErrorMessages({});

    const user_id = await service.getIdUsuario();

    const request ={
      item: data.item,
      valor: Number(data.valor.replace(",", ".")),
      parcelas: Number(data.parcelas),
      dataCompra: date,
      user: Number(user_id)
    }
    console.tron.log(request);
    const response = await service.salvarDespesa(request);
    if(response.status === 201 ){
      Toast.show({
        text: "Despesa Cadastrada",
        type: "success"
        
      });
      reset(defaultValues);
      setDate(new Date());    
    }else{
      Toast.show({
        text: "Ocorreu um erro",
        type: "danger"
        
      });
    }
    }catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errorMessages = {};
      error.inner.forEach((e) => {
        errorMessages[e.path] = e.message;
      });
      setErrorMessages(errorMessages);
    } 

  }
     
  };

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const navigationToListagem = () =>{
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
        <Icon name="arrow-left" size={40} color="#E02041" onPress={navigationToListagem}/>
      </View>

      <Input
        label="Item"
        value={values.item}
        placeholder="Descrição"
        leftIcon={<Icon name="sticky-note-o" size={24} color="black" />}
        onChangeText={(text) => {
          setValue("item", text);
        }}
        errorStyle={{ color: "red" }}
        errorMessage={errorMessages["item"]}
        labelStyle={{ marginTop: 45 }}
      />

      <Input
        label="R$ Valor"
        value={values.valor}
        placeholder="9,99"
        leftIcon={<Icon name="money" size={24} color="black" />}
        onChangeText={(text) => {
          setValue("valor", text);
        }}
        errorStyle={{ color: "red" }}
        errorMessage={errorMessages["valor"]}
        keyboardType="numeric"
      />


      <Input
        value={values.parcelas}
        placeholder="10"
        leftIcon={<Icon name="credit-card" size={24} color="black" />}
        onChangeText={(text) => setValue("parcelas", text)}
        label="Parcelas"
        errorStyle={{ color: "red" }}
        keyboardType="numeric"
        errorMessage={errorMessages["parcelas"]}
      />

      <View>
        <Text style={styles.textLabel}>Data da Compra</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          locale="pt"
        />
      </View>

      <Button
        title="SALVAR"
        titleStyle={{ fontWeight: "900" }}
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{
          backgroundColor: "#E02041",
          borderWidth: 0,
          borderRadius: 5,
          height: 50,
        }}
        containerStyle={{ marginTop: 30,marginBottom: 80 }}
      />
    </KeyboardAwareScrollView>  
    </ScrollView>
  );
}

export default CadastroDespesa;