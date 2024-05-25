const pluginConfig = {
    name: 'NovelAI绘图任务队列生成器',
    userscript: {
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=novelai.net',
        namespace: 'https://www.cpufan.top/index.php/2024/03/18/novelai-prompts-task-writer/',
        version: '0.0.2.240525',
        match: ['https://novelai.net/image'],
        author: 'cpuopt',
        description: {
            '': 'Novel AI 绘图 提示词任务队列编辑器'
        }
    }
};

export default pluginConfig;
