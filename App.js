import React, { useState } from 'react';
import { Text, Image, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './src/Styles.js';
import { CHOICES } from './src/CHOICES'

export default function App() {
    const [gamePrompt, setGamePrompt] = useState('Fight!');
    const [gameColor, setGameColor] = useState('black');
    const [userChoice, setUserChoice] = useState(CHOICES[0]);
    const [computerChoice, setComputerChoice] = useState(CHOICES[0]);

    const Button = (choice) => (
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress = {() => {onPress(choice)}}
        >
            <Text style={styles.buttonText}>
                {choice.name.charAt(0).toUpperCase() + choice.name.slice(1)}
            </Text>
        </TouchableOpacity>
    );
    const ChoiceCard = ({ player, choice }) => {
        const title = choice.name && choice.name.charAt(0).toUpperCase() + choice.name.slice(1);
        // why must have && ???
        return (
            <View style={styles.choiceContainer}>
                <Text style={styles.choiceDescription}>{player}</Text>
                <Image source={choice.source} style={styles.choiceImage} />
                <Text style={styles.choiceCardTitle}>{title}</Text>
            </View>
        );
    };
    const onPress = (choice) => {
        let newUserChoice = CHOICES.find(userChoice => userChoice.name === choice.name);
        let newComputerChoice = CHOICES.find(computerChoice => computerChoice.name === randomChoice().name);        
        
        let result = getResult({newUserChoice, newComputerChoice});
        //Tại sao dùng thẳng 2 state thì gamePrompt lại bị cập nhật chậm 1 bước?
        if (result === -1) {
            setGamePrompt('Defeat!');
            setGameColor('red');
        } else if (result === 1) {
            setGamePrompt('Victory!');
            setGameColor('green');
        } else {
            setGamePrompt('Tie!');
            setGameColor('black');
        }

        setUserChoice(newUserChoice);
        setComputerChoice(newComputerChoice);
    };
    const randomChoice = () => {
        return (CHOICES[Math.floor(Math.random() * CHOICES.length)]);
    }
    const getResult = ({newUserChoice, newComputerChoice}) => {
        let result;

        if (newUserChoice.name === 'rock') {
            result = newComputerChoice.name === 'scissors' ? 1 : -1;
        }
        if (newUserChoice.name === 'paper') {
            result = newComputerChoice.name === 'rock' ? 1 : -1;
        }
        if (newUserChoice.name === 'scissors') {
            result = newComputerChoice.name === 'paper' ? 1 : -1;
        }

        if (newUserChoice.name === newComputerChoice.name) result = 0;

        return result;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 30, color: gameColor, fontWeight: 'bold' }}>{gamePrompt}</Text>
            <View style={styles.choicesContainer}>
                <ChoiceCard
                    player='User'
                    choice={userChoice}
                />
                <Text style={{ color: 'green', fontSize: 25, fontWeight: 'bold' }}>vs</Text>
                <ChoiceCard
                    player='Computer'
                    choice={computerChoice}
                />
            </View>
            {
                CHOICES.map(choice => {
                    return <Button
                        key={choice.name}
                        name={choice.name}
                        onPress={(choice) => {onPress(choice)}} />
                })
            }
        </SafeAreaView>
    );
}