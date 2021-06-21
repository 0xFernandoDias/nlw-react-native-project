import React from 'react'
import { View, StatusBar, Text, Image } from 'react-native'
import IllustrationImg from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'

export function SignIn() {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />
            <Image
                source={IllustrationImg}
                style={styles.image}
                resizeMode="stretch"
            />
            <View style={styles.content}>
                <Text style={styles.title}>
                    Organize your {`\n`}
                    game rounds {`\n`}
                    easily
                </Text>
                <Text style={styles.subtitle}>
                    Create groups to play your {`\n`}
                    favorite games with your friends
                </Text>
            </View>
            <ButtonIcon
                title='Enter with Discord'
                activeOpacity={0.8}
            />
        </View>
    )
}


