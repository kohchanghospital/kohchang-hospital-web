import { languages, Lang } from '@/i18n';

const historyHosContent: Record<Lang, string> = {
    th: `โรงพยาบาลเกาะช้างได้รับบริจาคที่ดินจากนายสนิท-นางดารา เยาวรัตน์ 
    จำนวน 6 ไร่ 2 งาน 39 ตารางวา และนายประกอบ-นางวิไลวรรณ ครุพานิช 
    จำนวน 3 ไร่ 2 งาน 11 ตารางวา เมื่อวันที่ 29 ตุลาคม 2542 
    และได้จัดพิธีวางศิลาฤกษ์ขึ้นเมื่อวันที่ 24 ธันวาคม 2539 
    โดยนายแพทย์จำรูญ มีขนอน รองปลัดกระทรวงสาธารณสุข 
    ได้รับงบประมาณในการก่อสร้าง จำนวน 21 ล้านบาท 
    เริ่มดำเนินการก่อสร้างเมื่อวันที่ 1 ตุลาคม 2540 
    ก่อสร้างแล้วเสร็จเมื่อวันที่ 26 มีนาคม 2542`,

    en: `Kohchang Hospital received land donations from Mr. Sanit and Mrs. Dara Yaowarat, 
    totaling 6 rai, 2 ngan, and 39 square wah (approximately 10,556 square meters or 2.61 acres), 
    and from Mr. Prakob and Mrs. Wilaiwan Krupanich, totaling 3 rai, 2 ngan, and 11 square wah 
    (approximately 5,644 square meters or 1.39 acres), on October 29, 1999.
    The foundation stone laying ceremony was held on December 24, 1996, officiated by 
    Dr. Chamroon Meekhanon, Deputy Permanent Secretary of the Ministry of Public Health. 
    The project was allocated a construction budget of 21 million baht, with construction commencing on October 1, 1997,
    and completed on March 26, 1999.`
};

const historyDisContent: Record<Lang, string> = {
    th: `อำเภอเกาะช้างมีประวัติอันยาวนาน เท่าที่มีหลักฐาน นับตั้งแต่ครั้งกรุงศรีอยุทธยา 
    มีเรือสำเภาจากเมืองจีนเดินทางเข้ามาค้าขายผ่านเมืองญวณ เมืองเขมร เมืองเกาะกง (ซึ่งแต่เดิมเป็นของสยาม)
    และเข้ามาถึงเมืองตราด ในช่วงมรสุม(พฤษภาคม-ตุลาคม) เรือสำเภาจะเข้ามาพักหลบคลื่นลมตามหมู่เกาะช้าง 
    บริเวณบ้านด่าน บ้านคลองสน อ่าวสลักเพชร และอ่าวบางเบ้า เชื่อว่าชาวจีนที่มากับเรือสำเภาจะเป็นกลุ่มแรกที่มาอาศัยตั้งถิ่นฐานทำมาหากิน`,

    en: `Kohchang District has a long history, as evidenced by records dating back to the Ayutthaya period. 
    Chinese junks traveled through the regions of Vietnam, Cambodia, and Koh Kong (which was originally part of Siam) 
    before reaching Trat. During the monsoon season (May-October), these junks would seek shelter from the rough seas around 
    the Koh Chang archipelago, particularly near Ban Dan, Ban Khlong Son, Ao Salak Phet, and Ao Bang Bao. It is believed that 
    the Chinese who arrived on these junks were among the first settlers in the area, establishing their livelihoods there.`
};

