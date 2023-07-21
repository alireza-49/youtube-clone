import { useEffect,useRef } from "react"
import { createPortal } from "react-dom"
const Modal = ({children}) =>{
    const refElement = useRef(null)
    if(!refElement.current){
        refElement.current = document.createElement('div')
    }
    useEffect(() => {
        const rootElement = document.getElementById('modal')
        rootElement.appendChild(refElement.current)
        return () => rootElement.removeChild(refElement.current)
    },[])
    return createPortal(<div>{children}</div>,refElement.current)
}

export default Modal;