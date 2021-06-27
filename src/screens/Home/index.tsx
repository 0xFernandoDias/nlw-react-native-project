import React, { useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Background } from '../../components/Background'
import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment, AppointmentProps } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'
import { Load } from '../../components/Load/index'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'

import { styles } from './styles'

export function Home() {
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState<AppointmentProps[]>([])

    const navigation = useNavigation()

    const handleCategorySelect = (categoryId: string) => {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    const handleAppointmentDetails = (guildSelected: AppointmentProps) => {
        navigation.navigate('AppointmentDetails', { guildSelected })
    }

    const handleAppointmentCreate = () => {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage: AppointmentProps[] = response ? JSON.parse(response) : []

        if (category) {
            setAppointments(storage.filter(item => item.category === category))
        } else {
            setAppointments(storage)
        }

        setLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadAppointments()
    }, [category]))

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />
            {
                loading ? <Load /> :
                    <>
                        <ListHeader
                            title="Scheduled matches"
                            subtitle={`Total ${appointments.length}`}
                        />

                        <FlatList
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}
                            data={appointments}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />}
                            contentContainerStyle={{ paddingBottom: 69 }}
                            ItemSeparatorComponent={() => <ListDivider />}
                        />
                    </>
                }
                    </Background >
    )
}
