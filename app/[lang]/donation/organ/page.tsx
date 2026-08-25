import { languages, Lang } from "@/i18n";
import { PublicHero } from "@/app/components/PublicUI";

export default async function OrganDonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <>
            <PublicHero title={t.organ_donation} eyebrow="Give the gift of life" image="/images/organ.png" />
            <div className="container-page max-w-6xl py-10 sm:py-14">
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
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="surface-card p-5 leading-8 sm:p-7">
                        <h2 className="text-2xl font-bold mb-4">
                            ความสำคัญของการบริจาคอวัยวะ
                        </h2>
                        <p>
                            &quot;การให้ชีวิตใหม่&quot; ที่ยิ่งใหญ่ที่สุด ช่วยต่อลมหายใจให้ผู้ป่วยโรคเรื้อรังระยะสุดท้าย
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
                    <div className="surface-card bg-teal-50/40 p-5 leading-8 sm:p-7">
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
                        className="btn-primary"
                    >
                        ลงทะเบียนบริจาคอวัยวะ
                    </a>
                </div>
            </div>
        </>
    );
}
