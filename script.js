// DOM元素
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const generatedImage = document.getElementById('generatedImage');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// 当前选择的文件
let currentFile = null;

// 初始化事件监听
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ee5a24';
    uploadArea.style.background = '#fff5f5';
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.background = '#f8f9fa';
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.background = '#f8f9fa';
    
    if (e.dataTransfer.files.length) {
        handleFileSelect(e.dataTransfer.files[0]);
    }
});

// 文件选择处理
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    // 检查文件类型
    if (!file.type.match('image.*')) {
        alert('请选择图片文件！');
        return;
    }
    
    // 检查文件大小（限制5MB）
    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB！');
        return;
    }
    
    currentFile = file;
    
    // 显示预览
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        generateBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

// 生成头像
generateBtn.addEventListener('click', async () => {
    if (!currentFile) return;
    
    // 获取选择的风格
    const styleChoice = document.querySelector('input[name="style"]:checked').value;
    
    // 显示加载动画
    loadingOverlay.style.display = 'flex';
    
    try {
        // 将图片转换为base64
        const base64Image = await fileToBase64(currentFile);
        
        // 调用后端API（使用相对路径，部署到Vercel时会自动指向/api/generate）
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar_image: base64Image.split(',')[1], // 去掉data:image/...前缀
                style_choice: styleChoice
            })
        });
        
        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.image_url) {
            // 显示生成的图片
            generatedImage.src = data.image_url;
            downloadBtn.disabled = false;
            
            // 设置下载链接
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = data.image_url;
                link.download = `马年头像_${Date.now()}.png`;
                link.click();
            };
        } else {
            throw new Error(data.error || '生成失败');
        }
    } catch (error) {
        console.error('生成失败:', error);
        alert('头像生成失败，请重试！错误信息：' + error.message);
    } finally {
        // 隐藏加载动画
        loadingOverlay.style.display = 'none';
    }
});

// 工具函数：文件转base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// 禁用右键菜单和图片拖拽（保护生成的头像）
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
