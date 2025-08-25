import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
}

interface MenuState {
  items: MenuItem[];
  selectedCategory: string;
  isLoading: boolean;
}

const initialState: MenuState = {
  items: [
    {
      id: '1',
      name: 'Truffle Arancini',
      description: 'Crispy risotto balls with black truffle, parmesan, and wild mushroom ragù',
      price: 18,
      category: 'starters',
      isVegetarian: true,
    },
    {
      id: '2',
      name: 'Wagyu Beef Tartare',
      description: 'Hand-cut wagyu beef with quail egg, caviar, and crispy shallots',
      price: 32,
      category: 'starters',
    },
    {
      id: '3',
      name: 'Pan-Seared Halibut',
      description: 'Atlantic halibut with cauliflower purée, brown butter, and microgreens',
      price: 45,
      category: 'mains',
      isGlutenFree: true,
    },
    {
      id: '4',
      name: 'Dry-Aged Ribeye',
      description: '28-day aged ribeye with roasted bone marrow and truffle jus',
      price: 65,
      category: 'mains',
      isGlutenFree: true,
    },
    {
      id: '5',
      name: 'Dark Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla bean ice cream and gold leaf',
      price: 16,
      category: 'desserts',
      isVegetarian: true,
    },
    {
      id: '6',
      name: 'Champagne Cocktail',
      description: 'Dom Pérignon with elderflower liqueur and fresh berries',
      price: 28,
      category: 'drinks',
    },
  ],
  selectedCategory: 'all',
  isLoading: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  addMenuItem,
  updateMenuItem,
  removeMenuItem,
  setLoading,
} = menuSlice.actions;

export default menuSlice.reducer;