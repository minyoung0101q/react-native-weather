import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const API_KEY = "19e054334c61b27dd891a0dfdef0072e";

export default function App() {
  // 내 위치 정보를 받아와서 내 위치에 맞는 날씨 api 가져오기
  // 위치 허용하기
  // 내 위치에 맞는 날씨 데이터 가져오기
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
      return;
    } else {
      //위치 허용한다면 아래 코드 실행
      // const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      // console.log(location);
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      console.log(location);
      setCity(location[0].city);

      // 내 위치에 맞는 날씨 가져오기
      // const response = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      // );
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();
      console.log(json);
      console.log(json.list);
      // setDays(json.list); //배열을 저장하자
      setDays(
        json.list.filter((weather) => {
          if (weather.dt_txt.includes("00:00:00")) {
            return weather;
          }
        })
      );
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {ok ? (
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
      ) : (
        <View style={styles.denyLocation}>
          <Text style={styles.denyLocationText}>
            😁You have denied location permission😁
          </Text>
        </View>
      )}
      {/* <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View> */}
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        indicatorStyle={false}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {console.log(typeof day.main.temp)}
                {/* {parseFloat(day.main.temp).toFixed(1)} */}
                {/* {day.main.temp.toFixed(1)} */}
                {day.main.temp.toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 150,
  },
  description: {
    marginTop: -30,
    fontSize: 50,
  },
  tinyText: {
    fontSize: 40,
  },
  denyLocation: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  denyLocation: {
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  denyLocationText: {
    fontSize: 15,
    fontWeight: "300",
  },
});
