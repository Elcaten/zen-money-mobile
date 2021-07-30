import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {FingerprintIcon} from '../components';
import {Card} from '../components/Card';
import {useNavigatorThemeColors} from '../themes';

export interface UnlockScreenProps {
  onUnlockPress: () => void;
}

export const UnlockScreen: React.FC<UnlockScreenProps> = ({onUnlockPress}) => {
  const {onPrimary} = useNavigatorThemeColors();
  const {t} = useTranslation();

  return (
    <Card style={styles.wrapper}>
      <Button title={t('Button.Unlock')} onPress={onUnlockPress} icon={<FingerprintIcon color={onPrimary} />} />
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
