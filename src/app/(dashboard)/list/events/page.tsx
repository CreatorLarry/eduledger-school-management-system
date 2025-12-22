"use client";

import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {role as defaultRole, eventsData} from "@/lib/data";
import FormModal from "@/components/FormModal";

type Event = {
    id: number;
    title: string;
    class: string;
    date: string;
    startTime: string;
    endTime: string;
}

const columns = [
    {
        header: 'Title', accessor: 'title'
    },
    {
        header: 'Class', accessor: 'class'
    },
    {
        header: 'Date', accessor: 'date', className: 'hidden md:table-cell'
    },
    {
        header: 'Start Time', accessor: 'startTime', className: 'hidden md:table-cell'
    },
    {
        header: 'End Time', accessor: 'endTime', className: 'hidden md:table-cell'
    },

    {
        header: 'Actions', accessor: 'actions'
    },
]
const EventListPage = () => {
    const pathname = usePathname();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const allowedRoles = ["admin", "teacher", "student", "parent"] as const;
    type Role = typeof allowedRoles[number];

    const [effectiveRole, setEffectiveRole] = useState<Role>(() => {
        if (typeof window !== "undefined") {
            const stored = window.sessionStorage.getItem("effectiveRole");
            if (stored && (allowedRoles as readonly string[]).includes(stored)) {
                return stored as Role;
            }
        }
        return (defaultRole as Role) ?? ("admin" as Role);
    });

    useEffect(() => {
        const firstSegment = pathname?.split("/")[1] ?? "";
        const hasRoleInPath = (allowedRoles as readonly string[]).includes(firstSegment);
        if (hasRoleInPath) {
            const newRole = firstSegment as Role;
            setEffectiveRole(prev => (prev !== newRole ? newRole : prev));
            try {
                window.sessionStorage.setItem("effectiveRole", newRole);
            } catch {
            }
        }
    }, [allowedRoles, pathname]);

    const renderRow = (item: Event) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">
                {item.title}
            </td>
            <td>{item.class}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td className="hidden md:table-cell">{item.startTime}</td>
            <td className="hidden md:table-cell">{item.endTime}</td>
            <td>
                <div className="flex items-center gap-2">
                    {
                        effectiveRole === "admin" && (
                            <>
                                <FormModal table="event" type="update" data={item}/>

                                <FormModal table="event" type="delete" id={item.id}/>
                            </>
                        )
                    }
                </div>
            </td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/*TOP*/}
            <div className="flex items-center justify-between gap-4">
                <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch/>
                    <div className="flex items-center gap-4 self-end">
                        <button
                            onClick={() => {
                                // TODO: Implement filter functionality
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
                        >
                            <Image src="/filter.png" alt="" width={14} height={14}/>
                        </button>
                        <button
                            onClick={() => {
                                // TODO: Implement sort functionality
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
                        >
                            <Image src="/sort.png" alt="" width={14} height={14}/>
                        </button>
                        {
                            effectiveRole === "admin" && (
                                <FormModal table="event" type="create"/>
                            )
                        }                   </div>
                </div>
            </div>
            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={eventsData}/> {/*PAGINATION*/}
            <Pagination/>
        </div>
    )
}
export default EventListPage
