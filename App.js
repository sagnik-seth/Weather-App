import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import API_KEY from './Api';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [weather, setWeather] = useState({
    main: {
      feels_like: 299.12,
      humidity: 50,
      pressure: 1010,
      temp: 299.12,
      temp_max: 299.12,
      temp_min: 299.12,
    },
    name: 'Kolkata',
    weather: [{description: 'haze', icon: '50n', id: 721, main: 'Haze'}],
    wind: {deg: 0, speed: 0},
  });
  const [loaded, setLoaded] = useState(true);
  const [cityName, setCityName] = useState('');
  async function fetchData(city) {
    setLoaded(false);
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeather(data);
      } else {
        setWeather(null);
        console.log(response);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData('Paris');
  }, []);
  console.log(weather)

  if (!loaded) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator color="#004bb8" size={36} />
      </View>
    );
  }
  else if(weather === null) {
    return (
        <View style={{flex:1}}>
           <ImageBackground
        style={{
          height: '100%',
          width: '100%',
        }}
        source={{
          uri: `https://images.pexels.com/photos/998660/pexels-photo-998660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        }}>
              <View
          style={{
            width: '90%',
            height: 50,
            marginTop: '20%',
            flexDirection: 'row',
            backgroundColor: '#fff',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <TextInput
            style={{marginLeft: 5, color:"#004bb8",fontWeight:'bold'}}
            value={cityName}
            onChangeText={(text) => setCityName(text)}
            placeholder="Enter City name                                                          "></TextInput>
             
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => fetchData(cityName) }>
            <Fontisto name="search" style={{fontSize: 20}}color="#004bb8" />
          </TouchableOpacity>
        </View>
        <MaterialIcons
              name="error"
              style={{fontSize: 55, alignSelf: 'center', color: 'white',marginTop: 50}}
            />
            <Text style={{fontSize: 35, alignSelf:'center', marginTop: 20, color:'white'}}>City Not Found! Try Different City</Text>
            </ImageBackground>
        </View>
        
    )
}
  return (
    <View>
      <StatusBar backgroundColor="#1c2966" />
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
        }}
        source={{
          uri: `https://images.pexels.com/photos/998660/pexels-photo-998660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        }}>
        <View
          style={{
            width: '90%',
            height: 50,
            marginTop: '20%',
            flexDirection: 'row',
            backgroundColor: '#fff',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <TextInput
            style={{marginLeft: 5, color:"#004bb8",fontWeight:'bold'}}
            value={cityName}
            onChangeText={(text) => setCityName(text)}
            placeholder="Enter City name                                                          "></TextInput>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => fetchData(cityName) }>
            <Fontisto name="search" style={{fontSize: 20}}color="#004bb8" />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 40}}>
            <MaterialIcons
              name="location-on"
              style={{fontSize: 55, alignSelf: 'center', color: 'white'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 35,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {weather.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <MaterialCommunityIcons
              name="thermometer"
              style={{fontSize: 55, alignSelf: 'center', color: 'white'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 100,
                marginLeft: 2,
                color: 'white',
                fontWeight: 'bold',
              }}>
              {`${Math.round(weather.main.temp - 273.15)}°`}
            </Text>
            <Text
              style={{
                fontSize: 45,
                marginLeft: 2,
                color: 'white',
                fontWeight: 'bold',
              }}>
              c
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <MaterialCommunityIcons
              name="cloud"
              style={{fontSize: 55, alignSelf: 'center', color: 'white'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 40,
                fontWeight: 'bold',
                marginLeft: 4,
                color: 'white',
              }}>
              {weather.weather[0].description}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 80}}>
          <View
            style={{
              backgroundColor: 'white',
              width: '40%',
              padding: 30,
              marginTop: 5,
              marginLeft: '5%',
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                fontWeight: 'bold',
                color: '#004bb8',
              }}>
              Humidity
            </Text>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#004bb8',
              }}>{`${weather.main.humidity} %`}</Text>
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                fontWeight: 'bold',
                color: '#004bb8',
              }}>
              WindSpeed
            </Text>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#004bb8',
              }}>{`${weather.wind.speed} m/s`}</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: '40%',
              padding: 30,
              marginTop: 5,
              marginLeft: '10%',
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                fontWeight: 'bold',
                color: '#004bb8',
              }}>
              Max temp
            </Text>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#004bb8',
              }}>{`${Math.round(weather.main.temp_max - 273.15)}°c`}</Text>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                fontWeight: 'bold',
                color: '#004bb8',
              }}>
              Min temp
            </Text>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#004bb8',
              }}>{`${Math.round(weather.main.temp_min - 273.15)}°c`}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default App;
