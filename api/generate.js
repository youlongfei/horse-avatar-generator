export default async function handler(req, res) {
    // 只允许POST请求
    if (req.method !== 'POST') {
        console.log('错误的请求方法:', req.method);
        return res.status(405).json({ error: '方法不允许' });
    }
    
    try {
        const { avatar_image, style_choice } = req.body;
        
        console.log('收到请求，style_choice:', style_choice);
        console.log('avatar_image 长度:', avatar_image ? avatar_image.length : '空');
        
        if (!avatar_image || !style_choice) {
            console.log('缺少参数:', { avatar_image: !!avatar_image, style_choice: !!style_choice });
            return res.status(400).json({ error: '缺少必要参数' });
        }
        
        const COZE_API_TOKEN = process.env.COZE_API_TOKEN;
        
        console.log('COZE_API_TOKEN 存在:', !!COZE_API_TOKEN);
        
        if (!COZE_API_TOKEN) {
            console.error('COZE_API_TOKEN未设置');
            return res.status(500).json({ error: '服务器配置错误' });
        }
        
        // 方法1：尝试将base64字符串作为文件发送
        console.log('尝试方法1：发送base64字符串作为文件参数...');
        
        // 创建FormData
        const formData = new FormData();
        
        // 将base64字符串转换为Blob
        const byteCharacters = atob(avatar_image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        
        // 添加文件到FormData
        formData.append('avatar_image', blob, 'avatar.png');
        formData.append('style_choice', style_choice);
        
        // 调用扣子API
        console.log('正在调用扣子API...');
        const response = await fetch('https://p6468vdx9g.coze.site/run', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COZE_API_TOKEN}`,
                // 注意：不设置Content-Type，让浏览器自动设置multipart/form-data
            },
            body: formData
        });
        
        console.log('扣子API响应状态:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('扣子API错误详情:', {
                status: response.status,
                statusText: response.statusText,
                errorText: errorText
            });
            
            // 方法2：如果方法1失败，尝试其他格式
            console.log('尝试方法2：发送JSON格式...');
            
            // 扣子API可能需要特定的JSON格式
            const jsonResponse = await fetch('https://p6468vdx9g.coze.site/run', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${COZE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    avatar_image: {
                        data: avatar_image,
                        filename: 'avatar.png',
                        content_type: 'image/png'
                    },
                    style_choice: style_choice
                })
            });
            
            console.log('方法2响应状态:', jsonResponse.status);
            
            if (!jsonResponse.ok) {
                const jsonErrorText = await jsonResponse.text();
                console.error('方法2错误:', jsonErrorText);
                throw new Error(`扣子API请求失败: ${response.status} - 尝试两种格式都失败`);
            }
            
            const data = await jsonResponse.json();
            return handleApiResponse(data, res);
        }
        
        const data = await response.json();
        return handleApiResponse(data, res);
        
    } catch (error) {
        console.error('处理请求时出错:', error.message, error.stack);
        res.status(500).json({
            success: false,
            error: '头像生成失败，请稍后重试',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// 处理API响应
function handleApiResponse(data, res) {
    console.log('扣子API返回数据:', Object.keys(data));
    
    // 根据扣子API的实际返回格式调整
    let imageUrl = '';
    if (data.image_data) {
        imageUrl = `data:image/png;base64,${data.image_data}`;
        console.log('使用image_data，长度:', data.image_data.length);
    } else if (data.image_url) {
        imageUrl = data.image_url;
        console.log('使用image_url:', data.image_url);
    } else if (data.result && data.result.image_url) {
        // 可能嵌套在result字段中
        imageUrl = data.result.image_url;
        console.log('使用result.image_url:', data.result.image_url);
    } else {
        console.error('API返回格式错误，数据:', JSON.stringify(data).substring(0, 500));
        throw new Error('API返回格式错误');
    }
    
    res.status(200).json({
        success: true,
        image_url: imageUrl,
        timestamp: new Date().toISOString()
    });
}
