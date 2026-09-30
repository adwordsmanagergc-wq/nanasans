// Pages of the printed menu, shown in the full-screen menu viewer.

import { CDN } from "@/data/site";

export const MENU_PAGES = [
  {
    src: `${CDN}/1Starters-Sides.jpg`,
    alt: "Starters & Sides",
  },
  {
    src: `${CDN}/2Meat-Curries.jpg`,
    alt: "Meat Curries",
  },
  {
    src: `${CDN}/3Vegetarian-Curries.jpg`,
    alt: "Vegetarian Curries",
  },
  {
    src: `${CDN}/4Vegan-Curries.jpg`,
    alt: "Vegan Curries",
  },
  {
    src: `${CDN}/5Mains.jpg`,
    alt: "Mains",
  },
  {
    src: `${CDN}/6Nans-Tandoori-Grill.jpg`,
    alt: "Nana's Tandoori Grill",
  },
  {
    src: `${CDN}/7Wraps.jpg`,
    alt: "Wraps",
  },
  {
    src: `${CDN}/8Box-Specials.jpg`,
    alt: "Box Specials",
  },
  {
    src: `${CDN}/9Naans-Rotis.jpg`,
    alt: "Naans & Rotis",
  },
  {
    src: `${CDN}/10Sauces-Chutney.jpg`,
    alt: "Sauces & Chutney",
  },
  {
    src: `${CDN}/11-rice-biryani.jpg`,
    alt: "Rice & Biryani",
  },
  {
    src: `${CDN}/12tea.jpg`,
    alt: "Tea",
  },
  {
    src: `${CDN}/13drinks.jpg`,
    alt: "Drinks",
  },
  {
    src: `${CDN}/14-fresh-juice.jpg`,
    alt: "Fresh Juice",
  },
  {
    src: `${CDN}/15signature-drinks.jpg`,
    alt: "Signature Drinks",
  },
  {
    src: `${CDN}/16signatured-drinks2.jpg`,
    alt: "Signature Drinks II",
  },
  {
    src: `${CDN}/17desserts.jpg`,
    alt: "Desserts",
  },
  {
    src: `${CDN}/18ourstory.jpg`,
    alt: "Our Story",
  },
];

export type Diet = "vegetarian" | "vegan";

export interface MenuDish {
  name: string;
  description: string;
  /** Price in Indonesian rupiah. */
  price: number;
  diet?: Diet;
}

export interface MenuCourse {
  name: string;
  description: string;
  dishes: MenuDish[];
}

// A selection from the menu, matching the Menu JSON-LD in index.html.
export const MENU_HIGHLIGHTS: MenuCourse[] = [
  {
    name: "Tandoori Grill",
    description: "Flame-grilled specialties from our clay tandoor oven",
    dishes: [
      { name: "Tandoori Chicken", price: 95000, description: "Half chicken marinated in yoghurt and Kashmiri spices, flame-grilled in tandoor" },
      { name: "Chicken Tikka", price: 85000, description: "Boneless chicken pieces marinated in aromatic spices, char-grilled to perfection" },
      { name: "Seekh Kebab", price: 95000, description: "Minced lamb skewers seasoned with herbs and spices, grilled in tandoor" },
      { name: "Paneer Tikka", price: 80000, diet: "vegetarian", description: "Indian cottage cheese cubes marinated in spiced yoghurt, tandoor grilled" },
    ],
  },
  {
    name: "Curries",
    description: "Slow-cooked aromatic curries with rich gravies",
    dishes: [
      { name: "Butter Chicken", price: 95000, description: "Creamy North Indian curry simmered in tomato-cashew sauce with tender chicken" },
      { name: "Lamb Rogan Josh", price: 110000, description: "Kashmiri-style lamb curry with aromatic spices in rich onion gravy" },
      { name: "Chicken Tikka Masala", price: 95000, description: "Grilled chicken in creamy spiced tomato sauce, a British-Indian classic" },
      { name: "Palak Paneer", price: 80000, diet: "vegetarian", description: "Fresh spinach and soft cottage cheese in mildly spiced gravy" },
      { name: "Dal Makhani", price: 70000, diet: "vegetarian", description: "Creamy black lentils slow-cooked overnight with butter and spices" },
      { name: "Chana Masala", price: 65000, diet: "vegan", description: "Chickpeas in tangy spiced tomato gravy" },
    ],
  },
  {
    name: "Biryani & Rice",
    description: "Fragrant basmati rice dishes layered with spices",
    dishes: [
      { name: "Chicken Biryani", price: 95000, description: "Fragrant basmati rice layered with spiced chicken, saffron and caramelised onions" },
      { name: "Lamb Biryani", price: 110000, description: "Aromatic rice with tender lamb pieces, whole spices and fresh herbs" },
      { name: "Vegetable Biryani", price: 75000, diet: "vegan", description: "Seasonal vegetables with saffron rice and aromatic spices" },
    ],
  },
  {
    name: "Breads",
    description: "Freshly baked naan and roti from our tandoor",
    dishes: [
      { name: "Garlic Naan", price: 30000, description: "Soft leavened bread topped with fresh garlic and butter" },
      { name: "Butter Naan", price: 25000, description: "Classic tandoor-baked bread brushed with butter" },
      { name: "Cheese Naan", price: 35000, description: "Naan bread stuffed with melted cheese" },
      { name: "Tandoori Roti", price: 20000, diet: "vegan", description: "Whole wheat flatbread baked in tandoor" },
    ],
  },
];
