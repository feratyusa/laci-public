/**
 * bruh
 * 
 * @param {Object} obj 
 * @returns {boolean}
 */
export default function isObjectEmpty(obj){
    for(const props in obj) return false
    return true    
}