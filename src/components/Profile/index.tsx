import React from 'react'
import { View, Text, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useAuth } from '../../hooks/auth'
import { Avatar } from '../Avatar'
import { styles } from './styles'

export function Profile() {
    const { user, signOut } = useAuth()

    function handleSignOut() {
        Alert.alert('Logout', 'Do you want to exit the app?',
            [
                {
                    text: 'NO',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => signOut()
                }
            ])
    }

    return (
        <View style={styles.container}>
            <RectButton onPress={handleSignOut}>
                <Avatar urlImage={user.avatar} />
            </RectButton>
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Hello,
                    </Text>
                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>
                <Text style={styles.message}>
                    Today's victory day!
                </Text>
            </View>
        </View>
    )
}