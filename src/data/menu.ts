// Text version of the core menu. Shown on /menu so search engines can read
// dish names and prices (the full menu is otherwise only available as images).
// Keep in sync with the Restaurant hasMenu JSON-LD in index.html.

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  diet?: "Vegetarian" | "Vegan";
}

export interface MenuSection {
  name: string;
  description: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    name: "Tandoori Grill",
    description: "Flame-grilled specialties from our clay tandoor oven",
    items: [
      { name: "Tandoori Chicken", description: "Half chicken marinated in yoghurt and Kashmiri spices, flame-grilled in tandoor", price: 95000 },
      { name: "Chicken Tikka", description: "Boneless chicken pieces marinated in aromatic spices, char-grilled to perfection", price: 85000 },
      { name: "Seekh Kebab", description: "Minced lamb skewers seasoned with herbs and spices, grilled in tandoor", price: 95000 },
      { name: "Paneer Tikka", description: "Indian cottage cheese cubes marinated in spiced yoghurt, tandoor grilled", price: 80000, diet: "Vegetarian" },
    ],
  },
  {
    name: "Curries",
    description: "Slow-cooked aromatic curries with rich gravies",
    items: [
      { name: "Butter Chicken", description: "Creamy North Indian curry simmered in tomato-cashew sauce with tender chicken", price: 95000 },
      { name: "Lamb Rogan Josh", description: "Kashmiri-style lamb curry with aromatic spices in rich onion gravy", price: 110000 },
      { name: "Chicken Tikka Masala", description: "Grilled chicken in creamy spiced tomato sauce, a British-Indian classic", price: 95000 },
      { name: "Palak Paneer", description: "Fresh spinach and soft cottage cheese in mildly spiced gravy", price: 80000, diet: "Vegetarian" },
      { name: "Dal Makhani", description: "Creamy black lentils slow-cooked overnight with butter and spices", price: 70000, diet: "Vegetarian" },
      { name: "Chana Masala", description: "Chickpeas in tangy spiced tomato gravy", price: 65000, diet: "Vegan" },
    ],
  },
  {
    name: "Biryani & Rice",
    description: "Fragrant basmati rice dishes layered with spices",
    items: [
      { name: "Chicken Biryani", description: "Fragrant basmati rice layered with spiced chicken, saffron and caramelised onions", price: 95000 },
      { name: "Lamb Biryani", description: "Aromatic rice with tender lamb pieces, whole spices and fresh herbs", price: 110000 },
      { name: "Vegetable Biryani", description: "Seasonal vegetables with saffron rice and aromatic spices", price: 75000, diet: "Vegan" },
    ],
  },
  {
    name: "Naan & Breads",
    description: "Freshly baked naan and roti from our tandoor",
    items: [
      { name: "Butter Naan", description: "Classic tandoor-baked bread brushed with butter", price: 25000 },
      { name: "Garlic Naan", description: "Soft leavened bread topped with fresh garlic and butter", price: 30000 },
      { name: "Cheese Naan", description: "Naan bread stuffed with melted cheese", price: 35000 },
      { name: "Tandoori Roti", description: "Whole wheat flatbread baked in tandoor", price: 20000, diet: "Vegan" },
    ],
  },
];

export function formatPrice(price: number): string {
  return `Rp ${price / 1000}k`;
}
