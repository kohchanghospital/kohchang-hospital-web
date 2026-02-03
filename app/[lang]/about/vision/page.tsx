// import { languages, Lang } from '@/i18n';

// export const data: Record<
//     'vision' | 'mission' | 'values',
//     Record<Lang, string>
// > = {
//     vision: {
//         th: 'เครือข่ายสุขภาพที่เป็นเลิศด้านการสาธารณสุขทางทะเล ด้วยเทคโนโลยีในการบริการสุขภาพตามมาตรฐานสากล ประชาชนและนักท่องเที่ยวมีสุขภาวะที่ดี พึ่งตนเองได้',
//         en: 'To be an excellent health network in marine public health with technology in health services according to international standards, enabling citizens and tourists to have good health and self-reliance',
//     },
//     mission: {
//         th: 'กรอบในการดำเนินงานตามภารกิจของการสาธารณสุขทางทะเลและภารกิจการพัฒนาไปสู่วิสัยทัศน์ ยุทธศาสตร์ได้กำหนดพันธกิจ ดังนี้ 1) ส่งเสริมสุขภาพ ควบคุมและป้องกันโรค รักษาโรค และฟื้นฟูสุขภาพแก่ประชาชนในพื้นที่ ด้วยมาตรฐานการจัดบริการสุขภาพที่มีคุณภาพ 2) บูรณาการและระดมพลังภาคีทุกภาคส่วนเพื่อร่วมเสริมสร้างอำเภอเกาะช้างให้เป็นเมืองสุขภาวะ ที่มีสภาพแวดล้อมเอื้อต่อการส่งเสริมสุขภาพ เสริมสร้าง ความฉลาดรู้ทางสุขภาพแก่ประชาชน ชุมชนให้มีความเข้มแข็งในการจัดการสุขภาพที่สามารถพึ่งตนเองได้อย่างเท่าทัน ตามบริบทของพื้นที่ และความเปลี่ยนแปลง 3) เสริมสร้างขีดความสามารถของระบบบริการสุขภาพ สถานบริการสุขภาพ บุคลากรทางสุขภาพ เครือข่ายการบริการสุขภาพของอำเภอ ให้มีสมรรถนะสูงในการให้บริการสุขภาพ อย่างมีมาตรฐานสากล ในการพัฒนาการสาธารณสุขทางทะเล การสาธารณสุขชายแดน และการสาธารณสุขของพื้นที่เศรษฐกิจพิเศษ 4) เสริมสร้างความเข้มแข็งของโรงพยาบาล โรงพยาบาลส่งเสริมสุขภาพ ด้านการบริหารจัดการ บุคลากร การเงินการคลังที่พึ่งตนเองได้สูง การมีธรรมภิบาล และการเป็นองค์กรแห่งการเรียนรู้ที่มีความทันสมัย',
//         en: 'The framework for carrying out the mission of marine public health and the mission of development towards the vision. The strategy has defined the following missions: 1) Promote health, control and prevent diseases, treat diseases, and rehabilitate the health of people in the area with quality health service standards. 2) Integrate and mobilize all sectors to jointly strengthen Koh Chang District to be a healthy city with an environment conducive to health promotion, enhancing health literacy for people and communities to be strong in health management that can rely on themselves in a timely manner according to the context of the area and changes. 3) Enhance the capacity of the health service system, health service facilities, health personnel, and health service networks in the district to have high competence in providing health services with international standards in the development of marine public health, border public health, and public health in special economic zones. 4) Strengthen hospitals and health promotion hospitals in terms of management, personnel, self-reliant finance, good governance, and being a modern learning organization.',
//     },
//     values: {
//         th: 'ว่องไว ให้คุณค่ากับบุคลากร มีความคิดสร้างสรรค์',
//         en: 'Agility , Value on staff , Creativity',
//     },
// };

// export default async function VisionPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
//     const t = languages[(await params).lang];
//     return (
//         <div>
//             <section className="mx-auto max-w-4xl px-6 py-12">
//                 <h1 className="mb-4 text-3xl font-bold">{t.vision_head}</h1>
//                 <h2 className="mb-4 text-2xl font-bold">{t.vision}</h2>
//                 <p className="mb-4 text-gray-700 leading-relaxed text-justify">
//                     {data.vision[(await params).lang]}
//                 </p>
//                 <h2 className="mb-4 text-2xl font-bold">{t.mission}</h2>
//                 <p className="mb-4 text-gray-700 leading-relaxed text-justify">
//                     {data.mission[(await params).lang]}
//                 </p>
//                 <h2 className="mb-4 text-2xl font-bold">{t.values}</h2>
//                 <p className="mb-4 text-gray-700 leading-relaxed text-justify">
//                     {data.values[(await params).lang]}
//                 </p>
//             </section>
//         </div>
//     );
// }

import { languages, Lang } from '@/i18n';
import { getContent } from '@/app/lib/api';

export default async function VisionPage({ params }: { params: { lang: Lang } }) {
    const lang = (await params).lang;
    const t = languages[lang];
    console.log("LANG FROM PARAMS:", lang);

    const [
        vision,
        mission,
        values
    ] = await Promise.all([
        getContent('vision', lang),
        getContent('mission', lang),
        getContent('values', lang),
    ]);

    return (
        <div>
            <section className="mx-auto max-w-4xl px-6 py-12">
                <h1 className="mb-6 text-3xl font-bold">{t.vision_head}</h1>

                <h2 className="mb-4 text-2xl font-bold">{t.vision}</h2>
                <div
                    className="prose max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: vision.body }}
                />

                <h3 className="mb-4 text-2xl font-bold">{t.mission}</h3>
                <div
                    className="prose max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: mission.body }}
                />

                <h2 className="mb-4 text-2xl font-bold">{t.values}</h2>
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: values.body }}
                />
            </section>
        </div>
    );
}