import { useState } from 'react'
import Historycontext from './Historycontext'
const Historystate = (props) => {
    const [historydata, sethistorydata] = useState([])
    const addtohistory = (history) => {
        if (localStorage.getItem('historydata')) {
            sethistorydata(JSON.parse(localStorage.getItem('historydata')))
            const result = historydata.find(({ _id }) => _id === history._id);
            if (result) {
            } else {
                const historyolddata = [history]
                Array.prototype.push.apply(historydata, historyolddata);
                sethistorydata(historydata)
                localStorage.setItem("historydata", JSON.stringify(historydata))
            }
        } else {
            sethistorydata([{}])
            const historyolddata = [history]
            Array.prototype.push.apply(historydata, historyolddata);
            sethistorydata(historydata)
            localStorage.setItem("historydata", JSON.stringify(historydata))
        }
    }
    return (
        <Historycontext.Provider value={{ addtohistory,historydata}}>
            {props.children}
        </Historycontext.Provider>
    )
}
export default Historystate