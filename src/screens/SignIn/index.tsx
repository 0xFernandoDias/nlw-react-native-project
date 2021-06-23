import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image } from 'react-native'
import IllustrationImg from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'

export function SignIn() {
    const navigation = useNavigation()

    const handleSignIn = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Image
                source={IllustrationImg}
                style={styles.image}
                resizeMode='stretch'
            />
            <View style={styles.content}>
                <Text style={styles.title}>
                    Connect and {`\n`}
                    organize your {`\n`}
                    matches
                </Text>
                <Text style={styles.subtitle}>
                    Create groups to play your {`\n`}
                    favorite games with your friends
                </Text>
            </View>
            <ButtonIcon
                title='Sign In with Discord'
                onPress={handleSignIn}
            />
        </View>
    )
}


