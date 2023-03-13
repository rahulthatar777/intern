import React, { useContext, useEffect, useState } from 'react'
import Historycontext from '../context/Historycontext';
const History = () => {
    var context = useContext(Historycontext);
    var {historydata} = context
    return (
        <section className="text-gray-600 body-font bg-slate-50">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-wrap w-full -m-4">
                    {(historydata.map((note) => {
                        return (
                            <>
                                <div className="p-4 w-1/2" key={note._id}>
                                    <div className="p-6 space-y-6 shadow-2xl shadow-slate-900 bg-white">
                                        <div className="h-[50vh] w-full object-cover object-center" id='history'>
                                            {historydata &&
                                                <div dangerouslySetInnerHTML={{ __html: note.cardlink }} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                    )}
                </div>
            </div>
        </section>
    )
}

export default History