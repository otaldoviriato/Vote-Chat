import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { useNavigation, useRoute } from '@react-navigation/native'
import MessageList from './components/messageList/messageList'

const Pendentes = ({ data }) => {
  const navigation = useNavigation() // Obtenha o objeto de navegação usando o hook useNavigation

  const handlePress = () => {
    // Navegue para a tela desejada quando o item for pressionado
    navigation.navigate('ListaDeVotações', { data })
  }

  return (
    <Button
      title="Ver Pendentes"
      onPress={handlePress}
    />
  )
}

export default function RoomProfile() {
  const navigation = useNavigation()
  const route = useRoute()

  // Acesse as props da rota
  const { data } = route.params

  async function copiarLink(){
    const id_sala = data._id
    const link = 'www.votechat.com.br/group-invitation/'+id_sala

    await Clipboard.setStringAsync(link)
  }

  return (
    <View style={styles.container}>
      <Text>Nome da Sala: {data.name}</Text>
      <TouchableOpacity onPress={copiarLink}><Text>Copiar Link</Text></TouchableOpacity>
      <MessageList data={data} />
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
      <Pendentes data={data} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 2
  }
})
