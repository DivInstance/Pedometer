import {PermissionsAndroid, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
            return true;
        } else {
            console.log('Location permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
};

export const getUserLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
        },
        (error) => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
};