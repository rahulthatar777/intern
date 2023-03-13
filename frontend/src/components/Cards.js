import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Historycontext from '../context/Historycontext';

const Cards = () => {
    const { bucket } = useParams();
    const [cards, setcards] = useState([])
    const [buckets, setbucket] = useState([])
    const [link, setlink] = useState({ cardname: "", cardlink: "" })
    const [id, setid] = useState("")
    const [toggle, settoggle] = useState(false)
    var data = bucket
    const [toggleform, settoggleform] = useState(false)
    const [toggleupdateform, settoggleupdateform] = useState(false)
    const [carddetail, setcarddetail] = useState({})
    const [cardarrays, setcardarrays] = useState({})
    const [updatedetail, setupdatedetail] = useState({})
    const [bucketid, setbucketid] = useState(data)


    var context = useContext(Historycontext);
    var { addtohistory } = context


    const getcards = async (bucketid) => {
        const response = await fetch(`http://localhost:3001/app/getcard`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ bucketid })
        });
        const json = await response.json()
        setcards(json.card)
    }
    const addcard = async (cardname, cardlink, bucketid) => {
        const response = await fetch(`http://localhost:3001/app/addcard`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ cardname, cardlink, bucketid })
        });
        const json = await response.json()
        if (json.errors) {
            alert(json.errors)
            if (toggleform) {
                settoggleform(false)
            } else {
                settoggleform(true)
            }

        } else {
            if (toggleform) {
                settoggleform(false)
            } else {
                settoggleform(true)
            }
        }

    }
    const deletecard = async (id) => {
        const response = await fetch(`http://localhost:3001/app/deletecard`, {
            method: "delete",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ id })
        });
        const json = await response.json()
        if (json.errors) {
            alert(json.errors)
        } else {
            alert("successfully deleted card")
            window.location.reload(false);
        }

    }
    const updatecard = async (id, cardlink, newbucketid, cardname) => {
        const response = await fetch(`http://localhost:3001/app/updatecard`, {
            method: "post",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ id, cardlink, newbucketid, cardname })
        });
        const json = await response.json()
        if (json.errors) {
            alert(json.errors)
        } else {
            console.log(json)
            alert("successfully Moved card")
            window.location.reload(false);
        }

    }
    const handleclose = async (e) => {
        e.preventDefault();
        if (toggle) {
            settoggle(false)
        } else {
            settoggle(true)
        }
    }
    const handleclick = async (e) => {
        e.preventDefault();
        setid(e.target.id)
        const result = cards.find(({ _id }) => _id === id);
        setlink(result)
        if (result !== undefined) {
            if (toggle) {
                settoggle(false)
            } else {
                settoggle(true)
            }
            addtohistory(result)
        } else {
            alert("Please select the card again")
        }
    }
    const handleclickdelete = async (e) => {
        e.preventDefault();
        setid(e.target.id)
        const result = cards.find(({ _id }) => _id === id);
        console.log(result)
        if (result !== undefined) {
            deletecard(id)
        } else {
            alert("Please select the card again")
        }
    }
    const handleclickform = (e) => {
        e.preventDefault();
        addcard(carddetail.cardname, carddetail.cardlink, bucketid)
    }
    const onchange = (e) => {
        setcarddetail({ ...carddetail, [e.target.name]: e.target.value })
    }
    const handlecloseform = async (e) => {
        e.preventDefault();
        if (toggleform) {
            settoggleform(false)
        } else {
            settoggleform(true)
        }
    }
    const handlecloseupdateform = async (e) => {
        e.preventDefault();
        if (toggleupdateform) {
            settoggleupdateform(false)
        } else {
            settoggleupdateform(true)
        }
    }
    const handleclickupdateform = (e) => {
        e.preventDefault();
        updatecard(id, link.cardlink, updatedetail.newbucketid, link.cardname)
    }
    const onupdate = (e) => {
        setupdatedetail({ ...updatedetail, [e.target.name]: e.target.value })
    }
    const handleclickupdate = async (e) => {
        e.preventDefault();
        setid(e.target.id)
        const result = cards.find(({ _id }) => _id === id);
        setlink(result)
        if (result !== undefined) {
            if (toggleupdateform) {
                settoggleupdateform(false)
            } else {
                settoggleupdateform(true)
            }
        } else {
            alert("Please select the card again")
        }
    }
    useEffect(() => {
        setbucketid(bucket)
        getcards(bucketid)
    }, [])
    useEffect(() => {
        getbucket()
    }, [buckets])
    const getbucket = async () => {
        const response = await fetch(`http://localhost:3001/app/getbucket`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
        });
        const json = await response.json()
        setbucket(json.bucket)
    }


    const deletecardmultiple = async (cardarray) => {
        const response = await fetch(`http://localhost:3001/app/deletecardmultiple`, {
            method: "delete",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ cardarray })
        });
        const json = await response.json()
        if (json.errors) {
            alert(json.errors)
        } else {
            alert("successfully deleted card")
            window.location.reload(false);
        }

    }
    const ondelete = (e) => {
        setcardarrays({ ...cardarrays, [e.target.name]: e.target.value })
    }
    const handledeletecards = async (e) => {
        e.preventDefault();
        var cardarray=Object.values(cardarrays)
        if(cardarray.length > 0) {
        deletecardmultiple(cardarray)
    }else{
        alert("please select cards")
    }}
    return (
        <section className="text-gray-600 body-font bg-slate-50 min-h-screen">
            <div className="container px-5 py-24 mx-auto">
                <div className='h-full w-full justify-end text-end pb-10'>
                <button type="button" onClick={handlecloseform} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ Add Card</button>
                    <button type="button" onClick={handledeletecards} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Delete Cards</button>
                </div>
                <div className="flex flex-wrap -m-4">
                    {(cards.map((note) => {
                        return (
                            <div className="p-4 lg:w-1/3 md:w-1/2 w-full" key={note._id}>
                                <div className="h-full border-2 bg-white shadow-2xl shadow-slate-900 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                    <div className="flex justify-end pr-2 pt-2">
                                        <input id="default-checkbox" onChange={ondelete} type="checkbox" value={note._id} name={note.cardname} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-md title-font font-medium text-gray-400 mb-1">NAME</h2>
                                        <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{note.cardname}</h1>
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Bucket</h2>
                                        <p className="leading-relaxed mb-3">{note.bucketid.bucketname}</p>
                                        <div>
                                            <button type="button" onClick={handleclick} id={note._id} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Play</button>
                                            <button type="button" onClick={handleclickdelete} id={note._id} className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
                                            <button type="button" onClick={handleclickupdate} id={note._id} className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Move</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }))}
                </div>
            </div>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={`fixed bg-slate-100 top-0 left-0 right-0 z-50 ${toggle ? "block" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
                <div className="relative w-full h-full max-w-5xl md:h-auto">
                    <div className="relative bg-white left-40 shadow-2xl rounded-lg shadow-slate-900 dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {link && link.cardname}
                            </h3>
                            <button onClick={handleclose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="h-[75vh] w-full object-cover object-center">
                                {link &&
                                    <div dangerouslySetInnerHTML={{ __html: link.cardlink }} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={`fixed bg-slate-100 top-0 left-0 right-0 z-50 ${toggleform ? "block" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
                <div className="relative w-full h-full max-w-5xl md:h-auto">
                    <div className="relative bg-white left-40 shadow-2xl rounded-lg shadow-slate-900 dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button onClick={handlecloseform} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="h-auto w-full object-cover object-center">
                                <form>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="text" id="email" name='cardname' onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john doe" required />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IFrame Code</label>
                                        <input type="text" id="password" name='cardlink' onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="-------" required />
                                    </div>
                                    <button onClick={handleclickform} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={`fixed bg-slate-100 top-0 left-0 right-0 z-50 ${toggleupdateform ? "block" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
                <div className="relative w-full h-full max-w-5xl md:h-auto">
                    <div className="relative bg-white left-40 shadow-2xl rounded-lg shadow-slate-900 dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button onClick={handlecloseupdateform} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="h-auto w-full object-cover object-center">
                                <form>
                                    <div className='pb-6'>
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                        <select id="countries" name='newbucketid' onChange={onupdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option defaultValue>Choose a bucket</option>
                                            {(buckets.map((note) => {
                                                return (
                                                    <option value={note._id} key={note._id}>{note.bucketname}</option>)
                                            }))}
                                        </select>
                                    </div>
                                    <button onClick={handleclickupdateform} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cards