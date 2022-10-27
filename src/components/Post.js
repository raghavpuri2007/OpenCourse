import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React, {useState} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircleChart from "./Analytics/ProgressCircleChart"
import {deleteDoc, doc } from "firebase/firestore/lite"
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {db,auth} from "../../firebase"
const Post = ({post, courseName}) => {
    const navigation = useNavigation()
    const {apScore, anonymous, classRating, comments, grade, highSchool, id, semOne, semTwo, teacher, teacherRating, user, year, profilePic} = post
    const [liked, setLiked] = useState(false);
    const deleteDocument = async () => {
        const docRef = doc(db, `courses/${courseName}/posts`, id);
        const userDocRef = doc(db, `users/${auth.currentUser.uid ? auth.currentUser.uid  : ""}/userPosts`, courseName)
        await deleteDoc(docRef).then(() => {
          Alert.alert(
            "Success",
            "Your Post was successfully deleted"
            [
                {
                    text: "Ok",
                    onPress: () => navigation.navigate("Profile")
                }
            ]
          );
        }).catch((err) => {
            Alert.alert(
                "Error", 
                "There seems to be an error, try again later...",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("Home"),
                  }
                ]
            )
        })
        await deleteDoc(userDocRef);
      }
  return (
    <View style={styles.container}>
        <LinearGradient
        colors={['#f5b3b3', '#e0caca']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={styles.post}
        >
            <View style={styles.top}>
                {anonymous ? <Avatar containerStyle={{height: 70, width: 70}} rounded source={{
                    uri: 'https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-4.jpg',
                }} /> : 
                profilePic === "" ? <Avatar containerStyle={styles.customAvatar} rounded title={user.charAt(0) + user.charAt(user.indexOf(" ")+1)} size={65} /> : 
                <Avatar containerStyle={{height: 70, width: 70}} rounded source={{
                    uri: profilePic
                }} />
                }
                    <View>
                        <Text style={styles.name}>{anonymous ? "Anonymous" : user} <Text style={{ fontSize: 16, fontWeight: 'normal'}}>{grade}th</Text></Text>
                        <Text style={{marginTop: 5}}>{year}</Text>
                    </View>
                    {id !== auth.currentUser.uid  && id !== courseName ?
                    <View style={styles.scoreContainer}>
                        <ProgressCircleChart radius={22} borderWidth={5} text={classRating} percent={classRating / 5 * 100} />
                        <Text style={styles.caption}>Class</Text>
                    </View>
                    : 
                    <Pressable onPress={() => navigation.navigate("Add", {
                        apScore, classRating, course: courseName, comments, grade, highSchool, semOne, semTwo, teacher, teacherRating, user, year, anonymous
                      })}>
                        <MaterialIcons color={"black"} name={"edit"} size={35}/>
                    </Pressable>
                    }
                    {id !== auth.currentUser.uid && id !== courseName ?
                        <Pressable onPress={() => setLiked(!liked)}>
                            <MaterialCommunityIcons color={liked ? '#fc5858' : "#998f8e"} name={liked ? "arrow-up-bold" : "arrow-up-bold-outline"} size={40}/>
                        </Pressable>
                        :
                        <Pressable onPress={() => deleteDocument()}>
                            <MaterialCommunityIcons color={"black"} name={"delete"} size={35}/>
                        </Pressable>
                    }
                </View>
            <Text style={{paddingTop: 30}}>{comments.length > 150 ? comments.substring(0, 150)+ "..." : comments}</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => navigation.navigate("FullPost", {post, courseName})}>
                    <Text>Read More</Text>
                </Pressable>
            </View>
        </LinearGradient>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 15,
    },
    post: {
        borderRadius: 35,
        borderWidth: 1,
        width: '97%',
        padding: 10,
    },
    button: {
        backgroundColor: '#fc5858',
        color: 'black',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        width: '50%'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    name: {
        fontSize: 18,
        fontWeight: '600'
    },
    buttonContainer: {
        paddingTop: 15,
        alignItems: 'center'
    },
    scoreContainer: {
        alignItems: 'center',
    },
    caption: {
        fontSize: 10
    },
    customAvatar: {
        height: 70, 
        width: 70,
        backgroundColor: '#fc5858'
    }
})
export default Post