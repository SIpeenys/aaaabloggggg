const blogData = {
    posts: [
        {
            id: 1,
            title: 'JavaScript 异步编程：从回调到 async/await',
            category: '前端开发',
            author: '博主',
            date: '2026-06-10',
            readTime: '5 分钟',
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
            excerpt: '深入理解 JavaScript 异步编程的演变历程，从回调函数到 Promise，再到 async/await 的语法糖，掌握现代异步编程的最佳实践。',
            content: `
                <h2>引言</h2>
                <p>JavaScript 的异步编程模型是每个前端开发者都必须掌握的技能。从早期的回调函数，到 Promise 的引入，再到如今广泛使用的 async/await，异步编程的方式在不断演进。</p>

                <h2>回调函数时代</h2>
                <p>在 ES6 之前，我们主要依靠回调函数来处理异步操作。这种模式虽然直观，但容易导致"回调地狱"（Callback Hell）。</p>

                <pre><code>getUserData(userId, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            console.log(comments);
        });
    });
});</code></pre>

                <blockquote>
                    回调地狱不仅影响代码的可读性，还让错误处理变得异常困难。
                </blockquote>

                <h2>Promise 的诞生</h2>
                <p>Promise 对象代表一个异步操作的最终完成（或失败）及其结果值。它提供了更优雅的链式调用方式。</p>

                <pre><code>getUserData(userId)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => console.log(comments))
    .catch(error => console.error(error));</code></pre>

                <h2>async/await：异步编程的终极方案</h2>
                <p>async/await 是基于 Promise 的语法糖，让异步代码看起来像同步代码一样直观。</p>

                <pre><code>async function displayComments(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        console.log(comments);
    } catch (error) {
        console.error(error);
    }
}</code></pre>

                <h2>总结</h2>
                <p>从回调到 async/await，JavaScript 的异步编程经历了巨大的变革。async/await 不仅减少了代码的嵌套层级，还让错误处理变得更加直观。掌握这些概念，将帮助你在现代前端开发中游刃有余。</p>

                <p>在实际项目中，建议优先使用 async/await 来处理异步逻辑，因为它提供了最佳的代码可读性和可维护性。</p>
            `
        },
        {
            id: 2,
            title: 'CSS Grid 布局完全指南',
            category: 'CSS',
            author: '博主',
            date: '2026-06-08',
            readTime: '8 分钟',
            image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=400&fit=crop',
            excerpt: 'CSS Grid Layout 是目前最强大的 CSS 布局系统。本文将带你从入门到精通，掌握 Grid 布局的核心概念和实用技巧。',
            content: `
                <h2>什么是 CSS Grid？</h2>
                <p>CSS Grid Layout（网格布局）是 CSS 中最强大的布局系统之一。它是一个二维布局系统，可以同时控制行和列的布局。</p>

                <h2>基本概念</h2>
                <p>在 Grid 布局中，有以下几个核心概念：</p>
                <ul>
                    <li><strong>网格容器（Grid Container）</strong>：应用 display: grid 的元素</li>
                    <li><strong>网格项（Grid Item）</strong>：网格容器的直接子元素</li>
                    <li><strong>网格线（Grid Line）</strong>：构成网格结构的分界线</li>
                    <li><strong>网格轨道（Grid Track）</strong>：两条相邻网格线之间的空间</li>
                    <li><strong>网格单元（Grid Cell）</strong>：四个网格线围成的空间</li>
                </ul>

                <h2>创建一个简单的网格</h2>
                <pre><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 20px;
}</code></pre>

                <p>上面的代码创建了一个三列等宽的网格布局，列与列之间有 20px 的间距。</p>

                <h2>网格区域的命名</h2>
                <p>使用 grid-template-areas 可以更直观地定义布局：</p>

                <pre><code>.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }</code></pre>

                <h2>响应式设计</h2>
                <p>Grid 结合媒体查询，可以轻松实现响应式布局：</p>

                <pre><code>.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}</code></pre>

                <blockquote>
                    使用 auto-fit 和 minmax() 函数的组合，可以创建自动适应屏幕尺寸的网格布局。
                </blockquote>

                <h2>总结</h2>
                <p>CSS Grid 是现代 Web 布局的利器。它让复杂的页面布局变得简单直观，配合 Flexbox 使用，几乎可以应对任何布局场景。</p>
            `
        },
        {
            id: 3,
            title: 'React Hooks 实战：自定义 Hook 设计模式',
            category: 'React',
            author: '博主',
            date: '2026-06-05',
            readTime: '6 分钟',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
            excerpt: '探索 React Hooks 的进阶用法，学习如何设计可复用的自定义 Hook，提升代码的复用性和可维护性。',
            content: `
                <h2>为什么需要自定义 Hook？</h2>
                <p>React Hooks 让我们能够在函数组件中使用状态和生命周期特性。而自定义 Hook 则进一步让我们能够将组件逻辑提取到可复用的函数中。</p>

                <h2>自定义 Hook 的基本规则</h2>
                <ul>
                    <li>Hook 的名称必须以 use 开头</li>
                    <li>在自定义 Hook 中，可以调用其他 Hook</li>
                    <li>每次调用 Hook，它都会获取独立的 state</li>
                </ul>

                <h2>示例：useLocalStorage</h2>
                <p>一个用于同步状态到 localStorage 的自定义 Hook：</p>

                <pre><code>function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}</code></pre>

                <h2>示例：useDebounce</h2>
                <p>防抖 Hook，常用于搜索框输入优化：</p>

                <pre><code>function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}</code></pre>

                <blockquote>
                    自定义 Hook 是 React 中实现逻辑复用的最佳方式，它让代码更加清晰、可测试。
                </blockquote>

                <h2>组合 Hook 的技巧</h2>
                <p>可以将多个 Hook 组合成更强大的功能：</p>

                <pre><code>function useUserPreferences() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [language, setLanguage] = useLocalStorage('language', 'zh');
    const debouncedTheme = useDebounce(theme, 300);

    return { theme, setTheme, language, setLanguage, debouncedTheme };
}</code></pre>

                <h2>总结</h2>
                <p>自定义 Hook 是 React 生态中最强大的设计模式之一。通过将组件逻辑抽象为可复用的 Hook，我们可以构建更加模块化、可维护的应用程序。</p>
            `
        },
        {
            id: 4,
            title: 'Python 数据可视化：Matplotlib 入门',
            category: 'Python',
            author: '博主',
            date: '2026-06-03',
            readTime: '7 分钟',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
            excerpt: '学习使用 Matplotlib 库创建各种数据可视化图表，从折线图到热力图，让你的数据讲故事。',
            content: `
                <h2>Matplotlib 简介</h2>
                <p>Matplotlib 是 Python 中最流行的数据可视化库之一。它提供了丰富的图表类型和高度可定制的界面。</p>

                <h2>安装和导入</h2>
                <pre><code># 安装
pip install matplotlib

# 导入
import matplotlib.pyplot as plt
import numpy as np</code></pre>

                <h2>绘制折线图</h2>
                <pre><code># 数据
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 创建图表
plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='#667eea', linewidth=2)
plt.title('正弦波')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()</code></pre>

                <h2>绘制柱状图</h2>
                <pre><code>categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 33]
colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']

plt.figure(figsize=(10, 6))
bars = plt.bar(categories, values, color=colors, alpha=0.8)
plt.title('分类数据统计')
plt.xlabel('类别')
plt.ylabel('数值')

# 在柱子上显示数值
for bar, value in zip(bars, values):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
             str(value), ha='center', va='bottom')

plt.show()</code></pre>

                <blockquote>
                    一个好的数据可视化应该能够清晰地传达信息，同时保持视觉上的美观。
                </blockquote>

                <h2>子图布局</h2>
                <p>使用 subplots 可以创建多个图表：</p>

                <pre><code>fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 第一个子图
axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('sin(x)')

# 第二个子图
axes[0, 1].plot(x, np.cos(x), color='red')
axes[0, 1].set_title('cos(x)')

# 第三个子图
axes[1, 0].plot(x, np.tan(x), color='green')
axes[1, 0].set_ylim(-5, 5)
axes[1, 0].set_title('tan(x)')

# 第四个子图
axes[1, 1].scatter(x[:20], np.random.randn(20))
axes[1, 1].set_title('散点图')

plt.tight_layout()
plt.show()</code></pre>

                <h2>总结</h2>
                <p>Matplotlib 是一个功能强大的数据可视化工具。掌握它的基本用法，可以帮助你更好地理解和展示数据。</p>
            `
        },
        {
            id: 5,
            title: 'Git 工作流：团队协作的最佳实践',
            category: '开发工具',
            author: '博主',
            date: '2026-06-01',
            readTime: '6 分钟',
            image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
            excerpt: '了解不同的 Git 工作流模式，学习如何在团队中高效协作，避免常见的版本控制陷阱。',
            content: `
                <h2>为什么需要 Git 工作流？</h2>
                <p>在团队协作中，一个良好的 Git 工作流能够帮助团队成员高效地并行开发，同时保持代码库的稳定和整洁。</p>

                <h2>常见的 Git 工作流</h2>

                <h3>1. Centralized Workflow（集中式工作流）</h3>
                <p>适合小团队，所有开发者都在 master 分支上工作：</p>
                <pre><code># 开发者 A
git clone repo
git add .
git commit -m "feature A"
git push

# 开发者 B（需要先拉取最新代码）
git pull --rebase
git push</code></pre>

                <h3>2. Feature Branch Workflow（功能分支工作流）</h3>
                <p>每个功能在独立的分支上开发，完成后合并到 master：</p>
                <pre><code># 创建功能分支
git checkout -b feature/user-auth

# 开发完成后合并
git checkout master
git pull --rebase
git merge --no-ff feature/user-auth
git push origin master</code></pre>

                <blockquote>
                    --no-ff 参数可以保留分支历史，让代码审阅更加清晰。
                </blockquote>

                <h3>3. GitFlow 工作流</h3>
                <p>包含多个长期分支和短期分支的复杂工作流：</p>
                <ul>
                    <li><strong>master</strong>：生产环境代码</li>
                    <li><strong>develop</strong>：开发主分支</li>
                    <li><strong>feature/*</strong>：功能开发分支</li>
                    <li><strong>release/*</strong>：发布准备分支</li>
                    <li><strong>hotfix/*</strong>：紧急修复分支</li>
                </ul>

                <h2>提交信息规范</h2>
                <p>使用 Conventional Commits 规范：</p>
                <pre><code>feat: 添加用户登录功能

fix: 修复首页加载闪白问题

docs: 更新 API 文档

refactor: 重构数据查询逻辑

test: 添加用户注册测试用例</code></pre>

                <h2>Code Review 最佳实践</h2>
                <p>在进行代码审查时，应该关注：</p>
                <ul>
                    <li>代码逻辑是否正确</li>
                    <li>是否遵循了项目的代码规范</li>
                    <li>是否有足够的测试覆盖</li>
                    <li>是否存在安全漏洞</li>
                </ul>

                <h2>总结</h2>
                <p>选择合适的工作流取决于团队规模、项目复杂度和发布频率。关键是团队成员要对工作流达成共识，并严格遵守。</p>
            `
        },
        {
            id: 6,
            title: 'Docker 容器化部署入门',
            category: 'DevOps',
            author: '博主',
            date: '2026-05-28',
            readTime: '7 分钟',
            image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
            excerpt: '从零开始学习 Docker，掌握容器化部署的核心概念，包含 Dockerfile 编写和 docker-compose 多容器编排。',
            content: `
                <h2>什么是 Docker？</h2>
                <p>Docker 是一个开源的容器化平台，它让应用程序的部署变得简单、一致和可移植。</p>

                <h2>核心概念</h2>
                <ul>
                    <li><strong>镜像（Image）</strong>：一个只读的模板，包含了运行应用所需的代码、运行时、库和配置</li>
                    <li><strong>容器（Container）</strong>：镜像的运行实例，可以被启动、停止、删除</li>
                    <li><strong>Dockerfile</strong>：用于构建镜像的脚本文件</li>
                    <li><strong>docker-compose</strong>：用于定义和运行多容器 Docker 应用的工具</li>
                </ul>

                <h2>编写 Dockerfile</h2>
                <p>以 Node.js 应用为例：</p>
                <pre><code># 使用官方 Node.js 镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]</code></pre>

                <h2>多阶段构建</h2>
                <p>使用多阶段构建优化镜像大小：</p>
                <pre><code># 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

                <blockquote>
                    多阶段构建可以显著减小最终镜像的体积，将构建工具和运行时环境分离。
                </blockquote>

                <h2>使用 docker-compose</h2>
                <p>编排多个服务：</p>
                <pre><code>version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DB_HOST=db

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

volumes:
  postgres_data:</code></pre>

                <h2>常用命令</h2>
                <pre><code># 构建镜像
docker build -t my-app .

# 运行容器
docker run -d -p 3000:3000 --name my-app my-app

# 查看运行中的容器
docker ps

# 查看日志
docker logs -f my-app

# 启动全部服务
docker-compose up -d</code></pre>

                <h2>总结</h2>
                <p>Docker 大幅简化了应用的部署流程。通过容器化，我们可以确保开发、测试和生产环境的一致性，避免"在我机器上能运行"的问题。</p>
            `
        },
        {
            id: 7,
            title: '古朝旧事',
            category: '随笔',
            author: '博主',
            date: '2026-05-01',
            readTime: '2 分钟',
            image: 'https://images.unsplash.com/photo-1583425424119-e9f45e12374e?w=800&h=400&fit=crop',
            excerpt: '五一去了一趟王府井，上次去的时候还是三年级。从一号线地铁出来之后走几步转个弯就进了步行街……',
            content: `
                <h2>古朝旧事</h2>

                <p>五一去了一趟王府井，上次去的时候还是三年级。</p>

                <p>从一号线地铁出来之后走几步转个弯就进了步行街。当整个街道的格局从四面八方闯入我的视野时，形形色色的建筑和人流像像一根陈旧的绳索，绳索的那头引出小时候对王府井的记忆。也许是长大了的缘故，印象中人山人海高楼林立像沸腾的水一样喧嚣的街道，现在好像并没有那么让人摸不到头脑了。</p>

                <p>王府井还是很宽很大，楼很高。可顺着道路向远处延申，我能看到清晰的人流和边界，沿着大楼朝上看，我能看见屏幕上的摩尔纹和不蓝不白的天空。</p>

                <p>我随便转了转，看到了富丽堂皇的茅台酒和琳琅满目的奢侈品。人来人往的波流中散布着高跟鞋和皮鞋的踩踏的声响，混杂着棒棒糖和豆汁的味道。</p>
            `
        }
    ]
};