import { CYOPAttributeType } from 'types';
import defaultConfig from './cyop.json';

export default class CYOPAttributes {
  public data: { man: CYOPAttributeType };
  constructor(data: { man: CYOPAttributeType }) {
    this.data = data;
  }

  // static sortCategories(categories: CYOPAttributeCategory[]) {
  //   const CATEGORY_ORDER = [
  //     CYOPCategories.SKIN,
  //     CYOPCategories.EYES,
  //     CYOPCategories.MOUTH,
  //     CYOPCategories.NOSE,
  //     CYOPCategories.HAIR,
  //     CYOPCategories.GLASSES,
  //     CYOPCategories.FACIAL_HAIR,
  //     CYOPCategories.ACCESSORIES
  //   ];
  //   categories.sort((a, b) => (CATEGORY_ORDER.indexOf(a.categoryName) > CATEGORY_ORDER.indexOf(b.categoryName) ? 1 : -1));
  // }

  // static getCategoryByName(categories: CYOPAttributeCategory[], name: CYOPCategories): CYOPAttributeCategory {
  //   for (const categorie of categories) {
  //     if (categorie.categoryName === name) {
  //       return categorie;
  //     }
  //   }
  //   return { categoryName: CYOPCategories.OTHER, attributes: [] };
  // }

  // static getCategoryFromString(category: string): CYOPCategories {
  //   let res = CYOPCategories.OTHER;
  //   Object.entries(CYOPCategories).forEach(item => {
  //     const [categoryString, categoryEnum] = item;
  //     if (categoryString === category) {
  //       res = categoryEnum;
  //     }
  //   });
  //   return res;
  // }

  static getEmpty(): CYOPAttributes {
    return new CYOPAttributes(defaultConfig as { man: CYOPAttributeType });
  }
}
