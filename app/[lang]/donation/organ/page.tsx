import { languages, Lang } from "@/i18n";

export default async function OrganDonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <>
            {/* Hero */}

            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/organ.png')",
                    backgroundPosition: "center 10%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.organ_donation}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center">
                    <div className="relative z-10 text-gray-700">
                        <p className="mt-4 text-xl font-bold">
                            สร้างกุศลผู้ให้ สร้างชีวิตใหม่ผู้รับ
                        </p>
                        <p className="mt-2 text-lg">
                            1 ผู้ให้ ช่วยได้ 8 ชีวิต
                        </p>
                    </div>
                    <div className="w-full h-px bg-gray-300 my-8"></div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            ความสำคัญของการบริจาคอวัยวะ
                        </h2>
                        <p className="mr-10">
                            "การให้ชีวิตใหม่" ที่ยิ่งใหญ่ที่สุด ช่วยต่อลมหายใจให้ผู้ป่วยโรคเรื้อรังระยะสุดท้าย
                            ได้ถึง 8 รายต่อผู้บริจาค 1 ราย เป็นการเปลี่ยนชีวิตผู้รับให้ดีขึ้น ลดภาวะเจ็บป่วย
                            และเป็นประโยชน์สูงสุดทางการแพทย์ ถือเป็นมหากุศลที่สร้างสรรค์สังคมและช่วยให้ผู้รับพ้นจากความทุกข์ทรมาน
                        </p>
                        <p className="text-xl mt-4 font-bold ">
                            อวัยวะที่สามารถบริจาคได้ ได้แก่
                        </p>
                        <ul className="list-disc pl-5 mt-4">
                            <li>หัวใจ</li>
                            <li>ไต</li>
                            <li>ตับ</li>
                            <li>ปอด</li>
                            <li>ตับอ่อน</li>
                            <li>เนื้อเยื่อ</li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-xl">
                        <h3 className="text-2xl font-bold mb-4">
                            คุณสมบัติผู้บริจาคอวัยวะ
                        </h3>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>ผู้บริจาคอวัยวะต้องมีอายุไม่เกิน 65 ปี</li>
                            <li>เสียชีวิตจากสภาวะสมองตายด้วยสาเหตุต่าง ๆ</li>
                            <li>ปราศจากโรคติดเชื้อ และโรคมะเร็ง</li>
                            <li>ไม่เป็นโรคเรื้อรัง เช่น เบาหวาน, หัวใจ, โรคไต, ความดันโลหิตสูง, โรคตับ และไม่ติดสุรา</li>
                            <li>อวัยวะที่จะนำไปปลูกถ่ายต้องทำงานได้ดี</li>
                            <li>ปราศจากเชื้อที่ถ่ายทอดทางการปลูกถ่ายอวัยวะ เช่น ไวรัสตับอักเสบชนิดบี, ไวรัสเอดส์ ฯลฯ</li>
                            <li>กรุณาแจ้งเรื่องการบริจาคอวัยวะแก่บุคคลในครอบครัวหรือญาติให้รับทราบด้วย</li>
                        </ol>
                    </div>
                </div>
                <div className="w-full h-px bg-gray-300 my-8"></div>
                <div className="text-center">
                    <a
                        href="https://organdonate.redcross.or.th/"
                        target="_blank"
                        className="inline-block bg-[rgb(var(--color-primary-light))] hover:bg-[rgb(var(--color-primary-light)/0.2)] hover:text-[rgb(var(--color-primary))] text-xl text-white px-6 py-3 rounded-lg"
                    >
                        ลงทะเบียนบริจาคอวัยวะ
                    </a>
                </div>
            </div>
        </>
    );
}
