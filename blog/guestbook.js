// ============ 留言板配置 ============
// 使用 Supabase 作为后端存储（免费，注册开放）
// 1. 访问 https://supabase.com/ 注册账号
// 2. 创建项目，获取 Project URL 和 anon key
// 3. 在 SQL Editor 中执行下方 SQL 创建表
// 4. 将以下配置信息填入

/*
-- 在 Supabase SQL Editor 中执行此 SQL：
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    nickname TEXT NOT NULL,
    content TEXT NOT NULL,
    email TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 允许任何人读取留言
CREATE POLICY "Anyone can read messages"
ON messages FOR SELECT
USING (true);

-- 允许任何人创建留言
CREATE POLICY "Anyone can create messages"
ON messages FOR INSERT
WITH CHECK (true);
*/

const SUPABASE_CONFIG = {
    url: 'https://uqzhinlpvfresjlihnwz.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxemhpbmxwdmZyZXNqbGlobnd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODA5NTQsImV4cCI6MjA5Njc1Njk1NH0.m86OXLH-dyg2fLjfbP0UIvMNeWI5a_kPHwy4PX45S0E'
};

// ============ DOM 元素 ============
const form = document.getElementById('messageForm');
const nicknameInput = document.getElementById('nickname');
const emailInput = document.getElementById('email');
const contentInput = document.getElementById('content');
const charCount = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');
const messagesList = document.getElementById('messagesList');
const messageCount = document.getElementById('messageCount');

// ============ MD5 实现（用于 Gravatar） ============

const md5 = (function() {
    function rotateLeft(n, b) {
        return (n << b) | (n >>> (32 - b));
    }

    function toUTF8Array(str) {
        const utf8 = [];
        for (let i = 0; i < str.length; i++) {
            let charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
            } else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            } else {
                i++;
                charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }

    const F = (x, y, z) => (x & y) | (~x & z);
    const G = (x, y, z) => (x & z) | (y & ~z);
    const H = (x, y, z) => x ^ y ^ z;
    const I = (x, y, z) => y ^ (x | ~z);

    function ff(a, b, c, d, x, s, ac) {
        a = (a + F(b, c, d) + x + ac) | 0;
        a = rotateLeft(a, s);
        return (a + b) | 0;
    }

    function gg(a, b, c, d, x, s, ac) {
        a = (a + G(b, c, d) + x + ac) | 0;
        a = rotateLeft(a, s);
        return (a + b) | 0;
    }

    function hh(a, b, c, d, x, s, ac) {
        a = (a + H(b, c, d) + x + ac) | 0;
        a = rotateLeft(a, s);
        return (a + b) | 0;
    }

    function ii(a, b, c, d, x, s, ac) {
        a = (a + I(b, c, d) + x + ac) | 0;
        a = rotateLeft(a, s);
        return (a + b) | 0;
    }

    function md5cycle(x, k) {
        let a = x[0], b = x[1], c = x[2], d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = (a + x[0]) | 0;
        x[1] = (b + x[1]) | 0;
        x[2] = (c + x[2]) | 0;
        x[3] = (d + x[3]) | 0;
    }

    return function(str) {
        const bytes = toUTF8Array(str);
        const bitLen = bytes.length * 8;

        bytes.push(0x80);
        while (bytes.length % 64 !== 56) bytes.push(0);

        bytes.push((bitLen >>> 0) & 0xff);
        bytes.push((bitLen >>> 8) & 0xff);
        bytes.push((bitLen >>> 16) & 0xff);
        bytes.push((bitLen >>> 24) & 0xff);

        let state = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
        for (let i = 0; i < bytes.length; i += 64) {
            const block = [];
            for (let j = 0; j < 16; j++) {
                block[j] = bytes[i + j * 4] | (bytes[i + j * 4 + 1] << 8) | (bytes[i + j * 4 + 2] << 16) | (bytes[i + j * 4 + 3] << 24);
            }
            md5cycle(state, block);
        }

        return state.map(n => ('00000000' + ((n >>> 0).toString(16))).slice(-8)).join('');
    };
})();

/**
 * 获取 Gravatar 头像 URL
 */
function getGravatarUrl(email) {
    if (!email) return null;
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=80&d=mp`;
}

// ============ 工具函数 ============

/**
 * 格式化时间
 */
function formatTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' 分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前';
    if (diff < 172800000) return '昨天';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${min}`;
}

/**
 * 转义 HTML 防止 XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============ Supabase REST API 操作 ============

/**
 * 获取所有留言（按时间倒序）
 */
async function fetchMessages() {
    const url = `${SUPABASE_CONFIG.url}/rest/v1/messages?select=*&order=created_at.desc&limit=50`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`获取留言失败 (${response.status})`);
    }

    return await response.json();
}

