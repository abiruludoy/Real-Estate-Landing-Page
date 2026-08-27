import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type RealtyState = {
  neighborhood: string;
  homeType: string;
  budget: string;
  sortBy: string;
  inquiryType: string;
  selectedListingId: string | null;
  wishlistIds: string[];
  isWishlistOpen: boolean;
};

const initialState: RealtyState = {
  neighborhood: "Any neighborhood",
  homeType: "Any home",
  budget: "Any price",
  sortBy: "Featured",
  inquiryType: "Buying",
  selectedListingId: null,
  wishlistIds: [],
  isWishlistOpen: false,
};

const realtySlice = createSlice({
  name: "realty",
  initialState,
  reducers: {
    setNeighborhood: (state, action: PayloadAction<string>) => {
      state.neighborhood = action.payload;
    },
    setHomeType: (state, action: PayloadAction<string>) => {
      state.homeType = action.payload;
    },
    setBudget: (state, action: PayloadAction<string>) => {
      state.budget = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setInquiryType: (state, action: PayloadAction<string>) => {
      state.inquiryType = action.payload;
    },
    openListing: (state, action: PayloadAction<string>) => {
      state.selectedListingId = action.payload;
    },
    closeListing: (state) => {
      state.selectedListingId = null;
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const listingId = action.payload;
      state.wishlistIds = state.wishlistIds.includes(listingId)
        ? state.wishlistIds.filter((id) => id !== listingId)
        : [...state.wishlistIds, listingId];
    },
    hydrateWishlist: (state, action: PayloadAction<string[]>) => {
      state.wishlistIds = action.payload;
    },
    openWishlist: (state) => {
      state.isWishlistOpen = true;
    },
    closeWishlist: (state) => {
      state.isWishlistOpen = false;
    },
  },
});

export const {
  setNeighborhood,
  setHomeType,
  setBudget,
  setSortBy,
  setInquiryType,
  openListing,
  closeListing,
  toggleWishlist,
  hydrateWishlist,
  openWishlist,
  closeWishlist,
} = realtySlice.actions;

export default realtySlice.reducer;
