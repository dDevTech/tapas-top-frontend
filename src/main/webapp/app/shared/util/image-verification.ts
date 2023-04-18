export const isImage = i => {
    let validate = true;
    
    if(!i.startsWith('http:') && !i.startsWith('https:')){
        validate = false
    }
    if(!i.endsWith('.jpg') && !i.endsWith('.jpeg') && !i.endsWith('.png') && !i.endsWith('.gif') && !i.endsWith('.svg') && !i.endsWith('.webp')){
        validate = false
    }

    return validate
}