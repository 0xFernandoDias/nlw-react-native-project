import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import IllustrationSvg from '../../assets/illustration.svg'
import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'

export function SignIn() {
    const navigation = useNavigation()

    const handleSignIn = () => {
        navigation.navigate('Home')
    }

    return (
        <Background>
            <View style={styles.container}>
                <IllustrationSvg />
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
        </Background>
    )
}


