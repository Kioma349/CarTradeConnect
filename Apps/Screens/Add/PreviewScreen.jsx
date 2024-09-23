import { View, Text, TextInput, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { s3bucket } from '../../Utils/S3BucketConfig'
import { supabase } from '../../Utils/SupabaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '../../Utils/Colors'

export default function PreviewScreen() {
    const params = useRoute().params
    const navigation = useNavigation()
    const [description, setDescription] = useState('')
    const [videoUrl, setVideoUrl] = useState('')

    useEffect(() => {
        console.log(params)
    }, [])

    // Fonction pour publier la video
    const publishHandler = async () => {
        await uploadFileToAws(params.video, 'video') // On envoie la video sur AWS
        await uploadFileToAws(params.thumbnail, 'image') // On envoie la miniature sur AWS
    }

    // Fonction pour uploader un fichier sur AWS
    const uploadFileToAws = async (file, type) => {
        const fileType = file.split('.').pop()
        const awsParams = {
            Bucket: 'cartradeconnect-app',
            Key: `linus-${Date.now()}.${fileType}`, // Ex. linus-Ferrari.mp4
            Body: await fetch(file).then(resp => resp.blob()),
            ACL: 'public-read',
            ContentType: type === 'video' ? `video/${fileType}` : `image/${fileType}`,
        }

        try {
            const { Location } = await s3bucket.upload(awsParams).promise()
            console.log("Fichier Chargé ...", Location)

            if (type === 'video') {
                setVideoUrl(Location)
            } else {
                console.log("Thumbnail URL:", Location)
            }
        } catch (e) {
            console.error("Erreur lors du chargement:", e)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back-circle-sharp" size={54} color="black" />
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Add Details</Text>
                    <Image source={{ uri: params?.thumbnail }} style={styles.thumbnail} />
                    <TextInput
                        numberOfLines={3}
                        placeholder='Description'
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={publishHandler} style={styles.publishButton}>
                        <Text style={styles.publishText}>Publier</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    scrollView: {
        padding: 20,
    },
    backButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
    },
    backText: {
        fontFamily: 'outfit',
        fontSize: 18,
    },
    detailsContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    detailsTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    thumbnail: {
        width: 200,
        height: 300,
        borderRadius: 15,
        marginTop: 15,
    },
    input: {
        borderWidth: 2,
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginTop: 50,
        borderColor: Colors.BACKGROUND_TRASNP,
        paddingHorizontal: 20,
    },
    publishButton: {
        backgroundColor: Colors.BLACK,
        padding: 20,
        paddingHorizontal: 65,
        borderRadius: 99,
        marginTop: 60,
    },
    publishText: {
        fontFamily: 'outfit',
        color: Colors.WHITE,
    },
})
