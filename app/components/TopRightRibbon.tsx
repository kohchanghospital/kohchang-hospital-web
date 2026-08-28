import Image from 'next/image'

export default function TopRightRibbon() {
    return (
        <div aria-hidden="true">
            <div className="pointer-events-none fixed right-0 top-0 z-100 hidden sm:block">
                <Image
                    src="/images/black_ribbon_top_right1.png"
                    alt=""
                    width={110}
                    height={110}
                    priority
                />
            </div>
            <div className="pointer-events-none fixed right-0 top-0 z-100 md:hidden">
                <Image
                    src="/images/black_ribbon_top_right1.png"
                    alt=""
                    width={45}
                    height={45}
                    priority
                />
            </div>
        </div>
    )
}
