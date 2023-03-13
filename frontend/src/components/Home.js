import React, { useEffect, useState } from 'react'
import {
    Link
} from "react-router-dom";
const Home = () => {
    const [bucket, setbucket] = useState([])
    const [toggle, settoggle] = useState(false)
    const [bucktdetail, setbucketdetail] = useState({})
    const [id, setid] = useState("")
    const handleclick = (e) => {
        e.preventDefault();
        addbucket(bucktdetail.bucketname, bucktdetail.bucketdescription)

    }
    const onchange = (e) => {
        setbucketdetail({ ...bucktdetail, [e.target.name]: e.target.value })
    }
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
    const addbucket = async (bucketname, bucketdescription) => {
        const response = await fetch(`http://localhost:3001/app/addbucket`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ bucketname, bucketdescription })
        });
        const json = await response.json()
        if (json.errors) {
            alert(json.errors)
            if (toggle) {
                settoggle(false)
            } else {
                settoggle(true)
            }

        } else {
            if (toggle) {
                settoggle(false)
            } else {
                settoggle(true)
            }
        }

    }
    useEffect(() => {
        getbucket()
    }, [bucket])
    const handleclose = async (e) => {
        e.preventDefault();
        if (toggle) {
            settoggle(false)
        } else {
            settoggle(true)
        }
    }
    const deletebucket = async (id) => {
        const response = await fetch(`http://localhost:3001/app/deletebucket`, {
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
    const handleclickdelete = async (e) => {
        e.preventDefault();
        setid(e.target.id)
        const result = bucket.find(({ _id }) => _id === id);
        console.log(result)
        if (result !== undefined) {
            deletebucket(id)
        } else {
            alert("Please select the card again")
        }
    }
    return (
        <section className="text-gray-600 body-font bg-slate-50 min-h-screen">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className='h-full w-full justify-end text-end pb-10'>
                    <button type="button" onClick={handleclose} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ Add Bucket</button>
                </div>
                <div className="flex flex-wrap w-full -m-4">
                    {(bucket.map((note) => {
                        return (
                            <>
                                <div className="p-4 lg:w-1/2 md:w-full" key={note._id}>
                                    <div className="flex border-2 bg-white shadow-2xl shadow-slate-700 rounded-lg py-5 border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                        <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-grow">
                                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{note.bucketname}</h2>
                                            <p className="leading-relaxed text-base">{note.bucketdescription}</p>
                                            <div className='py-5'>
                                                <Link to={`/bucket/${note._id}`} className="mt-3 text-indigo-500 inline-flex items-center">
                                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Open</button>
                                                </Link>
                                                <button type="button" onClick={handleclickdelete} id={note._id} className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                    )}
                </div>
            </div>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={`fixed bg-slate-100 top-0 left-0 right-0 z-50 ${toggle ? "block" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
                <div className="relative w-full h-full max-w-5xl md:h-auto">
                    <div className="relative bg-white left-40 shadow-2xl rounded-lg shadow-slate-900 dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button onClick={handleclose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="h-auto w-full object-cover object-center">
                                <form>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="text" id="email" name='bucketname' onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john doe" required />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input type="text" id="password" name='bucketdescription' onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="-------" required />
                                    </div>
                                    <button onClick={handleclick} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home