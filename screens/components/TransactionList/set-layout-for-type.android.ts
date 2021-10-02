import {Dimensions} from 'react-native';
import {Dimension} from 'recyclerlistview';
import {ViewType} from './view-type';

export const setLayoutForType = (type: string | number, dim: Dimension): void => {
  let {width} = Dimensions.get('window');
  switch (type) {
    case ViewType.OneWayTransaction:
      dim.width = width;
      dim.height = 75;
      break;
    case ViewType.OneWayTransactionWithComment:
      dim.width = width;
      dim.height = 110;
      break;
    case ViewType.TwoWayTransaction:
      dim.width = width;
      dim.height = 80;
      break;
    case ViewType.TwoWayTransactionWithComment:
      dim.width = width;
      dim.height = 110;
      break;
    case ViewType.SectionHeader:
      dim.width = width;
      dim.height = 36;
      break;
    case ViewType.ListHeader:
      dim.width = width;
      dim.height = 0;
      break;
    default:
      dim.width = width;
      dim.height = 0;
  }
};
