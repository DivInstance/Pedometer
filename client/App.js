import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { Pedometer } from 'expo-sensors'; // For step tracking
import { watchLocation } from './LocationService'; // For location tracking
import store from './redux/store';
import Main from './Main';

export default function App() {
    const [location, setLocation] = useState(null);
    const [steps, setSteps] = useState(0);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState(null);

    useEffect(() => {
        // Location tracking
        const startLocationWatch = async () => {
            const locationSubscription = await watchLocation((loc) => {
                setLocation(loc);
                console.log('Location updated:', loc);
            });

            // Cleanup subscription
            return () => {
                if (locationSubscription) {
                    locationSubscription.remove();
                }
            };
        };
        startLocationWatch();
    }, []);

    useEffect(() => {
        // Step tracking
        const subscribePedometer = async () => {
            const isAvailable = await Pedometer.isAvailableAsync();
            setIsPedometerAvailable(isAvailable);

            const pedometerSubscription = Pedometer.watchStepCount(result => {
                setSteps(result.steps);
                console.log('Steps counted:', result.steps);
            });

            return () => {
                if (pedometerSubscription) {
                    pedometerSubscription.remove();
                }
            };
        };
        subscribePedometer();
    }, []);

    // Function to send data to the backend
    const sendDataToBackend = async () => {
        const data = {
            userId: '12345', // Replace with actual userId if needed
            steps: steps,
            location: {
                latitude: location?.coords?.latitude || null,
                longitude: location?.coords?.longitude || null,
                speed: location?.coords?.speed || null
            },
            startTime: new Date(), // Adjust based on actual tracking session
            endTime: new Date(),    
        };

        try {
            const response = await fetch('https://your-backend-api.com/steps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            console.log('Data successfully sent to backend');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    // Trigger data send when steps and location change
    useEffect(() => {
        if (steps && location) {
            sendDataToBackend();
        }
    }, [steps, location]);

    return (
        <Provider store={store}>
            <Main />
            <View>
                {location ? (
                    <Text>
                        Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}, Speed: {location.coords.speed}
                    </Text>
                ) : (
                    <Text>Fetching location...</Text>
                )}
                <Text>Steps: {steps}</Text>
                {isPedometerAvailable === false && <Text>Pedometer is not available on this device.</Text>}
            </View>
        </Provider>
    );
}