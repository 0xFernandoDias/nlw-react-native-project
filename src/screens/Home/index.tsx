import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

export function Home() {
    const [category, setCategory] = useState('')

    const navigation = useNavigation()

    const handleCategorySelect = (categoryId: string) => {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    const handleAppointmentDetails = () => {
        navigation.navigate('AppointmentDetails')
    }

    const handleAppointmentCreate = () => {
        navigation.navigate('AppointmentCreate')
    }

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Legendary',
                icon: null,
                owner: true
            },
            category: '1',
            date: '06/22 at 08:40PM',
            description: "It's today that we will reach the challenger without losing a md10 match"
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Legendary',
                icon: null,
                owner: true
            },
            category: '1',
            date: '06/22 at 08:40PM',
            description: "It's today that we will reach the challenger without losing a md10 match"
        }
    ]

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            <View>
                <CategorySelect
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />
                <View style={styles.content}>
                    <ListHeader
                        title="Scheduled matches"
                        subtitle="Total 6"
                    />
                    <FlatList
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Appointment data={item} onPress={handleAppointmentDetails}/>}
                        ItemSeparatorComponent={() => <ListDivider />}
                    />
                </View>
            </View>
        </Background>
    )
}
