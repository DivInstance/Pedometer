import * as Location from 'expo-location';

export const watchLocation = async (callback) => {
    // Request location permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    // Handle case if permission was not granted
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return null;
    }

    // Start watching the location
    return Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000, // Update every second
            distanceInterval: 1, // Update every meter
        },
        callback
    );
};
