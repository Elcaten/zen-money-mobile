import {EntityType, fetchEntities} from './fetchEntity';

export const fetchTags = async () => {
  return fetchEntities<Tag>(EntityType.Tag).then((tags) => new Map(tags?.map((t) => [t.id, t])));
};

export type TagIconName =
  | '1001_bunch_ingredients'
  | '1002_diningroom'
  | '1003_bottle_of_water'
  | '1004_wine_bottle'
  | '1005_doughnut'
  | '1006_pizza'
  | '1007_hamburger'
  | '1008_lunch'
  | '2001_beer'
  | '2002_dancing'
  | '2003_film_reel'
  | '2004_champagne'
  | '2005_birthday'
  | '2006_candy'
  | '2007_controller'
  | '2008_books'
  | '2009_dice'
  | '2010_theatre_mask'
  | '2501_hand_biceps'
  | '2502_football'
  | '2503_swimming'
  | '2504_ping_pong'
  | '2505_paint_palette'
  | '2506_fitness'
  | '3001_bus2'
  | '3002_cars'
  | '3003_bicycle'
  | '3004_motorcycle'
  | '3004_taxi'
  | '3005_train'
  | '3501_gas_station'
  | '3502_work'
  | '4001_airport'
  | '4002_beach'
  | '4501_phone2'
  | '5001_coat'
  | '5002_shoe_woman'
  | '5003_portrait_mode'
  | '5004_barbers_scissors'
  | '5005_perfume'
  | '5006_shopping'
  | '5400_garage'
  | '5401_exterior'
  | '5402_bath'
  | '5403_broom'
  | '5404_paint_roller'
  | '5405_toothbrush'
  | '5501_armchair'
  | '5502_retro_tv'
  | '5503_electrical'
  | '5504_electric_teapot'
  | '5505_laptop'
  | '5506_mobile'
  | '5507_lamp'
  | '5508_coffee_maker'
  | '5509_camera'
  | '5510_potted_plant'
  | '6001_children'
  | '6002_stroller'
  | '6003_carousel'
  | '6003_man'
  | '6004_woman'
  | '6501_doctor_suitecase'
  | '6502_pill'
  | '6503_doctor'
  | '6505_smoking'
  | '7001_gift'
  | '7002_literature'
  | '7501_tree'
  | '7502_campfire'
  | '7503_flower'
  | '7901_cat'
  | '7902_dog'
  | '7903_fish'
  | '8001_question'
  | '8002_globe'
  | '8003_internet_explorer'
  | '8004_musical'
  | '8501_factory'
  | '8502_training'
  | '8503_handshake'
  | '9001_cash_receiving'
  | '9002_money_bag'
  | '9003_banknotes'
  | '9004_wallet'
  | '9005_gold_bars'
  | '9006_safe'
  | '9007_tax'
  | '9008_give_money';

export interface Tag {
  id: string; // UUID
  changed: number; // Unix timestamp
  user: number; // User.id

  title: string;
  parent?: string | null; // Tag.id
  icon?: TagIconName | null;
  picture?: string | null;
  color?: number | null;

  showIncome: boolean;
  showOutcome: boolean;
  budgetIncome: boolean;
  budgetOutcome: boolean;
  required?: boolean | null;
}
