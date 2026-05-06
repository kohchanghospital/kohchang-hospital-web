"use client";

import { useState, use } from "react";
import { languages, Lang } from "@/i18n";
import { Icons } from '@/app/icons/icons'

type Person = {
    name: string;
    position: string;
    image: string;
};

export default function ManagementTeam({ params, }: { params: Promise<{ lang: Lang }>; }) {

    const { lang } = use(params);
    const t = languages[lang];

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
            {/* HERO */}
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/management.png')",
                    backgroundPosition: "center 25%",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.management_team}
                    </h1>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>

            {/* CONTENT */}
            <section className="mx-auto max-w-5xl px-6 py-16 text-center">

                {groups.map((group, i) => (
                    <section key={i} className="mb-14">

                        {/* Section Title */}
                        <div className="bg-purple-300 text-2xl text-center py-3 font-bold text-gray-700 mb-10">
                            {group.title}
                        </div>

                        {/* Members */}
                        <div className="flex flex-wrap justify-center gap-10">
                            {group.members.map((p, idx) => (
                                <Card key={idx} person={p} onClick={() => setSelected(p)} />
                            ))}
                        </div>

                    </section>
                ))}

            </section>

            {/* MODAL */}
            {selected && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50 animate-[fadeIn_.25s_ease]"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-white font-bold rounded-t-2xl md:rounded-2xl shadow-2xl max-w-md w-full p-6 relative text-center animate-[slideUp_.35s_ease]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute right-2 top-2 hover:text-red-600 transition"
                            onClick={() => setSelected(null)}
                        >
                            <Icons.Close className="text-2xl" />
                        </button>

                        <img
                            src={selected.image}
                            className="w-full rounded-lg mb-4"
                        />

                        <h3 className="font-bold text-lg">{selected.name}</h3>

                        <p className="text-gray-600 whitespace-pre-line">
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
        <div
            onClick={onClick}
            className="cursor-pointer bg-gray-100 rounded-xl shadow-md hover:shadow-xl hover:text-purple-600 transition w-56 text-center"
        >
            <img
                src={person.image}
                className="rounded-t-xl w-full h-64 object-cover"
            />

            <div className="p-4">
                <h3 className="font-semibold">{person.name}</h3>

                <p className="text-sm text-gray-600 whitespace-pre-line">
                    {person.position}
                </p>
            </div>
        </div>
    );
}