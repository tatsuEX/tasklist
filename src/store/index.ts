import { createStore } from "vuex";

export interface Master {
  code: string;
  name: string;
  order?: number;
}

export interface Task {
  id: number;
  name: string;
  category: string;
}

interface Sequence {
  [key: string]: number;
}

interface Store {
  seq: Sequence;
  taskcategories: Array<Master>;
  tasklist: Array<Task>;
}

export const store = createStore({
  // State
  state() {
    return {
      seq: {
        system: 0
      },
      taskcategories: [],
      tasklist: []
    };
  },
  // Getters
  getters: {
    seq(state: Store) {
      return (key = "system") => state.seq[key] ? state.seq[key] : state.seq[key] = 0 && state.seq[key];
    },
    countTasks(state: Store, filter = (task: Task) => task) {
      return state.tasklist.filter(filter).length;
    }
  },
  // Mutations
  mutations: {
    // seq
    increment(state: Store, name = "system") {
      if (isNaN(state.seq[name])) {
        state.seq[name] = 0;
      }
      state.seq[name]++;
    },
    // category
    addCategory(state: Store, category: string) {
      if (isNaN(state.seq.category)) {
        state.seq.category = 0;
      }
      if (state.taskcategories.filter(cat => cat.name == category).length == 0) {
        state.taskcategories.push({ code: this.increment(state, "category").toString(), name: category });
      }
    },
    // task
  },
  actions: {},
  modules: {}
});
