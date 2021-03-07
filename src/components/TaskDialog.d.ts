import Vue, { VNode } from "vue";
import Toast from "primevue/toast";

declare class TaskDialog extends Vue {
  toast: Toast;
  $emit(eventName: "msg-success", e: { originalEvent: Event }): this;
}

export default TaskDialog;