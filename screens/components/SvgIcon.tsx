import React from 'react';
import {SvgProps} from 'react-native-svg';
import {HelpIcon} from '../../components/Icons';
import Icon_1001_bunch_ingredients from '../../assets/images/a1001_bunch_ingredients.svg';
import Icon_1002_diningroom from '../../assets/images/a1002_diningroom.svg';
import Icon_1008_lunch from '../../assets/images/a1008_lunch.svg';
import Icon_2008_books from '../../assets/images/a2008_books.svg';
import Icon_2501_hand_biceps from '../../assets/images/a2501_hand_biceps.svg';
import Icon_2506_fitness from '../../assets/images/a2506_fitness.svg';
import Icon_3001_bus2 from '../../assets/images/a3001_bus2.svg';
import Icon_3002_cars from '../../assets/images/a3002_cars.svg';
import Icon_3501_gas_station from '../../assets/images/a3501_gas_station.svg';
import Icon_3502_work from '../../assets/images/a3502_work.svg';
import Icon_4501_phone2 from '../../assets/images/a4501_phone2.svg';
import Icon_5001_coat from '../../assets/images/a5001_coat.svg';
import Icon_5003_portrait_mode from '../../assets/images/a5003_portrait_mode.svg';
import Icon_5005_perfume from '../../assets/images/a5005_perfume.svg';
import Icon_5006_shopping from '../../assets/images/a5006_shopping.svg';
import Icon_5401_exterior from '../../assets/images/a5401_exterior.svg';
import Icon_5505_laptop from '../../assets/images/a5505_laptop.svg';
import Icon_5506_mobile from '../../assets/images/a5506_mobile.svg';
import Icon_6001_children from '../../assets/images/a6001_children.svg';
import Icon_6003_man from '../../assets/images/a6003_man.svg';
import Icon_6004_woman from '../../assets/images/a6004_woman.svg';
import Icon_6501_doctor_suitecase from '../../assets/images/a6501_doctor_suitecase.svg';
import Icon_7001_gift from '../../assets/images/a7001_gift.svg';
import Icon_7002_literature from '../../assets/images/a7002_literature.svg';
import Icon_8001_question from '../../assets/images/a8001_question.svg';
import Icon_9001_cash_receiving from '../../assets/images/a9001_cash_receiving.svg';
import Icon_9002_money_bag from '../../assets/images/a9002_money_bag.svg';
import Icon_9003_banknotes from '../../assets/images/a9003_banknotes.svg';
import Icon_9007_tax from '../../assets/images/a9007_tax.svg';
import Icon_9008_give_money from '../../assets/images/a9008_give_money.svg';
import {TagIconName} from '../../api/models';

export type SvgIconProps = SvgProps & {
  icon: TagIconName;
};

export const SvgIcon: React.FC<SvgIconProps> = ({icon, ...props}) => {
  switch (icon) {
    case '1001_bunch_ingredients':
      return <Icon_1001_bunch_ingredients {...props} />;
    case '1002_diningroom':
      return <Icon_1002_diningroom {...props} />;
    case '1008_lunch':
      return <Icon_1008_lunch {...props} />;
    case '2008_books':
      return <Icon_2008_books {...props} />;
    case '2501_hand_biceps':
      return <Icon_2501_hand_biceps {...props} />;
    case '2506_fitness':
      return <Icon_2506_fitness {...props} />;
    case '3001_bus2':
      return <Icon_3001_bus2 {...props} />;
    case '3002_cars':
      return <Icon_3002_cars {...props} />;
    case '3501_gas_station':
      return <Icon_3501_gas_station {...props} />;
    case '3502_work':
      return <Icon_3502_work {...props} />;
    case '4501_phone2':
      return <Icon_4501_phone2 {...props} />;
    case '5001_coat':
      return <Icon_5001_coat {...props} />;
    case '5003_portrait_mode':
      return <Icon_5003_portrait_mode {...props} />;
    case '5005_perfume':
      return <Icon_5005_perfume {...props} />;
    case '5006_shopping':
      return <Icon_5006_shopping {...props} />;
    case '5401_exterior':
      return <Icon_5401_exterior {...props} />;
    case '5505_laptop':
      return <Icon_5505_laptop {...props} />;
    case '5506_mobile':
      return <Icon_5506_mobile {...props} />;
    case '6001_children':
      return <Icon_6001_children {...props} />;
    case '6003_man':
      return <Icon_6003_man {...props} />;
    case '6004_woman':
      return <Icon_6004_woman {...props} />;
    case '6501_doctor_suitecase':
      return <Icon_6501_doctor_suitecase {...props} />;
    case '7001_gift':
      return <Icon_7001_gift {...props} />;
    case '7002_literature':
      return <Icon_7002_literature {...props} />;
    case '8001_question':
      return <Icon_8001_question {...props} />;
    case '9001_cash_receiving':
      return <Icon_9001_cash_receiving {...props} />;
    case '9002_money_bag':
      return <Icon_9002_money_bag {...props} />;
    case '9003_banknotes':
      return <Icon_9003_banknotes {...props} />;
    case '9007_tax':
      return <Icon_9007_tax {...props} />;
    case '9008_give_money':
      return <Icon_9008_give_money {...props} />;
    default:
      return <HelpIcon />;
  }
};
