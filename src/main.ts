import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
// ### PrimeVue components ######################
// # Form
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
// # Button
import Button from "primevue/button";
// # Data
// # Panel
// # Overlay
import Dialog from "primevue/dialog";
// # Messages
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
// # Misc
import ProgressBar from "primevue/progressbar";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  // ### PrimeVue components ##################
  // # Form
  .component("InputText", InputText)
  .component("InputNumber", InputNumber)
  .component("Textarea", Textarea)
  .component("Checkbox", Checkbox)
  .component("RadioButton", RadioButton)
  .component("Dropdown", Dropdown)
  // # Button
  .component("Button", Button)
  // # Overlay
  .component("Dialog", Dialog)
  // # Messages
  .component("Toast", Toast)
  // # Misc
  .component("ProgressBar", ProgressBar)
  // .component("", )
  .mount("#app");
