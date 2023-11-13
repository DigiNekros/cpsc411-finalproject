
import React, {useState, useEffect, useRef} from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput,
    ImageBackground,
    Alert,
} from 'react-native';
import 'react-native-gesture-handler'
import 'react-native-paper'
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppContext from './AppContext'

//PokeAPI: https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0
const Stack = createNativeStackNavigator();
const bgImage = {uri: 'https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617bdog.png'}
/* BIG TO-DOS
- FIX MAJOR FUNCTION OF GAME: game will not iterate through forEach loop for some reason.
- NATIVE FUNCTION: implement some sort of native function with the game
- USERNAME: make the username function
- LEADERBOARD: make the leaderboard function
*/
const Home = ({navigation}) => {
  const context = React.useContext(AppContext);
  return (
    <SafeAreaProvider style = {style.root}>
      <SafeAreaView style = {style.hmImage}>
        <ImageBackground source={bgImage} resizeMode="cover" style={style.hmImage}>
          <Text style = {style.title}>PokePolls!</Text>
          <Text style = {style.subtitle}>Can you name them all?</Text>
          <TouchableOpacity style = {style.hmButton} onPress = {() => navigation.navigate('Game')}>
            <Text style = {style.hmText}>Play Game!</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {style.hmButton} onPress = {() => navigation.navigate('Username')}>
            <Text style = {style.hmText}>Set Username</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {style.hmButton} onPress = {() => navigation.navigate('Leaderboard')}>
            <Text style = {style.hmText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {style.hmButton} onPress = {() => navigation.navigate('Credits')}>
            <Text style = {style.hmText}>Credits</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const Game = ({navigation}) => {
  const context = React.useContext(AppContext);
  const [guessList, setGuessList] = useState([])
  const [pokeguess, setPokeguess] = useState("")
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0); 
  const [running, setRunning] = useState(true);
  const [gameActive, setGameActive] = useState(true);
  const intervalRef = useRef(null); 
  const startTimeRef = useRef(0);
  const checkGuess = (guess) => {
    let answers = [...context.pokenames];
    answers.forEach(a =>  {
      if (a.name === guess) {
        setScore(score+1)
        setGuessList([...guessList, {name: guess}])
      }
    })
    setScore(score+1)
    setGuessList([...guessList, {name: guess}])
  }
  const startTime = () => { 
    startTimeRef.current = Date.now() - time * 1000; 
    intervalRef.current = setInterval(() => { 
        setTime(Math.floor((Date.now() -  
        startTimeRef.current) / 1000)); 
    }, 1000); 
    setRunning(!running)
  };
  const stopTime = () => { 
    clearInterval(intervalRef.current); 
    setRunning(!running); 
  };
  const giveUp = () => {
    setGameActive(!gameActive);
  }
  useEffect(() => {
    if (gameActive == false) {
      Alert.alert("Well done!", "You answered " + score + " Pokemon in " + time + " seconds!", [{text: "OK", onPress: () => navigation.goBack()}])
    }
  });
  return (
    <SafeAreaProvider style = {style.root}>
      <SafeAreaView style = {style.hmImage}>
        <ImageBackground source={bgImage} resizeMode="cover" style={style.hmImage}>
          <TextInput
            style = {game.TIBox}
            onChangeText={setPokeguess}
            value={pokeguess}
            placeholder="Enter your guess here"
          ></TextInput>
          <TouchableOpacity style = {game.submitBox} onPress = {() => checkGuess(pokeguess)}>
            <Text style = {game.submitText}>Submit</Text>
          </TouchableOpacity>
          <SafeAreaView style = {game.PABox}>
            <Text style = {game.PATitle}>Past Answers</Text>
            <FlatList
            data={guessList}
            renderItem={({ item }) => (
              <Text style = {game.PAEntry}>{item.name}</Text>
            )}
            style = {game.PAEntry}
            keyExtractor={(item, index) => index.toString()}
            />
          </SafeAreaView>
          <SafeAreaView style = {game.scoreBox}>
            <Text style = {game.scoreText}>Score: {score}</Text>
            <Text style = {game.scoreText}>Time: {time}s</Text>
          </SafeAreaView>
          <SafeAreaView style = {{flexDirection: "row", alignSelf: "center", top: 25,}}>
            {running == true ? (
              <TouchableOpacity style = {game.timeBox} onPress = {() => startTime()}>
                <Text style = {game.timeText}>Start</Text>
              </TouchableOpacity>
            ) :
            (
              <TouchableOpacity style = {game.timeBox} onPress = {() => stopTime()}>
                <Text style = {game.timeText}>Stop</Text>
              </TouchableOpacity>
            )
          }
            <TouchableOpacity style = {game.giveUpBox} onPress = {() => giveUp()}>
              <Text style = {game.giveUpText}>Give Up</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const Username = ({navigation}) => {
  const context = React.useContext(AppContext);
  return (
    <SafeAreaProvider style = {style.root}>
      <SafeAreaView style = {style.hmImage}>
        <ImageBackground source={bgImage} resizeMode="cover" style={style.hmImage}>
          <SafeAreaView style = {temp.tempBox}>
            <Text style = {temp.tempText}>In progress! Please wait until the next update.</Text>
          </SafeAreaView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const Leaderboard = ({navigation}) => {
  const context = React.useContext(AppContext);
  return (
    <SafeAreaProvider style = {style.root}>
      <SafeAreaView style = {style.hmImage}>
        <ImageBackground source={bgImage} resizeMode="cover" style={style.hmImage}>
          <SafeAreaView style = {temp.tempBox}>
            <Text style = {temp.tempText}>In progress! Please wait until the next update.</Text>
          </SafeAreaView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const Credits = ({navigation}) => {
  const context = React.useContext(AppContext);
  return (
    <SafeAreaProvider style = {style.root}>
      <SafeAreaView style = {style.hmImage}>
        <ImageBackground source={bgImage} resizeMode="cover" style={style.hmImage}>
          <SafeAreaView style = {credits.box1}>
            <Text style = {credits.credits1}>I do not own Pokemon, the brand belongs to © Nintendo/Creatures Inc./GAME FREAK Inc.</Text>
          </SafeAreaView>
          <SafeAreaView style = {credits.box2}>
            <Text style = {credits.credits2}>Made by Parker Nguyen, a humble (and sleep deprived) CSUF student</Text>
          </SafeAreaView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [pokenames, setPokenames] = useState([])
  const FetchDataComponent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  
    useEffect(() => {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=1017&offset=0')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          context.setPokenames([...data.results, {name: data.name, url: data.url, recorded: false}])
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    return (
      <SafeAreaView>
        <FlatList
            data={context.pokenames}
            renderItem={({ item }) => (
              <Text style = {game.PAEntry}>{item.name}</Text>
            )}
            style = {game.PAEntry}
            keyExtractor={(item, index) => index.toString()}
            />
      </SafeAreaView>
    );
  }
  const contextVal = {
    username,
    setUsername,
    pokenames,
    setPokenames,
    FetchDataComponent
  }
  return (
    <AppContext.Provider value = {contextVal}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name = "Home" component = {Home}></Stack.Screen>
        <Stack.Screen name = "Game" component = {Game}></Stack.Screen>
        <Stack.Screen name = "Username" component = {Username}></Stack.Screen>
        <Stack.Screen name = "Leaderboard" component = {Leaderboard}></Stack.Screen>
        <Stack.Screen name = "Credits" component = {Credits}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </AppContext.Provider>
  );
}

const style = StyleSheet.create ({
  title: {
    fontFamily: 'PokemonSolidNormal',
    fontSize: 50,
    textAlign: 'center',
    color: 'black',
    textShadowColor: 'white',
    textShadowRadius: 5,
    bottom: 50
  },
  subtitle: {
    fontFamily: 'pkmnfl',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    bottom: 50
  },
  root: {flex: 1},
  hmBG: {
    alignItems: 'center',
    opacity: '0.7'
  },
  hmImage: {
    justifyContent: 'center',
    flex: 1,
  },
  hmButton: {
    backgroundColor:'#BDC2C4',
    width: 200,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  hmText: {
    fontFamily: 'pkmndp',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
})

const game = StyleSheet.create ({
  TIBox: {
    backgroundColor:'#BDC2C4',
    width: 300,
    height: 55,
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'pkmnrs',
    borderRadius: 5,
    bottom: 75
  },
  PABox: {
    backgroundColor:'#BDC2C4',
    width: 300,
    height: 100,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 25,
  },
  PATitle: {
    fontFamily: 'pkmndp',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  PAEntry: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'pkmnfl',
    fontSize: 20,
  },
  submitBox: {
    backgroundColor:'#BDC2C4',
    width: 200,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 50
  },
  submitText: {
    fontFamily: 'pkmndp',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  timeBox: {
    backgroundColor:'#BDC2C4',
    width: 150,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    right: 25
  },
  timeText: {
    fontFamily: 'pkmndp',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  scoreBox: {
    backgroundColor:'#BDC2C4',
    width: 200,
    height: 75,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scoreText: {
    fontFamily: 'pkmndp',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  giveUpBox: {
    backgroundColor:'#BDC2C4',
    width: 150,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    left: 25
  },
  giveUpText: {
    fontFamily: 'pkmndp',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
})

const credits = StyleSheet.create ({
  box1: {
    backgroundColor:'#BDC2C4',
    width: 300,
    height: 110,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 110,
  },
  box2: {
    backgroundColor:'#BDC2C4',
    width: 300,
    height: 100,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 100
  },
  credits1: {fontFamily: 'pkmnrs', fontSize: 30, color: 'black', textAlign: 'center'},
  credits2: {fontFamily: 'pkmnrs', fontSize: 30, color: 'black', textAlign: 'center'}
})

const temp = StyleSheet.create({
  tempBox: {
    backgroundColor:'#BDC2C4',
    width: 200,
    height: 100,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tempText: {
    fontFamily: 'pkmndp',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  }
})

export default App;
