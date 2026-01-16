import Image from 'next/image'

export default function TopRightRibbon() {
    return (
        <div>
            <div className="fixed top-0 right-0 z-50 pointer-events-none sm:block hidden">
                <Image
                    src="/images/black_ribbon_top_right1.png"
                    alt="mourning ribbon"
                    width={110}
                    height={110}
                    priority
                />
            </div>
            <div className="fixed top-0 right-0 z-50 pointer-events-none md:hidden">
                <Image
                    src="/images/black_ribbon_top_right1.png"
                    alt="mourning ribbon"
                    width={45}
                    height={45}
                    priority
                />
            </div>
        </div>
    )
}
