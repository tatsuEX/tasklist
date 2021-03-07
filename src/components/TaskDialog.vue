<template>
  <Dialog
    :visible="registTaskDialog.visible"
    :modal="true"
    :closable="false"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
  >
    <template #header>
      タスク登録
    </template>
    <div class="p-grid">
      <!-- ##### ID ##### -->
      <div class="p-col-2">ID</div>
      <div class="p-col-10">{{ currentTask.id + 1 }}</div>
      <!-- ##### タスク名 ##### -->
      <div class="p-col-2">
        <label for="regist_task_name">タスク名</label>
      </div>
      <div class="p-col-4">
        <InputText
          id="regist_task_name"
          type="text"
          v-model="currentTask.name"
        />
      </div>
      <!-- #####  ##### -->
      <div class="p-col-3">
        <label for="register_task_category">
          タスク分類
          <Button
            icon="pi pi-plus"
            class="p-button-rounded"
            @click="$emit('openMasterDlg', 'category')"
          />
        </label>
      </div>
      <div class="p-col-3">
        <Dropdown
          id="register_task_category"
          v-model="currentTask.category"
          :options="$store.state.taskcategories"
        >
        </Dropdown>
      </div>
      <!-- #####  ##### -->
      <div class="p-col-2">
        <label for=""></label>
      </div>
      <div class="p-col-4">
      </div>
      <!-- #####  ##### -->
      <div class="p-col-2">
        <label for=""></label>
      </div>
      <div class="p-col-4">
      </div>
      <!-- #####  ##### -->
      <div class="p-col-2">
        <label for=""></label>
      </div>
      <div class="p-col-4">
      </div>
    </div>
    <template #footer>
      <Button label="登録" @click="registTaskDialog.regist"></Button>
      <Button label="閉じる" class="p-button-close" @click="registTaskDialog.close"></Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { Task } from "@/store";

export default defineComponent({
  name: "TaskDialog",
  props: ["toast"],
  setup(props, { emit }) {
    const store = useStore();
    const currentTask: Task = reactive({
      id: store.getters.seq("task"),
      name: "",
      category: ""
    });
    const registTaskDialog = reactive({
      visible: false,
      regist: () => {
        emit("msg-success", "タスクを登録しました");
        registTaskDialog.close();
      },
      open: () => registTaskDialog.visible = true,
      close: () => registTaskDialog.visible = false
    });
    return {
      registTaskDialog
    };
  }
});
</script>