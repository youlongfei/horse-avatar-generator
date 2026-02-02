export default async function handler(req, res) {
    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '方法不允许' });
    }
    
    try {
        const { avatar_image, style_choice } = req.body;
        
        if (!avatar_image || !style_choice) {
            return res.status(400).json({ error: '缺少必要参数' });
        }
        
        // 这里需要替换为你的扣子API Token
        // 建议将token设置为Vercel环境变量
        const COZE_API_TOKEN = process.env.COZE_API_TOKEN;
        
        if (!COZE_API_TOKEN) {
            console.error('COZE_API_TOKEN未设置');
            return res.status(500).json({ error: '服务器配置错误' });
        }
        
        // 调用扣子API
        const response = await fetch('https://p6468vdx9g.coze.site/run', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COZE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar_image: avatar_image,
                style_choice: style_choice
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('扣子API错误:', response.status, errorText);
            throw new Error(`扣子API请求失败: ${response.status}`);
        }
        
        // 假设扣子API返回base64图片数据
        const data = await response.json();
        
        // 根据扣子API的实际返回格式调整
        // 这里假设返回的是base64图片数据
        let imageUrl = '';
        if (data.image_data) {
            imageUrl = `data:image/png;base64,${data.image_data}`;
        } else if (data.image_url) {
            imageUrl = data.image_url;
        } else {
            throw new Error('API返回格式错误');
        }
        
        res.status(200).json({
            success: true,
            image_url: imageUrl,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('处理请求时出错:', error);
        res.status(500).json({
            success: false,
            error: error.message || '内部服务器错误'
        });
    }
}
