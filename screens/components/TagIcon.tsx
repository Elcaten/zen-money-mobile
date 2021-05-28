/* eslint-disable no-bitwise */
import React from 'react';
import {Image, ImageStyle, StyleProp, View} from 'react-native';
import {TagIconName} from '../../api/models';
import {argbToHEX} from '../../utils';

export interface TagIconProps {
  icon?: TagIconName | null;
  size?: number;
  color?: number | null;
  style?: StyleProp<ImageStyle>;
}

export const TagIcon: React.FC<TagIconProps> = ({icon, size, color, style}) => {
  if (!icon) {
    return <View style={{width: size}} />;
  }

  return <Image source={pngIcons[icon]} style={[{width: size, height: size, tintColor: argbToHEX(color!)}, style]} />;
};

TagIcon.defaultProps = {
  size: 48,
  color: 10855845, // 165,165,165
};

const pngIcons: Record<TagIconName, any> = {
  '1001_bunch_ingredients': require('../../assets/images/a1001_bunch_ingredients.png'),
  '1002_diningroom': require('../../assets/images/a1002_diningroom.png'),
  '1003_bottle_of_water': require('../../assets/images/a1003_bottle_of_water.png'),
  '1004_wine_bottle': require('../../assets/images/a1004_wine_bottle.png'),
  '1005_doughnut': require('../../assets/images/a1005_doughnut.png'),
  '1006_pizza': require('../../assets/images/a1006_pizza.png'),
  '1007_hamburger': require('../../assets/images/a1007_hamburger.png'),
  '1008_lunch': require('../../assets/images/a1008_lunch.png'),
  '2001_beer': require('../../assets/images/a2001_beer.png'),
  '2002_dancing': require('../../assets/images/a2002_dancing.png'),
  '2003_film_reel': require('../../assets/images/a2003_film_reel.png'),
  '2004_champagne': require('../../assets/images/a2004_champagne.png'),
  '2005_birthday': require('../../assets/images/a2005_birthday.png'),
  '2006_candy': require('../../assets/images/a2006_candy.png'),
  '2007_controller': require('../../assets/images/a2007_controller.png'),
  '2008_books': require('../../assets/images/a2008_books.png'),
  '2009_dice': require('../../assets/images/a2009_dice.png'),
  '2010_theatre_mask': require('../../assets/images/a2010_theatre_mask.png'),
  '2501_hand_biceps': require('../../assets/images/a2501_hand_biceps.png'),
  '2502_football': require('../../assets/images/a2502_football.png'),
  '2503_swimming': require('../../assets/images/a2503_swimming.png'),
  '2504_ping_pong': require('../../assets/images/a2504_ping_pong.png'),
  '2505_paint_palette': require('../../assets/images/a2505_paint_palette.png'),
  '2506_fitness': require('../../assets/images/a2506_fitness.png'),
  '3001_bus2': require('../../assets/images/a3001_bus2.png'),
  '3002_cars': require('../../assets/images/a3002_cars.png'),
  '3003_bicycle': require('../../assets/images/a3003_bicycle.png'),
  '3004_motorcycle': require('../../assets/images/a3004_motorcycle.png'),
  '3004_taxi': require('../../assets/images/a3004_taxi.png'),
  '3005_train': require('../../assets/images/a3005_train.png'),
  '3501_gas_station': require('../../assets/images/a3501_gas_station.png'),
  '3502_work': require('../../assets/images/a3502_work.png'),
  '4001_airport': require('../../assets/images/a4001_airport.png'),
  '4002_beach': require('../../assets/images/a4002_beach.png'),
  '4501_phone2': require('../../assets/images/a4501_phone2.png'),
  '5001_coat': require('../../assets/images/a5001_coat.png'),
  '5002_shoe_woman': require('../../assets/images/a5002_shoe_woman.png'),
  '5003_portrait_mode': require('../../assets/images/a5003_portrait_mode.png'),
  '5004_barbers_scissors': require('../../assets/images/a5004_barbers_scissors.png'),
  '5005_perfume': require('../../assets/images/a5005_perfume.png'),
  '5006_shopping': require('../../assets/images/a5006_shopping.png'),
  '5400_garage': require('../../assets/images/a5400_garage.png'),
  '5401_exterior': require('../../assets/images/a5401_exterior.png'),
  '5402_bath': require('../../assets/images/a5402_bath.png'),
  '5403_broom': require('../../assets/images/a5403_broom.png'),
  '5404_paint_roller': require('../../assets/images/a5404_paint_roller.png'),
  '5405_toothbrush': require('../../assets/images/a5405_toothbrush.png'),
  '5501_armchair': require('../../assets/images/a5501_armchair.png'),
  '5502_retro_tv': require('../../assets/images/a5502_retro_tv.png'),
  '5503_electrical': require('../../assets/images/a5503_electrical.png'),
  '5504_electric_teapot': require('../../assets/images/a5504_electric_teapot.png'),
  '5505_laptop': require('../../assets/images/a5505_laptop.png'),
  '5506_mobile': require('../../assets/images/a5506_mobile.png'),
  '5507_lamp': require('../../assets/images/a5507_lamp.png'),
  '5508_coffee_maker': require('../../assets/images/a5508_coffee_maker.png'),
  '5509_camera': require('../../assets/images/a5509_camera.png'),
  '5510_potted_plant': require('../../assets/images/a5510_potted_plant.png'),
  '6001_children': require('../../assets/images/a6001_children.png'),
  '6002_stroller': require('../../assets/images/a6002_stroller.png'),
  '6003_carousel': require('../../assets/images/a6003_carousel.png'),
  '6003_man': require('../../assets/images/a6003_man.png'),
  '6004_woman': require('../../assets/images/a6004_woman.png'),
  '6501_doctor_suitecase': require('../../assets/images/a6501_doctor_suitecase.png'),
  '6502_pill': require('../../assets/images/a6502_pill.png'),
  '6503_doctor': require('../../assets/images/a6503_doctor.png'),
  '6505_smoking': require('../../assets/images/a6505_smoking.png'),
  '7001_gift': require('../../assets/images/a7001_gift.png'),
  '7002_literature': require('../../assets/images/a7002_literature.png'),
  '7501_tree': require('../../assets/images/a7501_tree.png'),
  '7502_campfire': require('../../assets/images/a7502_campfire.png'),
  '7503_flower': require('../../assets/images/a7503_flower.png'),
  '7901_cat': require('../../assets/images/a7901_cat.png'),
  '7902_dog': require('../../assets/images/a7902_dog.png'),
  '7903_fish': require('../../assets/images/a7903_fish.png'),
  '8001_question': require('../../assets/images/a8001_question.png'),
  '8002_globe': require('../../assets/images/a8002_globe.png'),
  '8003_internet_explorer': require('../../assets/images/a8003_internet_explorer.png'),
  '8004_musical': require('../../assets/images/a8004_musical.png'),
  '8501_factory': require('../../assets/images/a8501_factory.png'),
  '8502_training': require('../../assets/images/a8502_training.png'),
  '8503_handshake': require('../../assets/images/a8503_handshake.png'),
  '9001_cash_receiving': require('../../assets/images/a9001_cash_receiving.png'),
  '9002_money_bag': require('../../assets/images/a9002_money_bag.png'),
  '9003_banknotes': require('../../assets/images/a9003_banknotes.png'),
  '9004_wallet': require('../../assets/images/a9004_wallet.png'),
  '9005_gold_bars': require('../../assets/images/a9005_gold_bars.png'),
  '9006_safe': require('../../assets/images/a9006_safe.png'),
  '9007_tax': require('../../assets/images/a9007_tax.png'),
  '9008_give_money': require('../../assets/images/a9008_give_money.png'),
};
