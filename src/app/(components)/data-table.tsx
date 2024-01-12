'use client'

import Link from "next/link"
import { FC } from "react"

type DataTableType = {
    columns: Array<{ title: string, field: string }>,
    data: Array<any>,
    onEditAction: (id: number) => void,
    onDeleteAction: (id: number) => void,
}

const DataTable: FC<DataTableType> = ({ columns, data, onEditAction, onDeleteAction }) => {

    const sendEditData = (id: number) => {
        onEditAction(id);
    }

    const sendDeleteData = (id: number) => {
        onDeleteAction(id);
    }

    return (
        <div className="data-table-container">
            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Action</th>
                            {
                                columns.map((col: any, index: number) => (
                                    <th key={index}>{col.title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="data-action">
                                            <button onClick={() => sendDeleteData(d.prod_id)} className="btn delete">Delete</button>
                                            <button onClick={() => sendEditData(d.prod_id)} className="btn edit text-center">Edit</button>
                                        </div>
                                    </td>
                                    {
                                        columns.map((col: any, index: number) => {
                                            return (
                                                Object.keys(d).map((value: any, index: number) => {
                                                    if (value == col.field) {
                                                        if (col.title === 'image') {
                                                            return (
                                                                <td key={index}>
                                                                    <div className="img-container">
                                                                        <img src={d[value]} alt="" />
                                                                    </div>
                                                                </td>
                                                            )
                                                        }
                                                        switch (typeof d[value]) {
                                                            case 'boolean':
                                                                return (
                                                                    <td key={index}>{JSON.stringify(d[value])}</td>
                                                                )
                                                            default:
                                                                return (
                                                                    <td key={index}>{d[value]}</td>
                                                                )

                                                        }
                                                    }

                                                })
                                            )

                                        })

                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="data-table-pager">
                <div className="page-size-container">
                    <div className="page-size">
                        <input type="text" name="" id="" value="6" />
                    </div>
                    <span className="lable-text">Total items per page</span>
                </div>
                <div className="navigate-pages">
                    <button className="btn first">
                        <span className="icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" /></svg>
                        </span>
                    </button>
                    <button className="btn prev">
                        <span className="label-text">Previous</span>
                    </button>
                    <button className="btn next">
                        <span className="label-text">Next</span>
                    </button>
                    <button className="btn last">
                        <span className="icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" /></svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default DataTable;