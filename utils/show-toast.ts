import Toast from 'react-native-root-toast';

export function showToast(message: string) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM - 50,
    shadow: true,
    animation: true,
    hideOnPress: true,
  });
}
