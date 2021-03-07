<template>
  <div id="tasklist">
    <!-- ###################################################################################################################### -->
    <!--   タスク一覧                                                                                                            -->
    <!-- ###################################################################################################################### -->
    <DataTable
      :value="$store.state.tasklist"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      currentPageReportTemplate="{first} - {last} / {totalRecords}"
    >
      <template #header>
        <div class="table-header">
          <Button
            label="タスク"
            icon="pi pi-plus"
            @click="registTaskDialog.open()"
          >
          </Button>
        </div>
      </template>
      <template #empty>
        該当のタスクがありません。
      </template>
      <Column field="id" header="#">{{ no }}</Column>
      <Column field="dateBegin" header="開始日">{{ dateBegin }}</Column>
      <Column field="dataEnd" header="終了日">{{ dateEnd }}</Column>
      <Column field="dateLimit" header="期限">{{ dateLimit }}</Column>
      <Column field="name" header="タスク">{{ name }}</Column>
      <Column field="status" header="ステータス">{{ sattus }}</Column>
      <Column field="description" header="概要">{{ description }}</Column>
      <template #footer>
        <div class="table-footer">
          <Paginator
            :rows="10"
            :totalRecords="totalTasks"
            currentPageReportTemplate="{currentPage} / {totalPages} ({totalRecords} 件))"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
          >
          </Paginator>
        </div>
      </template>
    </DataTable>

    <!-- ###################################################################################################################### -->
    <!--   タスク登録ダイアログ                                                                                                   -->
    <!-- ###################################################################################################################### -->
    <!-- <TaskDialog
      :toast="$props.toast"
    >
    </TaskDialog> -->
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
              @click="masterDialog.category.open()"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";
import { Task } from "@/store";
// import TaskDialog from "@/components/TaskDialog";

export default defineComponent({
  name: "Home",
  components: {
    // TaskDialog,
    DataTable,
    Column,
    Paginator
  },
  props: ["toast"],
  setup(props, context) {
    const store = useStore();
    context.emit("msg-success", "成功");
    console.log(context);
    // emit("msg-error", "失敗");
    // emit("msg-warn", "警告です", "警告");
    // emit("msg-info", "詳細", "概要");
    const count = computed(() => store.state.seq.system);
    const taskId = computed(() => store.state.seq.task);
    const currentTask: Task = reactive({
      id: store.getters.seq("task"),
      name: "",
      category: ""
    });
    const taskList = reactive([
      {
        no: 1,
        name: "洗い物" + count.value,
        category: "",
        description: "1週間溜めてしまった洗い物を消化する"
      },
      {
        no: 2,
        name: "洗い物" + taskId.value,
        category: "",
        description: "1週間溜めてしまった洗い物を消化する"
      }
    ]);
    const registTaskDialog = reactive({
      visible: false,
      regist: () => {
        context.emit("msg-success", "タスクを登録しました");
        registTaskDialog.close();
      },
      open: () => registTaskDialog.visible = true,
      close: () => registTaskDialog.visible = false
    });
    const masterDialog = reactive({
      category: {
        visible: false,
        open: () => {
          masterDialog.category.visible = true;
        },
        close: () => masterDialog.category.visible = false
      }
    });
    const totalTasks = computed(() => store.state.tasklist.filter((task: Task) => task).length)
    return {
      currentTask,
      registTaskDialog,
      masterDialog,
      taskList,
      totalTasks
    };
  }
});
</script>

<style lang="scss">
:root {
  --padding: 0.25rem;
}
#tasklist {
  height: 100%;
  .p-button {
    padding: var(--padding, 0.25rem) 0.6rem;
  }
  .p-button-close {
    background-color: white;
    color: black;
    border-color: gray;
  }
  .p-datatable {
    height: 100%;
    .p-datatable-header {
      padding: var(--padding, 0.25rem);
    }
    .p-datatable-footer {
      padding: var(--padding, 0.25rem);
    }
    .p-datatable-wrapper {
      height: calc(100% - 10rem);
      table {
        th, td {
          padding: var(--padding, 0.25rem);
        }
      }
    }
  }
}
</style>
