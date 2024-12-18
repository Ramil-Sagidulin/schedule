import './modal.css'

function Modal(props) {

        if(props.open){
            return (
            <div className={'visible'}>
                <div className='modal__background' onClick={props.close}/>
                <div className='modal__block'>
                    {props.children}
                </div>
            </div>
            )
        }
        }



export default Modal;