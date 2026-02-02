{\rtf1\ansi\ansicpg936\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // DOM\uc0\u20803 \u32032 \
const uploadArea = document.getElementById('uploadArea');\
const fileInput = document.getElementById('fileInput');\
const previewImage = document.getElementById('previewImage');\
const generatedImage = document.getElementById('generatedImage');\
const generateBtn = document.getElementById('generateBtn');\
const downloadBtn = document.getElementById('downloadBtn');\
const loadingOverlay = document.getElementById('loadingOverlay');\
\
// \uc0\u24403 \u21069 \u36873 \u25321 \u30340 \u25991 \u20214 \
let currentFile = null;\
\
// \uc0\u21021 \u22987 \u21270 \u20107 \u20214 \u30417 \u21548 \
uploadArea.addEventListener('click', () => fileInput.click());\
uploadArea.addEventListener('dragover', (e) => \{\
    e.preventDefault();\
    uploadArea.style.borderColor = '#ee5a24';\
    uploadArea.style.background = '#fff5f5';\
\});\
uploadArea.addEventListener('dragleave', () => \{\
    uploadArea.style.borderColor = '#ddd';\
    uploadArea.style.background = '#f8f9fa';\
\});\
uploadArea.addEventListener('drop', (e) => \{\
    e.preventDefault();\
    uploadArea.style.borderColor = '#ddd';\
    uploadArea.style.background = '#f8f9fa';\
    \
    if (e.dataTransfer.files.length) \{\
        handleFileSelect(e.dataTransfer.files[0]);\
    \}\
\});\
\
// \uc0\u25991 \u20214 \u36873 \u25321 \u22788 \u29702 \
fileInput.addEventListener('change', (e) => \{\
    if (e.target.files.length) \{\
        handleFileSelect(e.target.files[0]);\
    \}\
\});\
\
function handleFileSelect(file) \{\
    // \uc0\u26816 \u26597 \u25991 \u20214 \u31867 \u22411 \
    if (!file.type.match('image.*')) \{\
        alert('\uc0\u35831 \u36873 \u25321 \u22270 \u29255 \u25991 \u20214 \u65281 ');\
        return;\
    \}\
    \
    // \uc0\u26816 \u26597 \u25991 \u20214 \u22823 \u23567 \u65288 \u38480 \u21046 5MB\u65289 \
    if (file.size > 5 * 1024 * 1024) \{\
        alert('\uc0\u22270 \u29255 \u22823 \u23567 \u19981 \u33021 \u36229 \u36807 5MB\u65281 ');\
        return;\
    \}\
    \
    currentFile = file;\
    \
    // \uc0\u26174 \u31034 \u39044 \u35272 \
    const reader = new FileReader();\
    reader.onload = (e) => \{\
        previewImage.src = e.target.result;\
        generateBtn.disabled = false;\
    \};\
    reader.readAsDataURL(file);\
\}\
\
// \uc0\u29983 \u25104 \u22836 \u20687 \
generateBtn.addEventListener('click', async () => \{\
    if (!currentFile) return;\
    \
    // \uc0\u33719 \u21462 \u36873 \u25321 \u30340 \u39118 \u26684 \
    const styleChoice = document.querySelector('input[name="style"]:checked').value;\
    \
    // \uc0\u26174 \u31034 \u21152 \u36733 \u21160 \u30011 \
    loadingOverlay.style.display = 'flex';\
    \
    try \{\
        // \uc0\u23558 \u22270 \u29255 \u36716 \u25442 \u20026 base64\
        const base64Image = await fileToBase64(currentFile);\
        \
        // \uc0\u35843 \u29992 \u21518 \u31471 API\u65288 \u20351 \u29992 \u30456 \u23545 \u36335 \u24452 \u65292 \u37096 \u32626 \u21040 Vercel\u26102 \u20250 \u33258 \u21160 \u25351 \u21521 /api/generate\u65289 \
        const response = await fetch('/api/generate', \{\
            method: 'POST',\
            headers: \{\
                'Content-Type': 'application/json',\
            \},\
            body: JSON.stringify(\{\
                avatar_image: base64Image.split(',')[1], // \uc0\u21435 \u25481 data:image/...\u21069 \u32512 \
                style_choice: styleChoice\
            \})\
        \});\
        \
        if (!response.ok) \{\
            throw new Error(`API\uc0\u35831 \u27714 \u22833 \u36133 : $\{response.status\}`);\
        \}\
        \
        const data = await response.json();\
        \
        if (data.success && data.image_url) \{\
            // \uc0\u26174 \u31034 \u29983 \u25104 \u30340 \u22270 \u29255 \
            generatedImage.src = data.image_url;\
            downloadBtn.disabled = false;\
            \
            // \uc0\u35774 \u32622 \u19979 \u36733 \u38142 \u25509 \
            downloadBtn.onclick = () => \{\
                const link = document.createElement('a');\
                link.href = data.image_url;\
                link.download = `\uc0\u39532 \u24180 \u22836 \u20687 _$\{Date.now()\}.png`;\
                link.click();\
            \};\
        \} else \{\
            throw new Error(data.error || '\uc0\u29983 \u25104 \u22833 \u36133 ');\
        \}\
    \} catch (error) \{\
        console.error('\uc0\u29983 \u25104 \u22833 \u36133 :', error);\
        alert('\uc0\u22836 \u20687 \u29983 \u25104 \u22833 \u36133 \u65292 \u35831 \u37325 \u35797 \u65281 \u38169 \u35823 \u20449 \u24687 \u65306 ' + error.message);\
    \} finally \{\
        // \uc0\u38544 \u34255 \u21152 \u36733 \u21160 \u30011 \
        loadingOverlay.style.display = 'none';\
    \}\
\});\
\
// \uc0\u24037 \u20855 \u20989 \u25968 \u65306 \u25991 \u20214 \u36716 base64\
function fileToBase64(file) \{\
    return new Promise((resolve, reject) => \{\
        const reader = new FileReader();\
        reader.readAsDataURL(file);\
        reader.onload = () => resolve(reader.result);\
        reader.onerror = error => reject(error);\
    \});\
\}\
\
// \uc0\u31105 \u29992 \u21491 \u38190 \u33756 \u21333 \u21644 \u22270 \u29255 \u25302 \u25341 \u65288 \u20445 \u25252 \u29983 \u25104 \u30340 \u22836 \u20687 \u65289 \
document.addEventListener('contextmenu', (e) => \{\
    if (e.target.tagName === 'IMG') \{\
        e.preventDefault();\
    \}\
\});\
\
document.addEventListener('dragstart', (e) => \{\
    if (e.target.tagName === 'IMG') \{\
        e.preventDefault();\
    \}\
\});}