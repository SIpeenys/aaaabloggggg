// ============ 博客主逻辑 ============

const postsContainer = document.getElementById('blog-posts');
let currentPostId = null;

/**
 * 渲染文章卡片列表
 */
function renderPosts() {
    if (!postsContainer) return;

    postsContainer.innerHTML = blogData.posts.map(post => `
        <article class="post-card" onclick="showArticle(${post.id})">
            <img src="${post.image}" alt="${post.title}" class="post-card-image" loading="lazy">
            <div class="post-card-content">
                <span class="post-card-category">${post.category}</span>
                <h2 class="post-card-title">${post.title}</h2>
                <p class="post-card-excerpt">${post.excerpt}</p>
                <div class="post-card-meta">
                    <span class="avatar">${post.author.charAt(0)}</span>
                    <span>${post.author}</span>
                    <span>${post.date}</span>
                    <span>${post.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
}

/**
 * 显示单篇文章详情
 */
function showArticle(id) {
    currentPostId = id;
    const post = blogData.posts.find(p => p.id === id);
    if (!post) return;

    // 更新页面标题
    document.title = `${post.title} - My Blog`;

    // 渲染文章详情
    postsContainer.innerHTML = `
        <button class="back-home" onclick="renderPosts(); document.title='我的博客 - My Blog'">← 返回首页</button>
        <article class="article-page">
            <header class="article-header">
                <h1>${post.title}</h1>
                <div class="article-meta">
                    <span class="avatar">${post.author.charAt(0)}</span>
                    <span>${post.author}</span>
                    <span>${post.date}</span>
                    <span>${post.readTime}</span>
                    <span class="post-card-category">${post.category}</span>
                </div>
            </header>
            <img src="${post.image}" alt="${post.title}" class="article-image" loading="lazy">
            <div class="article-content">${post.content}</div>
        </article>
    `;

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', renderPosts);