// This code doesn't work
// declare module "*.vue" {
//   import Vue from "vue";
//   export default Vue;
// }

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}