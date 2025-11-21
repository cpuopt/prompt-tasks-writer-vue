import { createApp } from 'vue';
import 'hacktimer';
import '@/style.css';
import App from '@/App.vue';
import { unsafeWindow } from '$';
import { createPinia } from 'pinia';

// import 'default-passive-events'

unsafeWindow.confirm = function () {
    return true;
};

const appp = createApp(App);
appp.config.devtools = true

const pinia = createPinia()
appp.use(pinia)

appp.directive('hide', (el, binding) => {
    const isHide = binding.value;
    el.style.visibility = isHide ? 'hidden' : 'visible';
});
appp.mount(
    (() => {
        const app = document.createElement('div');
        app.style.zIndex = '5000';
        document.body.append(app);

        return app;
    })()
);
