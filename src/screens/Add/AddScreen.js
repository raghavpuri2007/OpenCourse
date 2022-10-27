import { View, SafeAreaView, Text, StyleSheet, FlatList, Pressable, TouchableOpacity, Image, LogBox, ActivityIndicator, Alert } from 'react-native'
import Checkbox from "../../components/Checkbox/Checkbox";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useState, useEffect, useRef} from 'react'
import {db, auth} from "../../../firebase"
import CustomButton from "../../components/CustomButtons/CustomButton"
import CustomFormInput from "../../components/CustomInput/CustomFormInput"
import CustomRating from "../../components/CustomRatingBar/CustomRating"
import Dropdown from "../../components/CustomDropdown/Dropdown";
import {collection, getDocs, setDoc, deleteField, updateDoc, doc, getDoc } from "firebase/firestore/lite"
import { useNavigation } from '@react-navigation/native';
//Add Screen comment test
const AddScreen = (props) => {
  const [previousProps, setPreviousProps] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [courses, setCourses] = useState([])
  const [fullCourses, setFullCourses] = useState([])
  const [course, setCourse] = useState("")
  const [isAp, setIsAp] = useState(false);
  const [isSemTwo, setIsSemTwo] = useState(true);
  const [user, setUser] = useState("")
  const [apScore, setApScore] = useState("");
  const [classRating, setClassRating] = useState("")
  const [maxClassRating, setMaxClassRating] = useState([1, 2, 3, 4, 5])
  const [comments, setComments] = useState("")
  const [teacher, setTeacher] = useState("")
  const [grade, setGrade] = useState("10")
  const [year, setYear] = useState("")
  const [teacherRating, setTeacherRating] = useState("")
  const [maxTeacherRating, setMaxTeacherRating] = useState([1, 2, 3, 4, 5])
  const [semOne, setSemOne] = useState("");
  const [semTwo, setSemTwo] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [updating, setUpdating] = useState(false);
  const [anonymous, setAnonymous] = useState(false)
  //alert variables
  const [courseAlert, setCourseAlert] = useState(false)
  const [apAlert, setAPAlert] = useState(false)
  const [yearAlert, setYearAlert] = useState(false)
  const [schoolAlert, setSchoolAlert] = useState(false)
  const [courseRatingAlert, setCourseRatingAlert] = useState(false)
  const [teacherRatingAlert, setTeacherRatingAlert] = useState(false)
  const [teacherAlert, setTeacherAlert] = useState(false)
  const [gradeAlert, setGradeAlert] = useState(false)
  const [semOneAlert, setSemOneAlert] = useState(false)
  const [semTwoAlert, setSemTwoAlert] = useState(false)
  const [profilePic, setProfilePic] = useState("");
  const navigation = useNavigation();
  
  useEffect(() => {
    LogBox.ignoreAllLogs()
    const unsubscribe = navigation.addListener('focus', () => {
      resetState();
      getUserData()
      setTimeout(() => {
        setLoaded(true)
        if(previousProps !== props.route.params) {
          setPreviousProps(props.route.params)
          getProps()
        }
      }, 1);
    });
    return unsubscribe;
  })

  const getUserData = async () => {
    const userDocRef= doc(db, "users", auth.currentUser.uid ? auth.currentUser.uid  : "");
    await getDoc(userDocRef).then((doc) => {
      setUser(doc.data().firstName + " " + doc.data().lastName)
    })
    
  }
  const getProps = () => {
    if(props.route.params !== undefined) {
      if(props.route.params.course != undefined) {
        setCourse(props.route.params.course);
        fullCourses.push(props.route.params.course)
        setIsAp(props.route.params.hasAP);
        setIsSemTwo(props.route.params.yearLong)
      }
      if(props.route.params.apScore != undefined) {
        setIsAp(true)
        setApScore(props.route.params.apScore);
      }
      if(props.route.params.highSchool != undefined) {
        setHighSchool(props.route.params.highSchool);
      }
      if(props.route.params.user != undefined) {
        setUser(props.route.params.user);
      }
      if(props.route.params.classRating != undefined) {
        setUpdating(true)

        setClassRating(props.route.params.classRating);
      }
      if(props.route.params.comments != undefined) {
        setUpdating(true)
        setComments(props.route.params.comments);
      }
      if(props.route.params.teacherRating != undefined) {
        setUpdating(true)
        setTeacherRating(props.route.params.teacherRating);
      }
      if(props.route.params.teacher != undefined) {
        setUpdating(true)
        setTeacher(props.route.params.teacher);
      }
      if(props.route.params.grade != undefined) {
        setGrade(props.route.params.grade);
      }
      if(props.route.params.year != undefined) {
        setYear(props.route.params.year);
      }
      if(props.route.params.semOne != undefined) {
        setSemOne(props.route.params.semOne+"");
      }
      if(props.route.params.semTwo != undefined) {
        setIsSemTwo(true)
        setSemTwo(props.route.params.semTwo+"");
      }
      if(props.route.params.anonymous != undefined) {
        console.log(props.route.params.anonymous)
        setAnonymous(props.route.params.anonymous)
      }
    }
  }
  const resetState = () => {
      setCancel(false)
      setProfilePic("")
      setAnonymous(false);
      setUpdating(false)
      setCourseAlert(false)
      setAPAlert(false)
      setYearAlert(false)
      setSchoolAlert(false)
      setCourseRatingAlert(false)
      setTeacherRatingAlert(false)
      setTeacherAlert(false)
      setGradeAlert(false)
      setSemOneAlert(false)
      setSemTwoAlert(false)
      setLoaded(false)
      setHighSchool("")
      setCourses([])
      setCourse("")
      setIsAp(false);
      setIsSemTwo(true);
      setUser("")
      setApScore("")
      setClassRating(0)
      setComments("")
      setTeacher("")
      setGrade("")
      setYear("")
      setTeacherRating(0);
      setSemOne("");
      setSemTwo("");
  }
  const fetchCourses = (search) => {
    setCourse(search);
    search = search.toUpperCase();
    const colRef = collection(db, "courses")
    getDocs(colRef).then((snapshot) => {
      let courses = []
      let fullCourses = []
      snapshot.docs.map(doc => {
        if(doc.id.startsWith(search)) {
          const data = doc.data();
        const id = doc.id;
        courses = [...courses, {id, ...data}];
        }
        fullCourses = [...fullCourses, doc.id]; 
      })
      setCourses(courses)
      setFullCourses(fullCourses)
    }).catch(err => {
      (err.message)
    })
  }
  const courseSelect = (course) => {
    setCourse(course.id);
    setCourses([])
    setCourseAlert(false)
    if(course.hasAP) {
      setIsAp(true);
    } else {
      setIsAp(false);
    }
    if(course.yearLong) {
      setIsSemTwo(true)
    } else {
      setIsSemTwo()
    }
  }

  const onSendPost = async () => {
    setUpdating(false)
    setCourseAlert(false)
    setAPAlert(false)
    setYearAlert(false)
    setSchoolAlert(false)
    setCourseRatingAlert(false)
    setTeacherRatingAlert(false)
    setTeacherAlert(false)
    setGradeAlert(false)
    setSemOneAlert(false)
    setSemTwoAlert(false)
    setComments(comments.replace(/\s+/g, ' ').trim())
    let error = false;
    if(apScore === "" && isAp) {
      error=true;
      setAPAlert(true)
    }
    if(classRating === 0) {
      error=true;
      setCourseRatingAlert(true)
    }
    if(teacherRating === 0) {
      error=true;
      setTeacherRatingAlert(true)
    }
    if(teacher === "") {
      error=true;
      setTeacherAlert(true)
    }
    if(grade === "") {
      error=true;
      setGradeAlert(true)
    }
    if(year === "") {
      error=true;
      setYearAlert(true)
    }
    if(highSchool === "") {
      error=true;
      setSchoolAlert(true)
    }
    if(isNaN(semOne) || semOne > 100 || semOne === "") {
      error=true;
      setSemOneAlert(true)
    }
    if(isSemTwo && (isNaN(semTwo) || semTwo > 100 || semTwo === "")) {
      error=true;
      setSemTwoAlert(true)
    }

    if(!fullCourses.includes(course)) {
      error=true;
      setCourseAlert(true)
    }
    if(error) {
      Alert.alert("Error", 
      "Please enter all fields correctly", 
      [
        {
          text: "Ok"
        }
      ],
      {
        cancelable: true,
      }
      )
    }else{
      try {
        const userDocRef = doc(db, `users/${auth.currentUser.uid ? auth.currentUser.uid  : ""}/userPosts`, course);
        const docRef = doc(db, `courses/${course}/posts`, auth.currentUser.uid ? auth.currentUser.uid  : "")
        await setDoc(docRef, {
          user,
          apScore,
          classRating,
          comments: comments.replace(/\s+/g, ' ').trim(),
          teacher,
          grade,
          year,
          teacherRating,
          semOne,
          semTwo,
          highSchool,
          anonymous,
          profilePic
        })
        await setDoc(userDocRef, {
          user,
          apScore,
          classRating,
          comments: comments.replace(/\s+/g, ' ').trim(),
          teacher,
          grade,
          year,
          teacherRating,
          semOne,
          semTwo,
          highSchool,
          anonymous,
          profilePic
        })
        if(apScore === "") {
          await updateDoc(docRef, {
            apScore: deleteField()
          })
          await updateDoc(userDocRef, {
            apScore: deleteField()
          })
        }
        if(semTwo === "") {
          await updateDoc(docRef, {
            semTwo: deleteField()
          })
          await updateDoc(userDocRef, {
            semTwo: deleteField()
          })
        }
        Alert.alert(
          "Success",
          updating ? "Your Post was updated" : "Your Post was sent",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("Home")
            }
          ],
          {
            cancelable: true,
          }
        )
      } catch (error) {
        Alert.alert(
          "Error", 
          "There seems to be an error, try again later...",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("Home"),
            }
          ],
          {
            cancelable: true,
          }
        )
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}>
    <View style={styles.header}>
    <Text style={{fontSize: 20, fontWeight: '800'}}>MAKE A POST</Text>
    <Text>Leave a review for a class here! Please create truthful posts, and double check for any typos. You may only make one post per course. Any additional posts, will replace previous posts. If your grade was greater than 100%, type in 100.</Text>
  </View>
  <View style={styles.inputContainer}>
    <View style={styles.inputSection}>
      <View style={isAp ? styles.ap : styles.noAp}>
        <Text>Course Name: *</Text>
        <CustomFormInput disabled={updating ? true : false} alert={courseAlert} placeholder="Course (Ex. Geometry)" onChangeText={(search) => fetchCourses(search)} value={course} />
        {courses.length !== 0 ? <FlatList style={styles.list} scrollEnabled={false} numColumns={1} horizontal={false} data={courses.slice(0, 3)} renderItem={({item}) => (
          <Pressable style={styles.course} onPress={() => courseSelect(item)}>
            <Text>{item ? item.id : null}</Text>
          </Pressable>
        )} /> : null}
        
      </View>
        {isAp && loaded ? 
          <View style={{flex: 0.4, elevatedElement: {
            zIndex: 3, // works on ios
            elevation: 3, // works on android
          }}}>
            <Text>Select your AP Score: *</Text>
            <Dropdown defaultValue={apScore} alert={apAlert} data={[5, 4, 3, 2, 1, "N/A"]} text="AP Score" onSelect={(selectedItem, index) => {
              setApScore(selectedItem)
            }} />
          </View>
        : null}
    </View>
    <View style={styles.inputSection}>
      <View style={loaded ? {flex: 0.55} : {flex: 0.95}}>
      <Text>Year the course was taken: *</Text>
        <CustomFormInput alert={yearAlert} placeholder="(Ex. 2022-2023)" onChangeText={(year) => setYear(year)} value={year} />
      </View>
      {loaded ?
      <View style={{flex: 0.4, elevatedElement: {
        zIndex: 3, // works on ios
        elevation: 3, // works on android
      }}}>
        <Text>Select Your Grade: *</Text>
        <Dropdown defaultValue={grade} alert={gradeAlert} data={[12, 11, 10, 9, "Other"]} text="Grade" onSelect={(selectedItem, index) => {
          setGrade(selectedItem)
        }} />
        <Text></Text>
      </View>
      : null}
    </View>
    <View style={styles.inputSection}>
      <View style={{flex: 0.55}}>
        <Text>High School Name: *</Text>
        <CustomFormInput alert={schoolAlert} placeholder="(Ex. Bothell High School)" onChangeText={(highSchool) => setHighSchool(highSchool)} value={highSchool}/>
      </View>
      <View style={{flex: 0.4}}>
        <Text>Course Rating: *</Text>
        <CustomRating alert={courseRatingAlert} maxRating={maxClassRating} defaultRating={classRating} setDefaultRating={setClassRating} />
      </View>
    </View>
    <View style={styles.inputSection}>
      <View style={{flex: 0.55}}>
        <Text>Teacher Name: *</Text>
        <CustomFormInput alert={teacherAlert} placeholder="(Ex. John Smith)" onChangeText={(teacher) => setTeacher(teacher)} value={teacher} />
      </View>
      <View style={{flex: 0.4}}>
        <Text>Teacher Rating: *</Text>
        <CustomRating alert={teacherRatingAlert} maxRating={maxTeacherRating} defaultRating={teacherRating} setDefaultRating={setTeacherRating} />
      </View>
    </View>
    <View style={styles.inputSection}>
      <View style={isSemTwo ? styles.semTwo : styles.noSemTwo}>
        <Text>Semester 1 Grade: *</Text>
        <CustomFormInput alert={semOneAlert} placeholder="(Ex. 84.3)" keyboardType="decimal-pad" onChangeText={(semOne) => setSemOne(parseFloat(semOne))} value={semOne} />
      </View>
      {isSemTwo ? 
        <View style={{flex: 0.475}}>
        <Text>Semester 2 Grade: *</Text>
        <CustomFormInput alert={semTwoAlert} placeholder="(Ex. 91.7)" keyboardType="decimal-pad" onChangeText={(semTwo) => setSemTwo(parseFloat(semTwo))} value={semTwo} />
      </View> :
      null
      }
    </View>
    <View style={styles.inputSection}>
      <View style={{flex: 0.95}}>
        <Text>Comments/Advice:</Text>
        <CustomFormInput placeholder="(Ex. The class was difficult, but interesting.)" multiline={true} onChangeText={(comments) => setComments(comments)} value={comments}/>
      </View>
    </View>
  </View>
  {loaded ? <View><Checkbox
    text="Do you want to be Anonymous?"
    checked={anonymous}
    onPress={() => setAnonymous(!anonymous)}
  /></View> : null}
  <View style={styles.submitButton}>
    <CustomButton type="PRIMARY" text={updating ? "Update Post" : "Send Post"} onPress={onSendPost}/>
  </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'grey'
  },
  input:{
  },
  inputContainer: {
    contentContainer: 'center',
    flex: 1,
  },
  inputSection: {
    marginTop:20,
    display: 'flex',
    flexDirection:'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  list: {
    width: '100%',
    height: 'auto',
  },
  ap: {
    flex: 0.55,
  },
  noAp: {
    flex: 0.95
  },
  semTwo: {
    flex: 0.475
  },
  noSemTwo: {
    flex: 0.95
  },
  submitButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  list: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
  },
  course: {
    paddingVertical: 2
  }
})
export default AddScreen