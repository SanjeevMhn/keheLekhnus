'use client'

import { ChangeEvent, FC } from "react"
import ReactHtmlParser from 'react-html-parser';

export type Columns = {
    title: string,
    field: string
    hidden?: boolean,
    customHTML?: any
}

export type PagerConfig = {
    pageSize: number,
    currentPage: number,
    totalPages: number
}

type DataTableType = {
    columns: Array<Columns>,
    data: Array<any>,
    pagerConfig: PagerConfig,
    title?: string,
    showActionCol?: boolean,
    customElement?: any,
    onEditAction: (id: number) => void,
    onDeleteAction: (id: number) => void,
    onPaginate: (page: number) => void,
    onPageSizeChange: (pageSize: number) => void,
    onSearch: (search: string) => void
}

const DataTable: FC<DataTableType> = ({ columns, data, pagerConfig, title, showActionCol, customElement, onEditAction, onDeleteAction, onPaginate, onPageSizeChange, onSearch }) => {

    const sendEditData = (id: number) => {
        onEditAction(id);
    }

    const sendDeleteData = (id: number) => {
        onDeleteAction(id);
    }

    const goDirectToPage = (page: number) => {
        onPaginate(page);
    }

    const changePageSize = (e: ChangeEvent<HTMLInputElement>) => {
        let pageSize = Number(e.target.value);
        if (pageSize == 0) pageSize = 1;
        onPageSizeChange(pageSize);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let search = e.target.value;
        onSearch(search);
    }

    return (
        <div className="data-table-container">
            <div className="data-table-header">
                <h4 className="title">{title}</h4>
                {customElement ? (customElement) : null}
                <div className="input-group">
                    <input type="text" name="" id="" className="form-control" placeholder="Search..." onChange={(e) => handleInputChange(e)} />
                    <button className="search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            {showActionCol === false ? null : (
                                <th>Action</th>
                            )}
                            {
                                columns.map((col: any, index: number) => (
                                    !col.hidden ? (
                                        <th key={index}>{col.title}</th>
                                    ) : null
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {
                                        showActionCol === false ? null : (
                                            <td>
                                                <div className="data-action">
                                                    <button onClick={() => sendDeleteData(d[Object.keys(d)[0]])} className="btn delete">Delete</button>
                                                    <button onClick={() => sendEditData(d[Object.keys(d)[0]])} className="btn edit text-center">Edit</button>
                                                </div>
                                            </td>
                                        )
                                    }
                                    {
                                        columns.map((col: Columns, index: number) => {
                                            return (
                                                !col.hidden ? (
                                                    Object.keys(d).map((value: any, index: number) => {

                                                        if (value == col.field) {
                                                            if (col.title === 'image') {
                                                                return (
                                                                    <td key={index}>
                                                                        <div className="img-container">
                                                                            {d[value] !== null ? (
                                                                                <img src={d[value]} alt="" />
                                                                            ):(
                                                                                <span className="no-image">
                                                                                    No Image
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                )
                                                            }
                                                            if (col.customHTML && col.customHTML !== null) {
                                                                return (
                                                                    <td key={index}>
                                                                        {ReactHtmlParser((col.customHTML.replaceAll('{0}', d[col.field])), 'text/html')}
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

                                                    })) : null
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
                        <input type="number" name="" id="" defaultValue={pagerConfig.pageSize} min={1} onChange={(e) => changePageSize(e)} />
                    </div>
                    <span className="lable-text">Total items per page</span>
                </div>
                <div className="right-col flex flex-wrap gap-4">
                    <div className="page-detail flex items-center">
                        <span className="label-text text-[18px]">
                            Page {pagerConfig.currentPage} of {pagerConfig.totalPages}
                        </span>
                    </div>
                    <div className="navigate-pages">
                        <button className={`btn first ${pagerConfig.currentPage == 1 ? 'disabled' : ''}`} disabled={pagerConfig.currentPage == 1} onClick={() => goDirectToPage(1)}>
                            <span className="icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" /></svg>
                            </span>
                        </button>
                        <button className={`btn prev ${pagerConfig.currentPage == 1 ? 'disabled' : ''}`} disabled={pagerConfig.currentPage == 1} onClick={() => goDirectToPage(pagerConfig.currentPage - 1)}>
                            <span className="label-text">Previous</span>
                        </button>
                        <button className={`btn next ${pagerConfig.currentPage == pagerConfig.totalPages ? 'disabled' : ''}`} disabled={pagerConfig.currentPage == pagerConfig.totalPages} onClick={() => goDirectToPage(pagerConfig.currentPage + 1)}>
                            <span className="label-text">Next</span>
                        </button>
                        <button className={`btn last ${pagerConfig.currentPage == pagerConfig.totalPages ? 'disabled' : ''}`} disabled={pagerConfig.currentPage == pagerConfig.totalPages} onClick={() => goDirectToPage(pagerConfig.totalPages)}>
                            <span className="icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" /></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DataTable;