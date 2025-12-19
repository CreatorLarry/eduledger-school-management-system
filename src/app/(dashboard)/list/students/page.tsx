"use client";

import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {role as defaultRole, studentsData} from "@/lib/data";

type Student = {
    id: number;
    studentId: string;
    name: string;
    email?: string;
    photo: string;
    phone?: string;
    grade: number[];
    class: string;
    address: string;
}

const columns = [
    {
        header: 'Info', accessor: 'info'
    },
    {
        header: 'Student ID', accessor: 'studentId', className: 'hidden md:table-cell'
    },
    {
        header: 'Grade', accessor: 'grade', className: 'hidden md:table-cell'
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
const StudentListPage = () => {
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

    const renderRow = (item: Student) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <Image src={item.photo} alt="" width={40} height={40}
                       className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/>
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.class}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.studentId}</td>
            <td className="hidden md:table-cell">{item.grade}</td>
            <td className="hidden lg:table-cell">{item.phone}</td>
            <td className="hidden lg:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/students/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSkyLight">
                            <Image src="/view.png" alt="" width={16} height={16}/>
                        </button>
                    </Link>
                    {
                        effectiveRole === "admin" && (
                            <button
                                onClick={() => {
                                    // TODO: Implement delete functionality
                                    console.log('Delete student:', item.id);
                                }}
                                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurpleLight"
                            >
                                <Image src="/delete.png" alt="" width={16} height={16}/>
                            </button>
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
                <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                                    <Image src="/plus.png" alt="" width={14} height={14}/>
                                </button>
                            )
                        }                   </div>
                </div>
            </div>
            {/*LIST*/}
            <Table columns={columns} renderRow={renderRow} data={studentsData}/> {/*PAGINATION*/}
            <Pagination/>
        </div>
    )
}
export default StudentListPage
