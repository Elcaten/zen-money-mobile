import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from '../../../../components/ScrollView';
import {ZenFormSheet} from '../../../../components/ZenFormSheet';
import {ZenText} from '../../../../components/ZenText';
import {Operation} from '../types';

export interface OperationDetailsPageSheetProps {
  visible: boolean;
  operation: Operation | null;
  onRequestClose: () => void;
}

export const OperationDetailsPageSheet: React.FC<OperationDetailsPageSheetProps> = ({
  operation,
  visible,
  onRequestClose,
}) => {
  const operationText = operation
    ? JSON.stringify(
        {
          paymentCardNumber: operation.payment?.cardNumber,
          cardNumber: operation.cardNumber,
          subcategory: operation.subcategory,
          description: operation.description,
          categoryName: operation.category.name,
          isExternalCard: operation.isExternalCard,
          type: operation.type === 'Debit' ? '-' : operation.type === 'Credit' ? '+' : '??',
          amount: `${operation.amount.value} ${operation.amount.currency.name}`,
          accountAmount: `${operation.accountAmount.value} ${operation.accountAmount.currency.name}`,
        },
        null,
        2,
      )
    : 'No operation selected';

  return (
    <ZenFormSheet visible={visible} onRequestClose={onRequestClose}>
      <ZenFormSheet.Header>
        <ZenFormSheet.CancelButton onPress={onRequestClose} />
      </ZenFormSheet.Header>
      <ScrollView style={styles.scrollView}>
        <ZenText>{operationText}</ZenText>
      </ScrollView>
    </ZenFormSheet>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
  },
});
