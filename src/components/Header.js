import { SafeAreaView, Text, StyleSheet, View, Dimensions, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Rating } from 'react-native-ratings';
import ProgressCircleChart from "./Analytics/ProgressCircleChart"
import { useNavigation } from '@react-navigation/native';
import {getDoc, doc } from "firebase/firestore/lite" 
import {db} from "../../firebase"
const Header = ({ap, semOne, semTwo, course, teacher, post, courseName}) => {
  const [hasAP, setHasAP] = useState(ap !== "N/A" ? true : false);
  const [yearLong, setYearLong] = useState(semTwo != "N/A" ? true : false)
  const [refresh, setRefresh] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    fetchCourse()
    setRefresh(false)
    setTimeout(() => {
      setRefresh(true)
    }, 1);
  }, [navigation])
  
  const fetchCourse = async () => {
    const docRef = doc(db, 'courses', courseName);
    await getDoc(docRef).then((doc) => {
      setHasAP(doc.data().hasAP)
      setYearLong(doc.data().yearLong)
    })
  }
  if(post === undefined && course === "N/A" && teacher === "N/A") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{textAlign: 'center'}}>There are no posts for this course. Would you like to make the first one?</Text>
        <Pressable style={styles.defaultBtn} onPress={() => navigation.navigate('Add', {
          course: courseName,
          hasAP,
          yearLong
        })}>
          <Text style={styles.btnText}>Make a Post</Text>
        </Pressable>
      </SafeAreaView>
    )
  } else {
    if(hasAP && yearLong) { //ap = true, yearLong =true
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.analyticContainer}>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={ap === "N/A" ? 0 : ap / 5 * 100} text={ap} />
              <Text style={{marginTop: 10}}>AP Score</Text>
            </View>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={semOne === "N/A" ? 0 : semOne} text={semOne === "N/A" ? semOne : semOne + "%"} />
              <Text style={{marginTop: 10}}>Semester One</Text>
            </View>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={semTwo === "N/A" ? 0 : semTwo} text={semTwo === "N/A" ? semTwo : semTwo + "%"} />
              <Text style={{marginTop: 10}}>Semester Two</Text>
            </View>
          </View>
          <View style={styles.analyticContainer}>
          <View style={styles.analytic}>
          {refresh ? <Rating
          readonly={true}
          fractions={20}
          startingValue={course}
          imageSize={post ? 45 : 65}
          ratingColor="#fc5858"
          type="custom"
          tintColor="#e7e8e6"
          /> : null}
          <Text style={{marginTop: 10}}>Class Rating: {course}</Text>
        </View>
          </View>
          <View style={styles.analyticContainer}>
            {refresh ? <View style={styles.analytic}>
              <Rating
              readonly={true}
              fractions={20}
              startingValue={teacher ? teacher : 0}
              imageSize={post ? 45 : 65}
              type="custom"
              ratingColor="#fc5858"
              tintColor="#e7e8e6"
              />
              <Text style={{marginTop: 10}}>Teacher Rating: {teacher}</Text>
            </View> : null}
          </View>
        </SafeAreaView>
      )
    } else if(!hasAP && !yearLong) { //ap = false, yearLong =false
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.analyticContainer}>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={semOne === "N/A" ? 0 : semOne} text={semOne === "N/A" ? semOne : semOne + "%"} />
              <Text style={{marginTop: 10}}>Grade</Text>
            </View>
            <View>
              <View style={styles.analyticContainer}>
              {refresh ? <View style={styles.analytic}>
                <Rating
                readonly={true}
                startingValue={course}
                fractions={20}
                imageSize={post ? 45 : 50}
                type="custom"
                ratingColor="#fc5858"
                tintColor="#e7e8e6"
                />
                <Text style={{marginTop: 5}}>Class Rating: {course}</Text>
              </View> : null}
            </View>
            <View style={styles.analyticContainer}>
              {refresh ? <View style={styles.analytic}>
                <Rating
                readonly={true}
                fractions={20}
                startingValue={teacher}
                imageSize={post ? 45 : 50}
                type='custom'
                ratingColor="#fc5858"
                tintColor="#e7e8e6"
                />
                <Text style={{marginTop: 10}}>Teacher Rating: {teacher}</Text>
              </View> : null}
            </View>
            </View>
          </View>
        </SafeAreaView>
      )
    } else if(hasAP && !yearLong) { //ap = true, yearLong =false
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.analyticContainer}>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={ap === "N/A" ? 0 : ap / 5 * 100} text={ap} />
              <Text style={{marginTop: 10}}>AP Score</Text>
            </View>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={semOne === "N/A" ? 0 : semOne} text={semOne === "N/A" ? semOne : semOne + "%"} />
              <Text style={{marginTop: 10}}>Grade</Text>
            </View>
          </View>
          <View style={styles.analyticContainer}>
            {refresh ? <View style={styles.analytic}>
              <Rating
              readonly={true}
              startingValue={course}
              fractions={20}
              imageSize={post ? 45 : 65}
              type="custom"
              ratingColor="#fc5858"
              tintColor="#e7e8e6"
              />
              <Text style={{marginTop: 5}}>Class Rating: {course}</Text>
            </View> : null}
          </View>
          <View style={styles.analyticContainer}>
            {refresh ? <View style={styles.analytic}>
              <Rating
              readonly={true}
              fractions={20}
              startingValue={teacher}
              imageSize={post ? 45 : 65}
              type="custom"
              ratingColor="#fc5858"
              tintColor="#e7e8e6"
              />
              <Text style={{marginTop: 10}}>Teacher Rating: {teacher}</Text>
            </View> : null}
          </View>
        </SafeAreaView>
      )
    } else if(!hasAP && yearLong) { //ap=false, yearLong=true
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.analyticContainer}>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={semOne === "N/A" ? 0 : semOne} text={semOne === "N/A" ? semOne : semOne + "%"} />
              <Text style={{marginTop: 10}}>Semester One</Text>
            </View>
            <View style={styles.analytic}>
              <ProgressCircleChart radius={post ? 40 : 50} borderWidth={post ? 6: 8} percent={semTwo === "N/A" ? 0 : semTwo} text={semTwo === "N/A" ? semTwo : semTwo + "%"} />
              <Text style={{marginTop: 10}}>Semester Two</Text>
            </View>
          </View>
          <View style={styles.analyticContainer}>
          {refresh ? <View style={styles.analytic}>
          <Rating
          readonly={true}
          startingValue={course}
          fractions={20}
          imageSize={post ? 45 : 55}
          type="custom"
          ratingColor="#fc5858"
          tintColor="#e7e8e6"
          />
          <Text style={{marginTop: 5}}>Class Rating: {course}</Text>
        </View> : null}
          </View>
          <View style={styles.analyticContainer}>
          {refresh ?
            <View style={styles.analytic}>
              <Rating
              readonly={true}
              fractions={20}
              startingValue={teacher}
              imageSize={post ? 45 : 55}
              type="custom"
              ratingColor="#fc5858"
              tintColor="#e7e8e6"
              />
              <Text style={{marginTop: 10}}>Teacher Rating: {teacher}</Text>
            </View> :
            null
          }
          </View>
        </SafeAreaView>
      )
    } else {
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
    }
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  analyticContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  analytic: {
    alignItems: 'center',
    marginHorizontal: 10,
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
  btnText: {
    fontSize: 15
  }
})
export default Header