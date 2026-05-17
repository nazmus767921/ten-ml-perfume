import { PhosphorLogoIcon } from "@phosphor-icons/react/dist/ssr"



export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-row items-center">
        <PhosphorLogoIcon className="size-14 text-black" />
        <div className="flex flex-col">
          <span className="font-body -mt-0.5 text-[18px] leading-none font-bold tracking-[1.5px] text-black md:text-[22px] md:tracking-[2px]">
            10ML
          </span>
          <span className="font-logo-script -mt-0.5 text-[14px] leading-none text-black uppercase md:text-[16px]">
            perfume
          </span>
        </div>
      </div>
    </div>
  )
}
