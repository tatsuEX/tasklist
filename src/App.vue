<template>
  <Toast/>
  <router-view
    :toast="toast"
    @msg-success="showToastSuccess"
    @msg-error="showToastError"
    @msg-warn="showToastWarn"
    @msg-info="showToastInfo"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const toast = useToast();
    const showToast = (detail:string, summary?:string, severity="success") => {
      toast.add({detail, summary, severity, life: 5000});
    };
    const showToastSuccess = (detail:string, summary?:string) => {
      showToast(detail, summary, "success");
    };
    const showToastError = (detail:string, summary?:string) => {
      showToast(detail, summary, "error");
    };
    const showToastWarn = (detail:string, summary?:string) => {
      showToast(detail, summary, "warn");
    };
    const showToastInfo = (detail:string, summary?:string) => {
      showToast(detail, summary, "info");
    };
    return {
      toast,
      showToastSuccess,
      showToastError,
      showToastWarn,
      showToastInfo
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  font-size: 11px;
  height: 96vh;
  width: 98vw;
  margin: auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.p-grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &:not(.p-flex-row-reverse) {
    flex-direction: row;
  }
  &.p-flex-row-reverse {
    flex-direction: row-reverse;
  }
  @for $grid from 1 through 12 {
    .p-col-#{$grid} { width: calc(100% / 12 * #{$grid}); }
  }
}
</style>

