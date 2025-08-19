import { create } from 'zustand';

type IState = {
  favorite: Set<string>;
};

type IActions = {
  add: (value: string) => void;
  remove: (value: string) => void;
  clearFavorite: () => void;
};

export const useStore = create<IState & IActions>((set) => ({
  favorite: new Set(),

  add: (value) =>
    set((state) => {
      const updated = new Set(state.favorite);
      updated.add(value);
      return { favorite: updated };
    }),

  remove: (value) =>
    set((state) => {
      const updated = new Set(state.favorite);
      updated.delete(value);
      return { favorite: updated };
    }),

  clearFavorite: () => set({ favorite: new Set() }),
}));
