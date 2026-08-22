const pluginConfig = {
    name: 'NovelAI绘图任务队列生成器',
    features: {
        // 发布打包时设为 false；需要在页面内调试 NovelPageUtil 时改为 true。
        showNovelPageTestButton: false
    },
    userscript: {
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=novelai.net',
        namespace: 'https://www.xfan.top/index.php/2024/03/18/novelai-prompts-task-writer/',
        version: '0.0.4.20260822',
        match: ['https://novelai.net/image'],
        author: 'cpuopt',
        description: {
            '': 'Novel AI 绘图 提示词任务队列编辑器。自定义提示词排列、组合，并执行批量生成任务。'
        }
    }
};

export default pluginConfig;
