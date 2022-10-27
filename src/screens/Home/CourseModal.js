import { View, SafeAreaView, Text, StyleSheet, FlatList, Pressable, TouchableOpacity, Image, LogBox, ActivityIndicator } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useState, useEffect, useRef} from 'react'
import {db} from "../../../firebase"
import CustomButton from "../../components/CustomButtons/CustomButton"
import CustomFormInput from "../../components/CustomInput/CustomFormInput"
import CustomRating from "../../components/CustomRatingBar/CustomRating"
import Dropdown from "../../components/CustomDropdown/Dropdown";
import { doc, setDoc } from "firebase/firestore/lite"
import { useNavigation } from '@react-navigation/native';
const CourseModal = () => {
  const [course, setCourse] = useState("");
  const [hasAP, setHasAP] = useState(false);
  const [yearLong, setYearLong] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    //LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead."])
    LogBox.ignoreAllLogs()
    const unsubscribe = navigation.addListener('focus', () => {
      resetState();
    });
    return unsubscribe;
  }, [navigation])
  const resetState = () => {
      setCourse("")
      setHasAP(false)
      setYearLong(false)
  }

  const onCourseCreated = async () => {
    await setDoc(doc(db, "courses", course.toUpperCase()), {
        hasAP,
        yearLong
    })
    navigation.goBack()
  }
  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAwareScrollView>
    <View style={styles.header}>
    <Text style={{fontSize: 20, fontWeight: '800'}}>CREATE A COURSE</Text>
    <Text>Add a course to the collection here! Please create real courses, that is not already in the database.</Text>
  </View>
  <View style={styles.inputContainer}>
    <View style={styles.inputSection}>
      <View style={{flex: 0.95}}>
        <Text style={styles.caption}>Course Name: (Please make sure the course does not already exist)</Text>
        <CustomFormInput placeholder="Course (Ex. Geometry)" onChangeText={course => setCourse(course)} value={course} />
      </View>
    </View>
    <View style={styles.inputSection}>
      <View style={{flex: 0.475, elevatedElement: {
        zIndex: 3, // works on ios
        elevation: 3, // works on android
      }}}>
        <Text style={styles.caption}>Select Class Length:</Text>
        <Dropdown data={["Full Year", "One Semester"]} text="Year Long?" onSelect={(selectedItem, index) => {
          setYearLong(selectedItem === "Full Year" ? true : false)
        }} />
      </View>
      <View style={{flex: 0.475, elevatedElement: {
        zIndex: 3, // works on ios
        elevation: 3, // works on android
      }}}>
        <Text style={styles.caption}>Is An AP Class:</Text>
        <Dropdown data={["AP Class", "Non AP Class"]} text="AP Class?" onSelect={(selectedItem, index) => {
            setHasAP(selectedItem === "AP Class" ? true : false)
        }} />
      </View>
    </View>
  </View>
  <View style={styles.submitButton}>
    <CustomButton type="PRIMARY" text="Create Course" onPress={onCourseCreated}/>
  </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e7e8e6'
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
  submitButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  caption: {
    marginVertical:2
  }
})
export default CourseModal