/**
 * 提交新留言
 */
async function submitMessage(nickname, content, email) {
    const body = {
        nickname: nickname.trim(),
        content: content.trim(),
        email: email.trim() || ''
    };

    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/messages`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `提交失败 (${response.status})`);
    }

    return true;
}

// ============ 渲染函数 ============

/**
 * 渲染留言列表
 */
function renderMessages(messages) {
    if (!messages || messages.length === 0) {
        messagesList.innerHTML = '<div class="no-messages">还没有留言，快来写下第一条吧 🎉</div>';
        messageCount.textContent = '0 条留言';
        return;
    }

    messageCount.textContent = `${messages.length} 条留言`;

    messagesList.innerHTML = messages.map(msg => {
        const avatarUrl = msg.email ? getGravatarUrl(msg.email) : null;
        const firstChar = msg.nickname ? msg.nickname.charAt(0).toUpperCase() : '?';

        const avatarHtml = avatarUrl
            ? `<img src="${avatarUrl}" alt="${escapeHtml(msg.nickname)}的头像" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="avatar-placeholder" style="display:none">${escapeHtml(firstChar)}</span>`
            : `<span class="avatar-placeholder">${escapeHtml(firstChar)}</span>`;

        return `
            <div class="message-card">
                <div class="message-header">
                    <div class="message-avatar">
                        ${avatarHtml}
                    </div>
                    <span class="message-author">${escapeHtml(msg.nickname)}</span>
                    <span class="message-time">${formatTime(msg.created_at)}</span>
                </div>
                <div class="message-content">${escapeHtml(msg.content)}</div>
            </div>
        `;
    }).join('');
}

// ============ 表单逻辑 ============

// 字数统计
contentInput.addEventListener('input', function() {
    const len = this.value.length;
    charCount.textContent = len;
    charCount.parentElement.classList.toggle('exceeded', len > 480);
});

// 表单提交
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nickname = nicknameInput.value.trim();
    const email = emailInput.value.trim();
    const content = contentInput.value.trim();

    if (!nickname) {
        showStatus('请输入昵称', 'error');
        return;
    }
    if (!content) {
        showStatus('请输入留言内容', 'error');
        return;
    }
    if (content.length > 500) {
        showStatus('留言内容不能超过 500 字', 'error');
        return;
    }

    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
        showStatus('请先在 guestbook.js 中配置 Supabase 的 Project URL 和 anon key', 'error');
        return;
    }

    setLoading(true);

    try {
        await submitMessage(nickname, content, email);
        showStatus('留言发布成功 🎉', 'success');

        form.reset();
        charCount.textContent = '0';
        await loadMessages();
    } catch (err) {
        console.error('提交留言失败:', err);
        showStatus('留言提交失败：' + err.message, 'error');
    } finally {
        setLoading(false);
    }
});

/**
 * 设置提交按钮加载状态
 */
function setLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline';
    } else {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
    }
}

/**
 * 显示状态信息
 */
function showStatus(text, type) {
    const old = document.querySelector('.status-message');
    if (old) old.remove();

    const div = document.createElement('div');
    div.className = `status-message ${type}`;
    div.textContent = text;

    const form = document.getElementById('messageForm');
    form.parentNode.insertBefore(div, form);

    if (type === 'success') {
        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transition = 'opacity 0.5s';
            setTimeout(() => div.remove(), 500);
        }, 3000);
    }
}

// ============ 加载留言列表 ============

async function loadMessages() {
    try {
        messagesList.innerHTML = '<div class="loading">加载留言中</div>';

        if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
            messagesList.innerHTML = `
                <div class="no-messages">
                    <p>📋 留言板后端未配置</p>
                    <p style="font-size:0.9rem;margin-top:0.5rem;color:#718096;text-align:left;max-width:500px;margin-left:auto;margin-right:auto">
                        请按照以下步骤配置：<br><br>
                        1. 访问 <a href="https://supabase.com/" target="_blank" style="color:#667eea">Supabase 官网</a> 注册账号<br>
                        2. 创建项目，获取 Project URL 和 anon key<br>
                        3. 在 SQL Editor 中执行建表 SQL（见 guestbook.js 顶部注释）<br>
                        4. 在 guestbook.js 中填入 url 和 anonKey
                    </p>
                </div>
            `;
            messageCount.textContent = '0 条留言';
            return;
        }

        const messages = await fetchMessages();
        renderMessages(messages);
    } catch (err) {
        console.error('加载留言失败:', err);
        messagesList.innerHTML = `<div class="error-message">加载留言失败：${escapeHtml(err.message)}</div>`;
    }
}

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', loadMessages);