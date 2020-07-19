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
            onPress={() => onPress(choice)}
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
    function onPress(choice) {
        setUserChoice(choice);
        setComputerChoice(randomChoice());
        if (getResult() === -1) {
            setGamePrompt('Defeat!');
            setGameColor('red');
        } else if (getResult() === 1) {
            setGamePrompt('Victory!');
            setGameColor('green');
        } else {
            setGamePrompt('Tie!');
            setGameColor('black');
        }
    };
    const randomChoice = () => {
        return (CHOICES[Math.floor(Math.random() * CHOICES.length)]);
    }
    const getResult = () => {
        let result;

        if (userChoice.name === 'rock') {
            result = computerChoice.name === 'scissors' ? 1 : -1;
        }
        if (userChoice.name === 'paper') {
            result = computerChoice.name === 'rock' ? 1 : -1;
        }
        if (userChoice.name === 'scissors') {
            result = computerChoice.name === 'paper' ? 1 : -1;
        }

        if (userChoice.name === computerChoice.name) result = 0;

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
                        onPress={() => {onPress(choice)}} />
                })
            }
        </SafeAreaView>
    );
}