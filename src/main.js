import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const appp = createApp(App);
appp.directive("hide", (el, binding) => {
    const isHide = binding.value;
    el.style.visibility = isHide ? "hidden" : "visible";
});
appp.mount(
    (() => {
        const app = document.createElement("div");

        document.body.append(app);

        return app;
    })()
);
