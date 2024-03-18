import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

const appp = createApp(App)
appp.directive('hide', (el, binding) => {
  const isHide = binding.value;
  el.style.visibility = isHide ? 'hidden' : 'visible';
})
appp.mount(
  (() => {
    const app = document.createElement('div');
    app.style.position = 'fixed'
    app.style.top = '10%'
    app.style.zIndex = '999'
    app.style.backgroundColor = 'white'
    app.style.borderRadius = 'var(--el-border-radius-round)'
    app.style.left = '30%'
    app.style.width = '1000px'
    document.body.append(app);

    return app;
  })(),
);
