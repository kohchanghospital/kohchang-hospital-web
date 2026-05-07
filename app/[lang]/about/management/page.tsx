"use client";

import { useState, use } from "react";
import { languages, Lang } from "@/i18n";
import { Icons } from '@/app/icons/icons'

type Person = {
    name: string;
    position: string;
    image: string;
};

export default function ManagementTeam({ params, }: { params: Promise<{ lang: string }>; }) {

    const { lang } = use(params);
    const t = languages[lang as Lang];

    const [selected, setSelected] = useState<Person | null>(null);

    const groups = [
        {
            title: "ผู้อำนวยการ",
            members: [
                {
                    name: "พญ.อาศยา ประภาโส",
                    position: "ผู้อำนวยการโรงพยาบาล",
                    image: "/images/person/khing.jpg",
                },
            ],
        },
        {
            title: "ฝ่ายยุทธศาสตร์องค์กร",
            members: [
                {
                    name: "ผศ.นพ.นครินทร์ ศิริทรัพย์",
                    position: "รองผู้อำนวยการ\nฝ่ายยุทธศาสตร์องค์กร",
                    image: "/images/person/khing.jpg",
                },
                {
                    name: "อ.นพ.ชันธิ์ กำธรธันต์",
                    position: "ผู้ช่วยผู้อำนวยการ\nด้านยุทธศาสตร์",
                    image: "/images/person/khing.jpg",
                },
                {
                    name: "ผศ.นพ.นครินทร์ ศิริทรัพย์",
                    position: "รองผู้อำนวยการ\nฝ่ายยุทธศาสตร์องค์กร",
                    image: "/images/person/khing.jpg",
                },
                {
                    name: "อ.นพ.ชันธิ์ กำธรธันต์",
                    position: "ผู้ช่วยผู้อำนวยการ\nด้านยุทธศาสตร์",
                    image: "/images/person/khing.jpg",
                },

            ],
        },
        {
            title: "ฝ่ายการพยาบาล",
            members: [
                {
                    name: "ผศ.นพ.นครินทร์ ศิริทรัพย์",
                    position: "รองผู้อำนวยการ\nฝ่ายยุทธศาสตร์องค์กร",
                    image: "/images/person/khing.jpg",
                },
                {
                    name: "อ.นพ.ชันธิ์ กำธรธันต์",
                    position: "ผู้ช่วยผู้อำนวยการ\nด้านยุทธศาสตร์",
                    image: "/images/person/khing.jpg",
                },
                {
                    name: "ผศ.นพ.นครินทร์ ศิริทรัพย์",
                    position: "รองผู้อำนวยการ\nฝ่ายยุทธศาสตร์องค์กร",
                    image: "/images/person/khing.jpg",
                },
                {
                    name: "อ.นพ.ชันธิ์ กำธรธันต์",
                    position: "ผู้ช่วยผู้อำนวยการ\nด้านยุทธศาสตร์",
                    image: "/images/person/khing.jpg",
                },
                {
                    name: "ผศ.นพ.นครินทร์ ศิริทรัพย์",
                    position: "รองผู้อำนวยการ\nฝ่ายยุทธศาสตร์องค์กร",
                    image: "/images/person/khing.jpg",
                },
            ],
        },
    ];

    return (
        <>
            {/* ✅ UI IMPROVED */}
            <div
                className="relative overflow-hidden bg-cover bg-center px-4 py-20 text-center sm:py-24 lg:py-28"
                style={{
                    backgroundImage: "url('/images/management.png')",
                    backgroundPosition: "center 25%",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-[#C4B5FD]/35 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_34%)]"></div>

                <div className="relative z-10 mx-auto max-w-4xl animate-soft-reveal text-[#1E293B]">
                    <span className="inline-flex rounded-full border border-[#C4B5FD]/70 bg-white/80 px-4 py-2 text-sm font-medium text-[#7C3AED] shadow-sm">
                        Koh Chang Hospital
                    </span>
                    <h1 className="mt-6 text-3xl font-bold leading-tight tracking-normal text-[#1E293B] sm:text-5xl lg:text-6xl">
                        {t.management_team}
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#64748B]">
                        {t.hos_name}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD]"></div>
            </div>

            {/* ✅ UI IMPROVED */}
            <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">

                {groups.map((group, i) => (
                    <section key={i} className="mb-12 animate-soft-reveal last:mb-0">

                        {/* ✅ UI IMPROVED */}
                        <div className="mx-auto mb-8 inline-flex max-w-full items-center justify-center rounded-full border border-[#C4B5FD]/70 bg-white px-6 py-3 text-xl font-semibold text-[#1E293B] shadow-md shadow-purple-700/5">
                            <span className="mr-3 h-2 w-2 rounded-full bg-[#7C3AED]"></span>
                            {group.title}
                        </div>

                        {/* ✅ UI IMPROVED */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {group.members.map((p, idx) => (
                                <Card key={idx} person={p} onClick={() => setSelected(p)} />
                            ))}
                        </div>

                    </section>
                ))}

            </section>

            {/* ✅ UI IMPROVED */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm animate-[fadeIn_.25s_ease] md:items-center md:p-6"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative w-full max-w-md animate-[slideUp_.35s_ease] rounded-t-3xl border border-[#E5E7EB] bg-white p-6 text-center shadow-2xl shadow-slate-950/20 md:rounded-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC] text-[#64748B] transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:text-red-600 active:scale-95"
                            onClick={() => setSelected(null)}
                            aria-label="Close"
                        >
                            <Icons.Close className="text-2xl" />
                        </button>

                        <img
                            src={selected.image}
                            alt={selected.name}
                            className="mb-5 h-80 w-full rounded-2xl object-cover object-top"
                        />

                        <h3 className="text-xl font-bold text-[#1E293B]">{selected.name}</h3>

                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#64748B]">
                            {selected.position}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

function Card({
    person,
    onClick,
}: {
    person: Person;
    onClick: () => void;
}) {
    return (
        // ✅ UI IMPROVED
        <div
            onClick={onClick}
            className="group cursor-pointer overflow-hidden rounded-xl border border-[#E5E7EB] bg-white text-center shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#C4B5FD] hover:shadow-lg hover:shadow-purple-700/10"
        >
            <div className="relative overflow-hidden bg-[#7C3AED]/10">
                <img
                    src={person.image}
                    alt={person.name}
                    className="h-72 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/25 to-transparent"></div>
            </div>

            <div className="p-5">
                <h3 className="text-base font-semibold leading-7 text-[#1E293B] transition-colors duration-300 group-hover:text-[#7C3AED]">{person.name}</h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#64748B]">
                    {person.position}
                </p>
            </div>
        </div>
    );
}
