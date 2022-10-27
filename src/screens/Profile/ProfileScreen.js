import { View, SafeAreaView, Text, StyleSheet, Pressable, LogBox, FlatList } from 'react-native'
import Header from "../../components/Header"
import React, {useState, useEffect} from 'react'
import {auth, db} from "../../../firebase";
import {signOut} from "firebase/auth"
import { useNavigation } from "@react-navigation/core"
import {onAuthStateChanged} from "firebase/auth"
import {collection, getDocs, doc, getDoc } from "firebase/firestore/lite" 
import { Avatar } from 'react-native-elements';
import Post from "../../components/Post"
import CustomButton from "../../components/CustomButtons/CustomButton"
const ProfileScreen = ({loggedIn}) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    LogBox.ignoreAllLogs()
    getData()
  })
  
  onAuthStateChanged(auth, (user) => {
    if(user === null) {
      loggedIn = true;
    }
  })
  const onSignOut = () => {
    signOut(auth).then(() => {
      navigation.reset();
    }).catch((err) => {
      console.warn(err);
    })
  }
  const getData = async () => {
    //Get All the Users Posts
    const docRef = doc(db, "users", auth.currentUser.uid ? auth.currentUser.uid  : "");
    await getDoc(docRef).then((doc) => {
      setName(doc.data().firstName + " " + doc.data().lastName);
      setEmail(doc.data().email)
      setProfilePic(doc.data().profilePic ? doc.data().profilePic : "")
    })
    const colRef = collection(db, `users/${auth.currentUser.uid ? auth.currentUser.uid  : ""}/userPosts`);
    await getDocs(colRef).then((snapshot) => {
      let postStuff = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      })
      setPosts(postStuff)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {profilePic === "" ?
        <Avatar containerStyle={styles.avatar} size={100} rounded title={name.charAt(0) + name.charAt(name.indexOf(" ") + 1)} activeOpacity={0.7} />  :
        <Avatar containerStyle={styles.avatar} size={100} rounded source={{
          uri: profilePic,
        }} />
        }
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.bottom}>
        {posts.length !== 0 ?
        <View style={styles.postsContainer}>
          <Text style={styles.postTitle}>Your Posts:</Text>
          <FlatList showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} style={styles.list} numColumns={1} horizontal={false} data={posts} renderItem={({item}) => (
            <Post post={item} courseName={item.id} />
        )} />
        </View> : null }
        <View style={styles.signOutContainer}>
          <CustomButton type="PRIMARY" text="Sign Out" onPress={onSignOut}/>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fc5858'
  },
  signOutContainer: {
    marginTop: 10,
    alignItems: 'center',
    flex: 0.1,
  },
  avatar: {
    backgroundColor: 'lightgrey',
  },
  header: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '26%',
  },
  bottom: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F9FBFC'
  },
  postsContainer: {
    marginTop: 10,
    width: '100%',
    flex: 0.62,
  },
  list: {
    elevatedElement: {
      zIndex: 99, // works on ios
      elevation: 99, // works on android
    }
  },
  postTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  name: {
    fontSize: 30,
  },
  email: {
    fontSize: 20
  }
})
export default ProfileScreen