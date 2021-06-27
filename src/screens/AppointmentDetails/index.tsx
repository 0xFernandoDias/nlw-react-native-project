import React, { useState, useEffect } from 'react'
import { ImageBackground, Text, View, FlatList, Share, Platform, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { Background } from '../../components/Background'
import { ListHeader } from '../../components/ListHeader'
import { Header } from '../../components/Header'
import { Member, MemberProps } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import BannerImg from '../../assets/banner.png'
import { api } from '../../services/api'
import { AppointmentProps } from '../../components/Appointment'
import { Load } from '../../components/Load/index'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'

type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string
    name: string
    instant_invite: string
    members: MemberProps[]
}

export function AppointmentDetails() {

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
    const [loading, setLoading] = useState(true)

    const route = useRoute()
    const { guildSelected } = route.params as Params

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
            setWidget(response.data)
        } catch {

            Alert.alert('Check server settings. Is the Widget enabled?')
        } finally {
            setLoading(false)
        }
    }

    function handleShareInvitation() {
        const message = Platform.OS === 'ios'
            ? `Join ${guildSelected.guild.name}`
            : widget.instant_invite

        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite)
    }

    useEffect(() => {
        fetchGuildWidget()
    }, [])


    return (
        <Background>
            <Header
                title="Details"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
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
                        {guildSelected.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>
            {
                loading ? <Load /> :
                    <>
                        <ListHeader
                            title='Players'
                            subtitle={`Total ${widget.members.length ? widget.members.length : 0}`}
                        />
                        {
                            <FlatList
                                data={widget.members ? widget.members : []}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <Member data={item} />
                                )}
                                ItemSeparatorComponent={() => <ListDivider isCentered />}
                                style={styles.members}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyText}>
                                            There's no one online right now.
                                        </Text>
                                    </View>
                                )}
                            />
                        }
                    </>
            }

            {
                guildSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon title='Join the match' onPress={handleOpenGuild}/>
                </View>
            }
        </Background>
    )
}