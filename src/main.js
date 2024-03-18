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
    app.style.top = '4vh'
    app.style.zIndex = '999'
    app.style.backgroundColor = 'white'
    app.style.borderRadius = 'var(--el-border-radius-round)'
    app.style.marginLeft = '50%'
    app.style.left = '-350px'
    app.style.width = '700px'
    app.style.height = '92vh'
    document.body.append(app);

    return app;
  })(),
);
