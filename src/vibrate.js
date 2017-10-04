const getVibrationMethod = () => {
    if (navigator.vibrate) {
        return dur => navigator.vibrate(dur);
    } else if (navigator.mozVibrate) {
        return dur => navigator.mozVibrate(dur);
    }

    console.warn('MyLocations: Vibration is not supported');
    return () => {};
}

const vibrate = getVibrationMethod();

export default vibrate;