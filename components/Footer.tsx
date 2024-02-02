import Link from "next/link";
import { VercelIcon, GithubIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <div className="text-center text-xs text-gray-400">
      <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
      <span id="busuanzi_container_site_pv">
        你是第  <span id="busuanzi_value_site_pv"></span>  个试图说服丈母娘的人
      </span>
      <p className="mt-4 text-sm text-slate-500 sm:mt-2">
        如果你战胜了丈母娘，相信我，困难刚刚开始，去<a href="https://hong.azhubaby.com/">  哄哄模拟器  </a>试试哄哄女朋友吧
        
      </p>
      <p>Powered by hong.azhubaby.com rights reserved.</p>
    </div>
  );
}
