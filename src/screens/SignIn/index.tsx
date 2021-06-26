import React from 'react'
import { useAuth } from '../../hooks/auth'
import { View, Text, Alert, ActivityIndicator } from 'react-native'
import IllustrationSvg from '../../assets/illustration.svg'
import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'
import { styles } from './styles'
import { theme } from '../../global/styles/theme'


export function SignIn() {

    const { loading, signIn } = useAuth()

    async function handleSignIn() {
        try {
            await signIn()
        }catch (error) {
            Alert.alert(error)
        }
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
                    {
                        loading ? <ActivityIndicator color={theme.colors.primary} /> :
                            <ButtonIcon
                                title='Sign In with Discord'
                                onPress={handleSignIn}
                            />}
                </View>
            </View>

        </Background>
    )
}


