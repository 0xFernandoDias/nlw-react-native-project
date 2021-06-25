import React from 'react'
import { ImageBackground, Text, View, FlatList } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { Background } from '../../components/Background'
import { ListHeader } from '../../components/ListHeader'
import { Header } from '../../components/Header'
import { Member } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import BannerImg from '../../assets/banner.png'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'


export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Fernando',
            avatar_url: 'https://github.com/nand0diaz.png',
            status: 'online'
        }
    ]
    return (
        <Background>
            <Header 
                title="Details"
                action={
                    <BorderlessButton>
                        <Fontisto 
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />
            <ImageBackground source={BannerImg} style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Legendary
                    </Text>
                    <Text style={styles.subtitle}>
                        It's today that we will reach the challenger without losing a md10 match
                    </Text>
                </View>
            </ImageBackground>
            <ListHeader 
                title='Players'
                subtitle='Total 3'
            />
            <FlatList 
                data={members}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Member data={item} />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.members}
            />
            <View style={styles.footer}>
                <ButtonIcon title='Join the match' />
            </View>
        </Background>
    )
}