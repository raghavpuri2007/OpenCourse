import { LogBox, View,SafeAreaView, ScrollView, Text, StyleSheet, TextInput, useWindowDimensions, FlatList, Pressable } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
//import firebase from 'firebase/compat/app'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {db} from "../../../firebase"
import {collection, getDocs, collectionGroup, where, getDoc, doc } from "firebase/firestore/lite" 
import Header from "../../components/Header"
import Post from "../../components/Post"
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const {height, width} = useWindowDimensions()
  const [currentCourse, setCurrentCourse] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([])
  const [posts, setPosts] = useState([]);
  const [searched, setSearched] = useState(false);
  const [hasAP, setHasAP] = useState(false);
  const [yearLong, setYearLong] = useState(false);
  const [avgAP, setAvgAp] = useState("")
  const [avgSemOne, setAvgSemOne] = useState("")
  const [avgSemTwo, setAvgSemTwo] = useState("")
  const [avgCourse, setAvgCourse] = useState("")
  const [avgTeacher, setAvgTeacher] = useState("")
  const navigation = useNavigation();
  const ref_searchInput = useRef();
  useEffect(() => {
    LogBox.ignoreAllLogs()
    if(searched) {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchPosts(currentCourse)
      });
      return unsubscribe;
    }
  })
  const resetState = () => {
    setCourse("");
    setCourses([]);
    setPosts([]);
    setAvgAp("");
    setAvgSemOne("");
    setAvgSemTwo("");
    setAvgCourse("");
    setAvgTeacher("");
    setSearched(false);
    setYearLong(false);
    setCurrentCourse(false);
  }
  const fetchCourses = (search) => {
    setCourse(search);
    search = search.toUpperCase();
    const colRef = collection(db, "courses")
    getDocs(colRef).then((snapshot) => {
      let courses = []
      snapshot.docs.map(doc => {
        if(doc.id.startsWith(search)) {
          const data = doc.data();
        const id = doc.id;
        courses = [...courses, {id, ...data}];
        } 
      })
      setCourses(courses)
    }).catch(err => {
      console.warn(err)
    })
  }

  const fetchPosts = async (courseName) => {
    const colRef = collection(db, `courses/${courseName}/posts`)
    await getDocs(colRef).then((snapshot) => {
      let postStuff = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      })
      setPosts(postStuff)
      fetchHeaderData(postStuff, courseName)
    }).then(() => {
      setCourse(courseName);
      setCurrentCourse(courseName)
      setCourses([]);
      setSearched(true);
      setCourse(courseName);
      setCurrentCourse(courseName)
      setCourses([]);
    }).catch(() => {
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
  }

  const fetchHeaderData = (postStuff, courseName) => {
    const docRef = doc(db, 'courses', courseName);
    if(postStuff.length === 0) {
      setAvgAp("N/A");
      setAvgSemOne("N/A");
      setAvgSemTwo("N/A");
      setAvgCourse("N/A");
      setAvgTeacher("N/A")
    } else {
      let ap = 0;
      let semOne = 0;
      let semTwo = 0;
      let course = 0;
      let teacher = 0;
      let apLength = 0;
      let semTwoLength = 0;
      for(let i = 0; i < postStuff.length; i++) {
        if(postStuff[i].apScore !== undefined) {
          if(postStuff[i].apScore !== "N/A") {
            ap+=postStuff[i].apScore;
            apLength++;
          }
        }
        if(postStuff[i].semTwo !== undefined) {
          semTwo+=postStuff[i].semTwo;
          semTwoLength++;
        }
        semOne+=postStuff[i].semOne
        course+=postStuff[i].classRating;
        teacher+=postStuff[i].teacherRating;
      }
      getDoc(docRef).then((doc) => {
        setAvgAp(ap !== 0 ? parseFloat(ap / apLength).toFixed(1): "N/A");
        setAvgSemTwo(semTwo != 0 ? parseFloat(semTwo / semTwoLength).toFixed(1) : "N/A");
        setAvgSemOne(parseFloat(semOne / postStuff.length).toFixed(1));
        setAvgCourse(parseFloat(course / postStuff.length).toFixed(1));
        setAvgTeacher(parseFloat(teacher / postStuff.length).toFixed(1))
    })
    }
  }

    return (
      <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, {width: width*0.95}]} >
            <TextInput ref={ref_searchInput} style={[styles.input, {alignItems: 'center'}]} placeholderTextColor="grey" placeholder='Search for a class' onChangeText={(search) => fetchCourses(search)} value={course} />
            <Pressable onPress={() => resetState()} >
              <Feather name="delete" size={20} color="grey" />
            </Pressable>
          </View>
          {courses.length !== 0 ? <FlatList style={styles.list} numColumns={1} horizontal={false} data={courses.slice(0, 5)} renderItem={({item}) => (
            <Pressable style={styles.course} onPress={() => fetchPosts(item.id)}>
              <Text>{item ? item.id : null}</Text>
            </Pressable>
        )} /> : null}
        </View>
        {searched
        ?
        <View style={styles.searched}>
          <View style={styles.header}>
            <Text style={styles.title}>{currentCourse}</Text>
            <Header courseName={currentCourse} semOne={avgSemOne} semTwo={avgSemTwo} ap={avgAP} course={avgCourse} teacher={avgTeacher} />
          </View>
          <View style={styles.postsContainer}>
            {posts.map(post => (
              <Post post={post} courseName={currentCourse} />
            ))}
          </View>
        </View>
        : 
        <View style={styles.defaultContainer}>
          <Text style={[styles.title]}>Welcome to OpenCourse!</Text>
          <View style={styles.defaultBtnContainer}>
            <Text>Want to search for reviews? Click above or below!</Text>
            <Pressable style={styles.defaultBtn} onPress={() => ref_searchInput.current.focus()}>
              <Text style={styles.btnText}>Search for a class</Text>
            </Pressable>
          </View>
          <View style={styles.defaultBtnContainer}>
            <Text>Can't find a course? Add one below!</Text>
            <Pressable style={styles.defaultBtn} onPress={() => navigation.navigate("CreateCourse")}>
              <Text style={styles.btnText}>Add a Course</Text>
            </Pressable>
          </View>
          <View style={styles.defaultBtnContainer}>
            <Text>Want to add a review? Make one below!</Text>
            <Pressable style={styles.defaultBtn} onPress={() => navigation.navigate("Add")}>
              <Text style={styles.btnText}>Make a Post</Text>
            </Pressable>
          </View>
        </View>
        }
        </ScrollView>
      </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
  defaultContainer: {
    flex:1,
    height: '100%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 40,
  },
  list: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e7e8e6'
  },
  searchContainer: {
    alignItems: 'center',
    width: '100%',
  },
  searched: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  postsContainer: {
    width: '100%',
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
  },
  defaultBtn: {
    marginTop: 5,
    height: 'auto',
    backgroundColor: '#db4d4d',
    padding: 15,
    alignItems:'center',
    borderRadius: 40,
    width: '80%',
  },
  defaultBtnContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 10
  },
  btnText: {
    fontSize: 15
  },
  course: {
    paddingVertical: 2
  }
})

export default HomeScreen