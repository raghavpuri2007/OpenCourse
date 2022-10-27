import { ScrollView, View, SafeAreaView, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {deleteDoc, doc } from "firebase/firestore/lite"
import { Avatar } from 'react-native-elements';
import Header from "../../components/Header"
import {auth,db} from "../../../firebase"
const FullPost = ({route}) => {
  const {post, courseName} = route.params;
  const {anonymous, apScore, classRating, comments, grade, highSchool, id, semOne, semTwo, teacher, teacherRating, user, year, profilePic} = post
  const navigation = useNavigation();

  const deleteDocument = async () => {
    const docRef = doc(db, `courses/${courseName}/posts`, id);
    const userDocRef = doc(db, `users/${auth.currentUser.uid}/userPosts`, courseName)
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
      navigation.goBack();
    }).catch((err) => {
      Alert.alert(
        "Error", 
        "There seems to be an error, try again later...",
        [
          {
            text: "Ok",
            onPress: () => {},
          }
        ]
      )
    })
    await deleteDoc(userDocRef);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.top}>
        <View style={styles.iconsTop}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={30} />
          </Pressable>
          {id === auth.currentUser.uid  || id === courseName ?
          <View style={styles.iconsTopRight}>
            <Pressable onPress={() => navigation.navigate("Add", {
              apScore, classRating, course: courseName, comments, grade, highSchool, semOne, semTwo, teacher, teacherRating, user, year, anonymous
            })}>
              <MaterialIcons name="edit" size={30} />
            </Pressable>
            <Pressable onPress={() => deleteDocument()}>
              <MaterialIcons name="delete" size={30} />
            </Pressable>
          </View>
          : null}
        </View>
        <View style={styles.userInfo}>
        {!anonymous ? profilePic === "" ? <Avatar containerStyle={styles.customAvatar} rounded title={user.charAt(0) + user.charAt(user.indexOf(" ")+1)} size={105} /> : 
        <Avatar containerStyle={{height: 110, width: 110}} rounded source={{
            uri: profilePic
        }} /> :
        <Avatar containerStyle={{height: 110, width: 110}} rounded source={{
            uri: 'https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-4.jpg',
        }} />
        }
          <View style={{paddingLeft: 20}}>
            <Text style={{fontSize: 30, fontWeight: '600'}}>{anonymous ? "Anonymous" : user} <Text style={{fontSize: 25, fontWeight: 'normal'}}>{grade}</Text></Text>
            <Text style={{fontSize: 25}}>{year}</Text>
          </View>
        </View>
      </View>
    <View style={styles.bottom}>
        <View style={styles.extraInfo}>
          <Text style={{fontSize: 30, fontWeight: '500'}}>{courseName}</Text>
          <Text style={[styles.subtitle, {paddingTop: 10}]}>Teacher: <Text style={{fontWeight: 'normal'}}>{teacher}</Text></Text>
          <Text style={styles.subtitle}>High School: <Text style={{fontWeight: 'normal'}}>{highSchool}</Text></Text>
        </View>
        <Header courseName={courseName} post={true} semOne={parseFloat(semOne).toFixed(1)} semTwo={semTwo ? parseFloat(semTwo).toFixed(1) : "N/A"} ap={apScore ? apScore : "N/A"} course={classRating} teacher={teacherRating} />
        <Text style={styles.subtitle}>Comments: <Text style={{fontWeight: 'normal'}}>{comments}</Text></Text>
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:  {
    width: '100%',
    height: '100%',
    backgroundColor: '#e7e8e6'
  },
  top: {
    width: '100%',
    height: 'auto',
    borderBottomWidth: '1',
  },
  userInfo: {
    padding: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  header: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center',
    width: '100%',
  },
  extraInfo: {
    alignItems: 'center', 
    paddingVertical: 10,
    paddingBottom: 0 
  },
  iconsTop: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  iconsTopRight: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'space-evenly'
  },
  customAvatar: {
    height: 110, 
    width: 110,
    backgroundColor: '#fc5858'
  }
})
export default FullPost