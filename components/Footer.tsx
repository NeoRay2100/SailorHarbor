import Link from "next/link";
import { VercelIcon, GithubIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <div className="text-center text-xs text-gray-400">
      <span id="busuanzi_container_site_pv">
        本站总访问量<span id="busuanzi_value_site_pv"></span>人次
      </span>
      <p className="mt-4 text-sm text-slate-500 sm:mt-2">
        Copyright © hong.azhubaby.com rights reserved.
      </p>
    </div>
  );
}
