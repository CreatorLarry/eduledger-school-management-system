"use client";

import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {role as defaultRole, parentsData} from "@/lib/data";
import FormModal from "@/components/FormModal";

type Parent = {
    id: number;
    name: string;
    email?: string;
    students: string[];
    phone: string;
    address: string;
}

const columns = [
    {
        header: 'Info', accessor: 'info'
    },
    {
        header: 'Student Name', accessor: 'students', className: 'hidden md:table-cell'
    },
    {
        header: 'Phone', accessor: 'phone', className: 'hidden lg:table-cell'
    },
    {
        header: 'Address', accessor: 'address', className: 'hidden lg:table-cell'
    },
    {
        header: 'Actions', accessor: 'actions'
    },
]
const ParentListPage = () => {
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

    const renderRow = (item: Parent) => (
            <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
                <td className="flex items-center gap-4 p-4">
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item?.email}</p>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.students.join(',')}</td>
                <td className="hidden lg:table-cell">{item.phone}</td>
                <td className="hidden lg:table-cell">{item.address}</td>
                <td>
                    <div className="flex items-center gap-2">
                        {

                            effectiveRole === "admin" && (
                                <>
                                    <FormModal table="parent" type="update" data={item}/>

                                    <FormModal table="parent" type="delete" id={item.id}/>
                                </>
                            )
                        }
                    </div>
                </td>
            </tr>
        )
    ;
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/*TOP*/}
            <div className="flex items-center justify-between gap-4">
                <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
                                <FormModal table="parent" type="create"/>
                            )
                        }                   </div>
                </div>
            </div>
            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={parentsData}/> {/*PAGINATION*/}
            <Pagination/>
        </div>
    )
}
export default ParentListPage