const historyEsDisContent: Record<Lang, string> = {
    th: `พ.ศ. 2440 ได้จัดตั้งอำเภอขึ้นใช้ชื่อว่า อำเภอเกาะช้าง ตั้งอยู่ที่บ้านด่าน ตำบลเกาะช้าง พื้นที่ของอำเภอในสมัยนั้น รวมถึงอำเภอแหลมงอบ เกาะกูด 
    และเกาะต่างๆ รวม 52 เกาะ สาเหตุที่ตั้งบ้านด่านเพราะเป็นแหล่งรวมของการค้าขาย เรือสำเภาจีนจะนำสินค้าจากเมืองจีนเข้ามาขายและส่วนหนึ่งจะแล่นต่อไปกรุงเทพฯ 
    ขากลับจะแวะพักที่บ้านด่านอีก เมื่อเรือสำเภาจากเมืองจีนเข้ามาจอด จะมีผู้คนจากแหลมงอบนั่งเรือใบ หรือเรือแจวมาซื้อสินค้า และเมื่อเรือสำเภาจีนเดินทางมาจากกรุงเทพฯ
    คนจากฝั่งแหลมงอบจะนำสินค้าทางการเกษตรมาขายให้เรือสำเภาจีนนำกลับไปขายที่เมืองจีน ในปี พ.ศ.2450 เรือสำเภาจีนเดินทางเข้ามาค้าขายน้อยลง 
    เนื่องจากอิทธิพลของฝรั่งเศสที่เข้ามาล่าเมืองขึ้น โดยยึดคลองเมืองญวณ เมืองเขมร และส่วนหนึ่งของเมืองสยาม ประชาชนจากตำบลแหลมงอบจึงไม่ค่อยได้เดินทางมาถึง
    อำเภอเกาะช้าง ประกอบกับการมาติดต่อราชการที่อำเภอเกาะช้างไปตั้งอยู่ที่ฝั่งตำบลแหลมงอบและยังใช้ชื่อว่าอำเภอเกาะช้างอยู่ พ.ศ. 2482 
    ทางราชการจึงเปลี่ยนชื่ออำเภอใหม่ ตามสถานที่ตั้งเป็นอำเภอแหลมงอบจนถึงปัจจุบัน เกาะช้างเป้นเพียงตำบลหนึ่งขึ้นกับอำเภอแหลมงอบ ตั้งแต่นั้นมา พ.ศ.2537 
    กระทรวงมหาดไทยได้ประกาศจัดตั้งกิ่งอำเภอเกาะช้างขึ้นอีก เมื่อวันที่ 30 เมษายน 2537 เนื่องจากอำเภอเกาะช้างมีธรรมชาติสวยงาม 
    และมีนักท่องเที่ยวจำนวนมาก พ.ศ. 2550 กิ่งอำเภอเกาะช้าง ได้ยกฐานะเป็นอำเภอเกาะช้าง ตามพระราชกฤษฎีกาตั้งอำเภอฯ ประกาศในราชกิจจานุเบกษา 
    ฉบับกฤษฎีกา เล่ม 124 ตอนที่ 46 ก ลงวันที่ 24 สิงหาคม 2550 มีผลเป็นฐานะอำเภอ ในวันที่ 8 กันยายน 2550 ซึ่งเป็นโครงการอำเภอเฉลิมพระเกียรติ 
    พระบาทสมเด็จพระเจ้าอยู่หัว เนื่องในโอกาสมหามงคลเฉลิมพระชนมพรรษา 5 ธันวาคม 2550`,

    en: `In 1897 (B.E. 2440), Koh Chang District was established under the name Koh Chang District, 
    with its administrative center located at Ban Dan, Koh Chang Subdistrict. At that time, 
    the district’s territory included what are now Laem Ngop District, Koh Kood Island, and numerous surrounding islands, 
    totaling 52 islands.Ban Dan was selected as the district center because it was an important commercial hub. 
    Chinese junks regularly transported goods from China for trade at Ban Dan, with some vessels continuing onward to Bangkok. 
    On their return journeys, these junks would stop again at Ban Dan. When Chinese trading vessels arrived, 
    residents from Laem Ngop traveled by sailboats or rowing boats to purchase goods. Conversely, 
    when Chinese junks departed from Bangkok, people from the Laem Ngop mainland brought agricultural products to sell, 
    which were then transported back to China.By 1907 (B.E. 2450), 
    the number of Chinese trading vessels declined due to the influence of French colonial expansion in the region, 
    including the occupation of areas such as Cochinchina, Cambodia, and parts of Siam. As a result, 
    residents from Laem Ngop Subdistrict traveled less frequently to Koh Chang District. In addition, 
    the district administrative office was relocated to the mainland at Laem Ngop Subdistrict, 
    while still retaining the name Koh Chang District.In 1939 (B.E. 2482), 
    the government officially renamed the district to Laem Ngop District, reflecting its new administrative location. 
    From that time onward, Koh Chang became a subdistrict under Laem Ngop District.Later, in 1994 (B.E. 2537), 
    the Ministry of Interior announced the establishment of Koh Chang as a minor district (King Amphoe) on April 30, 1994, 
    due to its outstanding natural beauty and the increasing number of tourists.Subsequently, in 2007 (B.E. 2550), 
    Koh Chang Minor District was officially upgraded to Koh Chang District under a Royal Decree published in the Royal Gazette 
    (Volume 124, Section 46 Kor) on August 24, 2007, and the new district status came into effect on September 8, 2007. 
    This upgrade was part of a commemorative project honoring His Majesty the King on the auspicious occasion of his 80th birthday on December 5, 2007.`
};

export default async function HistoryPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <section className="mx-auto max-w-4xl px-6 py-12">
                <h1 className="mb-6 text-3xl font-bold">{t.history}</h1>
                <h2 className="mb-4 text-2xl font-bold">{t.history_dis}</h2>
                <p className="mb-4 text-gray-700 leading-relaxed text-justify">
                    {historyDisContent[(await params).lang]}
                </p>
                <h3 className="mb-4 text-xl font-bold">{t.history_es_dis}</h3>
                <p className="mb-4 text-gray-700 leading-relaxed text-justify">
                    {historyEsDisContent[(await params).lang]}
                </p>
                <h2 className="mb-4 text-2xl font-bold">{t.history_hos}</h2>
                <p className="mb-4 text-gray-700 leading-relaxed text-justify">
                    {historyHosContent[(await params).lang]}
                </p>
            </section>
        </div>
    );
}