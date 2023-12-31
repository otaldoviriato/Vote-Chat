import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { groupProfileInfos, groupProfileView, groupProfileViewInfo, groupProfileViewName } from '../../../styles'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ProfilePicture({ data }) {
    const navigation = useNavigation();

    console.log(data);

    const votationsCount = data.votations ? data.votations.length : 0;

    return (
        <View style={groupProfileView}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Text style={groupProfileViewName}>Votações</Text>
                <Entypo name="dot-single" size={16} color="#295B80" />
                <Text style={groupProfileViewInfo}>{votationsCount}</Text>
            </View>
            {votationsCount > 0 ? (
                <FlatList
                    data={data.votations}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ListaDeVotações', { id_sala: data._id })}
                            style={{ marginBottom: 10 }}
                        >
                            {/* Conteúdo do TouchableOpacity para cada votação */}
                            {/* VERIFICAR MODEL SALA PARA ACERTAR O FLATLIST*/}
                            <Text>{data._id}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={groupProfileInfos}>O grupo ainda não tem votações</Text>
            )}
        </View>
    )
}