{\rtf1\ansi\ansicpg936\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
    // \uc0\u21482 \u20801 \u35768 POST\u35831 \u27714 \
    if (req.method !== 'POST') \{\
        return res.status(405).json(\{ error: '\uc0\u26041 \u27861 \u19981 \u20801 \u35768 ' \});\
    \}\
    \
    try \{\
        const \{ avatar_image, style_choice \} = req.body;\
        \
        if (!avatar_image || !style_choice) \{\
            return res.status(400).json(\{ error: '\uc0\u32570 \u23569 \u24517 \u35201 \u21442 \u25968 ' \});\
        \}\
        \
        // \uc0\u36825 \u37324 \u38656 \u35201 \u26367 \u25442 \u20026 \u20320 \u30340 \u25187 \u23376 API Token\
        // \uc0\u24314 \u35758 \u23558 token\u35774 \u32622 \u20026 Vercel\u29615 \u22659 \u21464 \u37327 \
        const COZE_API_TOKEN = process.env.COZE_API_TOKEN;\
        \
        if (!COZE_API_TOKEN) \{\
            console.error('COZE_API_TOKEN\uc0\u26410 \u35774 \u32622 ');\
            return res.status(500).json(\{ error: '\uc0\u26381 \u21153 \u22120 \u37197 \u32622 \u38169 \u35823 ' \});\
        \}\
        \
        // \uc0\u35843 \u29992 \u25187 \u23376 API\
        const response = await fetch('https://p6468vdx9g.coze.site/run', \{\
            method: 'POST',\
            headers: \{\
                'Authorization': `Bearer $\{COZE_API_TOKEN\}`,\
                'Content-Type': 'application/json',\
            \},\
            body: JSON.stringify(\{\
                avatar_image: avatar_image,\
                style_choice: style_choice\
            \})\
        \});\
        \
        if (!response.ok) \{\
            const errorText = await response.text();\
            console.error('\uc0\u25187 \u23376 API\u38169 \u35823 :', response.status, errorText);\
            throw new Error(`\uc0\u25187 \u23376 API\u35831 \u27714 \u22833 \u36133 : $\{response.status\}`);\
        \}\
        \
        // \uc0\u20551 \u35774 \u25187 \u23376 API\u36820 \u22238 base64\u22270 \u29255 \u25968 \u25454 \
        const data = await response.json();\
        \
        // \uc0\u26681 \u25454 \u25187 \u23376 API\u30340 \u23454 \u38469 \u36820 \u22238 \u26684 \u24335 \u35843 \u25972 \
        // \uc0\u36825 \u37324 \u20551 \u35774 \u36820 \u22238 \u30340 \u26159 base64\u22270 \u29255 \u25968 \u25454 \
        let imageUrl = '';\
        if (data.image_data) \{\
            imageUrl = `data:image/png;base64,$\{data.image_data\}`;\
        \} else if (data.image_url) \{\
            imageUrl = data.image_url;\
        \} else \{\
            throw new Error('API\uc0\u36820 \u22238 \u26684 \u24335 \u38169 \u35823 ');\
        \}\
        \
        res.status(200).json(\{\
            success: true,\
            image_url: imageUrl,\
            timestamp: new Date().toISOString()\
        \});\
        \
    \} catch (error) \{\
        console.error('\uc0\u22788 \u29702 \u35831 \u27714 \u26102 \u20986 \u38169 :', error);\
        res.status(500).json(\{\
            success: false,\
            error: error.message || '\uc0\u20869 \u37096 \u26381 \u21153 \u22120 \u38169 \u35823 '\
        \});\
    \}\
\}}