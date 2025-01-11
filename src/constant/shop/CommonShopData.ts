import { FOOD_CATEGORIES } from '@/types/foodCategory';
import LOCATION from '../location';

const COMMON_SHOP_DATA = {
  name: '',
  category: FOOD_CATEGORIES[0],
  address1: LOCATION[0],
  address2: '',
  description: '',
  imageUrl: '',
  originalHourlyPay: 0,
};

export default COMMON_SHOP_DATA;
