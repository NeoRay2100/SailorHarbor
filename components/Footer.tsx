import Link from "next/link";
import { VercelIcon, GithubIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <div className="text-center text-xs text-gray-400">
      <span id="busuanzi_container_site_pv">
        你是第  <span id="busuanzi_value_site_pv"></span>  试图说服丈母娘的人
      </span>
      <p className="mt-4 text-sm text-slate-500 sm:mt-2">
        如果你战胜了丈母娘，相信我，困难刚刚开始，去哄哄模拟器试试哄哄女朋友吧
      </p>
    </div>
  );
}
