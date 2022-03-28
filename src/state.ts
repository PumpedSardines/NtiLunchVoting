import { atom, atomFamily, selector } from "recoil";

export const _people = atom<string[]>({
  key: "_people",
  default: [],
});

export const _person = atomFamily<{ name: string; options: string[] }, string>({
  key: "_person",
  default: (id) => ({ name: "", options: [] }),
});


export const _selectedOption = atom({
    key: "_selectedOption",
    default: null as string | null
});

export const _selectedPerson = atom({
  key: "_selectedPerson",
  default: null as string | null
});

export const _view = atom({
    key: "_view",
    default: "people" as "people" | "random"
});

export const _allOptions = selector({
  key: "_allOptions",
  get: ({ get }) => {
      const people = get(_people);
      const options: string[] = [];

      people.forEach(personId => {

          options.push(...get(_person(personId)).options);

      });

      return options;
  }
});