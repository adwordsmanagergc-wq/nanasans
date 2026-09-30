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
  description?: string;
  /** Price in Indonesian rupiah; omitted when the whole course shares one price. */
  price?: number;
}

export interface MenuCourse {
  name: string;
  /** Index into MENU_PAGES of the printed page for this course. */
  page: number;
  note?: string;
  /** Shared price for every dish in the course, in Indonesian rupiah. */
  price?: number;
  diet?: Diet;
  dishes: MenuDish[];
}

export const MENU_TAX_NOTE =
  "An additional 11% government tax and 3% service charge will be added to the total bill.";

// The full menu, transcribed from the printed menu. Keep in sync with the
// Menu JSON-LD in index.html.
export const MENU: MenuCourse[] = [
  {
    name: "Starters & Sides",
    page: 0,
    dishes: [
      { name: "Tandoori Chicken Wings", price: 70000 },
      { name: "Plain Fries", price: 45000 },
      { name: "Chaat Masala Fries (Dry)", price: 50000 },
      { name: "Masala Fries", price: 60000 },
      { name: "Salt & Pepper Chips", price: 65000 },
      { name: "Mozzarella Sticks (2pcs)", price: 55000 },
      { name: "Veg Samosa (2pcs)", price: 35000 },
      { name: "Chicken Samosa (2pcs)", price: 45000 },
      { name: "Onion Bhaji (6pcs)", price: 50000 },
      { name: "Vegetable Pakora", price: 45000 },
      { name: "Salad Bowl", price: 50000 },
      { name: "Masala/Plain Papadam", price: 40000 },
    ],
  },
  {
    name: "Meat Curries",
    page: 1,
    note: "Only curry, sides sold separately",
    dishes: [
      { name: "Chicken Tikka Masala", price: 110000, description: "Smooth tomato curry with a hint of spice" },
      { name: "Chicken Korma", price: 110000, description: "Creamy cashew curry with soft aromatics" },
      { name: "Butter Chicken", price: 110000, description: "Sweet tomato curry with a buttery finish" },
      { name: "Chicken Vindaloo", price: 110000, description: "Hot and tangy curry with bold spice" },
      { name: "Curry Chicken", price: 110000, description: "Tomato-onion base with gentle spice" },
      { name: "Dhaba Style Curry Chicken", price: 110000, description: "North Indian roadside style curry" },
      { name: "Palak Chicken", price: 110000, description: "Spinach curry with soft spices" },
      { name: "Lamb Curry", price: 140000, description: "Australian lamb in a dark, aromatic gravy" },
      { name: "Lamb Keema", price: 140000, description: "Australian lamb mince and peas in a flavorful curry" },
    ],
  },
  {
    name: "Veg Curries",
    page: 2,
    note: "Only curry, sides sold separately",
    price: 120000,
    diet: "vegetarian",
    dishes: [
      { name: "Paneer Tikka Masala", description: "Smooth tomato curry with a hint of spice" },
      { name: "Paneer Makhni", description: "Sweet tomato curry with a buttery finish" },
      { name: "Paneer Kadai", description: "Tangy tomato-onion base curry with mild spices" },
      { name: "Palak Paneer", description: "Spinach curry with soft spices" },
      { name: "Mutter Paneer", description: "Paneer and peas simmered in slight tangy curry" },
      { name: "Chilli Paneer", description: "Paneer cooked in our Indian inspired sweet chilli sauce" },
    ],
  },
  {
    name: "Vegan Curries",
    page: 3,
    note: "Only curry, sides sold separately",
    price: 100000,
    diet: "vegan",
    dishes: [
      { name: "Chole Masala", description: "White chickpeas simmered in a tangy onion gravy" },
      { name: "Aloo Gobi", description: "Curried cauliflower and potatoes" },
      { name: "Aloo Mutter", description: "Cubed potatoes and peas simmered in a slight tangy curry" },
      { name: "Rajma Masala", description: "Red kidney beans slow cooked in a mild spiced tomato-onion gravy" },
      { name: "Mix Veg Curry", description: "Lightly spiced homestyle curry" },
      { name: "Dal Tadka", description: "Yellow lentils in a unique smoky flavor curry" },
    ],
  },
  {
    name: "Mains",
    page: 4,
    note: "Sides sold separately",
    dishes: [
      { name: "Chilli Chicken", price: 110000, description: "Pieces of bite sized chicken breast cooked in an Indian inspired sweet chilli sauce" },
      { name: "Lamb Seekh Kebab", price: 140000, description: "Australian imported lamb with Indian spices" },
      { name: "Chicken Seekh Kebab", price: 120000 },
      { name: "Tandoori Chicken Tikka", price: 120000, description: "Boneless chicken breast marinated in tandoori spices" },
      { name: "Masala/Plain Omelette", price: 45000, description: "Omelette cooked with traditional spices, garlic, ginger and onions" },
      { name: "Fish Pakora", price: 75000, description: "Deep fried chunks of white fish in an Indian spiced batter" },
      { name: "Masala Fish", price: 80000, description: "Pan fried fish with Indian spices" },
    ],
  },
  {
    name: "Nana's Tandoori Grill",
    page: 5,
    note: "Sides sold separately",
    dishes: [
      { name: "Medium Mixed Grill", price: 250000, description: "Chicken tikka, chicken wings, fish pakora & lamb seekh kebab, 1 butter naan and masala fries. Serves 2-3 people" },
      { name: "Large Mixed Grill", price: 360000, description: "Chicken tikka, chicken wings, fish pakora, lamb seekh kebab, 1 butter naan and masala fries. Serves 3-4 people" },
      { name: "Half Tandoori Chicken", price: 90000, description: "1pc breast, 1pc leg. To cook properly in the clay oven, the chicken is served in pieces" },
      { name: "Full Tandoori Chicken", price: 145000, description: "2pc breast, 2pc leg. To cook properly in the clay oven, the chicken is served in pieces" },
    ],
  },
  {
    name: "Wraps",
    page: 6,
    note: "Served with a side of fries & Coke. Choice of chapati, romali or naan. All wraps packed with a fresh crunch of shredded carrots and cabbage",
    dishes: [
      { name: "Tandoori Chicken Tikka", price: 150000 },
      { name: "Chilli Chicken", price: 150000 },
      { name: "Butter Chicken", price: 150000 },
      { name: "Lamb Seekh Kebab", price: 165000 },
      { name: "Chicken Seekh Kebab", price: 150000 },
      { name: "Masala/Plain Omelette", price: 125000 },
      { name: "Paneer Tikka Masala", price: 150000 },
      { name: "Paneer Makhni", price: 150000 },
    ],
  },
  {
    name: "Box Specials",
    page: 7,
    note: "Drinks sold separately",
    dishes: [
      { name: "Salt & Pepper Chicken Box", price: 125000, description: "A popular British & Irish takeaway dish featuring crispy fried chicken, chips and stir-fried vegetables, tossed in a spicy blend of seasonings. Served with chip shop curry sauce" },
      { name: "Chicken Strips & Chips Box", price: 115000, description: "Chicken strips and chips. Served with ketchup or chip shop curry sauce" },
    ],
  },
  {
    name: "Naans & Roti",
    page: 8,
    dishes: [
      { name: "Plain Naan", price: 25000 },
      { name: "Butter Naan", price: 30000 },
      { name: "Garlic Naan", price: 30000 },
      { name: "Garlic Butter Naan", price: 35000 },
      { name: "Garlic Cheese Naan", price: 55000 },
      { name: "Cheese Naan", price: 45000 },
      { name: "Cheese Butter Naan", price: 50000 },
      { name: "Coconut Naan", price: 50000 },
      { name: "Roti (Chapati)", price: 25000 },
      { name: "Lamb Keema Naan", price: 55000 },
      { name: "Chicken Keema Naan", price: 50000 },
      { name: "Aloo Prantha", price: 45000 },
    ],
  },
  {
    name: "Sauces & Chutney",
    page: 9,
    dishes: [
      { name: "Mint Chutney", price: 5000 },
      { name: "Tamarind Chutney", price: 5000 },
      { name: "Mint Yoghurt", price: 5000 },
      { name: "Tomato Ketchup", price: 5000 },
      { name: "Mayonnaise", price: 5000 },
      { name: "BBQ Sauce", price: 5000 },
      { name: "Chilli Sauce", price: 5000 },
      { name: "Raita", price: 35000, description: "Indian style homemade yoghurt" },
    ],
  },
  {
    name: "Rice & Biryani",
    page: 10,
    dishes: [
      { name: "Plain Basmati Rice", price: 40000 },
      { name: "Jeera (Cumin) Rice", price: 45000 },
      { name: "Pilau Rice", price: 45000 },
      { name: "Vegetable Biryani", price: 70000 },
      { name: "Chicken Biryani", price: 90000 },
      { name: "Lamb Biryani", price: 145000 },
    ],
  },
  {
    name: "Tea",
    page: 11,
    price: 40000,
    dishes: [
      { name: "Masala" },
      { name: "Ginger Milk" },
      { name: "Milk" },
      { name: "Black" },
      { name: "Lemon" },
      { name: "Ginger, Lemon & Honey" },
      { name: "Teh Tarik" },
    ],
  },
  {
    name: "Drinks",
    page: 12,
    dishes: [
      { name: "Coke", price: 25000 },
      { name: "Coke Zero", price: 25000 },
      { name: "Sprite", price: 25000 },
      { name: "Fanta", price: 25000 },
      { name: "Soda Water", price: 25000 },
      { name: "Water", price: 25000 },
      { name: "Bintang", price: 35000 },
    ],
  },
  {
    name: "Fresh Juice",
    page: 13,
    price: 55000,
    dishes: [
      { name: "Mango" },
      { name: "Orange" },
      { name: "Pineapple" },
      { name: "Watermelon" },
      { name: "Lime" },
      { name: "Mango, Orange & Lime", description: "Mixed juice" },
      { name: "Pineapple, Orange & Lime", description: "Mixed juice" },
      { name: "Carrot, Orange & Lime", description: "Mixed juice" },
    ],
  },
  {
    name: "Signature Drinks",
    page: 14,
    dishes: [
      { name: "Nana's Jungle Pani", price: 65000, description: "Refreshing lime, mint & ginger" },
      { name: "Island Breeze", price: 65000, description: "Fresh lime, ginger, mint & soda" },
      { name: "Virgin Pina Colada", price: 65000, description: "Fresh pineapple mixed with coconut cream" },
      { name: "Squeeze Me", price: 65000, description: "Lime squash" },
      { name: "Sunrise", price: 65000, description: "Orange squash" },
      { name: "Ginger Beer", price: 65000, description: "Fresh ginger, lime & soda" },
      { name: "Mango Lassi", price: 75000 },
      { name: "Plain Lassi", price: 75000 },
      { name: "Sweet Lassi", price: 75000 },
      { name: "Salty Lassi", price: 75000 },
      { name: "Mango Smoothie", price: 75000 },
    ],
  },
  {
    name: "Desserts",
    page: 16,
    dishes: [
      { name: "Gulab Jamun", price: 35000, description: "Small fried donuts in a sweet, sticky syrup. 2pcs" },
      { name: "Biscoff Cheesecake", price: 80000 },
    ],
  },
];
