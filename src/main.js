import Vue from 'vue'
import {
    Button,
    DatePicker,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Input,
    InputNumber,
    Link,
    Message,
    Pagination,
    Table,
    TableColumn,
    TimeSelect,
  } from "element-ui";
import VeTable from './ve-table/index.vue'

Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Link);
Vue.use(Message);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(TimeSelect);

export default {
    install (Vue) {
        Vue.component(VeTable.name, VeTable)
    }
}